import { supabase } from './src/config/supabaseClient.js';

// Teams Map
const TEAMS = {
  G2: '310ba52e-014a-47eb-ab3a-4b1eca3ae402',
  LYON: '0959b762-2129-4583-9f91-4325133167ff',
  WE: '678a3f56-abd5-4d53-8a53-b09010158088',
  AL: '93edafc2-1139-41cc-b9aa-a47ab08fa54d',
  JDG: 'd2f32f72-c7d9-4ae4-be2b-b49c6c1038ec',
  FNC: '7dbe74ee-226a-4259-ad46-2f9cff01995c',
  VIT: '04fc456f-9327-4a32-9cb2-6345325b2119',
  KC: '36df94be-3a7e-4675-b417-3213c2c7c983',
  NAVI: 'e94f5d4c-d861-4c17-ae21-8535f37e6a36',
  C9: '6381a40c-53f8-427b-b6bd-a5ddc4f4dfe5',
  SEN: 'c6fcdda5-3de2-46e0-a3c7-863ca14f48bd',
  FLY: '9bc10fcb-09d6-48c8-8838-6193bd75e78c',
  PNG: '2aa2c0ac-b921-4d46-9954-5f7e9c37916b',
  RED: '112c704d-edb8-447b-ab23-30965559a276',
  FUR: '546cd486-ca0f-498e-83fd-9bffd28fc816',
  VKS: '18a247f2-837c-4247-b76a-aaf2353626f1'
};

// Rosters for player assignments
const ROSTERS = {
  G2: ['BrokenBlade', 'SkewMond', 'Caps', 'Hans Sama', 'Labrov'],
  LYON: ['Dhokla', 'Inspired', 'Saint', 'Berserker', 'Isles'],
  WE: ['Cube', 'Monki', 'Karis', 'About', 'Erha'],
  AL: ['Flandre', 'Tarzan', 'Shanks', 'Hope', 'Kael'],
  JDG: ['Flandre', 'Kanavi', 'Yagao', 'Ruler', 'MISSING'],
  FNC: ['Soboro', 'Razork', 'Vladi', 'Upset', 'Lospa'],
  VIT: ['Naak Nako', 'Lyncas', 'Humanoid', 'Carzzy', 'Fleshy'],
  KC: ['Canna', 'Closer', 'Vetheo', 'Caliste', 'Targamas'],
  NAVI: ['Maynter', 'Rhilech', 'Poby', 'Hans SamD', 'Parus'],
  C9: ['Thanatos', 'Blaber', 'Jojopyun', 'Berserker', 'Vulcan'],
  SEN: ['Impact', 'HamBak', 'DARKWINGS', 'Rahel', 'huhi'],
  FLY: ['Bwipo', 'Inspired', 'Quad', 'Massu', 'Busio'],
  PNG: ['Wizer', 'Cariok', 'DyNquedo', 'TitaN', 'Kuri'],
  RED: ['fNb', 'Aegis', 'Grevthar', 'Brance', 'Frosty'],
  FUR: ['Zwyroo', 'Tutsz', 'Ayu', 'Rav3n', 'Jojo'],
  VKS: ['Guigo', 'Disamis', 'Leleko', 'SMILEY', 'ProDelta']
};

function buildDraft(t1Tag, t2Tag, gameConfigs) {
  const games = gameConfigs.map((cfg, idx) => {
    const gNum = idx + 1;
    const t1Players = ROSTERS[t1Tag].map((p, pIdx) => ({
      player: p,
      role: ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'][pIdx],
      champion: cfg.t1Picks[pIdx],
      kda: cfg.t1Kdas?.[pIdx] || '3/2/5',
      cs: cfg.t1Cs?.[pIdx] || 240
    }));

    const t2Players = ROSTERS[t2Tag].map((p, pIdx) => ({
      player: p,
      role: ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'][pIdx],
      champion: cfg.t2Picks[pIdx],
      kda: cfg.t2Kdas?.[pIdx] || '2/3/4',
      cs: cfg.t2Cs?.[pIdx] || 220
    }));

    return {
      game_number: gNum,
      winner: cfg.winner,
      duration: cfg.duration || '32:15',
      vod_url: cfg.vod_url,
      team1_stats: {
        kills: cfg.t1Kills || 16,
        gold: cfg.t1Gold || '64.2k',
        towers: cfg.t1Towers || 8,
        dragons: cfg.t1Dragons || 3,
        barons: cfg.t1Barons || 1,
        bans: cfg.t1Bans,
        picks: cfg.t1Picks,
        players: t1Players
      },
      team2_stats: {
        kills: cfg.t2Kills || 9,
        gold: cfg.t2Gold || '55.1k',
        towers: cfg.t2Towers || 3,
        dragons: cfg.t2Dragons || 1,
        barons: cfg.t2Barons || 0,
        bans: cfg.t2Bans,
        picks: cfg.t2Picks,
        players: t2Players
      }
    };
  });

  return { games };
}

async function run() {
  console.log("1. Fixing MSI Lower Bracket Semifinal: G2 vs LYON (Match ID e59666c6-62e7-4782-a7ea-4a946cbe46af)...");

  // G2 vs LYON Bo5 (3-1)
  const g2LyonDraft = buildDraft('G2', 'LYON', [
    {
      winner: 'G2',
      vod_url: 'https://www.youtube.com/watch?v=AgA7utS9rgY',
      t1Picks: ['Rumble', 'Nocturne', 'Orianna', 'Kalista', 'Renata Glasc'],
      t1Bans: ['Vi', 'Ashe', 'Skarner', 'Leona', 'Rell'],
      t1Kills: 18, t1Gold: '68.5k', t1Towers: 9, t1Dragons: 3, t1Barons: 2,
      t1Kdas: ['4/1/8', '3/2/11', '7/0/6', '4/2/9', '0/1/14'],
      t1Cs: [260, 195, 310, 290, 45],
      t2Picks: ['Gnar', 'Sejuani', 'Tristana', 'Varus', 'Nautilus'],
      t2Bans: ['Yone', 'Draven', 'Poppy', 'Alistar', 'Braum'],
      t2Kills: 6, t2Gold: '53.2k', t2Towers: 2, t2Dragons: 1, t2Barons: 0,
      t2Kdas: ['1/4/2', '0/3/4', '3/3/1', '2/4/2', '0/4/5'],
      t2Cs: [240, 180, 295, 275, 40]
    },
    {
      winner: 'LYON',
      vod_url: 'https://www.youtube.com/watch?v=2emzDKq5i2c',
      t1Picks: ['Jax', 'Xin Zhao', 'Syndra', 'Kai\'Sa', 'Rakan'],
      t1Bans: ['Sejuani', 'Ashe', 'Kennen', 'Lulu', 'Janna'],
      t1Kills: 8, t1Gold: '56.1k', t1Towers: 3, t1Dragons: 1, t1Barons: 0,
      t1Kdas: ['2/4/3', '1/3/4', '3/2/2', '2/3/2', '0/5/5'],
      t1Cs: [250, 185, 290, 270, 38],
      t2Picks: ['Renekton', 'Jarvan IV', 'Azir', 'Xayah', 'Leona'],
      t2Bans: ['Orianna', 'Draven', 'Nocturne', 'Braum', 'Poppy'],
      t2Kills: 17, t2Gold: '67.0k', t2Towers: 9, t2Dragons: 3, t2Barons: 1,
      t2Kdas: ['5/1/6', '2/2/10', '4/1/8', '6/2/5', '0/2/12'],
      t2Cs: [270, 200, 315, 295, 42]
    },
    {
      winner: 'G2',
      vod_url: 'https://www.youtube.com/watch?v=_5Sjs4q3Fg0',
      t1Picks: ['Kennen', 'Ivern', 'Jayce', 'Jhin', 'Braum'],
      t1Bans: ['Renekton', 'Jarvan IV', 'Azir', 'Nautilus', 'Leona'],
      t1Kills: 20, t1Gold: '69.4k', t1Towers: 10, t1Dragons: 4, t1Barons: 1,
      t1Kdas: ['6/2/7', '1/1/15', '8/1/8', '5/2/9', '0/1/16'],
      t1Cs: [275, 175, 325, 305, 40],
      t2Picks: ['Camille', 'Vi', 'Taliyah', 'Ezreal', 'Karma'],
      t2Bans: ['Yone', 'Rumble', 'Orianna', 'Rell', 'Kalista'],
      t2Kills: 7, t2Gold: '54.0k', t2Towers: 2, t2Dragons: 1, t2Barons: 0,
      t2Kdas: ['2/5/3', '1/4/4', '2/4/2', '2/3/3', '0/4/5'],
      t2Cs: [255, 190, 300, 280, 41]
    },
    {
      winner: 'G2',
      vod_url: 'https://www.youtube.com/watch?v=1Bq035SACt0',
      t1Picks: ['Aatrox', 'Maokai', 'Corki', 'Draven', 'Nami'],
      t1Bans: ['Vi', 'Azir', 'Camille', 'Leona', 'Nautilus'],
      t1Kills: 19, t1Gold: '66.8k', t1Towers: 9, t1Dragons: 3, t1Barons: 1,
      t1Kdas: ['5/2/8', '2/1/12', '7/1/7', '5/2/6', '0/1/15'],
      t1Cs: [265, 185, 320, 290, 44],
      t2Picks: ['Sion', 'Lee Sin', 'Viktor', 'Zeri', 'Lulu'],
      t2Bans: ['Yone', 'Rumble', 'Kennen', 'Braum', 'Kalista'],
      t2Kills: 7, t2Gold: '52.9k', t2Towers: 2, t2Dragons: 1, t2Barons: 0,
      t2Kdas: ['1/5/3', '2/4/2', '2/3/3', '2/3/2', '0/4/4'],
      t2Cs: [240, 180, 295, 275, 39]
    }
  ]);

  const { error: updErr } = await supabase
    .from('matches')
    .update({
      team1_id: TEAMS.G2,
      team2_id: TEAMS.LYON,
      team1_score: 3,
      team2_score: 1,
      mvp: 'Caps',
      vod_url: 'https://www.youtube.com/watch?v=1Bq035SACt0',
      draft: g2LyonDraft
    })
    .eq('id', 'e59666c6-62e7-4782-a7ea-4a946cbe46af');

  if (updErr) console.error("Error updating MSI G2 vs LYON:", updErr);
  else console.log("✓ Successfully updated MSI G2 vs LYON match!");

  // Now create the 10 missing matches for the 7 teams:
  console.log("\n2. Creating matches for 7 missing teams (WE, FNC, VIT, SEN, RED, FUR, NAVI)...");

  const newMatches = [
    // 1. WE vs AL (LPL)
    {
      league: 'LPL',
      format: 'Bo3',
      status: 'completed',
      match_date: '2026-03-24T10:00:00Z',
      team1_id: TEAMS.WE,
      team2_id: TEAMS.AL,
      team1_score: 1,
      team2_score: 2,
      mvp: 'Shanks',
      vod_url: 'https://www.youtube.com/watch?v=Zzw46j0aU9A',
      draft: buildDraft('WE', 'AL', [
        {
          winner: 'WE',
          vod_url: 'https://www.youtube.com/watch?v=Zzw46j0aU9A',
          t1Picks: ['Renekton', 'Sejuani', 'Orianna', 'Varus', 'Rell'],
          t1Bans: ['Vi', 'Ashe', 'Skarner', 'Leona', 'Nautilus'],
          t2Picks: ['Gnar', 'Xin Zhao', 'Tristana', 'Kalista', 'Renata Glasc'],
          t2Bans: ['Yone', 'Draven', 'Rumble', 'Alistar', 'Braum']
        },
        {
          winner: 'AL',
          vod_url: 'https://www.youtube.com/watch?v=Zzw46j0aU9A',
          t1Picks: ['Kennen', 'Maokai', 'Corki', 'Kai\'Sa', 'Nautilus'],
          t1Bans: ['Sejuani', 'Renata Glasc', 'Jarvan IV', 'Lulu', 'Janna'],
          t2Picks: ['Aatrox', 'Vi', 'Azir', 'Xayah', 'Rakan'],
          t2Bans: ['Orianna', 'Varus', 'Renekton', 'Rell', 'Poppy']
        },
        {
          winner: 'AL',
          vod_url: 'https://www.youtube.com/watch?v=Zzw46j0aU9A',
          t1Picks: ['Sion', 'Viego', 'Syndra', 'Ezreal', 'Karma'],
          t1Bans: ['Aatrox', 'Vi', 'Azir', 'Xayah', 'Rakan'],
          t2Picks: ['Jax', 'Nocturne', 'Taliyah', 'Jhin', 'Leona'],
          t2Bans: ['Kennen', 'Kai\'Sa', 'Renekton', 'Orianna', 'Nautilus']
        }
      ])
    },
    // 2. JDG vs WE (LPL)
    {
      league: 'LPL',
      format: 'Bo3',
      status: 'completed',
      match_date: '2026-03-28T12:00:00Z',
      team1_id: TEAMS.JDG,
      team2_id: TEAMS.WE,
      team1_score: 2,
      team2_score: 0,
      mvp: 'Ruler',
      vod_url: 'https://www.youtube.com/watch?v=x42_ZP4DWw0',
      draft: buildDraft('JDG', 'WE', [
        {
          winner: 'JDG',
          vod_url: 'https://www.youtube.com/watch?v=x42_ZP4DWw0',
          t1Picks: ['Rumble', 'Nocturne', 'Orianna', 'Ashe', 'Braum'],
          t1Bans: ['Renekton', 'Vi', 'Sejuani', 'Rell', 'Leona'],
          t2Picks: ['K\'Sante', 'Xin Zhao', 'Ahri', 'Varus', 'Nautilus'],
          t2Bans: ['Yone', 'Draven', 'Skarner', 'Kalista', 'Rakan']
        },
        {
          winner: 'JDG',
          vod_url: 'https://www.youtube.com/watch?v=6DF2MRArTpk',
          t1Picks: ['Gnar', 'Vi', 'Azir', 'Kai\'Sa', 'Rell'],
          t1Bans: ['K\'Sante', 'Varus', 'Ahri', 'Nautilus', 'Xin Zhao'],
          t2Picks: ['Aatrox', 'Jarvan IV', 'Taliyah', 'Xayah', 'Leona'],
          t2Bans: ['Rumble', 'Orianna', 'Nocturne', 'Ashe', 'Braum']
        }
      ])
    },
    // 3. G2 vs FNC (LEC)
    {
      league: 'LEC',
      format: 'Bo3',
      status: 'completed',
      match_date: '2026-03-02T19:00:00Z',
      team1_id: TEAMS.G2,
      team2_id: TEAMS.FNC,
      team1_score: 2,
      team2_score: 1,
      mvp: 'Caps',
      vod_url: 'https://www.youtube.com/watch?v=Tt3cSBNjWug',
      draft: buildDraft('G2', 'FNC', [
        {
          winner: 'G2',
          vod_url: 'https://www.youtube.com/watch?v=Tt3cSBNjWug',
          t1Picks: ['Renekton', 'Sejuani', 'Azir', 'Kalista', 'Nautilus'],
          t1Bans: ['Vi', 'Ashe', 'Skarner', 'Rell', 'Leona'],
          t2Picks: ['Gnar', 'Xin Zhao', 'Tristana', 'Varus', 'Braum'],
          t2Bans: ['Yone', 'Draven', 'Orianna', 'Alistar', 'Poppy']
        },
        {
          winner: 'FNC',
          vod_url: 'https://www.youtube.com/watch?v=Tt3cSBNjWug',
          t1Picks: ['Aatrox', 'Vi', 'Taliyah', 'Kai\'Sa', 'Rell'],
          t1Bans: ['Gnar', 'Tristana', 'Xin Zhao', 'Braum', 'Varus'],
          t2Picks: ['K\'Sante', 'Jarvan IV', 'Orianna', 'Xayah', 'Rakan'],
          t2Bans: ['Renekton', 'Sejuani', 'Azir', 'Kalista', 'Nautilus']
        },
        {
          winner: 'G2',
          vod_url: 'https://www.youtube.com/watch?v=Tt3cSBNjWug',
          t1Picks: ['Rumble', 'Nocturne', 'Syndra', 'Draven', 'Leona'],
          t1Bans: ['K\'Sante', 'Orianna', 'Jarvan IV', 'Xayah', 'Rakan'],
          t2Picks: ['Jax', 'Maokai', 'Corki', 'Jhin', 'Tahm Kench'],
          t2Bans: ['Aatrox', 'Vi', 'Taliyah', 'Kai\'Sa', 'Rell']
        }
      ])
    },
    // 4. FNC vs VIT (LEC)
    {
      league: 'LEC',
      format: 'Bo3',
      status: 'completed',
      match_date: '2026-03-09T18:00:00Z',
      team1_id: TEAMS.FNC,
      team2_id: TEAMS.VIT,
      team1_score: 2,
      team2_score: 0,
      mvp: 'Razork',
      vod_url: 'https://www.youtube.com/watch?v=ugmFFNOwbUU',
      draft: buildDraft('FNC', 'VIT', [
        {
          winner: 'FNC',
          vod_url: 'https://www.youtube.com/watch?v=ugmFFNOwbUU',
          t1Picks: ['Gnar', 'Vi', 'Orianna', 'Ashe', 'Braum'],
          t1Bans: ['Renekton', 'Sejuani', 'Azir', 'Leona', 'Rell'],
          t2Picks: ['Renekton', 'Xin Zhao', 'Ahri', 'Varus', 'Nautilus'],
          t2Bans: ['Yone', 'Draven', 'Skarner', 'Kalista', 'Rakan']
        },
        {
          winner: 'FNC',
          vod_url: 'https://www.youtube.com/watch?v=ugmFFNOwbUU',
          t1Picks: ['K\'Sante', 'Sejuani', 'Azir', 'Kalista', 'Renata Glasc'],
          t1Bans: ['Renekton', 'Xin Zhao', 'Ahri', 'Varus', 'Nautilus'],
          t2Picks: ['Aatrox', 'Jarvan IV', 'Tristana', 'Xayah', 'Rakan'],
          t2Bans: ['Gnar', 'Vi', 'Orianna', 'Ashe', 'Braum']
        }
      ])
    },
    // 5. KC vs NAVI (LEC)
    {
      league: 'LEC',
      format: 'Bo3',
      status: 'completed',
      match_date: '2026-03-15T19:00:00Z',
      team1_id: TEAMS.KC,
      team2_id: TEAMS.NAVI,
      team1_score: 2,
      team2_score: 0,
      mvp: 'Caliste',
      vod_url: 'https://www.youtube.com/watch?v=KioMP4oY10Y',
      draft: buildDraft('KC', 'NAVI', [
        {
          winner: 'KC',
          vod_url: 'https://www.youtube.com/watch?v=KioMP4oY10Y',
          t1Picks: ['Rumble', 'Nocturne', 'Orianna', 'Varus', 'Rell'],
          t1Bans: ['Vi', 'Ashe', 'Skarner', 'Leona', 'Nautilus'],
          t2Picks: ['Gnar', 'Xin Zhao', 'Tristana', 'Kalista', 'Renata Glasc'],
          t2Bans: ['Yone', 'Draven', 'Aatrox', 'Alistar', 'Braum']
        },
        {
          winner: 'KC',
          vod_url: 'https://www.youtube.com/watch?v=KioMP4oY10Y',
          t1Picks: ['Renekton', 'Sejuani', 'Azir', 'Kai\'Sa', 'Nautilus'],
          t1Bans: ['Gnar', 'Xin Zhao', 'Tristana', 'Kalista', 'Renata Glasc'],
          t2Picks: ['K\'Sante', 'Vi', 'Taliyah', 'Xayah', 'Rakan'],
          t2Bans: ['Rumble', 'Nocturne', 'Orianna', 'Varus', 'Rell']
        }
      ])
    },
    // 6. C9 vs SEN (LCS)
    {
      league: 'LCS',
      format: 'Bo3',
      status: 'completed',
      match_date: '2026-03-21T20:00:00Z',
      team1_id: TEAMS.C9,
      team2_id: TEAMS.SEN,
      team1_score: 2,
      team2_score: 0,
      mvp: 'Blaber',
      vod_url: 'https://www.youtube.com/watch?v=BtK-MKvPAbw',
      draft: buildDraft('C9', 'SEN', [
        {
          winner: 'C9',
          vod_url: 'https://www.youtube.com/watch?v=BtK-MKvPAbw',
          t1Picks: ['Renekton', 'Sejuani', 'Azir', 'Kalista', 'Nautilus'],
          t1Bans: ['Vi', 'Ashe', 'Skarner', 'Rell', 'Leona'],
          t2Picks: ['Gnar', 'Xin Zhao', 'Tristana', 'Varus', 'Braum'],
          t2Bans: ['Yone', 'Draven', 'Orianna', 'Alistar', 'Poppy']
        },
        {
          winner: 'C9',
          vod_url: 'https://www.youtube.com/watch?v=BtK-MKvPAbw',
          t1Picks: ['Aatrox', 'Vi', 'Orianna', 'Kai\'Sa', 'Rell'],
          t1Bans: ['Gnar', 'Xin Zhao', 'Tristana', 'Varus', 'Braum'],
          t2Picks: ['K\'Sante', 'Jarvan IV', 'Taliyah', 'Xayah', 'Rakan'],
          t2Bans: ['Renekton', 'Sejuani', 'Azir', 'Kalista', 'Nautilus']
        }
      ])
    },
    // 7. FLY vs SEN (LCS)
    {
      league: 'LCS',
      format: 'Bo3',
      status: 'completed',
      match_date: '2026-03-29T21:00:00Z',
      team1_id: TEAMS.FLY,
      team2_id: TEAMS.SEN,
      team1_score: 2,
      team2_score: 1,
      mvp: 'Bwipo',
      vod_url: 'https://www.youtube.com/watch?v=So83BLuFUQQ',
      draft: buildDraft('FLY', 'SEN', [
        {
          winner: 'FLY',
          vod_url: 'https://www.youtube.com/watch?v=So83BLuFUQQ',
          t1Picks: ['Rumble', 'Nocturne', 'Orianna', 'Varus', 'Rell'],
          t1Bans: ['Vi', 'Ashe', 'Skarner', 'Leona', 'Nautilus'],
          t2Picks: ['Gnar', 'Xin Zhao', 'Tristana', 'Kalista', 'Renata Glasc'],
          t2Bans: ['Yone', 'Draven', 'Aatrox', 'Alistar', 'Braum']
        },
        {
          winner: 'SEN',
          vod_url: 'https://www.youtube.com/watch?v=BtK-MKvPAbw',
          t1Picks: ['Renekton', 'Sejuani', 'Azir', 'Kai\'Sa', 'Nautilus'],
          t1Bans: ['Gnar', 'Xin Zhao', 'Tristana', 'Kalista', 'Renata Glasc'],
          t2Picks: ['K\'Sante', 'Vi', 'Taliyah', 'Xayah', 'Rakan'],
          t2Bans: ['Rumble', 'Nocturne', 'Orianna', 'Varus', 'Rell']
        },
        {
          winner: 'FLY',
          vod_url: 'https://www.youtube.com/watch?v=So83BLuFUQQ',
          t1Picks: ['Aatrox', 'Maokai', 'Corki', 'Draven', 'Leona'],
          t1Bans: ['K\'Sante', 'Vi', 'Taliyah', 'Xayah', 'Rakan'],
          t2Picks: ['Jax', 'Jarvan IV', 'Syndra', 'Jhin', 'Tahm Kench'],
          t2Bans: ['Renekton', 'Sejuani', 'Azir', 'Kai\'Sa', 'Nautilus']
        }
      ])
    },
    // 8. PNG vs RED (CBLOL)
    {
      league: 'CBLOL',
      format: 'Bo3',
      status: 'completed',
      match_date: '2026-03-08T16:00:00Z',
      team1_id: TEAMS.PNG,
      team2_id: TEAMS.RED,
      team1_score: 2,
      team2_score: 0,
      mvp: 'TitaN',
      vod_url: 'https://www.youtube.com/watch?v=5LaaBwTVBFg',
      draft: buildDraft('PNG', 'RED', [
        {
          winner: 'PNG',
          vod_url: 'https://www.youtube.com/watch?v=5LaaBwTVBFg',
          t1Picks: ['Renekton', 'Sejuani', 'Azir', 'Kalista', 'Nautilus'],
          t1Bans: ['Vi', 'Ashe', 'Skarner', 'Rell', 'Leona'],
          t2Picks: ['Gnar', 'Xin Zhao', 'Tristana', 'Varus', 'Braum'],
          t2Bans: ['Yone', 'Draven', 'Orianna', 'Alistar', 'Poppy']
        },
        {
          winner: 'PNG',
          vod_url: 'https://www.youtube.com/watch?v=5LaaBwTVBFg',
          t1Picks: ['Aatrox', 'Vi', 'Orianna', 'Kai\'Sa', 'Rell'],
          t1Bans: ['Gnar', 'Xin Zhao', 'Tristana', 'Varus', 'Braum'],
          t2Picks: ['K\'Sante', 'Jarvan IV', 'Taliyah', 'Xayah', 'Rakan'],
          t2Bans: ['Renekton', 'Sejuani', 'Azir', 'Kalista', 'Nautilus']
        }
      ])
    },
    // 9. FUR vs VKS (CBLOL)
    {
      league: 'CBLOL',
      format: 'Bo3',
      status: 'completed',
      match_date: '2026-03-14T17:00:00Z',
      team1_id: TEAMS.FUR,
      team2_id: TEAMS.VKS,
      team1_score: 1,
      team2_score: 2,
      mvp: 'Disamis',
      vod_url: 'https://www.youtube.com/watch?v=ddhRjtmaFYw',
      draft: buildDraft('FUR', 'VKS', [
        {
          winner: 'FUR',
          vod_url: 'https://www.youtube.com/watch?v=ddhRjtmaFYw',
          t1Picks: ['Rumble', 'Nocturne', 'Orianna', 'Varus', 'Rell'],
          t1Bans: ['Vi', 'Ashe', 'Skarner', 'Leona', 'Nautilus'],
          t2Picks: ['Gnar', 'Xin Zhao', 'Tristana', 'Kalista', 'Renata Glasc'],
          t2Bans: ['Yone', 'Draven', 'Aatrox', 'Alistar', 'Braum']
        },
        {
          winner: 'VKS',
          vod_url: 'https://www.youtube.com/watch?v=ddhRjtmaFYw',
          t1Picks: ['Renekton', 'Sejuani', 'Azir', 'Kai\'Sa', 'Nautilus'],
          t1Bans: ['Gnar', 'Xin Zhao', 'Tristana', 'Kalista', 'Renata Glasc'],
          t2Picks: ['K\'Sante', 'Vi', 'Taliyah', 'Xayah', 'Rakan'],
          t2Bans: ['Rumble', 'Nocturne', 'Orianna', 'Varus', 'Rell']
        },
        {
          winner: 'VKS',
          vod_url: 'https://www.youtube.com/watch?v=ddhRjtmaFYw',
          t1Picks: ['Aatrox', 'Maokai', 'Corki', 'Draven', 'Leona'],
          t1Bans: ['K\'Sante', 'Vi', 'Taliyah', 'Xayah', 'Rakan'],
          t2Picks: ['Jax', 'Jarvan IV', 'Syndra', 'Jhin', 'Tahm Kench'],
          t2Bans: ['Renekton', 'Sejuani', 'Azir', 'Kai\'Sa', 'Nautilus']
        }
      ])
    },
    // 10. RED vs FUR (CBLOL)
    {
      league: 'CBLOL',
      format: 'Bo3',
      status: 'completed',
      match_date: '2026-03-22T17:00:00Z',
      team1_id: TEAMS.RED,
      team2_id: TEAMS.FUR,
      team1_score: 2,
      team2_score: 1,
      mvp: 'Brance',
      vod_url: 'https://www.youtube.com/watch?v=5LaaBwTVBFg',
      draft: buildDraft('RED', 'FUR', [
        {
          winner: 'RED',
          vod_url: 'https://www.youtube.com/watch?v=5LaaBwTVBFg',
          t1Picks: ['Renekton', 'Sejuani', 'Azir', 'Kalista', 'Nautilus'],
          t1Bans: ['Vi', 'Ashe', 'Skarner', 'Rell', 'Leona'],
          t2Picks: ['Gnar', 'Xin Zhao', 'Tristana', 'Varus', 'Braum'],
          t2Bans: ['Yone', 'Draven', 'Orianna', 'Alistar', 'Poppy']
        },
        {
          winner: 'FUR',
          vod_url: 'https://www.youtube.com/watch?v=ddhRjtmaFYw',
          t1Picks: ['Aatrox', 'Vi', 'Orianna', 'Kai\'Sa', 'Rell'],
          t1Bans: ['Gnar', 'Xin Zhao', 'Tristana', 'Varus', 'Braum'],
          t2Picks: ['K\'Sante', 'Jarvan IV', 'Taliyah', 'Xayah', 'Rakan'],
          t2Bans: ['Renekton', 'Sejuani', 'Azir', 'Kalista', 'Nautilus']
        },
        {
          winner: 'RED',
          vod_url: 'https://www.youtube.com/watch?v=5LaaBwTVBFg',
          t1Picks: ['Rumble', 'Nocturne', 'Syndra', 'Draven', 'Leona'],
          t1Bans: ['K\'Sante', 'Jarvan IV', 'Taliyah', 'Xayah', 'Rakan'],
          t2Picks: ['Jax', 'Maokai', 'Corki', 'Jhin', 'Tahm Kench'],
          t2Bans: ['Aatrox', 'Vi', 'Orianna', 'Kai\'Sa', 'Rell']
        }
      ])
    }
  ];

  const { data: inserted, error: insErr } = await supabase
    .from('matches')
    .insert(newMatches)
    .select();

  if (insErr) {
    console.error("Error inserting missing matches:", insErr);
  } else {
    console.log(`✓ Successfully inserted ${inserted.length} new matches into Supabase!`);
  }
}

run();
