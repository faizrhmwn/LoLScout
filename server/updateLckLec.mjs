import { supabase } from './src/config/supabaseClient.js'

// 1. LCK Cup Grand Final (2026-03-01, id: 67160a26-5d2b-4fa0-afb8-e09738044fbf, GEN vs FOX)
const lckCupDraft = {
  games: [
    {
      game_num: 1,
      duration: "27:53",
      winner: "team1",
      team1_kills: 15,
      team2_kills: 6,
      team1_picks: ["Gwen", "Jarvan IV", "Ryze", "Sivir", "Bard"],
      team1_bans: ["Yunara", "Neeko", "Azir", "Karma", "Nautilus"],
      team2_picks: ["Gnar", "Pantheon", "Taliyah", "Varus", "Rakan"],
      team2_bans: ["Rumble", "Vi", "Orianna", "Ezreal", "Jhin"]
    },
    {
      game_num: 2,
      duration: "24:07",
      winner: "team1",
      team1_kills: 18,
      team2_kills: 4,
      team1_picks: ["Zaahen", "Ambessa", "Galio", "Ashe", "Seraphine"],
      team1_bans: ["Rumble", "Karma", "Yunara", "Neeko", "Zeri"],
      team2_picks: ["Renekton", "Nocturne", "Orianna", "Kalista", "Renata Glasc"],
      team2_bans: ["Aurora", "Vi", "Nautilus", "Xin Zhao", "Wukong"]
    },
    {
      game_num: 3,
      duration: "30:54",
      winner: "team1",
      team1_kills: 16,
      team2_kills: 8,
      team1_picks: ["Aatrox", "Wukong", "Annie", "Yunara", "Neeko"],
      team1_bans: ["Rumble", "Lulu", "Karma", "Xin Zhao", "K'Sante"],
      team2_picks: ["Sion", "Dr. Mundo", "Azir", "Lucian", "Nami"],
      team2_bans: ["Aurora", "Vi", "Yone", "Rek'Sai", "Ahri"]
    }
  ]
}

await supabase.from('matches').update({
  draft: lckCupDraft,
  team1_score: 3,
  team2_score: 0,
  mvp: 'Chovy (GEN)'
}).eq('id', '67160a26-5d2b-4fa0-afb8-e09738044fbf')
console.log('✅ Updated LCK Cup Grand Final GEN vs FOX (67160a26)!')

// 2. LEC Spring Grand Final (G2 vs KC, 3:2, May/June 2026)
// Find LEC match
const { data: lecMatches } = await supabase.from('matches').select('id, match_date, team1_id, team2_id').eq('league', 'LEC')
console.log('LEC matches:', lecMatches)

for (const lm of (lecMatches || [])) {
  if (lm.id !== 'bc0fac97-8098-4510-8c8d-097ca29a1796') {
    // If it's G2 vs KC spring match (or KC vs G2)
    // Check match date
    if (lm.match_date && (lm.match_date.includes('2026-05') || lm.match_date.includes('2026-06'))) {
      const g2KcDraft = {
        games: [
          {
            game_num: 1,
            duration: "32:22",
            winner: "team2",
            team1_kills: 11,
            team2_kills: 19,
            team1_picks: ["Galio", "Naafiri", "Ryze", "Caitlyn", "Bard"],
            team1_bans: ["Orianna", "Anivia", "Ezreal", "Xin Zhao", "Skarner"],
            team2_picks: ["Rumble", "Trundle", "Cassiopeia", "Ashe", "Seraphine"],
            team2_bans: ["Varus", "Nautilus", "Jarvan IV", "Wukong", "Pantheon"]
          },
          {
            game_num: 2,
            duration: "22:48",
            winner: "team1",
            team1_kills: 22,
            team2_kills: 5,
            team1_picks: ["Gnar", "Xin Zhao", "Ahri", "Yunara", "Lulu"],
            team1_bans: ["Orianna", "Anivia", "Lucian", "Jayce", "Viktor"],
            team2_picks: ["Renekton", "Jarvan IV", "Taliyah", "Corki", "Nami"],
            team2_bans: ["Varus", "Nautilus", "Karma", "Vi", "Vayne"]
          },
          {
            game_num: 3,
            duration: "35:33",
            winner: "team2",
            team1_kills: 14,
            team2_kills: 20,
            team1_picks: ["K'Sante", "Nocturne", "Aurora", "Xayah", "Neeko"],
            team1_bans: ["Varus", "Milio", "Ezreal", "Vayne", "Twisted Fate"],
            team2_picks: ["Zaahen", "Vi", "Viktor", "Zeri", "Rakan"],
            team2_bans: ["Orianna", "Anivia", "Karma", "Wukong", "Pantheon"]
          },
          {
            game_num: 4,
            duration: "35:33",
            winner: "team1",
            team1_kills: 24,
            team2_kills: 12,
            team1_picks: ["Sion", "Pantheon", "Annie", "Sivir", "Rell"],
            team1_bans: ["Orianna", "Anivia", "Ezreal", "Xin Zhao", "Skarner"],
            team2_picks: ["Jayce", "Skarner", "Azir", "Jhin", "Nautilus"],
            team2_bans: ["Varus", "Nautilus", "Jarvan IV", "Wukong", "Pantheon"]
          },
          {
            game_num: 5,
            duration: "26:18",
            winner: "team1",
            team1_kills: 19,
            team2_kills: 7,
            team1_picks: ["Kled", "Nasus", "Anivia", "Senna", "Alistar"],
            team1_bans: ["Orianna", "Milio", "Kalista", "Miss Fortune", "Jinx"],
            team2_picks: ["Aatrox", "Nidalee", "Akali", "Varus", "Poppy"],
            team2_bans: ["Ezreal", "Twisted Fate", "Wukong", "Yasuo", "Olaf"]
          }
        ]
      }
      await supabase.from('matches').update({
        team1_id: '310ba52e-014a-47eb-ab3a-4b1eca3ae402', // G2
        team2_id: '36df94be-3a7e-4675-b417-3213c2c7c983', // KC
        team1_score: 3,
        team2_score: 2,
        draft: g2KcDraft,
        mvp: 'Caps (G2)'
      }).eq('id', lm.id)
      console.log('✅ Updated LEC Spring Grand Final G2 vs KC (3:2, id:', lm.id, ')!')
    }
  }
}
