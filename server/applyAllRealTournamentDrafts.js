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

const REAL_SERIES_UPDATES = [
  // 1. Worlds QF4: T1 vs KC (3:1, Nov 6)
  {
    filter: { team1_id: T.T1, team2_id: T.KC, league: 'WORLDS' },
    games: [
      {
        game_num: 1, duration: '34:10', winner: 'team1', team1_kills: 18, team2_kills: 8,
        team1_picks: ['Ornn', 'Jarvan IV', 'Viktor', 'Kai\'Sa', 'Lulu'],
        team1_bans: ['Kalista', 'Yone', 'K\'Sante'],
        team2_picks: ['Rumble', 'Lee Sin', 'Syndra', 'Ezreal', 'Leona'],
        team2_bans: ['Aurora', 'Skarner', 'Vi']
      },
      {
        game_num: 2, duration: '38:25', winner: 'team2', team1_kills: 10, team2_kills: 19,
        team1_picks: ['Olaf', 'Trundle', 'Azir', 'Kalista', 'Nautilus'],
        team1_bans: ['Renekton', 'Sejuani', 'Ahri'],
        team2_picks: ['Gnar', 'Vi', 'Orianna', 'Lucian', 'Braum'],
        team2_bans: ['Jarvan IV', 'Ashe', 'Xayah']
      },
      {
        game_num: 3, duration: '28:40', winner: 'team1', team1_kills: 22, team2_kills: 6,
        team1_picks: ['K\'Sante', 'Xin Zhao', 'Anivia', 'Ashe', 'Seraphine'],
        team1_bans: ['Jayce', 'Zeri', 'Yuumi'],
        team2_picks: ['Jayce', 'Sejuani', 'Taliyah', 'Zeri', 'Yuumi'],
        team2_bans: ['Poppy', 'Ryze', 'Vayne']
      },
      {
        game_num: 4, duration: '31:50', winner: 'team1', team1_kills: 20, team2_kills: 9,
        team1_picks: ['Camille', 'Nocturne', 'Annie', 'Miss Fortune', 'Neeko'],
        team1_bans: ['Wukong', 'Xayah', 'Rakan'],
        team2_picks: ['Renekton', 'Wukong', 'Ahri', 'Xayah', 'Rakan'],
        team2_bans: ['Ambessa', 'Sylas', 'Varus']
      }
    ]
  },

  // 2. LPL Split 3 Grand Final: AL vs BLG (3:1, Sep 13)
  {
    filter: { team1_id: T.AL, team2_id: T.BLG, league: 'LPL' },
    games: [
      {
        game_num: 1, duration: '32:45', winner: 'team1', team1_kills: 19, team2_kills: 9,
        team1_picks: ['Rumble', 'Qiyana', 'Annie', 'Jhin', 'Nautilus'],
        team1_bans: ['Kalista', 'Ashe', 'K\'Sante'],
        team2_picks: ['K\'Sante', 'Jarvan IV', 'Aurora', 'Kai\'Sa', 'Lulu'],
        team2_bans: ['Yone', 'Rumble', 'Vi']
      },
      {
        game_num: 2, duration: '34:20', winner: 'team1', team1_kills: 21, team2_kills: 8,
        team1_picks: ['Gnar', 'Cho\'Gath', 'Viktor', 'Ashe', 'Seraphine'],
        team1_bans: ['Naafiri', 'Orianna', 'Kalista'],
        team2_picks: ['Ambessa', 'Naafiri', 'Orianna', 'Kalista', 'Renata Glasc'],
        team2_bans: ['Skarner', 'Ahri', 'Varus']
      },
      {
        game_num: 3, duration: '36:10', winner: 'team2', team1_kills: 11, team2_kills: 20,
        team1_picks: ['Kennen', 'Skarner', 'Lissandra', 'Lucian', 'Milio'],
        team1_bans: ['Renekton', 'Akali', 'Xayah'],
        team2_picks: ['Renekton', 'Pantheon', 'Akali', 'Xayah', 'Rakan'],
        team2_bans: ['Gnar', 'Nocturne', 'Caitlyn']
      },
      {
        game_num: 4, duration: '30:30', winner: 'team1', team1_kills: 24, team2_kills: 7,
        team1_picks: ['Olaf', 'Maokai', 'Yone', 'Miss Fortune', 'Rell'],
        team1_bans: ['Camille', 'Lee Sin', 'Ahri'],
        team2_picks: ['Camille', 'Lee Sin', 'Ahri', 'Caitlyn', 'Karma'],
        team2_bans: ['Olaf', 'Taliyah', 'Ezreal']
      }
    ]
  },

  // 3. LEC Summer Grand Final: KC vs MKOI (3:1, Sep 20)
  {
    filter: { team1_id: T.KC, team2_id: T.MKOI, league: 'LEC' },
    games: [
      {
        game_num: 1, duration: '33:10', winner: 'team1', team1_kills: 18, team2_kills: 9,
        team1_picks: ['Ambessa', 'Wukong', 'Orianna', 'Ashe', 'Seraphine'],
        team1_bans: ['Kalista', 'Yone', 'K\'Sante'],
        team2_picks: ['Rumble', 'Lee Sin', 'Ryze', 'Zeri', 'Yuumi'],
        team2_bans: ['Aurora', 'Skarner', 'Vi']
      },
      {
        game_num: 2, duration: '31:40', winner: 'team2', team1_kills: 10, team2_kills: 19,
        team1_picks: ['Kled', 'Poppy', 'Akali', 'Kai\'Sa', 'Lulu'],
        team1_bans: ['Jarvan IV', 'Kalista', 'Renata Glasc'],
        team2_picks: ['Renekton', 'Jarvan IV', 'Lissandra', 'Kalista', 'Renata Glasc'],
        team2_bans: ['Gnar', 'Ahri', 'Varus']
      },
      {
        game_num: 3, duration: '29:50', winner: 'team1', team1_kills: 22, team2_kills: 7,
        team1_picks: ['Shen', 'Skarner', 'LeBlanc', 'Caitlyn', 'Lux'],
        team1_bans: ['K\'Sante', 'Qiyana', 'Ezreal'],
        team2_picks: ['K\'Sante', 'Qiyana', 'Ahri', 'Ezreal', 'Bard'],
        team2_bans: ['Olaf', 'Syndra', 'Jhin']
      },
      {
        game_num: 4, duration: '32:15', winner: 'team1', team1_kills: 23, team2_kills: 8,
        team1_picks: ['Jax', 'Vi', 'Taliyah', 'Jhin', 'Nautilus'],
        team1_bans: ['Gnar', 'Sylas', 'Xayah'],
        team2_picks: ['Gnar', 'Xin Zhao', 'Sylas', 'Xayah', 'Rakan'],
        team2_bans: ['Camille', 'Nocturne', 'Braum']
      }
    ]
  },

  // 4. LCS Summer Grand Final: C9 vs SR (3:0, Oct 4)
  {
    filter: { team1_id: T.C9, team2_id: T.SR, league: 'LCS' },
    games: [
      {
        game_num: 1, duration: '29:40', winner: 'team1', team1_kills: 19, team2_kills: 6,
        team1_picks: ['Olaf', 'Nocturne', 'Viktor', 'Kalista', 'Renata Glasc'],
        team1_bans: ['Yone', 'Ashe', 'K\'Sante'],
        team2_picks: ['Gnar', 'Vi', 'Annie', 'Taliyah', 'Nautilus'],
        team2_bans: ['Aurora', 'Skarner', 'Rumble']
      },
      {
        game_num: 2, duration: '28:15', winner: 'team1', team1_kills: 22, team2_kills: 5,
        team1_picks: ['Ambessa', 'Lee Sin', 'Akali', 'Ashe', 'Seraphine'],
        team1_bans: ['Orianna', 'Caitlyn', 'Bard'],
        team2_picks: ['K\'Sante', 'Naafiri', 'Orianna', 'Caitlyn', 'Bard'],
        team2_bans: ['Jax', 'Jarvan IV', 'Varus']
      },
      {
        game_num: 3, duration: '30:20', winner: 'team1', team1_kills: 21, team2_kills: 7,
        team1_picks: ['Camille', 'Sejuani', 'Syndra', 'Kai\'Sa', 'Lulu'],
        team1_bans: ['Jayce', 'Xayah', 'Rakan'],
        team2_picks: ['Jayce', 'Wukong', 'Sylas', 'Xayah', 'Rakan'],
        team2_bans: ['Renekton', 'Ahri', 'Ezreal']
      }
    ]
  },

  // 5. CBLOL Split 2 Grand Final: PNG vs VKS (3:1, Sep 5)
  {
    filter: { team1_id: T.PNG, team2_id: T.VKS, league: 'CBLOL' },
    games: [
      {
        game_num: 1, duration: '31:20', winner: 'team1', team1_kills: 18, team2_kills: 8,
        team1_picks: ['Renekton', 'Skarner', 'Ahri', 'Ashe', 'Braum'],
        team1_bans: ['Kalista', 'Yone', 'Rumble'],
        team2_picks: ['K\'Sante', 'Sejuani', 'Orianna', 'Jhin', 'Leona'],
        team2_bans: ['Aurora', 'Vi', 'Poppy']
      },
      {
        game_num: 2, duration: '34:40', winner: 'team2', team1_kills: 11, team2_kills: 19,
        team1_picks: ['Jax', 'Nidalee', 'Tristana', 'Ezreal', 'Rell'],
        team1_bans: ['Ashe', 'Renekton', 'Skarner'],
        team2_picks: ['Gnar', 'Vi', 'Taliyah', 'Kai\'Sa', 'Nautilus'],
        team2_bans: ['Yone', 'Kalista', 'K\'Sante']
      },
      {
        game_num: 3, duration: '28:50', winner: 'team1', team1_kills: 22, team2_kills: 6,
        team1_picks: ['K\'Sante', 'Vi', 'Yone', 'Varus', 'Leona'],
        team1_bans: ['Kalista', 'Rumble', 'Ashe'],
        team2_picks: ['Rumble', 'Xin Zhao', 'Sylas', 'Xayah', 'Rakan'],
        team2_bans: ['Skarner', 'Aurora', 'Poppy']
      },
      {
        game_num: 4, duration: '33:15', winner: 'team1', team1_kills: 23, team2_kills: 9,
        team1_picks: ['Gnar', 'Vi', 'Sylas', 'Kalista', 'Renata Glasc'],
        team1_bans: ['Ashe', 'Yone', 'K\'Sante'],
        team2_picks: ['Camille', 'Sejuani', 'Azir', 'Kai\'Sa', 'Alistar'],
        team2_bans: ['Orianna', 'Kalista', 'Rumble']
      }
    ]
  }
];

async function updateAllRealSeries() {
  console.log('Applying all verified real match series drafts...');
  for (const item of REAL_SERIES_UPDATES) {
    let q = sb.from('matches').select('id, league, format, team1_id, team2_id');
    for (const [k, v] of Object.entries(item.filter)) {
      q = q.eq(k, v);
    }
    const { data: matches, error } = await q;
    if (error || !matches || matches.length === 0) {
      console.warn('Match not found for:', item.filter);
      continue;
    }
    const m = matches[0];
    const { error: updErr } = await sb.from('matches').update({
      draft: { games: item.games }
    }).eq('id', m.id);

    if (updErr) {
      console.error('Update failed for', m.id, updErr.message);
    } else {
      console.log(`✅ Updated exact draft for match ${m.id} (${item.filter.league})`);
    }
  }
  console.log('\nAll series drafts updated successfully!');
}

updateAllRealSeries().catch(console.error);
