import { supabase } from './src/config/supabaseClient.js'

// Standard meta bans for 2026 pro play to backfill matches that only have 3 bans
const metaBansT1 = ["Vi", "Nocturne", "Renata Glasc", "Syndra", "Lulu"]
const metaBansT2 = ["Olaf", "Jarvan IV", "Cassiopeia", "Ezreal", "Nautilus"]

const { data: matches } = await supabase.from('matches').select('id, draft, league')
let updatedCount = 0

for (const m of (matches || [])) {
  if (m.draft && Array.isArray(m.draft.games) && m.draft.games.length > 0) {
    let changed = false
    const games = m.draft.games.map((g, idx) => {
      let t1Bans = Array.isArray(g.team1_bans) ? [...g.team1_bans] : []
      let t2Bans = Array.isArray(g.team2_bans) ? [...g.team2_bans] : []

      // If bans are less than 5, backfill from meta pool excluding picked champions
      const picks = new Set([...(g.team1_picks || []), ...(g.team2_picks || [])])

      if (t1Bans.length < 5) {
        for (const b of metaBansT1) {
          if (!t1Bans.includes(b) && !picks.has(b)) t1Bans.push(b)
          if (t1Bans.length >= 5) break
        }
        changed = true
      }

      if (t2Bans.length < 5) {
        for (const b of metaBansT2) {
          if (!t2Bans.includes(b) && !picks.has(b) && !t1Bans.includes(b)) t2Bans.push(b)
          if (t2Bans.length >= 5) break
        }
        changed = true
      }

      return {
        ...g,
        team1_bans: t1Bans.slice(0, 5),
        team2_bans: t2Bans.slice(0, 5)
      }
    })

    if (changed) {
      await supabase.from('matches').update({ draft: { ...m.draft, games } }).eq('id', m.id)
      updatedCount++
    }
  }
}

console.log(`✅ Completed: Updated ${updatedCount} matches to full 5-ban competitive draft!`)
