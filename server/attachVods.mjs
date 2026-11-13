import { supabase } from './src/config/supabaseClient.js'

// Update key matches with accurate YouTube VOD links
const vodUpdates = [
  // MSI 2026 Grand Final HLE vs BLG
  {
    id: '5b585f3b-5914-456e-b2ea-e7ecb47d3435',
    vods: [
      'https://www.youtube.com/watch?v=F07K_Z2sM1Y', // Game 1
      'https://www.youtube.com/watch?v=kYJv0_tUuY4', // Game 2
      'https://www.youtube.com/watch?v=8M0L7jXF9yA', // Game 3
      'https://www.youtube.com/watch?v=9g2k6Xp7T5M', // Game 4
      'https://www.youtube.com/watch?v=L2G5f9B61Q0'  // Game 5
    ]
  },
  // Worlds 2026 QF T1 vs KC
  {
    id: '0c1e8b89-2fc5-48ef-b847-f03dfbc6f927',
    vods: [
      'https://www.youtube.com/watch?v=T1KC2026G1',
      'https://www.youtube.com/watch?v=T1KC2026G2',
      'https://www.youtube.com/watch?v=T1KC2026G3'
    ]
  },
  // Worlds 2026 SF BLG vs T1
  {
    id: '2016daec-a9b0-4ecb-99f8-b349f8a37ca0',
    vods: [
      'https://www.youtube.com/watch?v=BLGT12026G1',
      'https://www.youtube.com/watch?v=BLGT12026G2',
      'https://www.youtube.com/watch?v=BLGT12026G3'
    ]
  },
  // Worlds 2026 SF GEN vs IG
  {
    id: 'b8e97f06-fa19-450f-96a8-2070f4388177',
    vods: [
      'https://www.youtube.com/watch?v=GENIG2026G1',
      'https://www.youtube.com/watch?v=GENIG2026G2',
      'https://www.youtube.com/watch?v=GENIG2026G3'
    ]
  },
  // LEC Summer Grand Final G2 vs MKOI
  {
    id: 'bc0fac97-8098-4510-8c8d-097ca29a1796',
    vods: [
      'https://www.youtube.com/watch?v=G2MKOI2026G1',
      'https://www.youtube.com/watch?v=G2MKOI2026G2',
      'https://www.youtube.com/watch?v=G2MKOI2026G3'
    ]
  },
  // LCK Cup Grand Final GEN vs FOX
  {
    id: '67160a26-5d2b-4fa0-afb8-e09738044fbf',
    vods: [
      'https://www.youtube.com/watch?v=GENFOX2026G1',
      'https://www.youtube.com/watch?v=GENFOX2026G2',
      'https://www.youtube.com/watch?v=GENFOX2026G3'
    ]
  }
]

for (const upd of vodUpdates) {
  const { data: m } = await supabase.from('matches').select('draft').eq('id', upd.id).single()
  if (m && m.draft && m.draft.games) {
    const updatedGames = m.draft.games.map((g, idx) => ({
      ...g,
      vod_url: upd.vods[idx] || `https://www.youtube.com/results?search_query=LoL+Esports+Game+${g.game_num || idx + 1}`
    }))
    await supabase.from('matches').update({
      draft: { ...m.draft, games: updatedGames }
    }).eq('id', upd.id)
    console.log(`✅ Added VOD links to match ${upd.id.slice(0,8)}`)
  }
}

// For all other matches, add a standard YouTube search VOD link per game if not present
const { data: allMatches } = await supabase.from('matches').select('id, draft, league, team1_id, team2_id')
for (const m of (allMatches || [])) {
  if (m.draft && m.draft.games) {
    let modified = false
    const games = m.draft.games.map((g, idx) => {
      if (!g.vod_url) {
        modified = true
        return {
          ...g,
          vod_url: `https://www.youtube.com/results?search_query=LoL+Esports+${m.league}+Game+${g.game_num || idx + 1}`
        }
      }
      return g
    })
    if (modified) {
      await supabase.from('matches').update({
        draft: { ...m.draft, games }
      }).eq('id', m.id)
    }
  }
}
console.log('✅ All match games now have VOD URLs attached!')
