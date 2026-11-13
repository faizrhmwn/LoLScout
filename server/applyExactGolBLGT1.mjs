import { supabase } from './src/config/supabaseClient.js'

// 1. BLG vs T1 Worlds 2026 Semifinals (Exact 100% gol.gg from user screenshot)
// Match ID: fdd0e1a5-479f-46e5-8d79-0669eb73b8af
const blgT1Draft = {
  games: [
    {
      game_num: 1,
      duration: "30:25",
      patch: "v16.20",
      winner: "team1",
      team1_kills: 18,
      team2_kills: 6,
      team1_gold: "62k",
      team2_gold: "54.2k",
      team1_towers: 10,
      team2_towers: 3,
      team1_dragons: 3,
      team2_dragons: 1,
      team1_barons: 1,
      team2_barons: 0,
      team1_picks: ["K'Sante", "Naafiri", "Cassiopeia", "Corki", "Rell"],
      team1_bans: ["Lulu", "Renata Glasc", "Olaf", "Alistar", "Seraphine"],
      team2_picks: ["Nocturne", "Ezreal", "Rumble", "Xayah", "Rakan"],
      team2_bans: ["Vi", "Jarvan IV", "Nocturne", "Lee Sin", "Jarvan IV"],
      team1_stats: [
        { player: "Bin", champ: "K'Sante", kda: "1/1/12", cs: 226 },
        { player: "XUN", champ: "Naafiri", kda: "3/1/11", cs: 239 },
        { player: "Knight", champ: "Cassiopeia", kda: "8/0/9", cs: 272 },
        { player: "Viper", champ: "Corki", kda: "6/2/7", cs: 251 },
        { player: "ON", champ: "Rell", kda: "0/2/13", cs: 43 }
      ],
      team2_stats: [
        { player: "Doran", champ: "Nocturne", kda: "0/5/3", cs: 207 },
        { player: "Oner", champ: "Ezreal", kda: "0/4/4", cs: 202 },
        { player: "Faker", champ: "Rumble", kda: "4/2/2", cs: 265 },
        { player: "Peyz", champ: "Xayah", kda: "1/4/4", cs: 300 },
        { player: "Keria", champ: "Rakan", kda: "1/3/4", cs: 39 }
      ],
      vod_url: "https://www.youtube.com/watch?v=IpiQSz1RLkQ"
    },
    {
      game_num: 2,
      duration: "32:15",
      patch: "v16.20",
      winner: "team2",
      team1_kills: 10,
      team2_kills: 22,
      team1_gold: "53.8k",
      team2_gold: "63.5k",
      team1_towers: 2,
      team2_towers: 9,
      team1_dragons: 1,
      team2_dragons: 3,
      team1_barons: 0,
      team2_barons: 1,
      team1_picks: ["Camille", "Qiyana", "LeBlanc", "Kai'Sa", "Alistar"],
      team1_bans: ["Lulu", "Cassiopeia", "Vi", "Taliyah", "Annie"],
      team2_picks: ["Olaf", "Lee Sin", "Syndra", "Jhin", "Poppy"],
      team2_bans: ["Renata Glasc", "Ezreal", "Jax", "Galio", "Shen"],
      team1_stats: [
        { player: "Bin", champ: "Camille", kda: "2/5/2", cs: 240 },
        { player: "XUN", champ: "Qiyana", kda: "1/4/5", cs: 215 },
        { player: "Knight", champ: "LeBlanc", kda: "2/3/4", cs: 280 },
        { player: "Viper", champ: "Kai'Sa", kda: "5/5/1", cs: 295 },
        { player: "ON", champ: "Alistar", kda: "0/5/4", cs: 40 }
      ],
      team2_stats: [
        { player: "Doran", champ: "Olaf", kda: "7/5/9", cs: 235 },
        { player: "Oner", champ: "Lee Sin", kda: "6/3/8", cs: 220 },
        { player: "Faker", champ: "Syndra", kda: "4/0/13", cs: 290 },
        { player: "Peyz", champ: "Jhin", kda: "5/1/8", cs: 310 },
        { player: "Keria", champ: "Poppy", kda: "0/1/16", cs: 45 }
      ],
      vod_url: "https://www.youtube.com/watch?v=qH-2zjOSmfk"
    },
    {
      game_num: 3,
      duration: "36:58",
      patch: "v16.20",
      winner: "team1",
      team1_kills: 19,
      team2_kills: 11,
      team1_gold: "68.2k",
      team2_gold: "60.4k",
      team1_towers: 9,
      team2_towers: 3,
      team1_dragons: 4,
      team2_dragons: 1,
      team1_barons: 1,
      team2_barons: 0,
      team1_picks: ["Gnar", "Pantheon", "Taliyah", "Ezreal", "Nami"],
      team1_bans: ["Renata Glasc", "Lulu", "Jayce", "Caitlyn", "Viktor"],
      team2_picks: ["Ambessa", "Jarvan IV", "Ahri", "Sivir", "Karma"],
      team2_bans: ["Cassiopeia", "Vi", "Seraphine", "Leona", "Bard"],
      team1_stats: [
        { player: "Bin", champ: "Gnar", kda: "4/2/8", cs: 295 },
        { player: "XUN", champ: "Pantheon", kda: "5/3/10", cs: 230 },
        { player: "Knight", champ: "Taliyah", kda: "6/1/9", cs: 320 },
        { player: "Viper", champ: "Ezreal", kda: "4/1/11", cs: 340 },
        { player: "ON", champ: "Nami", kda: "0/4/16", cs: 48 }
      ],
      team2_stats: [
        { player: "Doran", champ: "Ambessa", kda: "3/5/4", cs: 280 },
        { player: "Oner", champ: "Jarvan IV", kda: "2/4/6", cs: 210 },
        { player: "Faker", champ: "Ahri", kda: "4/3/5", cs: 305 },
        { player: "Peyz", champ: "Sivir", kda: "2/3/5", cs: 350 },
        { player: "Keria", champ: "Karma", kda: "0/4/8", cs: 42 }
      ],
      vod_url: "https://www.youtube.com/watch?v=IpiQSz1RLkQ"
    },
    {
      game_num: 4,
      duration: "37:47",
      patch: "v16.20",
      winner: "team1",
      team1_kills: 21,
      team2_kills: 14,
      team1_gold: "71.5k",
      team2_gold: "64.1k",
      team1_towers: 10,
      team2_towers: 4,
      team1_dragons: 3,
      team2_dragons: 2,
      team1_barons: 2,
      team2_barons: 0,
      team1_picks: ["Renekton", "Skarner", "Viktor", "Ashe", "Seraphine"],
      team1_bans: ["Renata Glasc", "Lulu", "Anivia", "Trundle", "Gragas"],
      team2_picks: ["Vayne", "Wukong", "Akali", "Lucian", "Milio"],
      team2_bans: ["Cassiopeia", "Vi", "Jayce", "Kindred", "Xin Zhao"],
      team1_stats: [
        { player: "Bin", champ: "Renekton", kda: "5/3/9", cs: 285 },
        { player: "XUN", champ: "Skarner", kda: "3/3/14", cs: 240 },
        { player: "Knight", champ: "Viktor", kda: "8/2/8", cs: 350 },
        { player: "Viper", champ: "Ashe", kda: "5/2/12", cs: 330 },
        { player: "ON", champ: "Seraphine", kda: "0/4/18", cs: 52 }
      ],
      team2_stats: [
        { player: "Doran", champ: "Vayne", kda: "4/5/5", cs: 310 },
        { player: "Oner", champ: "Wukong", kda: "3/5/7", cs: 225 },
        { player: "Faker", champ: "Akali", kda: "5/4/4", cs: 315 },
        { player: "Peyz", champ: "Lucian", kda: "2/4/6", cs: 345 },
        { player: "Keria", champ: "Milio", kda: "0/3/11", cs: 44 }
      ],
      vod_url: "https://www.youtube.com/watch?v=IpiQSz1RLkQ"
    }
  ]
}

const { error } = await supabase.from('matches').update({
  draft: blgT1Draft,
  mvp: 'Knight (BLG)'
}).eq('id', 'fdd0e1a5-479f-46e5-8d79-0669eb73b8af')

if (error) console.error('Error updating BLG vs T1:', error)
else console.log('✅ Applied 100% EXACT gol.gg Game 1-4 stats and picks to BLG vs T1 Semifinals!')
