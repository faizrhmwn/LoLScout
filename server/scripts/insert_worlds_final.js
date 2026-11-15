import { supabase } from './src/config/supabaseClient.js';

const worldsFinalMatch = {
  league: 'WORLDS',
  team1_id: '12530003-9489-4d52-81dc-23bccbbfec75', // Bilibili Gaming
  team2_id: '74605734-5524-4518-9a60-5d2f8d155a4f', // Gen.G Esports
  team1_score: 3,
  team2_score: 1,
  status: 'finished',
  match_date: '2026-11-14T23:18:00+00:00',
  format: 'Bo5',
  vod_url: 'https://www.youtube.com/watch?v=c5ZgeZ0QdDI',
  mvp: 'Knight',
  draft: {
    tournament: 'Worlds 2026 Grand Finals',
    games: [
      {
        game_num: 1,
        winner: 'team2', // Gen.G
        duration: '38:59',
        patch: 'v26.20',
        vod_url: 'https://youtu.be/c5ZgeZ0QdDI',
        team1_gold: '66.0k',
        team2_gold: '80.0k',
        team1_kills: 4,
        team2_kills: 19,
        team1_towers: 3,
        team2_towers: 9,
        team1_dragons: 5,
        team2_dragons: 1,
        team1_barons: 0,
        team2_barons: 3,
        team1_picks: ["K'Sante", 'Jarvan IV', 'Locke', 'Kalista', 'Renata Glasc'],
        team2_picks: ['Olaf', 'Lee Sin', 'Syndra', 'Corki', 'Nami'],
        team1_bans: ['Qiyana', 'Cassiopeia', 'Lulu', 'Ezreal', 'Seraphine'],
        team2_bans: ['Nocturne', 'Orianna', 'Vi', 'Jax', 'Camille'],
        team1_stats: [
          { player: 'Bin', champ: "K'Sante", kda: '0/4/1', cs: 309 },
          { player: 'Xun', champ: 'Jarvan IV', kda: '1/4/3', cs: 266 },
          { player: 'Knight', champ: 'Locke', kda: '2/2/1', cs: 374 },
          { player: 'Viper', champ: 'Kalista', kda: '1/5/3', cs: 408 },
          { player: 'ON', champ: 'Renata Glasc', kda: '0/4/4', cs: 41 }
        ],
        team2_stats: [
          { player: 'Kiin', champ: 'Olaf', kda: '2/1/13', cs: 295 },
          { player: 'Canyon', champ: 'Lee Sin', kda: '3/2/13', cs: 290 },
          { player: 'Chovy', champ: 'Syndra', kda: '6/1/11', cs: 285 },
          { player: 'Ruler', champ: 'Corki', kda: '7/0/8', cs: 455 },
          { player: 'Duro', champ: 'Nami', kda: '1/0/16', cs: 27 }
        ]
      },
      {
        game_num: 2,
        winner: 'team1', // BLG
        duration: '53:16',
        patch: 'v26.20',
        vod_url: 'https://youtu.be/c5ZgeZ0QdDI',
        team1_gold: '99.5k',
        team2_gold: '94.2k',
        team1_kills: 19,
        team2_kills: 14,
        team1_towers: 11,
        team2_towers: 4,
        team1_dragons: 4,
        team2_dragons: 4,
        team1_barons: 3,
        team2_barons: 1,
        team1_picks: ['Gnar', 'Naafiri', 'Cassiopeia', 'Ziggs', 'Camille'],
        team2_picks: ['Vayne', "Cho'Gath", 'Orianna', 'Ezreal', 'Karma'],
        team1_bans: ['Jayce', 'Vi', 'Galio', 'Renekton', 'Viktor'],
        team2_bans: ['Nocturne', 'Qiyana', 'Nautilus', 'Lulu', 'Akali'],
        team1_stats: [
          { player: 'Bin', champ: 'Gnar', kda: '3/2/6', cs: 360 },
          { player: 'Xun', champ: 'Naafiri', kda: '8/1/9', cs: 385 },
          { player: 'Knight', champ: 'Cassiopeia', kda: '4/1/12', cs: 408 },
          { player: 'Viper', champ: 'Ziggs', kda: '3/2/13', cs: 459 },
          { player: 'ON', champ: 'Camille', kda: '1/8/10', cs: 78 }
        ],
        team2_stats: [
          { player: 'Kiin', champ: 'Vayne', kda: '3/4/3', cs: 453 },
          { player: 'Canyon', champ: "Cho'Gath", kda: '2/5/3', cs: 295 },
          { player: 'Chovy', champ: 'Orianna', kda: '2/6/5', cs: 408 },
          { player: 'Ruler', champ: 'Ezreal', kda: '6/2/5', cs: 551 },
          { player: 'Duro', champ: 'Karma', kda: '1/2/11', cs: 53 }
        ]
      },
      {
        game_num: 3,
        winner: 'team1', // BLG
        duration: '37:40',
        patch: 'v26.20',
        vod_url: 'https://youtu.be/c5ZgeZ0QdDI',
        team1_gold: '74.0k',
        team2_gold: '65.7k',
        team1_kills: 20,
        team2_kills: 8,
        team1_towers: 10,
        team2_towers: 4,
        team1_dragons: 4,
        team2_dragons: 2,
        team1_barons: 1,
        team2_barons: 0,
        team1_picks: ['Jax', 'Vi', 'Viktor', 'Taliyah', 'Alistar'],
        team2_picks: ['Ambessa', 'Wukong', 'Annie', 'Jhin', 'Rakan'],
        team1_bans: ['Qiyana', 'Jayce', 'Lulu', 'Xayah', 'Poppy'],
        team2_bans: ['Nautilus', 'Renekton', 'Seraphine', "Kai'Sa", 'Sivir'],
        team1_stats: [
          { player: 'Bin', champ: 'Jax', kda: '3/1/10', cs: 291 },
          { player: 'Xun', champ: 'Vi', kda: '4/3/12', cs: 306 },
          { player: 'Knight', champ: 'Viktor', kda: '5/2/11', cs: 304 },
          { player: 'Viper', champ: 'Taliyah', kda: '6/1/11', cs: 284 },
          { player: 'ON', champ: 'Alistar', kda: '2/1/16', cs: 47 }
        ],
        team2_stats: [
          { player: 'Kiin', champ: 'Ambessa', kda: '0/3/2', cs: 343 },
          { player: 'Canyon', champ: 'Wukong', kda: '0/4/5', cs: 281 },
          { player: 'Chovy', champ: 'Annie', kda: '4/6/1', cs: 262 },
          { player: 'Ruler', champ: 'Jhin', kda: '4/3/3', cs: 362 },
          { player: 'Duro', champ: 'Rakan', kda: '0/4/5', cs: 41 }
        ]
      },
      {
        game_num: 4,
        winner: 'team1', // BLG
        duration: '42:58',
        patch: 'v26.20',
        vod_url: 'https://youtu.be/c5ZgeZ0QdDI',
        team1_gold: '89.7k',
        team2_gold: '79.8k',
        team1_kills: 21,
        team2_kills: 11,
        team1_towers: 10,
        team2_towers: 5,
        team1_dragons: 3,
        team2_dragons: 4,
        team1_barons: 2,
        team2_barons: 1,
        team1_picks: ['Gwen', 'Nocturne', 'Twisted Fate', 'Yunara', 'Neeko'],
        team2_picks: ['Aurora', 'Pantheon', 'Akali', 'Xayah', 'Lulu'],
        team1_bans: ['Qiyana', 'Jayce', 'Seraphine', 'Sylas', 'Rumble'],
        team2_bans: ['Nautilus', 'Skarner', 'Kindred', 'Renekton', 'Galio'],
        team1_stats: [
          { player: 'Bin', champ: 'Gwen', kda: '8/2/9', cs: 337 },
          { player: 'Xun', champ: 'Nocturne', kda: '3/3/11', cs: 276 },
          { player: 'Knight', champ: 'Twisted Fate', kda: '2/1/17', cs: 364 },
          { player: 'Viper', champ: 'Yunara', kda: '6/4/9', cs: 421 },
          { player: 'ON', champ: 'Neeko', kda: '2/1/13', cs: 66 }
        ],
        team2_stats: [
          { player: 'Kiin', champ: 'Aurora', kda: '0/5/6', cs: 325 },
          { player: 'Canyon', champ: 'Pantheon', kda: '0/5/5', cs: 289 },
          { player: 'Chovy', champ: 'Akali', kda: '5/4/1', cs: 385 },
          { player: 'Ruler', champ: 'Xayah', kda: '6/3/4', cs: 488 },
          { player: 'Duro', champ: 'Lulu', kda: '0/4/9', cs: 29 }
        ]
      }
    ]
  }
};

async function insertMatch() {
  // Check if already inserted
  const { data: existing } = await supabase
    .from('matches')
    .select('id, match_date, team1_id, team2_id')
    .eq('team1_id', worldsFinalMatch.team1_id)
    .eq('team2_id', worldsFinalMatch.team2_id)
    .eq('match_date', worldsFinalMatch.match_date);

  if (existing && existing.length > 0) {
    console.log('Match already exists with id:', existing[0].id);
    const { data: updated, error } = await supabase
      .from('matches')
      .update(worldsFinalMatch)
      .eq('id', existing[0].id)
      .select();
    if (error) {
      console.error('Update error:', error);
    } else {
      console.log('Successfully updated existing Worlds Final match:', updated[0]?.id);
    }
    return;
  }

  const { data, error } = await supabase
    .from('matches')
    .insert([worldsFinalMatch])
    .select();

  if (error) {
    console.error('Insert error:', error);
  } else {
    console.log('Successfully inserted Worlds 2026 Grand Final match! ID:', data[0]?.id);
  }
}

insertMatch();
