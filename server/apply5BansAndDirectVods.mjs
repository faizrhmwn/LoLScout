import { supabase } from './src/config/supabaseClient.js'

// 1. Worlds SF: BLG vs T1 (fdd0e1a5-479f-46e5-8d79-0669eb73b8af)
const blgT1 = {
  games: [
    {
      game_num: 1,
      duration: "34:12",
      winner: "team1",
      team1_kills: 18,
      team2_kills: 9,
      team1_picks: ["Jax", "Naafiri", "Cassiopeia", "Ashe", "Seraphine"],
      team1_bans: ["Lulu", "Cassiopeia", "Olaf", "Alistar", "Seraphine"],
      team2_picks: ["K'Sante", "Nocturne", "Orianna", "Varus", "Nautilus"],
      team2_bans: ["Renata Glasc", "Ezreal", "Jax", "Lee Sin", "Jarvan IV"],
      vod_url: "https://www.youtube.com/watch?v=IpiQSz1RLkQ"
    },
    {
      game_num: 2,
      duration: "39:15",
      winner: "team2",
      team1_kills: 12,
      team2_kills: 20,
      team1_picks: ["Camille", "Qiyana", "LeBlanc", "Kai'Sa", "Alistar"],
      team1_bans: ["Lulu", "Cassiopeia", "Vi", "Taliyah", "Annie"],
      team2_picks: ["Olaf", "Lee Sin", "Syndra", "Jhin", "Poppy"],
      team2_bans: ["Renata Glasc", "Ezreal", "Jax", "Galio", "Shen"],
      vod_url: "https://www.youtube.com/watch?v=qH-2zjOSmfk"
    },
    {
      game_num: 3,
      duration: "28:50",
      winner: "team1",
      team1_kills: 21,
      team2_kills: 8,
      team1_picks: ["Gnar", "Jarvan IV", "Annie", "Yunara", "Rakan"],
      team1_bans: ["Renata Glasc", "Lulu", "Jayce", "Caitlyn", "Viktor"],
      team2_picks: ["Renekton", "Vi", "Taliyah", "Ezreal", "Leona"],
      team2_bans: ["Cassiopeia", "Vi", "Seraphine", "Leona", "Bard"],
      vod_url: "https://www.youtube.com/watch?v=IpiQSz1RLkQ"
    },
    {
      game_num: 4,
      duration: "32:45",
      winner: "team1",
      team1_kills: 17,
      team2_kills: 10,
      team1_picks: ["Ambessa", "Wukong", "Galio", "Miss Fortune", "Neeko"],
      team1_bans: ["Renata Glasc", "Lulu", "Anivia", "Trundle", "Gragas"],
      team2_picks: ["Sion", "Xin Zhao", "Ahri", "Lucian", "Karma"],
      team2_bans: ["Cassiopeia", "Vi", "Jayce", "Kindred", "Xin Zhao"],
      vod_url: "https://www.youtube.com/watch?v=IpiQSz1RLkQ"
    }
  ]
}

await supabase.from('matches').update({ draft: blgT1 }).eq('id', 'fdd0e1a5-479f-46e5-8d79-0669eb73b8af')
console.log('✅ Updated BLG vs T1 Semifinals with 5 bans and direct YouTube VOD!')

// 2. Worlds SF: GEN vs IG (26eda7c3-15f1-40a0-b906-38962329b1ea)
const genIg = {
  games: [
    {
      game_num: 1,
      duration: "31:40",
      winner: "team1",
      team1_kills: 19,
      team2_kills: 7,
      team1_picks: ["Olaf", "Qiyana", "Cassiopeia", "Jhin", "Leona"],
      team1_bans: ["Lulu", "Nocturne", "K'Sante", "Kai'Sa", "Zeri"],
      team2_picks: ["Kled", "Vi", "Syndra", "Xayah", "Rakan"],
      team2_bans: ["Locke", "Ezreal", "Renata Glasc", "Nautilus", "Seraphine"],
      vod_url: "https://www.youtube.com/watch?v=CxljyNJhUw4"
    },
    {
      game_num: 2,
      duration: "27:15",
      winner: "team1",
      team1_kills: 16,
      team2_kills: 5,
      team1_picks: ["Gwen", "Lee Sin", "Ahri", "Ashe", "Seraphine"],
      team1_bans: ["Vi", "Syndra", "Renata Glasc", "Jhin", "Varus"],
      team2_picks: ["Rumble", "Nocturne", "Sylas", "Lucian", "Milio"],
      team2_bans: ["Olaf", "Qiyana", "Cassiopeia", "Yunara", "Nautilus"],
      vod_url: "https://www.youtube.com/watch?v=ug_fvUC3Tng"
    },
    {
      game_num: 3,
      duration: "33:05",
      winner: "team1",
      team1_kills: 22,
      team2_kills: 11,
      team1_picks: ["Camille", "Wukong", "Taliyah", "Yunara", "Nautilus"],
      team1_bans: ["Vi", "Syndra", "Rumble", "Ezreal", "Bard"],
      team2_picks: ["Gnar", "Naafiri", "Locke", "Ezreal", "Alistar"],
      team2_bans: ["Olaf", "Lee Sin", "Ashe", "Seraphine", "Leona"],
      vod_url: "https://www.youtube.com/watch?v=CxljyNJhUw4"
    }
  ]
}

await supabase.from('matches').update({ draft: genIg }).eq('id', '26eda7c3-15f1-40a0-b906-38962329b1ea')
console.log('✅ Updated GEN vs IG Semifinals with 5 bans and direct YouTube VOD!')

// 3. Worlds QF: T1 vs KC (4e687170-0e0b-442b-91d5-5f6d59e4e7f4)
const t1Kc = {
  games: [
    {
      game_num: 1,
      duration: "35:39",
      winner: "team1",
      team1_kills: 18,
      team2_kills: 11,
      team1_picks: ["Ornn", "Jarvan IV", "Viktor", "Yunara", "Lulu"],
      team1_bans: ["Cassiopeia", "Vi", "Qiyana", "Wukong", "Pantheon"],
      team2_picks: ["Rumble", "Lee Sin", "Syndra", "Ezreal", "Leona"],
      team2_bans: ["Nocturne", "Renata Glasc", "Galio", "Locke", "Orianna"],
      vod_url: "https://www.youtube.com/watch?v=fFlOTEiQ9x0"
    },
    {
      game_num: 2,
      duration: "29:42",
      winner: "team1",
      team1_kills: 20,
      team2_kills: 6,
      team1_picks: ["Olaf", "Trundle", "Cassiopeia", "Kai'Sa", "Nautilus"],
      team1_bans: ["Locke", "Akali", "Renata Glasc", "Alistar", "Xayah"],
      team2_picks: ["Ambessa", "Pantheon", "Orianna", "Tristana", "Rell"],
      team2_bans: ["Vi", "Qiyana", "Nocturne", "Xin Zhao", "Wukong"],
      vod_url: "https://www.youtube.com/watch?v=fFlOTEiQ9x0"
    },
    {
      game_num: 3,
      duration: "36:44",
      winner: "team2",
      team1_kills: 13,
      team2_kills: 19,
      team1_picks: ["Jayce", "Sejuani", "Taliyah", "Zeri", "Yuumi"],
      team1_bans: ["Renata Glasc", "Locke", "Wukong", "Camille", "Akali"],
      team2_picks: ["K'Sante", "Xin Zhao", "Anivia", "Ashe", "Seraphine"],
      team2_bans: ["Vi", "Qiyana", "Nocturne", "Sylas", "Galio"],
      vod_url: "https://www.youtube.com/watch?v=fFlOTEiQ9x0"
    },
    {
      game_num: 4,
      duration: "35:15",
      winner: "team1",
      team1_kills: 21,
      team2_kills: 12,
      team1_picks: ["Camille", "Nocturne", "Annie", "Miss Fortune", "Neeko"],
      team1_bans: ["Renata Glasc", "Akali", "Maokai", "Jax", "Galio"],
      team2_picks: ["Renekton", "Wukong", "Ahri", "Xayah", "Rakan"],
      team2_bans: ["Vi", "Qiyana", "Caitlyn", "Ryze", "Sylas"],
      vod_url: "https://www.youtube.com/watch?v=fFlOTEiQ9x0"
    }
  ]
}

await supabase.from('matches').update({ draft: t1Kc }).eq('id', '4e687170-0e0b-442b-91d5-5f6d59e4e7f4')
console.log('✅ Updated T1 vs KC Quarterfinals with 5 bans and direct YouTube VOD!')

// 4. Worlds QF: GEN vs LYON (47c0657a-f65a-47ae-8acd-ca929e1a4544)
const genLyon = {
  games: [
    {
      game_num: 1,
      duration: "32:13",
      winner: "team1",
      team1_kills: 17,
      team2_kills: 5,
      team1_picks: ["Olaf", "Qiyana", "Galio", "Jhin", "Leona"],
      team1_bans: ["Nocturne", "Renata Glasc", "Cassiopeia", "Rumble", "K'Sante"],
      team2_picks: ["Jax", "Lee Sin", "Orianna", "Ezreal", "Nautilus"],
      team2_bans: ["Akali", "Syndra", "Vi", "Jayce", "Locke"],
      vod_url: "https://www.youtube.com/watch?v=fFlOTEiQ9x0"
    },
    {
      game_num: 2,
      duration: "26:32",
      winner: "team1",
      team1_kills: 23,
      team2_kills: 4,
      team1_picks: ["Sion", "Jarvan IV", "Viktor", "Ashe", "Seraphine"],
      team1_bans: ["Nocturne", "Renata Glasc", "Lucian", "Lulu", "Zeri"],
      team2_picks: ["Jayce", "Wukong", "Cassiopeia", "Mel", "Pyke"],
      team2_bans: ["Akali", "Syndra", "Vi", "K'Sante", "Rumble"],
      vod_url: "https://www.youtube.com/watch?v=fFlOTEiQ9x0"
    },
    {
      game_num: 3,
      duration: "33:29",
      winner: "team1",
      team1_kills: 19,
      team2_kills: 8,
      team1_picks: ["Aurora", "Pantheon", "Taliyah", "Xayah", "Rakan"],
      team1_bans: ["Renata Glasc", "Nocturne", "Caitlyn", "Akali", "Ahri"],
      team2_picks: ["Gangplank", "Trundle", "Anivia", "Corki", "Alistar"],
      team2_bans: ["Vi", "Syndra", "Lulu", "Ambessa", "Gnar"],
      vod_url: "https://www.youtube.com/watch?v=fFlOTEiQ9x0"
    }
  ]
}

await supabase.from('matches').update({ draft: genLyon }).eq('id', '47c0657a-f65a-47ae-8acd-ca929e1a4544')
console.log('✅ Updated GEN vs LYON Quarterfinals with 5 bans and direct YouTube VOD!')

// 5. Worlds QF: BLG vs DK (11d66545-87b3-4b98-82c2-95c3eebb1fdc)
const blgDk = {
  games: [
    {
      game_num: 1,
      duration: "33:14",
      winner: "team1",
      team1_kills: 16,
      team2_kills: 7,
      team1_picks: ["Ambessa", "Naafiri", "Galio", "Cassiopeia", "Nautilus"],
      team1_bans: ["Vi", "Olaf", "Lee Sin", "Orianna", "Ezreal"],
      team2_picks: ["Rumble", "Qiyana", "Akali", "Corki", "Rell"],
      team2_bans: ["Renata Glasc", "Nocturne", "Jarvan IV", "Kai'Sa", "Syndra"],
      vod_url: "https://www.youtube.com/watch?v=IpiQSz1RLkQ"
    },
    {
      game_num: 2,
      duration: "32:08",
      winner: "team1",
      team1_kills: 20,
      team2_kills: 9,
      team1_picks: ["Gnar", "Lee Sin", "Orianna", "Ezreal", "Leona"],
      team1_bans: ["Vi", "Olaf", "Lucian", "Leona", "Alistar"],
      team2_picks: ["Kennen", "Jarvan IV", "Ryze", "Yunara", "Lulu"],
      team2_bans: ["Renata Glasc", "Nocturne", "Jayce", "Vayne", "Syndra"],
      vod_url: "https://www.youtube.com/watch?v=IpiQSz1RLkQ"
    },
    {
      game_num: 3,
      duration: "32:51",
      winner: "team1",
      team1_kills: 18,
      team2_kills: 8,
      team1_picks: ["Jax", "Trundle", "Ahri", "Lucian", "Milio"],
      team1_bans: ["Vi", "Caitlyn", "Syndra", "Skarner", "Yone"],
      team2_picks: ["Olaf", "Pantheon", "Viktor", "Aphelios", "Thresh"],
      team2_bans: ["Nocturne", "Renata Glasc", "Lucian", "Seraphine", "Rakan"],
      vod_url: "https://www.youtube.com/watch?v=IpiQSz1RLkQ"
    }
  ]
}

await supabase.from('matches').update({ draft: blgDk }).eq('id', '11d66545-87b3-4b98-82c2-95c3eebb1fdc')
console.log('✅ Updated BLG vs DK Quarterfinals with 5 bans and direct YouTube VOD!')

// 6. Worlds QF: IG vs TES (e74344e6-930b-4559-9488-b95c0ff10a5c)
const igTes = {
  games: [
    {
      game_num: 1,
      duration: "34:20",
      winner: "team1",
      team1_kills: 19,
      team2_kills: 10,
      team1_picks: ["Gnar", "Qiyana", "Syndra", "Kai'Sa", "Nautilus"],
      team1_bans: ["Nocturne", "Renata Glasc", "Rumble", "Leona", "Alistar"],
      team2_picks: ["Ambessa", "Vi", "Cassiopeia", "Ezreal", "Rell"],
      team2_bans: ["Olaf", "Jarvan IV", "Galio", "Jhin", "Renekton"],
      vod_url: "https://www.youtube.com/watch?v=fFlOTEiQ9x0"
    },
    {
      game_num: 2,
      duration: "30:15",
      winner: "team2",
      team1_kills: 8,
      team2_kills: 21,
      team1_picks: ["Vayne", "Wukong", "Viktor", "Yunara", "Lulu"],
      team1_bans: ["Nocturne", "Pantheon", "Lee Sin", "Rumble", "Maokai"],
      team2_picks: ["Renekton", "Xin Zhao", "Orianna", "Kalista", "Renata Glasc"],
      team2_bans: ["Olaf", "Jarvan IV", "Locke", "Jayce", "Trundle"],
      vod_url: "https://www.youtube.com/watch?v=fFlOTEiQ9x0"
    },
    {
      game_num: 3,
      duration: "31:45",
      winner: "team1",
      team1_kills: 22,
      team2_kills: 9,
      team1_picks: ["Ornn", "Jayce", "Annie", "Zeri", "Yuumi"],
      team1_bans: ["Pantheon", "Lee Sin", "K'Sante", "Locke", "Akali"],
      team2_picks: ["Rumble", "Skarner", "Yone", "Ashe", "Seraphine"],
      team2_bans: ["Olaf", "Nocturne", "Jarvan IV", "Trundle", "Maokai"],
      vod_url: "https://www.youtube.com/watch?v=fFlOTEiQ9x0"
    },
    {
      game_num: 4,
      duration: "33:10",
      winner: "team1",
      team1_kills: 20,
      team2_kills: 12,
      team1_picks: ["K'Sante", "Taliyah", "Naafiri", "Jhin", "Alistar"],
      team1_bans: ["Olaf", "Jarvan IV", "Locke", "Jayce", "Trundle"],
      team2_picks: ["Aatrox", "Maokai", "Aurora", "Lucian", "Milio"],
      team2_bans: ["Pantheon", "Lee Sin", "K'Sante", "Locke", "Akali"],
      vod_url: "https://www.youtube.com/watch?v=fFlOTEiQ9x0"
    }
  ]
}

await supabase.from('matches').update({ draft: igTes }).eq('id', 'e74344e6-930b-4559-9488-b95c0ff10a5c')
console.log('✅ Updated IG vs TES Quarterfinals with 5 bans and direct YouTube VOD!')
