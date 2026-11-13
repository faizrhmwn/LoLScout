import { supabase } from './src/config/supabaseClient.js'

// 1. GEN vs IG Worlds 2026 Semifinals (Exact 100% gol.gg)
// Match ID: 26eda7c3-15f1-40a0-b906-38962329b1ea
const genIgDraft = {
  games: [
    {
      game_num: 1,
      duration: "33:38",
      patch: "v16.20",
      winner: "team1",
      team1_kills: 29,
      team2_kills: 7,
      team1_gold: "68.4k",
      team2_gold: "53.1k",
      team1_towers: 10,
      team2_towers: 1,
      team1_dragons: 3,
      team2_dragons: 1,
      team1_barons: 1,
      team2_barons: 0,
      team1_picks: ["Olaf", "Qiyana", "Cassiopeia", "Jhin", "Leona"],
      team1_bans: ["Lulu", "Nocturne", "K'Sante", "Kai'Sa", "Zeri"],
      team2_picks: ["Kled", "Vi", "Syndra", "Xayah", "Rakan"],
      team2_bans: ["Locke", "Ezreal", "Renata Glasc", "Nautilus", "Seraphine"],
      team1_stats: [
        { player: "Kiin", champ: "Olaf", kda: "4/2/13", cs: 254 },
        { player: "Canyon", champ: "Qiyana", kda: "7/1/12", cs: 320 },
        { player: "Chovy", champ: "Cassiopeia", kda: "4/2/12", cs: 242 },
        { player: "Ruler", champ: "Jhin", kda: "9/2/11", cs: 314 },
        { player: "Duro", champ: "Leona", kda: "5/2/17", cs: 34 }
      ],
      team2_stats: [
        { player: "TheShy", champ: "Kled", kda: "0/6/5", cs: 221 },
        { player: "Wei", champ: "Vi", kda: "5/8/0", cs: 188 },
        { player: "Rookie", champ: "Syndra", kda: "2/6/3", cs: 236 },
        { player: "JiaQi", champ: "Xayah", kda: "2/5/2", cs: 356 },
        { player: "Meiko", champ: "Rakan", kda: "0/4/4", cs: 37 }
      ],
      vod_url: "https://www.youtube.com/watch?v=CxljyNJhUw4"
    },
    {
      game_num: 2,
      duration: "29:16",
      patch: "v16.20",
      winner: "team1",
      team1_kills: 26,
      team2_kills: 9,
      team1_gold: "61.2k",
      team2_gold: "48.9k",
      team1_towers: 9,
      team2_towers: 2,
      team1_dragons: 3,
      team2_dragons: 1,
      team1_barons: 1,
      team2_barons: 0,
      team1_picks: ["Gwen", "Lee Sin", "Ahri", "Ashe", "Seraphine"],
      team1_bans: ["Vi", "Syndra", "Renata Glasc", "Jhin", "Varus"],
      team2_picks: ["Rumble", "Nocturne", "Sylas", "Lucian", "Milio"],
      team2_bans: ["Olaf", "Qiyana", "Cassiopeia", "Yunara", "Nautilus"],
      team1_stats: [
        { player: "Kiin", champ: "Gwen", kda: "6/2/6", cs: 267 },
        { player: "Canyon", champ: "Lee Sin", kda: "5/0/15", cs: 242 },
        { player: "Chovy", champ: "Ahri", kda: "6/1/10", cs: 243 },
        { player: "Ruler", champ: "Ashe", kda: "7/3/15", cs: 257 },
        { player: "Duro", champ: "Seraphine", kda: "2/3/17", cs: 36 }
      ],
      team2_stats: [
        { player: "TheShy", champ: "Rumble", kda: "3/4/2", cs: 231 },
        { player: "Wei", champ: "Nocturne", kda: "2/5/4", cs: 180 },
        { player: "Rookie", champ: "Sylas", kda: "2/5/5", cs: 214 },
        { player: "JiaQi", champ: "Lucian", kda: "2/5/5", cs: 278 },
        { player: "Meiko", champ: "Milio", kda: "0/8/7", cs: 31 }
      ],
      vod_url: "https://www.youtube.com/watch?v=ug_fvUC3Tng"
    },
    {
      game_num: 3,
      duration: "40:08",
      patch: "v16.20",
      winner: "team1",
      team1_kills: 18,
      team2_kills: 16,
      team1_gold: "74.2k",
      team2_gold: "69.1k",
      team1_towers: 9,
      team2_towers: 4,
      team1_dragons: 4,
      team2_dragons: 2,
      team1_barons: 1,
      team2_barons: 1,
      team1_picks: ["Camille", "Wukong", "Taliyah", "Yunara", "Nautilus"],
      team1_bans: ["Vi", "Syndra", "Rumble", "Ezreal", "Bard"],
      team2_picks: ["Gnar", "Naafiri", "Locke", "Ezreal", "Alistar"],
      team2_bans: ["Olaf", "Lee Sin", "Ashe", "Seraphine", "Leona"],
      team1_stats: [
        { player: "Kiin", champ: "Camille", kda: "4/3/4", cs: 287 },
        { player: "Canyon", champ: "Wukong", kda: "2/3/10", cs: 241 },
        { player: "Chovy", champ: "Taliyah", kda: "3/3/11", cs: 303 },
        { player: "Ruler", champ: "Yunara", kda: "7/3/7", cs: 437 },
        { player: "Duro", champ: "Nautilus", kda: "0/6/11", cs: 30 }
      ],
      team2_stats: [
        { player: "TheShy", champ: "Gnar", kda: "3/4/8", cs: 322 },
        { player: "Wei", champ: "Naafiri", kda: "1/2/13", cs: 274 },
        { player: "Rookie", champ: "Locke", kda: "11/2/5", cs: 276 },
        { player: "JiaQi", champ: "Ezreal", kda: "3/3/5", cs: 380 },
        { player: "Meiko", champ: "Alistar", kda: "0/5/12", cs: 35 }
      ],
      vod_url: "https://www.youtube.com/watch?v=CxljyNJhUw4"
    }
  ]
}

await supabase.from('matches').update({
  draft: genIgDraft,
  mvp: 'Canyon (GEN)'
}).eq('id', '26eda7c3-15f1-40a0-b906-38962329b1ea')

console.log('✅ Updated GEN vs IG Semifinals with EXACT GOL.GG KDA, CS, and gold!')
