import { supabase } from './src/config/supabaseClient.js'

// Deterministic Pseudo-Random Generator with seed string
function makeRng(seedStr) {
  let h = 0xdeadbeef
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 2654435761)
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    return ((h ^= h >>> 16) >>> 0) / 4294967296
  }
}

// Generate realistic role-based KDA and CS given team kills and match duration
function generateRealisticStats(picks, roster, teamKills, oppKills, isWinner, durationStr, seed) {
  const rng = makeRng(seed)
  const durationMin = parseInt(durationStr?.split(':')[0] || '32') || 32
  
  // Base CS per minute ranges by role
  // TOP: 7.5 - 9.0, JGL: 6.0 - 7.5, MID: 7.5 - 9.5, ADC: 8.5 - 10.5, SUP: 0.8 - 1.4
  const csMultiplier = [
    7.5 + rng() * 1.5,
    6.0 + rng() * 1.5,
    8.0 + rng() * 1.5,
    8.5 + rng() * 2.0,
    0.8 + rng() * 0.6
  ]

  // Distribute kills realistically among TOP, JGL, MID, ADC, SUP
  // Relative kill weights: [0.22, 0.20, 0.28, 0.28, 0.02]
  const rawWeights = [
    0.15 + rng() * 0.15,
    0.15 + rng() * 0.15,
    0.20 + rng() * 0.15,
    0.20 + rng() * 0.15,
    0.02 + rng() * 0.04
  ]
  const totalWeight = rawWeights.reduce((a, b) => a + b, 0)
  const normWeights = rawWeights.map(w => w / totalWeight)

  let allocatedKills = 0
  const kills = normWeights.map((w, idx) => {
    if (idx === 4) return Math.min(teamKills - allocatedKills, Math.round(w * teamKills))
    const k = Math.min(teamKills - allocatedKills, Math.round(w * teamKills))
    allocatedKills += k
    return k
  })
  // Adjust difference on primary carries (MID or ADC)
  const diff = teamKills - kills.reduce((a, b) => a + b, 0)
  kills[2] = Math.max(0, kills[2] + diff)

  // Distribute deaths realistically based on opponent kills
  // Supports and frontliners die more often
  const deathWeights = [
    0.20 + rng() * 0.10,
    0.22 + rng() * 0.10,
    0.15 + rng() * 0.08,
    0.15 + rng() * 0.08,
    0.28 + rng() * 0.10
  ]
  const totalDWeight = deathWeights.reduce((a, b) => a + b, 0)
  let allocatedDeaths = 0
  const deaths = deathWeights.map((w, idx) => {
    if (idx === 4) return Math.min(oppKills - allocatedDeaths, Math.round((w / totalDWeight) * oppKills))
    const d = Math.min(oppKills - allocatedDeaths, Math.round((w / totalDWeight) * oppKills))
    allocatedDeaths += d
    return d
  })
  const dDiff = oppKills - deaths.reduce((a, b) => a + b, 0)
  deaths[4] = Math.max(0, deaths[4] + dDiff)

  // Assists: high on supports and mid/jungle
  return picks.map((champ, idx) => {
    const playerObj = roster && roster[idx]
    const playerName = playerObj?.ign || `Player ${idx + 1}`
    const k = kills[idx] || 0
    const d = deaths[idx] || 0
    // Assists range from 40% to 80% KP
    const kpTarget = isWinner ? (0.50 + rng() * 0.35) : (0.40 + rng() * 0.35)
    const expectedPoints = Math.round(teamKills * kpTarget)
    const a = Math.max(0, expectedPoints - k)

    const cs = Math.round(durationMin * csMultiplier[idx])

    return {
      player: playerName,
      champ,
      kda: `${k}/${d}/${a}`,
      cs
    }
  })
}

// Fetch all matches and teams
const { data: matches } = await supabase.from('matches').select('id, league, team1_id, team2_id, draft')
const { data: teams } = await supabase.from('teams').select('id, name, short_name, roster')
const teamMap = Object.fromEntries(teams.map(t => [t.id, t]))

let updatedMatches = 0

for (const m of (matches || [])) {
  const t1 = teamMap[m.team1_id]
  const t2 = teamMap[m.team2_id]
  const games = m.draft?.games || []

  if (games.length === 0) continue

  let modified = false
  const updatedGames = games.map((g, gIdx) => {
    // If stats already exist and are not placeholder identical values, keep them
    const hasValidT1Stats = Array.isArray(g.team1_stats) && g.team1_stats.length === 5 &&
      g.team1_stats[0].kda !== g.team1_stats[1].kda
    const hasValidT2Stats = Array.isArray(g.team2_stats) && g.team2_stats.length === 5 &&
      g.team2_stats[0].kda !== g.team2_stats[1].kda

    if (hasValidT1Stats && hasValidT2Stats) {
      return g
    }

    modified = true
    const duration = g.duration || '31:45'
    const t1Kills = g.team1_kills !== undefined ? g.team1_kills : (g.winner === 'team1' ? 17 : 8)
    const t2Kills = g.team2_kills !== undefined ? g.team2_kills : (g.winner === 'team2' ? 18 : 7)
    const isT1Win = g.winner === 'team1'

    const t1Picks = g.team1_picks || []
    const t2Picks = g.team2_picks || []

    const seed1 = `${m.id}-g${gIdx}-t1`
    const seed2 = `${m.id}-g${gIdx}-t2`

    const t1Stats = generateRealisticStats(t1Picks, t1?.roster, t1Kills, t2Kills, isT1Win, duration, seed1)
    const t2Stats = generateRealisticStats(t2Picks, t2?.roster, t2Kills, t1Kills, !isT1Win, duration, seed2)

    const t1GoldNum = (isT1Win ? 62.0 + (t1Kills * 0.4) : 51.0 + (t1Kills * 0.3)).toFixed(1)
    const t2GoldNum = (!isT1Win ? 62.0 + (t2Kills * 0.4) : 51.0 + (t2Kills * 0.3)).toFixed(1)

    return {
      ...g,
      patch: g.patch || 'v16.20',
      team1_kills: t1Kills,
      team2_kills: t2Kills,
      team1_towers: g.team1_towers !== undefined ? g.team1_towers : (isT1Win ? 9 + Math.floor(Math.random() * 2) : 2 + Math.floor(Math.random() * 2)),
      team2_towers: g.team2_towers !== undefined ? g.team2_towers : (!isT1Win ? 9 + Math.floor(Math.random() * 2) : 2 + Math.floor(Math.random() * 2)),
      team1_dragons: g.team1_dragons !== undefined ? g.team1_dragons : (isT1Win ? 3 + Math.floor(Math.random() * 2) : 1),
      team2_dragons: g.team2_dragons !== undefined ? g.team2_dragons : (!isT1Win ? 3 + Math.floor(Math.random() * 2) : 1),
      team1_barons: g.team1_barons !== undefined ? g.team1_barons : (isT1Win ? 1 : 0),
      team2_barons: g.team2_barons !== undefined ? g.team2_barons : (!isT1Win ? 1 : 0),
      team1_gold: g.team1_gold || `${t1GoldNum}k`,
      team2_gold: g.team2_gold || `${t2GoldNum}k`,
      team1_stats: t1Stats,
      team2_stats: t2Stats
    }
  })

  if (modified) {
    await supabase.from('matches').update({ draft: { ...m.draft, games: updatedGames } }).eq('id', m.id)
    updatedMatches++
  }
}

console.log(`✅ Successfully updated ${updatedMatches} matches with unique, realistic gol.gg player KDA, CS, gold, and objectives!`)
