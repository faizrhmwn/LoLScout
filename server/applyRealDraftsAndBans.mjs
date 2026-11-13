import { supabase } from './src/config/supabaseClient.js'

// 1. Fix LEC Summer Grand Final (G2 vs MKOI instead of KC vs MKOI)
// Match ID: bc0fac97-8098-4510-8c8d-097ca29a1796
// G2 team_id: 310ba52e-014a-47eb-ab3a-4b1eca3ae402
// MKOI team_id: 64ca621c-a05d-4298-b171-ebf588b51590

const g2Draft = {
  games: [
    {
      game_num: 1,
      duration: "27:58",
      winner: "team1",
      team1_kills: 17,
      team2_kills: 8,
      team1_picks: ["Ambessa", "Wukong", "Orianna", "Ashe", "Seraphine"],
      team1_bans: ["Vi", "Cassiopeia", "Jarvan IV", "Pantheon", "Trundle"],
      team2_picks: ["Rumble", "Lee Sin", "Ryze", "Zeri", "Yuumi"],
      team2_bans: ["Nocturne", "Xin Zhao", "Galio", "Cho'Gath", "Skarner"]
    },
    {
      game_num: 2,
      duration: "31:47",
      winner: "team1",
      team1_kills: 21,
      team2_kills: 11,
      team1_picks: ["Kled", "Poppy", "Akali", "Yunara", "Lulu"],
      team1_bans: ["Vi", "Cassiopeia", "Nocturne", "Jayce", "Anivia"],
      team2_picks: ["Renekton", "Jarvan IV", "Lissandra", "Kalista", "Renata Glasc"],
      team2_bans: ["Xin Zhao", "Ezreal", "Bard", "Yone", "Olaf"]
    },
    {
      game_num: 3,
      duration: "29:06",
      winner: "team1",
      team1_kills: 19,
      team2_kills: 7,
      team1_picks: ["Shen", "Skarner", "LeBlanc", "Caitlyn", "Lux"],
      team1_bans: ["Vi", "Cassiopeia", "Karma", "Trundle", "Jayce"],
      team2_picks: ["K'Sante", "Qiyana", "Ahri", "Ezreal", "Bard"],
      team2_bans: ["Nautilus", "Olaf", "Nocturne", "Gnar", "Twisted Fate"]
    }
  ]
}

const { error: errLec } = await supabase.from('matches').update({
  team1_id: '310ba52e-014a-47eb-ab3a-4b1eca3ae402', // G2
  team2_id: '64ca621c-a05d-4298-b171-ebf588b51590', // MKOI
  team1_score: 3,
  team2_score: 0,
  mvp: 'Caps (G2)',
  draft: g2Draft
}).eq('id', 'bc0fac97-8098-4510-8c8d-097ca29a1796')

if (errLec) console.error('Error updating LEC final:', errLec)
else console.log('✅ Updated LEC Summer Grand Final to G2 vs MKOI (3:0, MVP: Caps)!')

// 2. Fix MSI Grand Final Draft (HLE vs BLG)
// Match ID: 5b585f3b-5914-456e-b2ea-e7ecb47d3435
const msiDraft = {
  games: [
    {
      game_num: 1,
      duration: "43:12",
      winner: "team1",
      team1_kills: 18,
      team2_kills: 14,
      team1_picks: ["Ambessa", "Lee Sin", "Orianna", "Caitlyn", "Karma"],
      team1_bans: ["Camille", "Vayne", "Syndra", "Poppy", "Jarvan IV"],
      team2_picks: ["Renekton", "Naafiri", "Viktor", "Ezreal", "Bard"],
      team2_bans: ["Jayce", "Vi", "Gnar", "Lucian", "Ziggs"]
    },
    {
      game_num: 2,
      duration: "32:05",
      winner: "team2",
      team1_kills: 9,
      team2_kills: 19,
      team1_picks: ["Yorick", "Qiyana", "Ahri", "Ziggs", "Camille"],
      team1_bans: ["Jayce", "Ryze", "Gnar", "Syndra", "Lissandra"],
      team2_picks: ["Rumble", "Jarvan IV", "Cassiopeia", "Lucian", "Shen"],
      team2_bans: ["Poppy", "Vayne", "Vi", "Annie", "Akali"]
    },
    {
      game_num: 3,
      duration: "32:41",
      winner: "team2",
      team1_kills: 11,
      team2_kills: 17,
      team1_picks: ["Olaf", "Xin Zhao", "Ryze", "Xayah", "Rakan"],
      team1_bans: ["Vayne", "Syndra", "Pantheon", "Seraphine", "Lulu"],
      team2_picks: ["Jax", "Nocturne", "Annie", "Varus", "Alistar"],
      team2_bans: ["Gnar", "Jayce", "Vi", "Anivia", "Trundle"]
    },
    {
      game_num: 4,
      duration: "31:08",
      winner: "team1",
      team1_kills: 20,
      team2_kills: 12,
      team1_picks: ["Swain", "Trundle", "Twisted Fate", "Ashe", "Seraphine"],
      team1_bans: ["Vayne", "Syndra", "Pantheon", "Pyke", "Sylas"],
      team2_picks: ["K'Sante", "Kindred", "Taliyah", "Mel", "Skarner"],
      team2_bans: ["Gnar", "Jayce", "Vi", "Aurora", "Anivia"]
    },
    {
      game_num: 5,
      duration: "36:26",
      winner: "team1",
      team1_kills: 16,
      team2_kills: 10,
      team1_picks: ["Dr. Mundo", "Pantheon", "Sylas", "Yunara", "Lulu"],
      team1_bans: ["Jayce", "Syndra", "Gnar", "Nautilus", "Rell"],
      team2_picks: ["Aatrox", "Vi", "Aurora", "Miss Fortune", "Neeko"],
      team2_bans: ["Vayne", "Kalista", "Anivia", "Yone", "Zaahen"]
    }
  ]
}

const { error: errMsi } = await supabase.from('matches').update({
  draft: msiDraft,
  mvp: 'Zeus (HLE)'
}).eq('id', '5b585f3b-5914-456e-b2ea-e7ecb47d3435')

if (errMsi) console.error('Error updating MSI final draft:', errMsi)
else console.log('✅ Updated MSI Grand Final HLE vs BLG with exact 5-game gol.gg draft & bans!')

// 3. Fix LCK Cup Grand Final (GEN vs FOX, Mar 1, 2026, GEN 3-0)
// Find LCK match between GEN and FOX
const { data: lckMatches } = await supabase.from('matches').select('id, match_date, stage').eq('league', 'LCK')
for (const lm of (lckMatches || [])) {
  if (lm.match_date && lm.match_date.includes('2026-03-01')) {
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
    }).eq('id', lm.id)
    console.log('✅ Updated LCK Cup Grand Final GEN vs FOX (3:0)!')
  }
}
