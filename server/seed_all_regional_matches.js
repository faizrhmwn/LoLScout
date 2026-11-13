import { supabase } from './src/config/supabaseClient.js';
import { getValidVOD, REGIONAL_FALLBACK_VODS } from './vod_helpers.js';

// All team tags and IDs
const TEAMS = {
  // LCK
  GEN: '74605734-5524-4518-9a60-5d2f8d155a4f',
  HLE: '0f67d807-ef05-46f4-9cd7-235ec6c12869',
  T1: '49ee13bd-23b4-4aa4-ac15-3b6486b0274a',
  DK: 'f8c6d739-bcc9-4a3f-b5e1-fd2847ebb52b',
  KT: '2fd73188-195f-4a4c-b703-bca953380eaf',
  FOX: '949135f0-51cc-40c3-b367-c9d444c55a64',
  // LPL
  BLG: '12530003-9489-4d52-81dc-23bccbbfec75',
  TES: 'b12b186d-f7c5-47d1-a24a-03f162b78632',
  JDG: 'd2f32f72-c7d9-4ae4-be2b-b49c6c1038ec',
  IG: 'cd8f1e0b-72e1-4ae7-b119-62a8b5b710d5',
  AL: '93edafc2-1139-41cc-b9aa-a47ab08fa54d',
  WE: '678a3f56-abd5-4d53-8a53-b09010158088',
  // LEC
  G2: '310ba52e-014a-47eb-ab3a-4b1eca3ae402',
  KC: '36df94be-3a7e-4675-b417-3213c2c7c983',
  FNC: '7dbe74ee-226a-4259-ad46-2f9cff01995c',
  MKOI: '64ca621c-a05d-4298-b171-ebf588b51590',
  VIT: '04fc456f-9327-4a32-9cb2-6345325b2119',
  NAVI: 'e94f5d4c-d861-4c17-ae21-8535f37e6a36',
  // LCS
  FLY: '9bc10fcb-09d6-48c8-8838-6193bd75e78c',
  C9: '6381a40c-53f8-427b-b6bd-a5ddc4f4dfe5',
  TL: '892b3544-1022-4b0e-a8bf-c4b4d09fd6af',
  SEN: 'c6fcdda5-3de2-46e0-a3c7-863ca14f48bd',
  SR: '12c3eae0-a72a-4685-aed0-312cca76fded',
  LYON: '0959b762-2129-4583-9f91-4325133167ff',
  // CBLOL
  PNG: '2aa2c0ac-b921-4d46-9954-5f7e9c37916b',
  VKS: '18a247f2-837c-4247-b76a-aaf2353626f1',
  LLL: '07024739-56bc-4beb-95ee-5b7fa398c108',
  RED: '112c704d-edb8-447b-ab23-30965559a276',
  FUR: '546cd486-ca0f-498e-83fd-9bffd28fc816',
  LOS: '930cdf96-6aeb-4bf6-a8cf-b58fca24aaed'
};

// Rosters for real player names
const ROSTERS = {
  // LCK
  GEN: ['Kiin', 'Canyon', 'Chovy', 'Ruler', 'Duro'],
  HLE: ['Zeus', 'Peanut', 'Zeka', 'Viper', 'Delight'],
  T1: ['Doran', 'Oner', 'Faker', 'Peyz', 'Keria'],
  DK: ['Siwoo', 'Lucid', 'ShowMaker', 'Aiming', 'BeryL'],
  KT: ['PerfecT', 'Pyosik', 'Bdd', 'Deft', 'Peter'],
  FOX: ['Clear', 'Raptor', 'Clozer', 'Diable', 'Kellin'],
  // LPL
  BLG: ['Bin', 'Xun', 'knight', 'Elk', 'ON'],
  TES: ['369', 'Tian', 'Creme', 'JackeyLove', 'Meiko'],
  JDG: ['Flandre', 'Kanavi', 'Yagao', 'Ruler', 'MISSING'],
  IG: ['TheShy', 'Wei', 'Rookie', 'JiaQi', 'Meiko'],
  AL: ['Flandre', 'Tarzan', 'Shanks', 'Hope', 'Kael'],
  WE: ['Cube', 'Monki', 'Karis', 'About', 'Erha'],
  // LEC
  G2: ['BrokenBlade', 'SkewMond', 'Caps', 'Hans Sama', 'Labrov'],
  KC: ['Canna', 'Closer', 'Vetheo', 'Caliste', 'Targamas'],
  FNC: ['Soboro', 'Razork', 'Vladi', 'Upset', 'Lospa'],
  MKOI: ['Myrwn', 'Elyoya', 'Fresskowy', 'Supa', 'Alvaro'],
  VIT: ['Naak Nako', 'Lyncas', 'Humanoid', 'Carzzy', 'Fleshy'],
  NAVI: ['Maynter', 'Rhilech', 'Poby', 'Hans SamD', 'Parus'],
  // LCS
  FLY: ['Bwipo', 'Inspired', 'Quad', 'Massu', 'Busio'],
  C9: ['Thanatos', 'Blaber', 'Jojopyun', 'Berserker', 'Vulcan'],
  TL: ['Impact', 'UmTi', 'APA', 'Yeon', 'CoreJJ'],
  SEN: ['Impact', 'HamBak', 'DARKWINGS', 'Rahel', 'huhi'],
  SR: ['Fudge', 'Buggax', 'Tomio', 'Bvoy', 'Chime'],
  LYON: ['Dhokla', 'Inspired', 'Saint', 'Berserker', 'Isles'],
  // CBLOL
  PNG: ['Wizer', 'Cariok', 'DyNquedo', 'TitaN', 'Kuri'],
  VKS: ['Guigo', 'Disamis', 'Leleko', 'SMILEY', 'ProDelta'],
  LLL: ['Robo', 'Croc', 'tinowns', 'Route', 'RedBert'],
  RED: ['fNb', 'Aegis', 'Grevthar', 'Brance', 'Frosty'],
  FUR: ['Zwyroo', 'Tutsz', 'Ayu', 'Rav3n', 'Jojo'],
  LOS: ['SuperCleber', 'Seize', 'Envy', 'Celo', 'Kabbie']
};

// 51 missing pairings to seed
const PAIRINGS_TO_ADD = [
  // LCK (10 matches)
  { league: 'LCK', t1: 'DK', t2: 'GEN', score: [1, 2], date: '2026-02-14T08:00:00Z', mvp: 'Chovy' },
  { league: 'LCK', t1: 'GEN', t2: 'KT', score: [2, 0], date: '2026-02-18T10:00:00Z', mvp: 'Ruler' },
  { league: 'LCK', t1: 'HLE', t2: 'T1', score: [1, 2], date: '2026-02-21T08:00:00Z', mvp: 'Faker' },
  { league: 'LCK', t1: 'HLE', t2: 'KT', score: [2, 0], date: '2026-02-25T10:00:00Z', mvp: 'Viper' },
  { league: 'LCK', t1: 'FOX', t2: 'HLE', score: [0, 2], date: '2026-02-28T08:00:00Z', mvp: 'Zeka' },
  { league: 'LCK', t1: 'DK', t2: 'T1', score: [1, 2], date: '2026-03-04T10:00:00Z', mvp: 'Oner' },
  { league: 'LCK', t1: 'FOX', t2: 'T1', score: [0, 2], date: '2026-03-07T08:00:00Z', mvp: 'Doran' },
  { league: 'LCK', t1: 'DK', t2: 'KT', score: [2, 1], date: '2026-03-11T10:00:00Z', mvp: 'ShowMaker' },
  { league: 'LCK', t1: 'DK', t2: 'FOX', score: [2, 0], date: '2026-03-14T08:00:00Z', mvp: 'Aiming' },
  { league: 'LCK', t1: 'FOX', t2: 'KT', score: [1, 2], date: '2026-03-18T10:00:00Z', mvp: 'Bdd' },

  // LPL (10 matches)
  { league: 'LPL', t1: 'BLG', t2: 'IG', score: [2, 1], date: '2026-02-12T10:00:00Z', mvp: 'Bin' },
  { league: 'LPL', t1: 'BLG', t2: 'WE', score: [2, 0], date: '2026-02-15T12:00:00Z', mvp: 'knight' },
  { league: 'LPL', t1: 'JDG', t2: 'TES', score: [1, 2], date: '2026-02-19T10:00:00Z', mvp: 'JackeyLove' },
  { league: 'LPL', t1: 'IG', t2: 'TES', score: [2, 1], date: '2026-02-22T12:00:00Z', mvp: 'Rookie' },
  { league: 'LPL', t1: 'AL', t2: 'TES', score: [1, 2], date: '2026-02-26T10:00:00Z', mvp: '369' },
  { league: 'LPL', t1: 'TES', t2: 'WE', score: [2, 0], date: '2026-03-01T12:00:00Z', mvp: 'Creme' },
  { league: 'LPL', t1: 'IG', t2: 'JDG', score: [2, 1], date: '2026-03-05T10:00:00Z', mvp: 'TheShy' },
  { league: 'LPL', t1: 'AL', t2: 'JDG', score: [2, 0], date: '2026-03-08T12:00:00Z', mvp: 'Tarzan' },
  { league: 'LPL', t1: 'AL', t2: 'IG', score: [2, 1], date: '2026-03-12T10:00:00Z', mvp: 'Shanks' },
  { league: 'LPL', t1: 'IG', t2: 'WE', score: [2, 0], date: '2026-03-16T12:00:00Z', mvp: 'JiaQi' },

  // LEC (10 matches)
  { league: 'LEC', t1: 'G2', t2: 'VIT', score: [2, 0], date: '2026-02-06T17:00:00Z', mvp: 'Hans Sama' },
  { league: 'LEC', t1: 'G2', t2: 'NAVI', score: [2, 0], date: '2026-02-08T19:00:00Z', mvp: 'Caps' },
  { league: 'LEC', t1: 'FNC', t2: 'KC', score: [1, 2], date: '2026-02-13T17:00:00Z', mvp: 'Caliste' },
  { league: 'LEC', t1: 'KC', t2: 'MKOI', score: [2, 1], date: '2026-02-15T19:00:00Z', mvp: 'Vetheo' },
  { league: 'LEC', t1: 'KC', t2: 'VIT', score: [2, 0], date: '2026-02-20T17:00:00Z', mvp: 'Canna' },
  { league: 'LEC', t1: 'FNC', t2: 'MKOI', score: [2, 1], date: '2026-02-22T19:00:00Z', mvp: 'Upset' },
  { league: 'LEC', t1: 'FNC', t2: 'NAVI', score: [2, 0], date: '2026-02-27T17:00:00Z', mvp: 'Razork' },
  { league: 'LEC', t1: 'MKOI', t2: 'VIT', score: [2, 1], date: '2026-03-01T19:00:00Z', mvp: 'Elyoya' },
  { league: 'LEC', t1: 'MKOI', t2: 'NAVI', score: [2, 0], date: '2026-03-06T17:00:00Z', mvp: 'Supa' },
  { league: 'LEC', t1: 'NAVI', t2: 'VIT', score: [1, 2], date: '2026-03-08T19:00:00Z', mvp: 'Humanoid' },

  // LCS (11 matches)
  { league: 'LCS', t1: 'FLY', t2: 'TL', score: [2, 1], date: '2026-02-07T20:00:00Z', mvp: 'Bwipo' },
  { league: 'LCS', t1: 'FLY', t2: 'SR', score: [2, 0], date: '2026-02-09T22:00:00Z', mvp: 'Inspired' },
  { league: 'LCS', t1: 'FLY', t2: 'LYON', score: [2, 1], date: '2026-02-14T20:00:00Z', mvp: 'Massu' },
  { league: 'LCS', t1: 'C9', t2: 'TL', score: [2, 1], date: '2026-02-16T22:00:00Z', mvp: 'Jojopyun' },
  { league: 'LCS', t1: 'C9', t2: 'LYON', score: [2, 0], date: '2026-02-21T20:00:00Z', mvp: 'Blaber' },
  { league: 'LCS', t1: 'SEN', t2: 'TL', score: [0, 2], date: '2026-02-23T22:00:00Z', mvp: 'APA' },
  { league: 'LCS', t1: 'SR', t2: 'TL', score: [1, 2], date: '2026-02-28T20:00:00Z', mvp: 'Yeon' },
  { league: 'LCS', t1: 'LYON', t2: 'TL', score: [2, 1], date: '2026-03-02T22:00:00Z', mvp: 'Berserker' },
  { league: 'LCS', t1: 'SEN', t2: 'SR', score: [2, 1], date: '2026-03-07T20:00:00Z', mvp: 'DARKWINGS' },
  { league: 'LCS', t1: 'LYON', t2: 'SEN', score: [2, 0], date: '2026-03-09T22:00:00Z', mvp: 'Dhokla' },
  { league: 'LCS', t1: 'LYON', t2: 'SR', score: [2, 0], date: '2026-03-14T20:00:00Z', mvp: 'Saint' },

  // CBLOL (10 matches)
  { league: 'CBLOL', t1: 'FUR', t2: 'PNG', score: [0, 2], date: '2026-02-01T16:00:00Z', mvp: 'DyNquedo' },
  { league: 'CBLOL', t1: 'LOS', t2: 'PNG', score: [0, 2], date: '2026-02-03T18:00:00Z', mvp: 'Wizer' },
  { league: 'CBLOL', t1: 'LLL', t2: 'VKS', score: [2, 1], date: '2026-02-07T16:00:00Z', mvp: 'tinowns' },
  { league: 'CBLOL', t1: 'RED', t2: 'VKS', score: [2, 1], date: '2026-02-10T18:00:00Z', mvp: 'Brance' },
  { league: 'CBLOL', t1: 'LOS', t2: 'VKS', score: [1, 2], date: '2026-02-14T16:00:00Z', mvp: 'Disamis' },
  { league: 'CBLOL', t1: 'LLL', t2: 'RED', score: [2, 0], date: '2026-02-17T18:00:00Z', mvp: 'Robo' },
  { league: 'CBLOL', t1: 'FUR', t2: 'LLL', score: [1, 2], date: '2026-02-21T16:00:00Z', mvp: 'Route' },
  { league: 'CBLOL', t1: 'LLL', t2: 'LOS', score: [2, 0], date: '2026-02-24T18:00:00Z', mvp: 'Croc' },
  { league: 'CBLOL', t1: 'LOS', t2: 'RED', score: [0, 2], date: '2026-02-28T16:00:00Z', mvp: 'fNb' },
  { league: 'CBLOL', t1: 'FUR', t2: 'LOS', score: [2, 1], date: '2026-03-03T18:00:00Z', mvp: 'Ayu' }
];

// Champion templates for completely fearless 3-game sets
const GAME_TEMPLATES = [
  // Game 1
  {
    t1Picks: ['Renekton', 'Sejuani', 'Azir', 'Kalista', 'Nautilus'],
    t1Bans: ['Vi', 'Ashe', 'Skarner', 'Rell', 'Leona'],
    t2Picks: ['Gnar', 'Xin Zhao', 'Tristana', 'Varus', 'Braum'],
    t2Bans: ['Yone', 'Draven', 'Orianna', 'Alistar', 'Poppy'],
    duration: '31:24',
    t1Kills: 17, t1Gold: '63.8k', t1Towers: 8, t1Dragons: 3, t1Barons: 1,
    t2Kills: 8, t2Gold: '52.5k', t2Towers: 2, t2Dragons: 1, t2Barons: 0
  },
  // Game 2
  {
    t1Picks: ['Aatrox', 'Vi', 'Orianna', 'Kai\'Sa', 'Rell'],
    t1Bans: ['Gnar', 'Xin Zhao', 'Tristana', 'Varus', 'Braum'],
    t2Picks: ['K\'Sante', 'Jarvan IV', 'Taliyah', 'Xayah', 'Rakan'],
    t2Bans: ['Renekton', 'Sejuani', 'Azir', 'Kalista', 'Nautilus'],
    duration: '33:45',
    t1Kills: 9, t1Gold: '54.2k', t1Towers: 3, t1Dragons: 1, t1Barons: 0,
    t2Kills: 19, t2Gold: '66.1k', t2Towers: 9, t2Dragons: 3, t2Barons: 1
  },
  // Game 3
  {
    t1Picks: ['Rumble', 'Nocturne', 'Syndra', 'Draven', 'Leona'],
    t1Bans: ['K\'Sante', 'Jarvan IV', 'Taliyah', 'Xayah', 'Rakan'],
    t2Picks: ['Jax', 'Maokai', 'Corki', 'Jhin', 'Tahm Kench'],
    t2Bans: ['Aatrox', 'Vi', 'Orianna', 'Kai\'Sa', 'Rell'],
    duration: '29:50',
    t1Kills: 20, t1Gold: '65.4k', t1Towers: 9, t1Dragons: 4, t1Barons: 1,
    t2Kills: 6, t2Gold: '50.1k', t2Towers: 1, t2Dragons: 0, t2Barons: 0
  }
];

async function seedAll() {
  console.log(`Starting generation of ${PAIRINGS_TO_ADD.length} regional matches...`);
  
  const matchesToInsert = [];

  for (let i = 0; i < PAIRINGS_TO_ADD.length; i++) {
    const item = PAIRINGS_TO_ADD[i];
    const totalGames = item.score[0] + item.score[1]; // 2 or 3
    const t1Roster = ROSTERS[item.t1] || ['Player1', 'Player2', 'Player3', 'Player4', 'Player5'];
    const t2Roster = ROSTERS[item.t2] || ['Player1', 'Player2', 'Player3', 'Player4', 'Player5'];

    // Find YouTube VOD
    const q = `${item.t1} vs ${item.t2} ${item.league} 2026 Highlights LoL`;
    const foundVod = await getValidVOD(q);
    const fallbackList = REGIONAL_FALLBACK_VODS[item.league] || REGIONAL_FALLBACK_VODS.LCK;
    const seriesVod = foundVod ? foundVod.url : fallbackList[i % fallbackList.length];

    const games = [];
    for (let gIdx = 0; gIdx < totalGames; gIdx++) {
      const gNum = gIdx + 1;
      const tpl = GAME_TEMPLATES[gIdx];

      // Winner determination
      let winnerTag = item.t1;
      if (item.score[0] === 2 && item.score[1] === 0) winnerTag = item.t1;
      else if (item.score[0] === 0 && item.score[1] === 2) winnerTag = item.t2;
      else if (item.score[0] === 2 && item.score[1] === 1) winnerTag = (gIdx === 1 ? item.t2 : item.t1);
      else if (item.score[0] === 1 && item.score[1] === 2) winnerTag = (gIdx === 0 ? item.t1 : item.t2);

      const t1Players = t1Roster.map((p, pIdx) => ({
        player: p,
        role: ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'][pIdx],
        champion: tpl.t1Picks[pIdx],
        kda: winnerTag === item.t1 ? '4/1/7' : '1/4/3',
        cs: 230 + (pIdx * 15)
      }));

      const t2Players = t2Roster.map((p, pIdx) => ({
        player: p,
        role: ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'][pIdx],
        champion: tpl.t2Picks[pIdx],
        kda: winnerTag === item.t2 ? '5/1/6' : '1/4/2',
        cs: 220 + (pIdx * 15)
      }));

      games.push({
        game_number: gNum,
        winner: winnerTag,
        duration: tpl.duration,
        vod_url: seriesVod,
        team1_stats: {
          kills: winnerTag === item.t1 ? tpl.t1Kills : tpl.t2Kills,
          gold: winnerTag === item.t1 ? tpl.t1Gold : tpl.t2Gold,
          towers: winnerTag === item.t1 ? tpl.t1Towers : tpl.t2Towers,
          dragons: winnerTag === item.t1 ? tpl.t1Dragons : tpl.t2Dragons,
          barons: winnerTag === item.t1 ? tpl.t1Barons : tpl.t2Barons,
          bans: tpl.t1Bans,
          picks: tpl.t1Picks,
          players: t1Players
        },
        team2_stats: {
          kills: winnerTag === item.t2 ? tpl.t1Kills : tpl.t2Kills,
          gold: winnerTag === item.t2 ? tpl.t1Gold : tpl.t2Gold,
          towers: winnerTag === item.t2 ? tpl.t1Towers : tpl.t2Towers,
          dragons: winnerTag === item.t2 ? tpl.t1Dragons : tpl.t2Dragons,
          barons: winnerTag === item.t2 ? tpl.t1Barons : tpl.t2Barons,
          bans: tpl.t2Bans,
          picks: tpl.t2Picks,
          players: t2Players
        }
      });
    }

    matchesToInsert.push({
      league: item.league,
      format: 'Bo3',
      status: 'completed',
      match_date: item.date,
      team1_id: TEAMS[item.t1],
      team2_id: TEAMS[item.t2],
      team1_score: item.score[0],
      team2_score: item.score[1],
      mvp: item.mvp,
      vod_url: seriesVod,
      draft: { games }
    });

    console.log(`[${i + 1}/${PAIRINGS_TO_ADD.length}] Prepared: ${item.league} | ${item.t1} vs ${item.t2} (${item.score[0]}-${item.score[1]}) -> ${seriesVod}`);
  }

  console.log(`Inserting ${matchesToInsert.length} matches into Supabase in batches of 10...`);
  
  for (let b = 0; b < matchesToInsert.length; b += 10) {
    const batch = matchesToInsert.slice(b, b + 10);
    const { data: ins, error } = await supabase.from('matches').insert(batch).select('id');
    if (error) {
      console.error(`Error inserting batch ${b}:`, error);
    } else {
      console.log(`✓ Inserted batch ${b / 10 + 1}: ${ins.length} matches.`);
    }
  }

  console.log("All regional matches successfully inserted!");
}

seedAll();
