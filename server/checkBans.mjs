import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

const { data, error } = await sb.from('matches').select('id, league, draft')
if (error) { console.log('error:', JSON.stringify(error)); process.exit(1) }

const NAME_MAP = {
  "K'Sante": "KSante",
  "Kai'Sa": "Kaisa",
  "LeBlanc": "Leblanc",
  "Wukong": "MonkeyKing",
  "Renata Glasc": "Renata",
  "Vel'Koz": "Velkoz",
  "Kha'Zix": "Khazix",
  "Cho'Gath": "Chogath",
  "Nunu & Willump": "Nunu"
}

function getKey(champName) {
  if (!champName) return ''
  return NAME_MAP[champName] || champName.replace(/[^a-zA-Z0-9]/g, '')
}

const allBans = new Set()
const allPicks = new Set()

for (const match of data) {
  const games = match.draft?.games || []
  for (const g of games) {
    for (const c of (g.team1_bans || [])) allBans.add(c)
    for (const c of (g.team2_bans || [])) allBans.add(c)
    for (const c of (g.team1_picks || [])) allPicks.add(c)
    for (const c of (g.team2_picks || [])) allPicks.add(c)
  }
  // Also check legacy flat draft
  if (match.draft && !match.draft.games) {
    for (const c of (match.draft.team1_bans || [])) allBans.add(c)
    for (const c of (match.draft.team2_bans || [])) allBans.add(c)
  }
}

console.log('=== ALL BAN CHAMPIONS ===')
const sortedBans = [...allBans].sort()
for (const c of sortedBans) {
  const key = getKey(c)
  const url = `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${key}.png`
  // flag ones that might be problematic
  const hasSpecial = /[^a-zA-Z0-9 ']/.test(c)
  if (hasSpecial) console.log(`  SPECIAL: "${c}" -> key="${key}"`)
}
console.log('Total unique bans:', allBans.size)
console.log('Total unique picks:', allPicks.size)

// Check what champions are in bans but NOT in picks (might be wrong name)
const bansNotInPicks = [...allBans].filter(c => !allPicks.has(c))
console.log('\nBans NOT in picks (potential name issues):')
for (const c of bansNotInPicks.slice(0, 30)) {
  const key = getKey(c)
  console.log(`  "${c}" -> key="${key}"`)
}
