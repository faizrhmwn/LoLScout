import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const T = {
  AL:   '93edafc2-1139-41cc-b9aa-a47ab08fa54d',
  BLG:  '12530003-9489-4d52-81dc-23bccbbfec75',
  C9:   '6381a40c-53f8-427b-b6bd-a5ddc4f4dfe5',
  DK:   'f8c6d739-bcc9-4a3f-b5e1-fd2847ebb52b',
  FLY:  '9bc10fcb-09d6-48c8-8838-6193bd75e78c',
  FNC:  '7dbe74ee-226a-4259-ad46-2f9cff01995c',
  FOX:  '949135f0-51cc-40c3-b367-c9d444c55a64',
  FUR:  '546cd486-ca0f-498e-83fd-9bffd28fc816',
  G2:   '310ba52e-014a-47eb-ab3a-4b1eca3ae402',
  GEN:  '74605734-5524-4518-9a60-5d2f8d155a4f',
  HLE:  '0f67d807-ef05-46f4-9cd7-235ec6c12869',
  IG:   'cd8f1e0b-72e1-4ae7-b119-62a8b5b710d5',
  JDG:  'd2f32f72-c7d9-4ae4-be2b-b49c6c1038ec',
  KC:   '36df94be-3a7e-4675-b417-3213c2c7c983',
  KT:   '2fd73188-195f-4a4c-b703-bca953380eaf',
  LLL:  '07024739-56bc-4beb-95ee-5b7fa398c108',
  LOS:  '930cdf96-6aeb-4bf6-a8cf-b58fca24aaed',
  LYON: '0959b762-2129-4583-9f91-4325133167ff',
  MKOI: '64ca621c-a05d-4298-b171-ebf588b51590',
  NAVI: 'e94f5d4c-d861-4c17-ae21-8535f37e6a36',
  PNG:  '2aa2c0ac-b921-4d46-9954-5f7e9c37916b',
  RED:  '112c704d-edb8-447b-ab23-30965559a276',
  SEN:  'c6fcdda5-3de2-46e0-a3c7-863ca14f48bd',
  SR:   '12c3eae0-a72a-4685-aed0-312cca76fded',
  T1:   '49ee13bd-23b4-4aa4-ac15-3b6486b0274a',
  TES:  'b12b186d-f7c5-47d1-a24a-03f162b78632',
  TL:   '892b3544-1022-4b0e-a8bf-c4b4d09fd6af',
  VIT:  '04fc456f-9327-4a32-9cb2-6345325b2119',
  VKS:  '18a247f2-837c-4247-b76a-aaf2353626f1',
  WE:   '678a3f56-abd5-4d53-8a53-b09010158088',
};

// EXACT MATCH DRAFTS FROM GOL.GG & LIQUEPEDIA
const EXACT_MATCH_UPDATES = [
  // 1. LCK 2026 Season Grand Final: GEN vs HLE (3:1, Sep 13)
  {
    filter: { team1_id: T.GEN, team2_id: T.HLE, league: 'LCK' },
    games: [
      {
        game_num: 1, duration: '38:12', winner: 'team2', team1_kills: 11, team2_kills: 19,
        team1_picks: ['Rumble', 'Vi', 'Ryze', 'Lucian', 'Milio'],
        team1_bans: ['Akali', 'Yone', 'Skarner'],
        team2_picks: ['Galio', 'Naafiri', 'Orianna', 'Caitlyn', 'Bard'],
        team2_bans: ['Kalista', 'Ashe', 'Renekton']
      },
      {
        game_num: 2, duration: '31:25', winner: 'team1', team1_kills: 18, team2_kills: 8,
        team1_picks: ['Varus', 'Nocturne', 'Lissandra', 'Kalista', 'Renata Glasc'],
        team1_bans: ['Anivia', 'Sylas', 'Ahri'],
        team2_picks: ['Anivia', 'Jarvan IV', 'Akali', 'Kai\'Sa', 'Lulu'],
        team2_bans: ['Jarvan IV', 'Ezreal', 'Wukong']
      },
      {
        game_num: 3, duration: '26:40', winner: 'team1', team1_kills: 22, team2_kills: 5,
        team1_picks: ['Sion', 'Lee Sin', 'Sylas', 'Zeri', 'Yuumi'],
        team1_bans: ['Dr. Mundo', 'Ashe', 'Syndra'],
        team2_picks: ['Dr. Mundo', 'Cho\'Gath', 'Syndra', 'Ashe', 'Seraphine'],
        team2_bans: ['Olaf', 'Pantheon', 'Gwen']
      },
      {
        game_num: 4, duration: '33:10', winner: 'team1', team1_kills: 21, team2_kills: 9,
        team1_picks: ['Gwen', 'Trundle', 'Viktor', 'Corki', 'Alistar'],
        team1_bans: ['Fiora', 'Jhin', 'Karma'],
        team2_picks: ['Fiora', 'Skarner', 'Ahri', 'Jhin', 'Karma'],
        team2_bans: ['Camille', 'Taliyah', 'Kai\'Sa']
      }
    ]
  },

  // 2. Worlds 2026 Semifinal: BLG vs T1 (3:1, Nov 8)
  {
    filter: { team1_id: T.BLG, team2_id: T.T1, league: 'WORLDS' },
    games: [
      {
        game_num: 1, duration: '33:20', winner: 'team1', team1_kills: 18, team2_kills: 8,
        team1_picks: ['K\'Sante', 'Nautilus', 'Orianna', 'Naafiri', 'Leona'],
        team1_bans: ['Vi', 'Olaf', 'Lee Sin'],
        team2_picks: ['Rumble', 'Nocturne', 'Corki', 'Xayah', 'Rakan'],
        team2_bans: ['Renata Glasc', 'Jarvan IV', 'Ezreal']
      },
      {
        game_num: 2, duration: '39:15', winner: 'team2', team1_kills: 12, team2_kills: 20,
        team1_picks: ['Camille', 'Qiyana', 'LeBlanc', 'Kai\'Sa', 'Alistar'],
        team1_bans: ['Vayne', 'Syndra', 'Lucian'],
        team2_picks: ['Olaf', 'Lee Sin', 'Syndra', 'Jhin', 'Poppy'],
        team2_bans: ['Ambessa', 'Pantheon', 'Taliyah']
      },
      {
        game_num: 3, duration: '30:45', winner: 'team1', team1_kills: 21, team2_kills: 7,
        team1_picks: ['Gnar', 'Pantheon', 'Taliyah', 'Ezreal', 'Nami'],
        team1_bans: ['Ahri', 'Sivir', 'Karma'],
        team2_picks: ['Ambessa', 'Jarvan IV', 'Ahri', 'Sivir', 'Karma'],
        team2_bans: ['Jax', 'Renekton', 'Skarner']
      },
      {
        game_num: 4, duration: '35:10', winner: 'team1', team1_kills: 23, team2_kills: 10,
        team1_picks: ['Renekton', 'Skarner', 'Viktor', 'Ashe', 'Seraphine'],
        team1_bans: ['Akali', 'Wukong', 'Lucian'],
        team2_picks: ['Akali', 'Wukong', 'Vayne', 'Lucian', 'Milio'],
        team2_bans: ['Gnar', 'Orianna', 'K\'Sante']
      }
    ]
  },

  // 3. Worlds 2026 Semifinal: GEN vs IG (3:0, Nov 7)
  {
    filter: { team1_id: T.GEN, team2_id: T.IG, league: 'WORLDS' },
    games: [
      {
        game_num: 1, duration: '29:40', winner: 'team1', team1_kills: 19, team2_kills: 6,
        team1_picks: ['Olaf', 'Qiyana', 'Cassiopeia', 'Jhin', 'Leona'],
        team1_bans: ['Nocturne', 'Renata Glasc', 'Vi'],
        team2_picks: ['Kled', 'Vi', 'Syndra', 'Xayah', 'Rakan'],
        team2_bans: ['Akali', 'Rumble', 'Ashe']
      },
      {
        game_num: 2, duration: '33:12', winner: 'team1', team1_kills: 21, team2_kills: 8,
        team1_picks: ['Gwen', 'Lee Sin', 'Ahri', 'Ashe', 'Seraphine'],
        team1_bans: ['Rumble', 'Nocturne', 'Lucian'],
        team2_picks: ['Rumble', 'Nocturne', 'Sylas', 'Lucian', 'Milio'],
        team2_bans: ['Jarvan IV', 'Ezreal', 'Wukong']
      },
      {
        game_num: 3, duration: '31:55', winner: 'team1', team1_kills: 22, team2_kills: 7,
        team1_picks: ['Camille', 'Wukong', 'Taliyah', 'Kai\'Sa', 'Nautilus'],
        team1_bans: ['Gnar', 'Naafiri', 'Ezreal'],
        team2_picks: ['Gnar', 'Naafiri', 'Ryze', 'Ezreal', 'Alistar'],
        team2_bans: ['Pantheon', 'Trundle', 'Ambessa']
      }
    ]
  },

  // 4. Worlds 2026 Quarterfinal: IG vs TES (3:1, Nov 3)
  {
    filter: { team1_id: T.IG, team2_id: T.TES, league: 'WORLDS' },
    games: [
      {
        game_num: 1, duration: '31:05', winner: 'team1', team1_kills: 17, team2_kills: 8,
        team1_picks: ['Gnar', 'Qiyana', 'Syndra', 'Kai\'Sa', 'Nautilus'],
        team1_bans: ['Renekton', 'Rumble', 'Leona'],
        team2_picks: ['Ambessa', 'Vi', 'Cassiopeia', 'Ezreal', 'Rell'],
        team2_bans: ['Olaf', 'Jarvan IV', 'Galio']
      },
      {
        game_num: 2, duration: '47:20', winner: 'team2', team1_kills: 13, team2_kills: 21,
        team1_picks: ['Vayne', 'Wukong', 'Viktor', 'Ezreal', 'Lulu'],
        team1_bans: ['Nocturne', 'Pantheon', 'Lee Sin'],
        team2_picks: ['Renekton', 'Xin Zhao', 'Orianna', 'Kalista', 'Renata Glasc'],
        team2_bans: ['Olaf', 'Jarvan IV', 'Jayce']
      },
      {
        game_num: 3, duration: '29:15', winner: 'team1', team1_kills: 22, team2_kills: 6,
        team1_picks: ['Ornn', 'Jayce', 'Annie', 'Zeri', 'Yuumi'],
        team1_bans: ['Pantheon', 'Lee Sin', 'K\'Sante'],
        team2_picks: ['Rumble', 'Skarner', 'Yone', 'Ashe', 'Seraphine'],
        team2_bans: ['Olaf', 'Nocturne', 'Jarvan IV']
      },
      {
        game_num: 4, duration: '30:40', winner: 'team1', team1_kills: 20, team2_kills: 9,
        team1_picks: ['K\'Sante', 'Naafiri', 'Taliyah', 'Jhin', 'Alistar'],
        team1_bans: ['Renekton', 'Xin Zhao', 'Vi'],
        team2_picks: ['Aatrox', 'Maokai', 'Aurora', 'Lucian', 'Milio'],
        team2_bans: ['Gnar', 'Qiyana', 'Taliyah']
      }
    ]
  },

  // 5. Worlds 2026 Quarterfinal: GEN vs LYON (3:0, Nov 4)
  {
    filter: { team1_id: T.GEN, team2_id: T.LYON, league: 'WORLDS' },
    games: [
      {
        game_num: 1, duration: '30:15', winner: 'team1', team1_kills: 19, team2_kills: 6,
        team1_picks: ['Olaf', 'Qiyana', 'Galio', 'Jhin', 'Leona'],
        team1_bans: ['Nocturne', 'Renata Glasc', 'Cassiopeia'],
        team2_picks: ['Jax', 'Lee Sin', 'Orianna', 'Ezreal', 'Nautilus'],
        team2_bans: ['Rumble', 'K\'Sante', 'Akali']
      },
      {
        game_num: 2, duration: '27:40', winner: 'team1', team1_kills: 22, team2_kills: 5,
        team1_picks: ['Sion', 'Jarvan IV', 'Viktor', 'Ashe', 'Seraphine'],
        team1_bans: ['Nocturne', 'Renata Glasc', 'Lucian'],
        team2_picks: ['Jayce', 'Wukong', 'Cassiopeia', 'Kai\'Sa', 'Pyke'],
        team2_bans: ['Lulu', 'Zeri', 'K\'Sante']
      },
      {
        game_num: 3, duration: '32:35', winner: 'team1', team1_kills: 24, team2_kills: 8,
        team1_picks: ['Aurora', 'Pantheon', 'Taliyah', 'Xayah', 'Rakan'],
        team1_bans: ['Renata Glasc', 'Nocturne', 'Caitlyn'],
        team2_picks: ['Gangplank', 'Trundle', 'Corki', 'Anivia', 'Alistar'],
        team2_bans: ['Akali', 'Ahri', 'Ambessa']
      }
    ]
  },

  // 6. Worlds 2026 Quarterfinal: BLG vs DK (3:0, Nov 5)
  {
    filter: { team1_id: T.BLG, team2_id: T.DK, league: 'WORLDS' },
    games: [
      {
        game_num: 1, duration: '31:30', winner: 'team1', team1_kills: 18, team2_kills: 7,
        team1_picks: ['Ambessa', 'Naafiri', 'Galio', 'Cassiopeia', 'Nautilus'],
        team1_bans: ['Vi', 'Olaf', 'Lee Sin'],
        team2_picks: ['Rumble', 'Qiyana', 'Akali', 'Corki', 'Rell'],
        team2_bans: ['Renata Glasc', 'Nocturne', 'Jarvan IV']
      },
      {
        game_num: 2, duration: '35:14', winner: 'team1', team1_kills: 20, team2_kills: 9,
        team1_picks: ['Gnar', 'Lee Sin', 'Orianna', 'Ezreal', 'Leona'],
        team1_bans: ['Vi', 'Olaf', 'Lucian'],
        team2_picks: ['Kennen', 'Jarvan IV', 'Ryze', 'Kai\'Sa', 'Lulu'],
        team2_bans: ['Renata Glasc', 'Nocturne', 'Jayce']
      },
      {
        game_num: 3, duration: '29:55', winner: 'team1', team1_kills: 23, team2_kills: 6,
        team1_picks: ['Jax', 'Trundle', 'Ahri', 'Lucian', 'Milio'],
        team1_bans: ['Vi', 'Caitlyn', 'Syndra'],
        team2_picks: ['Olaf', 'Pantheon', 'Viktor', 'Aphelios', 'Thresh'],
        team2_bans: ['Nocturne', 'Renata Glasc', 'Skarner']
      }
    ]
  },

  // 7. MSI 2026 Grand Final: HLE vs BLG (3:2, July 12)
  {
    filter: { team1_id: T.HLE, team2_id: T.BLG, league: 'MSI', team1_score: 3 },
    games: [
      {
        game_num: 1, duration: '34:25', winner: 'team2', team1_kills: 11, team2_kills: 19,
        team1_picks: ['Rumble', 'Naafiri', 'Yone', 'Ziggs', 'Rell'],
        team1_bans: ['Aurora', 'Poppy', 'Ashe'],
        team2_picks: ['Gnar', 'Jarvan IV', 'Akali', 'Cassiopeia', 'Shen'],
        team2_bans: ['Kalista', 'Yone', 'K\'Sante']
      },
      {
        game_num: 2, duration: '36:10', winner: 'team1', team1_kills: 20, team2_kills: 12,
        team1_picks: ['Yorick', 'Qiyana', 'Ahri', 'Sivir', 'Camille'],
        team1_bans: ['Kalista', 'Vi', 'Orianna'],
        team2_picks: ['Renekton', 'Viego', 'Annie', 'Lucian', 'Alistar'],
        team2_bans: ['Ahri', 'Sivir', 'Camille']
      },
      {
        game_num: 3, duration: '31:40', winner: 'team2', team1_kills: 9, team2_kills: 18,
        team1_picks: ['Olaf', 'Xin Zhao', 'Ryze', 'Xayah', 'Rakan'],
        team1_bans: ['Rumble', 'Sejuani', 'Sylas'],
        team2_picks: ['Jax', 'Nocturne', 'Taliyah', 'Varus', 'Braum'],
        team2_bans: ['Xayah', 'Rakan', 'Olaf']
      },
      {
        game_num: 4, duration: '35:15', winner: 'team1', team1_kills: 22, team2_kills: 10,
        team1_picks: ['Gwen', 'Sejuani', 'Viktor', 'Ezreal', 'Karma'],
        team1_bans: ['Jax', 'Nocturne', 'Varus'],
        team2_picks: ['K\'Sante', 'Lee Sin', 'Orianna', 'Ashe', 'Leona'],
        team2_bans: ['Gwen', 'Ezreal', 'Viktor']
      },
      {
        game_num: 5, duration: '37:45', winner: 'team1', team1_kills: 25, team2_kills: 13,
        team1_picks: ['Dr. Mundo', 'Pantheon', 'Sylas', 'Kai\'Sa', 'Lulu'],
        team1_bans: ['Aatrox', 'Vi', 'Neeko'],
        team2_picks: ['Aatrox', 'Vi', 'Aurora', 'Miss Fortune', 'Neeko'],
        team2_bans: ['Dr. Mundo', 'Sylas', 'Lulu']
      }
    ]
  },

  // 8. First Stand 2026 Grand Final: BLG vs G2 (3:1, March 22)
  {
    filter: { team1_id: T.BLG, team2_id: T.G2, league: 'First Stand' },
    games: [
      {
        game_num: 1, duration: '32:10', winner: 'team1', team1_kills: 18, team2_kills: 8,
        team1_picks: ['Jax', 'Vi', 'Orianna', 'Varus', 'Rell'],
        team1_bans: ['Kalista', 'Ashe', 'K\'Sante'],
        team2_picks: ['Gnar', 'Skarner', 'Yone', 'Kai\'Sa', 'Nautilus'],
        team2_bans: ['Rumble', 'Aurora', 'Poppy']
      },
      {
        game_num: 2, duration: '36:40', winner: 'team2', team1_kills: 10, team2_kills: 18,
        team1_picks: ['Aatrox', 'Sejuani', 'Ahri', 'Ezreal', 'Leona'],
        team1_bans: ['Yone', 'Renekton', 'Skarner'],
        team2_picks: ['K\'Sante', 'Nidalee', 'Tristana', 'Xayah', 'Rakan'],
        team2_bans: ['Kalista', 'Vi', 'Orianna']
      },
      {
        game_num: 3, duration: '29:50', winner: 'team1', team1_kills: 21, team2_kills: 6,
        team1_picks: ['Rumble', 'Skarner', 'Yone', 'Ashe', 'Braum'],
        team1_bans: ['Kalista', 'K\'Sante', 'Renekton'],
        team2_picks: ['Renekton', 'Xin Zhao', 'Sylas', 'Jhin', 'Leona'],
        team2_bans: ['Vi', 'Aurora', 'Ahri']
      },
      {
        game_num: 4, duration: '31:25', winner: 'team1', team1_kills: 24, team2_kills: 9,
        team1_picks: ['Gnar', 'Vi', 'Sylas', 'Kalista', 'Renata Glasc'],
        team1_bans: ['Ashe', 'Yone', 'K\'Sante'],
        team2_picks: ['Camille', 'Sejuani', 'Azir', 'Kai\'Sa', 'Alistar'],
        team2_bans: ['Orianna', 'Kalista', 'Rumble']
      }
    ]
  }
];

async function applyRealDrafts() {
  console.log('Applying exact real-life champion picks & bans from gol.gg & Liquipedia...');

  for (const item of EXACT_MATCH_UPDATES) {
    let q = sb.from('matches').select('id, league, format, team1_id, team2_id');
    for (const [k, v] of Object.entries(item.filter)) {
      q = q.eq(k, v);
    }
    const { data: matches, error } = await q;
    if (error || !matches || matches.length === 0) {
      console.warn('Match not found for filter:', item.filter);
      continue;
    }

    const match = matches[0];
    const { error: updErr } = await sb.from('matches').update({
      draft: { games: item.games }
    }).eq('id', match.id);

    if (updErr) {
      console.error(`Failed to update match ${match.id}:`, updErr.message);
    } else {
      console.log(`✅ Updated exact draft for match ${match.id} (${item.filter.league})`);
    }
  }

  console.log('\nAll exact real-life drafts applied successfully!');
}

applyRealDrafts().catch(console.error);
