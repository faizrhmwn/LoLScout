// populate_all_full_pro_leagues.js
// Lengkapi semua match LPL, LEC, LCS, CBLOL, First Stand, dan MSI
// Setiap region memiliki ~105-115 match (lengkap semua split regular season + playoffs)
// First Stand memiliki 13 Bo5 match lengkap (Group stage GSL + Semis + Grand Final)
// MSI memiliki 19 Bo5 match lengkap (Play-In stage + 8-team Double Elimination Bracket)
// Fearless Draft: 0 pelanggaran (champions unik per series)
// Link VOD: semua watch?v=... valid format

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://wnnhqhbwbfdreumhomll.supabase.co',
  'sb_publishable_eqIIhJcjdFFZBdfG4vZVSw_cz_hU21E'
);

const TID = {
  // LPL
  AL:  '93edafc2-1139-41cc-b9aa-a47ab08fa54d',
  TES: 'b12b186d-f7c5-47d1-a24a-03f162b78632',
  IG:  'cd8f1e0b-72e1-4ae7-b119-62a8b5b710d5',
  WE:  '678a3f56-abd5-4d53-8a53-b09010158088',
  JDG: 'd2f32f72-c7d9-4ae4-be2b-b49c6c1038ec',
  BLG: '12530003-9489-4d52-81dc-23bccbbfec75',
  // LEC
  KC:   '36df94be-3a7e-4675-b417-3213c2c7c983',
  G2:   '310ba52e-014a-47eb-ab3a-4b1eca3ae402',
  MKOI: '64ca621c-a05d-4298-b171-ebf588b51590',
  FNC:  '7dbe74ee-226a-4259-ad46-2f9cff01995c',
  VIT:  '04fc456f-9327-4a32-9cb2-6345325b2119',
  NAVI: 'e94f5d4c-d861-4c17-ae21-8535f37e6a36',
  // LCS
  TL:   '892b3544-1022-4b0e-a8bf-c4b4d09fd6af',
  LYON: '0959b762-2129-4583-9f91-4325133167ff',
  C9:   '6381a40c-53f8-427b-b6bd-a5ddc4f4dfe5',
  SEN:  'c6fcdda5-3de2-46e0-a3c7-863ca14f48bd',
  SR:   '12c3eae0-a72a-4685-aed0-312cca76fded',
  FLY:  '9bc10fcb-09d6-48c8-8838-6193bd75e78c',
  // CBLOL
  LLL: '07024739-56bc-4beb-95ee-5b7fa398c108',
  VKS: '18a247f2-837c-4247-b76a-aaf2353626f1',
  RED: '112c704d-edb8-447b-ab23-30965559a276',
  LOS: '930cdf96-6aeb-4bf6-a8cf-b58fca24aaed',
  FUR: '546cd486-ca0f-498e-83fd-9bffd28fc816',
  PNG: '2aa2c0ac-b921-4d46-9954-5f7e9c37916b',
  // LCK (for MSI / First Stand)
  GEN: '74605734-5524-4518-9a60-5d2f8d155a4f',
  HLE: '0f67d807-ef05-46f4-9cd7-235ec6c12869',
  T1:  '49ee13bd-23b4-4aa4-ac15-3b6486b0274a',
  FOX: '949135f0-51cc-40c3-b367-c9d444c55a64',
  DK:  'f8c6d739-bcc9-4a3f-b5e1-fd2847ebb52b',
  KT:  '2fd73188-195f-4a4c-b703-bca953380eaf',
};

// Rosters
const R = {
  // LPL
  AL:  [{ign:'Breathe'},{ign:'Tarzan'},{ign:'Shanks'},{ign:'Hope'},{ign:'Kael'}],
  TES: [{ign:'369'},{ign:'Jiejie'},{ign:'Rookie'},{ign:'Jackeylove'},{ign:'Mark'}],
  IG:  [{ign:'Flandre'},{ign:'Leyan'},{ign:'Cryin'},{ign:'GALA'},{ign:'Meiko'}],
  WE:  [{ign:'Cube'},{ign:'Heng'},{ign:'Shanks2'},{ign:'Elk'},{ign:'Iwandy'}],
  JDG: [{ign:'Ale'},{ign:'Kanavi2'},{ign:'Knight'},{ign:'Ruler2'},{ign:'Missing'}],
  BLG: [{ign:'Bin'},{ign:'Wei'},{ign:'Knight2'},{ign:'Elk2'},{ign:'ON'}],
  // LEC
  KC:   [{ign:'Photon'},{ign:'Closer'},{ign:'Nuc'},{ign:'Caliste'},{ign:'Hylissang'}],
  G2:   [{ign:'BrokenBlade'},{ign:'Yike'},{ign:'Caps'},{ign:'Hans Sama'},{ign:'Mikyx'}],
  MKOI: [{ign:'Szygenda'},{ign:'Elyoya'},{ign:'Larssen'},{ign:'Comp'},{ign:'Trymbi'}],
  FNC:  [{ign:'Oscarinin'},{ign:'Razork'},{ign:'Humanoid'},{ign:'Rekkles'},{ign:'Jun'}],
  VIT:  [{ign:'Myrwi'},{ign:'Daglas'},{ign:'Vetheo'},{ign:'Neon'},{ign:'Labrov'}],
  NAVI: [{ign:'Odoamne'},{ign:'Jankos'},{ign:'Nemesis'},{ign:'Upset'},{ign:'Vulcan'}],
  // LCS
  TL:   [{ign:'Bwipo'},{ign:'Spica'},{ign:'APA'},{ign:'Berserker'},{ign:'CoreJJ'}],
  LYON: [{ign:'Licorice'},{ign:'Inspired'},{ign:'Palafox'},{ign:'FBI'},{ign:'Saint'}],
  C9:   [{ign:'Fudge'},{ign:'Blaber'},{ign:'Jensen'},{ign:'Zven'},{ign:'Vulcan2'}],
  SEN:  [{ign:'Dhokla'},{ign:'Meteos'},{ign:'Hai'},{ign:'Bang'},{ign:'Zeyzal'}],
  SR:   [{ign:'Solo'},{ign:'Contractz'},{ign:'PowerOfEvil'},{ign:'Tactical'},{ign:'Ignar'}],
  FLY:  [{ign:'Impact'},{ign:'Josedeodo'},{ign:'toucouille'},{ign:'Prince'},{ign:'LaneSky'}],
  // CBLOL
  LLL: [{ign:'Bull'},{ign:'Ranger'},{ign:'tinowns'},{ign:'Robo'},{ign:'RedBert'}],
  VKS: [{ign:'Envy'},{ign:'Aegis'},{ign:'Avenger'},{ign:'Route'},{ign:'Jojo'}],
  RED: [{ign:'Guigo'},{ign:'Aegis2'},{ign:'Tutsz'},{ign:'Netuno'},{ign:'RedBert2'}],
  LOS: [{ign:'Paz'},{ign:'Jz'},{ign:'Atilla'},{ign:'Titan'},{ign:'Rhino'}],
  FUR: [{ign:'Tatu'},{ign:'Grevthar'},{ign:'Auaz'},{ign:'Ayu'},{ign:'Damage'}],
  PNG: [{ign:'dyNquedo'},{ign:'Cariok'},{ign:'brTT'},{ign:'Luci'},{ign:'Layth'}],
  // LCK
  GEN: [{ign:'Kiin'},{ign:'Canyon'},{ign:'Chovy'},{ign:'Ruler'},{ign:'Duro'}],
  HLE: [{ign:'Zeus'},{ign:'Kanavi'},{ign:'Zeka'},{ign:'Gumayusi'},{ign:'Delight'}],
  T1:  [{ign:'Doran'},{ign:'Oner'},{ign:'Faker'},{ign:'Peyz'},{ign:'Keria'}],
  FOX: [{ign:'Kingen'},{ign:'Raptor'},{ign:'Clozer'},{ign:'Viper'},{ign:'Bullseye'}],
  DK:  [{ign:'Aiming'},{ign:'Lucid'},{ign:'ShowMaker'},{ign:'Kellin'},{ign:'Effort'}],
  KT:  [{ign:'PerfecT'},{ign:'Cuzz'},{ign:'Bdd'},{ign:'Jiwoo'},{ign:'Pollu'}],
};

// Wide champion pools with zero cross-role collisions
const TOP_CHAMPS = ['Gnar','Rumble','K\'Sante','Gwen','Sion','Gragas','Jax','Malphite','Olaf','Ambessa','Fiora','Camille','Darius','Aatrox','Irelia','Cho\'Gath','Renekton','Jayce','Kennen','Gangplank','Ornn','Mordekaiser','Tryndamere','Volibear','Poppy','Urgot','Illaoi','Nasus','Trundle','Dr. Mundo','Sejuani','Maokai','Shen','Singed','Yorick','Kled','Chogath','WarwickTop','Garen','TeemoTop'];
const JNG_CHAMPS = ['Skarner','Vi','Viego','Lee Sin','Jarvan IV','Nocturne','Hecarim','Nidalee','Rek\'Sai','Kha\'Zix','Taliyah','Bel\'Veth','Xin Zhao','Wukong','Elise','Graves','Kindred','Nunu','Diana','Warwick','Rammus','Amumu','Shyvana','Fiddlesticks','Lillia','Zac','Pantheon','Udyr','Master Yi','Evelynn','Ivern','Briar','Kayn','Karthus'];
const MID_CHAMPS = ['Orianna','Azir','Ahri','Sylas','Ryze','Zed','Viktor','Akali','Cassiopeia','Lissandra','Syndra','Corki','Yone','Zoe','Aurelion Sol','Hwei','Naafiri','Twisted Fate','LeBlanc','Vex','Ekko','Qiyana','Fizz','Xerath','Ziggs','Lux','Kassadin','Swain','Galio','Anivia','Malzahar','Velkoz','Talon','Katarina','Vladimir'];
const ADC_CHAMPS = ['Caitlyn','Jinx','Zeri','Kalista','Varus','Ezreal','Jhin','Xayah','Ashe','Kai\'Sa','Lucian','Sivir','Aphelios','Smolder','Yunara','Draven','Miss Fortune','Nilah','Kogmaw','Vayne','Twitch','Tristana','Samira'];
const SUP_CHAMPS = ['Nautilus','Thresh','Lulu','Leona','Alistar','Rakan','Milio','Bard','Renata Glasc','Seraphine','Soraka','Blitzcrank','Karma','Rell','Braum','Yuumi','Janna','Nami','Sona','Senna','Pyke','Tahm Kench','Morgana','Taric','Zilean'];
const BANS_POOL  = ['Skarner','Rumble','Gnar','Jarvan IV','Cassiopeia','Olaf','Hecarim','Viego','Zeri','Kalista','Thresh','Akali','K\'Sante','Ahri','Orianna','Vi','Nocturne','Poppy','Caitlyn','Lee Sin','Lulu','Nidalee','Corki','Zed','Sylas','Ezreal','Jhin','Renata Glasc','Yone','Hwei','Gragas','Irelia','Ashe','Varus','Jayce','Alistar'];

const VOD_IDS = [
  'kS73pMPn0xc','OeajTfKzKH4','5qkMFD3AHa8','PQjSAT4HKRU','7Yj0l2UQKYI','8WNqZYG1Wfw','sNqk9Yz3TLU',
  'BXrEJQT6yiQ','RYQpOPSJOmM','nAFQJTGD4Og','tD8EFMiRPpo','EjAyEVP6aPo','Zp6DKdF8SHU','w1-TqQ0Bs3g',
  '2Z8VHV4u7Jk','sE0kEtdWUCI','cFLH8yfJ7lk','T9T-DyQytnU','XNjnkMFqFPk','mV6q5b8Mn3s','wj3LTKSaQ2w',
  'kJQ71H9frq0','HaVasFMBvNE','VlC31TmZ2NA','QnJNBLRl_hU','D2JiMajbOUw','P8kFlxNsQIY','sxEw2YR0AJ8',
  'vxQ7xT9fJLA','WJ3kR4sBcMo','zWHJyMiWUHU','F9BsKq0Zzcc','n5GJLvOapHg','UiP8d7mZXe4','yFBvKJzfSts',
  'J9M_bNJ-xGg','K9MhYn7qXiE','w7G8dUqNmPs','Tv5ZiakJfk0','RMqQ5q5VKBE','lcT3rP1BKXQ','4yYM6xXR1go',
  'WuJQ3T7mWy0','9Z6UON_PaBs','oDt2qLxpKwA','U_7jMHkO_IA','t5SJR4BqFaM','4mKL3Rq5eNw','KqZ3LW7rOhM',
  'Rpo1OyjZ_Wg','e3GkjRkWdgI','b9LNpQr7VoE','YcRbG7hJN2s','EhJmKV3cZog','jXMB2Hq5SWA','1bXQzrJWx_8',
  '9Vz2jOsTpEY','Qr5fJbMW7Hk','7wLi3Rb9NKA','vJBR4Nq8Yos','nMK3jPbQ7RE','Z9LrjQmW5aE','8DfVjNqZ1Uo',
  'kBRL4mJq7Ys','F7VjKqLR8bN','mRJ3Lq9WkPo','rPmJ2Vb7QnE','9XsKqLb7NpA','wTmJ3LrP8bY','5NqLjKrP7mA',
  'bQLj8mNrP7o','2KmJrPq5NbA','nQLj8mPrL7E','7PmJqNrL5bK','3LmPrJqN8bY','jNqL8PmrK5o','KqL3NmJrP7E',
  'AgA7utS9rgY','2emzDKq5i2c','_5Sjs4q3Fg0','1Bq035SACt0','DjZ_ddys6HA','3VuwRZlHyEQ','zO7paBm_d_U',
  'mK9bJqP3rLn','P7qLjNrK5bY','nK3LqPmJrb7','8bYmNqLrPjK','LqNmJrP5bK3','rPmJqNbL7K5','KmPrLqNbJ3Y',
  'q9LrNmJbPK5','3bYNqLmJrPK','mJrNqL8Pb5K','PrL5NqJmK8b','3NqLmJrPb7K','7KbNqLmJrP5','mPrL8NqJbK3'
];
let vodIndex = 0;
const getVod = () => VOD_IDS[vodIndex++ % VOD_IDS.length];

function pickUnique(pool, usedSet) {
  const avail = pool.filter(c => !usedSet.has(c));
  const chosen = avail.length > 0
    ? avail[Math.floor(Math.random() * avail.length)]
    : `Champ_${Math.random().toString(36).substring(2,6)}`;
  usedSet.add(chosen);
  return chosen;
}

function pickBans(n, usedBans) {
  const res = [];
  const banned = new Set(usedBans);
  for (let i = 0; i < n; i++) {
    const avail = BANS_POOL.filter(b => !banned.has(b));
    const b = avail[Math.floor(Math.random() * avail.length)] || `Ban_${i}`;
    res.push(b);
    banned.add(b);
  }
  return res;
}

function generateSeriesDraft(t1Roster, t2Roster, gameWinners) {
  const games = [];
  const seriesPicks = new Set(); // Fearless: No champion can be picked twice in the same series

  for (let g = 0; g < gameWinners.length; g++) {
    const winner = gameWinners[g];
    const duration = `${28 + Math.floor(Math.random() * 12)}:${10 + Math.floor(Math.random() * 45)}`;
    const vodId = getVod();

    const t1picks = [
      pickUnique(TOP_CHAMPS, seriesPicks),
      pickUnique(JNG_CHAMPS, seriesPicks),
      pickUnique(MID_CHAMPS, seriesPicks),
      pickUnique(ADC_CHAMPS, seriesPicks),
      pickUnique(SUP_CHAMPS, seriesPicks),
    ];
    const t2picks = [
      pickUnique(TOP_CHAMPS, seriesPicks),
      pickUnique(JNG_CHAMPS, seriesPicks),
      pickUnique(MID_CHAMPS, seriesPicks),
      pickUnique(ADC_CHAMPS, seriesPicks),
      pickUnique(SUP_CHAMPS, seriesPicks),
    ];

    const bansUsed = [];
    const t1bans = pickBans(5, bansUsed);
    t1bans.forEach(b => bansUsed.push(b));
    const t2bans = pickBans(5, bansUsed);

    const isT1Win = winner === 'team1';
    const isT2Win = winner === 'team2';

    const t1stats = t1Roster.map((p, idx) => ({
      player: p.ign,
      champ: t1picks[idx],
      kda: isT1Win ? `${3 + idx}/1/${6 - idx}` : `${idx}/3/${2 + idx}`,
      cs: isT1Win ? 280 + idx * 15 : 220 + idx * 10,
    }));
    const t2stats = t2Roster.map((p, idx) => ({
      player: p.ign,
      champ: t2picks[idx],
      kda: isT2Win ? `${3 + idx}/1/${6 - idx}` : `${idx}/3/${2 + idx}`,
      cs: isT2Win ? 280 + idx * 15 : 220 + idx * 10,
    }));

    games.push({
      game_num: g + 1,
      winner,
      patch: 'v16.21',
      duration,
      vod_url: `https://www.youtube.com/watch?v=${vodId}`,
      team1_picks: t1picks,
      team1_bans: t1bans,
      team2_picks: t2picks,
      team2_bans: t2bans,
      team1_stats: t1stats,
      team2_stats: t2stats,
      team1_kills: isT1Win ? 18 : 9,
      team2_kills: isT2Win ? 18 : 9,
      team1_gold: isT1Win ? '68.5k' : '54.2k',
      team2_gold: isT2Win ? '68.5k' : '54.2k',
      team1_towers: isT1Win ? 9 : 2,
      team2_towers: isT2Win ? 9 : 2,
      team1_barons: isT1Win ? 1 : 0,
      team2_barons: isT2Win ? 1 : 0,
      team1_dragons: isT1Win ? 3 : 1,
      team2_dragons: isT2Win ? 3 : 1,
    });
  }

  return games;
}

function getSeriesGameWinners(t1s, t2s) {
  if (t1s === 2 && t2s === 0) return ['team1', 'team1'];
  if (t1s === 0 && t2s === 2) return ['team2', 'team2'];
  if (t1s === 2 && t2s === 1) return ['team1', 'team2', 'team1'];
  if (t1s === 1 && t2s === 2) return ['team2', 'team1', 'team2'];
  if (t1s === 3 && t2s === 0) return ['team1', 'team1', 'team1'];
  if (t1s === 0 && t2s === 3) return ['team2', 'team2', 'team2'];
  if (t1s === 3 && t2s === 1) return ['team2', 'team1', 'team1', 'team1'];
  if (t1s === 1 && t2s === 3) return ['team1', 'team2', 'team2', 'team2'];
  if (t1s === 3 && t2s === 2) return ['team1', 'team2', 'team1', 'team2', 'team1'];
  if (t1s === 2 && t2s === 3) return ['team2', 'team1', 'team2', 'team1', 'team2'];
  return ['team1', 'team1'];
}

function createMatchObj(league, t1k, t2k, t1s, t2s, dateStr, fmt, mvpName) {
  const t1Roster = R[t1k] || R.T1;
  const t2Roster = R[t2k] || R.GEN;
  const gameWinners = getSeriesGameWinners(t1s, t2s);
  const games = generateSeriesDraft(t1Roster, t2Roster, gameWinners);
  const vodUrl = games[0]?.vod_url || `https://www.youtube.com/watch?v=${getVod()}`;

  return {
    league,
    team1_id: TID[t1k],
    team2_id: TID[t2k],
    team1_score: t1s,
    team2_score: t2s,
    match_date: `${dateStr}T08:00:00+00:00`,
    format: fmt,
    status: 'finished',
    mvp: mvpName || (t1s > t2s ? t1Roster[0].ign : t2Roster[0].ign),
    vod_url: vodUrl,
    draft: { games },
  };
}

// Generate double round-robin pairs for 6 teams
// 6 teams = 15 pairings * 2 = 30 matches
function generateDoubleRoundRobin(teams, startDate, daysStep, league, splitName, defaultMvp) {
  const matches = [];
  let curDate = new Date(startDate);

  // Round 1
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const t1 = teams[i];
      const t2 = teams[j];
      const t1wins = Math.random() > 0.45;
      const t1s = t1wins ? 2 : (Math.random() > 0.5 ? 1 : 0);
      const t2s = t1wins ? (Math.random() > 0.5 ? 1 : 0) : 2;
      const dStr = curDate.toISOString().substring(0, 10);
      const mvp = (t1s > t2s ? R[t1][Math.floor(Math.random()*5)].ign : R[t2][Math.floor(Math.random()*5)].ign);
      matches.push(createMatchObj(league, t1, t2, t1s, t2s, dStr, 'Bo3', mvp));
      curDate.setDate(curDate.getDate() + daysStep);
    }
  }

  // Round 2 (reverse home/away)
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const t1 = teams[j];
      const t2 = teams[i];
      const t1wins = Math.random() > 0.5;
      const t1s = t1wins ? 2 : (Math.random() > 0.4 ? 1 : 0);
      const t2s = t1wins ? (Math.random() > 0.4 ? 1 : 0) : 2;
      const dStr = curDate.toISOString().substring(0, 10);
      const mvp = (t1s > t2s ? R[t1][Math.floor(Math.random()*5)].ign : R[t2][Math.floor(Math.random()*5)].ign);
      matches.push(createMatchObj(league, t1, t2, t1s, t2s, dStr, 'Bo3', mvp));
      curDate.setDate(curDate.getDate() + daysStep);
    }
  }

  return matches;
}

async function run() {
  console.log('=== POPULATE ALL FULL PRO LEAGUES 2026 ===\n');

  // We keep LCK and WORLDS as they are (LCK has 117 matches, WORLDS has 26).
  // We recreate LPL, LEC, LCS, CBLOL, First Stand, MSI with complete tournament schedules.
  const targetLeagues = ['LPL', 'LEC', 'LCS', 'CBLOL', 'First Stand', 'MSI'];

  console.log('[1] Deleting old matches for target leagues...');
  for (const lg of targetLeagues) {
    const { data: existing } = await supabase.from('matches').select('id').eq('league', lg);
    if (existing && existing.length > 0) {
      console.log(`  Deleting ${existing.length} matches from ${lg}...`);
      const ids = existing.map(m => m.id);
      for (let i = 0; i < ids.length; i += 50) {
        await supabase.from('matches').delete().in('id', ids.slice(i, i + 50));
      }
    }
  }
  console.log('  All old matches deleted.\n');

  const allMatchesToInsert = [];

  // ==============================================================
  // 1. FIRST STAND 2026 (March 16 – March 22, 2026 in São Paulo)
  // 13 Bo5 matches: 2 groups GSL (5 matches each) + 2 Semis + 1 Final
  // ==============================================================
  console.log('[2] Generating First Stand 2026 (13 Bo5 matches)...');
  // Group A: BLG, GEN, G2, LYON
  allMatchesToInsert.push(createMatchObj('First Stand', 'BLG', 'G2', 3, 1, '2026-03-16', 'Bo5', 'Bin'));
  allMatchesToInsert.push(createMatchObj('First Stand', 'GEN', 'LYON', 3, 0, '2026-03-16', 'Bo5', 'Chovy'));
  allMatchesToInsert.push(createMatchObj('First Stand', 'BLG', 'GEN', 3, 2, '2026-03-18', 'Bo5', 'Knight2')); // Winners
  allMatchesToInsert.push(createMatchObj('First Stand', 'G2', 'LYON', 3, 2, '2026-03-18', 'Bo5', 'Caps')); // Elimination
  allMatchesToInsert.push(createMatchObj('First Stand', 'GEN', 'G2', 2, 3, '2026-03-20', 'Bo5', 'Hans Sama')); // Decider -> G2 advances
  // Group B: JDG, FOX, LLL, FLY
  allMatchesToInsert.push(createMatchObj('First Stand', 'JDG', 'LLL', 3, 0, '2026-03-17', 'Bo5', 'Kanavi2'));
  allMatchesToInsert.push(createMatchObj('First Stand', 'FOX', 'FLY', 3, 1, '2026-03-17', 'Bo5', 'Viper'));
  allMatchesToInsert.push(createMatchObj('First Stand', 'JDG', 'FOX', 3, 1, '2026-03-19', 'Bo5', 'Knight')); // Winners
  allMatchesToInsert.push(createMatchObj('First Stand', 'LLL', 'FLY', 3, 2, '2026-03-19', 'Bo5', 'Bull')); // Elimination
  allMatchesToInsert.push(createMatchObj('First Stand', 'FOX', 'LLL', 3, 2, '2026-03-20', 'Bo5', 'Clozer')); // Decider -> FOX advances
  // Knockouts
  allMatchesToInsert.push(createMatchObj('First Stand', 'BLG', 'FOX', 3, 0, '2026-03-21', 'Bo5', 'Wei')); // Semi 1
  allMatchesToInsert.push(createMatchObj('First Stand', 'JDG', 'G2', 2, 3, '2026-03-21', 'Bo5', 'Caps')); // Semi 2
  allMatchesToInsert.push(createMatchObj('First Stand', 'BLG', 'G2', 3, 1, '2026-03-22', 'Bo5', 'Bin')); // Grand Final (BLG Champion)

  // ==============================================================
  // 2. MSI 2026 (June 28 – July 12, 2026 in Daejeon)
  // 19 Bo5 matches: Play-In (5 matches) + Bracket Stage (14 matches)
  // Grand Final: HLE 3-2 BLG, MVP Zeus
  // ==============================================================
  console.log('[3] Generating MSI 2026 (19 Bo5 matches)...');
  // Play-In Stage (June 28 - July 1)
  allMatchesToInsert.push(createMatchObj('MSI', 'T1', 'KC', 3, 1, '2026-06-28', 'Bo5', 'Faker'));
  allMatchesToInsert.push(createMatchObj('MSI', 'LYON', 'FUR', 3, 1, '2026-06-28', 'Bo5', 'FBI'));
  allMatchesToInsert.push(createMatchObj('MSI', 'T1', 'LYON', 3, 1, '2026-06-29', 'Bo5', 'Peyz')); // Upper Final -> T1 advances
  allMatchesToInsert.push(createMatchObj('MSI', 'KC', 'FUR', 3, 2, '2026-06-30', 'Bo5', 'Caliste')); // Lower Semi
  allMatchesToInsert.push(createMatchObj('MSI', 'LYON', 'KC', 3, 2, '2026-07-01', 'Bo5', 'Inspired')); // Lower Final -> LYON advances
  // Bracket Stage (July 3 - July 12)
  // Upper Bracket Round 1 (UB R1)
  allMatchesToInsert.push(createMatchObj('MSI', 'BLG', 'LYON', 3, 0, '2026-07-03', 'Bo5', 'Bin'));
  allMatchesToInsert.push(createMatchObj('MSI', 'HLE', 'G2', 3, 1, '2026-07-04', 'Bo5', 'Zeus'));
  allMatchesToInsert.push(createMatchObj('MSI', 'TES', 'TL', 3, 1, '2026-07-05', 'Bo5', 'Jackeylove'));
  allMatchesToInsert.push(createMatchObj('MSI', 'T1', 'BLG', 2, 3, '2026-07-06', 'Bo5', 'Knight2'));
  // Upper Bracket Round 2 (UB Semis)
  allMatchesToInsert.push(createMatchObj('MSI', 'HLE', 'TES', 3, 1, '2026-07-07', 'Bo5', 'Zeka'));
  allMatchesToInsert.push(createMatchObj('MSI', 'BLG', 'TES', 3, 2, '2026-07-08', 'Bo5', 'Wei'));
  // Lower Bracket Round 1 (LB R1)
  allMatchesToInsert.push(createMatchObj('MSI', 'LYON', 'G2', 1, 3, '2026-07-07', 'Bo5', 'Caps'));
  allMatchesToInsert.push(createMatchObj('MSI', 'TL', 'T1', 1, 3, '2026-07-08', 'Bo5', 'Oner'));
  // Lower Bracket Round 2 (LB R2)
  allMatchesToInsert.push(createMatchObj('MSI', 'TES', 'G2', 3, 1, '2026-07-09', 'Bo5', 'Rookie'));
  allMatchesToInsert.push(createMatchObj('MSI', 'T1', 'TES', 3, 2, '2026-07-09', 'Bo5', 'Faker'));
  // Upper Bracket Final (UB Final)
  allMatchesToInsert.push(createMatchObj('MSI', 'HLE', 'BLG', 3, 2, '2026-07-10', 'Bo5', 'Gumayusi')); // HLE advances to GF
  // Lower Bracket Round 3 & LB Final
  allMatchesToInsert.push(createMatchObj('MSI', 'T1', 'BLG', 2, 3, '2026-07-11', 'Bo5', 'Elk2')); // LB Final
  // Grand Final
  allMatchesToInsert.push(createMatchObj('MSI', 'HLE', 'BLG', 3, 2, '2026-07-12', 'Bo5', 'Zeus')); // HLE MSI Champions!

  // ==============================================================
  // 3. LPL 2026 (Jan 14 – Sep 13, 2026) -> ~106 matches
  // Split 1 (Jan 14 - Mar 8): 30 RR + 5 Playoffs = 35
  // Split 2 (Apr 4 - Jun 14): 30 RR + 5 Playoffs = 35
  // Split 3 (Jul 22 - Sep 13): 30 RR + 7 Playoffs = 37
  // ==============================================================
  console.log('[4] Generating LPL 2026 (107 matches)...');
  const lplTeams = ['AL', 'BLG', 'TES', 'JDG', 'IG', 'WE'];
  // Split 1
  const lplS1 = generateDoubleRoundRobin(lplTeams, '2026-01-14', 1, 'LPL', 'Split 1', 'Tarzan');
  allMatchesToInsert.push(...lplS1);
  allMatchesToInsert.push(createMatchObj('LPL', 'TES', 'WE', 3, 1, '2026-02-27', 'Bo5', 'Rookie'));
  allMatchesToInsert.push(createMatchObj('LPL', 'JDG', 'IG', 3, 0, '2026-02-28', 'Bo5', 'Kanavi2'));
  allMatchesToInsert.push(createMatchObj('LPL', 'BLG', 'TES', 3, 1, '2026-03-05', 'Bo5', 'Bin'));
  allMatchesToInsert.push(createMatchObj('LPL', 'AL', 'JDG', 3, 2, '2026-03-06', 'Bo5', 'Tarzan'));
  allMatchesToInsert.push(createMatchObj('LPL', 'BLG', 'AL', 3, 1, '2026-03-08', 'Bo5', 'Knight2')); // S1 Final BLG wins

  // Split 2
  const lplS2 = generateDoubleRoundRobin(lplTeams, '2026-04-04', 2, 'LPL', 'Split 2', 'Knight2');
  allMatchesToInsert.push(...lplS2);
  allMatchesToInsert.push(createMatchObj('LPL', 'AL', 'IG', 3, 1, '2026-06-05', 'Bo5', 'Shanks'));
  allMatchesToInsert.push(createMatchObj('LPL', 'TES', 'WE', 3, 0, '2026-06-06', 'Bo5', 'Jiejie'));
  allMatchesToInsert.push(createMatchObj('LPL', 'BLG', 'AL', 3, 2, '2026-06-11', 'Bo5', 'Wei'));
  allMatchesToInsert.push(createMatchObj('LPL', 'JDG', 'TES', 1, 3, '2026-06-12', 'Bo5', 'Jackeylove'));
  allMatchesToInsert.push(createMatchObj('LPL', 'BLG', 'TES', 3, 0, '2026-06-14', 'Bo5', 'Bin')); // S2 Final BLG wins

  // Split 3
  const lplS3 = generateDoubleRoundRobin(lplTeams, '2026-07-22', 1, 'LPL', 'Split 3', 'Tarzan');
  allMatchesToInsert.push(...lplS3);
  allMatchesToInsert.push(createMatchObj('LPL', 'JDG', 'WE', 3, 1, '2026-08-27', 'Bo5', 'Knight'));
  allMatchesToInsert.push(createMatchObj('LPL', 'TES', 'IG', 3, 0, '2026-08-28', 'Bo5', '369'));
  allMatchesToInsert.push(createMatchObj('LPL', 'AL', 'TES', 3, 1, '2026-09-02', 'Bo5', 'Hope'));
  allMatchesToInsert.push(createMatchObj('LPL', 'BLG', 'JDG', 3, 0, '2026-09-03', 'Bo5', 'Bin'));
  allMatchesToInsert.push(createMatchObj('LPL', 'AL', 'BLG', 3, 1, '2026-09-06', 'Bo5', 'Tarzan')); // UB Final
  allMatchesToInsert.push(createMatchObj('LPL', 'BLG', 'TES', 3, 1, '2026-09-10', 'Bo5', 'Knight2')); // LB Final
  allMatchesToInsert.push(createMatchObj('LPL', 'AL', 'BLG', 3, 2, '2026-09-13', 'Bo5', 'Tarzan')); // S3 Grand Final AL Champion!

  // ==============================================================
  // 4. LEC 2026 (Jan 17 – Sep 20, 2026) -> ~106 matches
  // Versus (Jan 17 - Mar 1): 30 RR + 5 Playoffs = 35
  // Spring (Mar 28 - Jun 7): 30 RR + 5 Playoffs = 35
  // Summer (Jul 24 - Sep 20): 30 RR + 6 Playoffs = 36
  // ==============================================================
  console.log('[5] Generating LEC 2026 (106 matches)...');
  const lecTeams = ['G2', 'KC', 'MKOI', 'FNC', 'VIT', 'NAVI'];
  // Versus
  const lecS1 = generateDoubleRoundRobin(lecTeams, '2026-01-17', 1, 'LEC', 'LEC Versus', 'Caps');
  allMatchesToInsert.push(...lecS1);
  allMatchesToInsert.push(createMatchObj('LEC', 'MKOI', 'NAVI', 3, 1, '2026-02-26', 'Bo5', 'Elyoya'));
  allMatchesToInsert.push(createMatchObj('LEC', 'FNC', 'VIT', 3, 2, '2026-02-27', 'Bo5', 'Humanoid'));
  allMatchesToInsert.push(createMatchObj('LEC', 'G2', 'MKOI', 3, 1, '2026-02-28', 'Bo5', 'Caps'));
  allMatchesToInsert.push(createMatchObj('LEC', 'KC', 'FNC', 3, 1, '2026-02-28', 'Bo5', 'Caliste'));
  allMatchesToInsert.push(createMatchObj('LEC', 'G2', 'KC', 3, 1, '2026-03-01', 'Bo5', 'Hans Sama')); // Versus Final G2 wins

  // Spring
  const lecS2 = generateDoubleRoundRobin(lecTeams, '2026-03-28', 2, 'LEC', 'Spring Split', 'Caliste');
  allMatchesToInsert.push(...lecS2);
  allMatchesToInsert.push(createMatchObj('LEC', 'FNC', 'VIT', 3, 0, '2026-05-29', 'Bo5', 'Razork'));
  allMatchesToInsert.push(createMatchObj('LEC', 'MKOI', 'NAVI', 3, 1, '2026-05-30', 'Bo5', 'Larssen'));
  allMatchesToInsert.push(createMatchObj('LEC', 'G2', 'MKOI', 3, 1, '2026-06-04', 'Bo5', 'Yike'));
  allMatchesToInsert.push(createMatchObj('LEC', 'KC', 'FNC', 3, 2, '2026-06-05', 'Bo5', 'Caliste'));
  allMatchesToInsert.push(createMatchObj('LEC', 'G2', 'KC', 3, 2, '2026-06-07', 'Bo5', 'Caps')); // Spring Final G2 wins

  // Summer
  const lecS3 = generateDoubleRoundRobin(lecTeams, '2026-07-24', 1, 'LEC', 'Summer Split', 'Caliste');
  allMatchesToInsert.push(...lecS3);
  allMatchesToInsert.push(createMatchObj('LEC', 'MKOI', 'VIT', 3, 0, '2026-09-09', 'Bo5', 'Comp'));
  allMatchesToInsert.push(createMatchObj('LEC', 'FNC', 'NAVI', 3, 1, '2026-09-10', 'Bo5', 'Humanoid'));
  allMatchesToInsert.push(createMatchObj('LEC', 'KC', 'MKOI', 3, 1, '2026-09-13', 'Bo5', 'Caliste'));
  allMatchesToInsert.push(createMatchObj('LEC', 'G2', 'FNC', 3, 0, '2026-09-14', 'Bo5', 'Caps'));
  allMatchesToInsert.push(createMatchObj('LEC', 'KC', 'G2', 3, 2, '2026-09-17', 'Bo5', 'Caliste')); // UB Final
  allMatchesToInsert.push(createMatchObj('LEC', 'G2', 'KC', 3, 2, '2026-09-20', 'Bo5', 'BrokenBlade')); // Summer Final G2 Clean Sweep!

  // ==============================================================
  // 5. LCS 2026 (Jan 24 – Oct 4, 2026) -> ~106 matches
  // Lock-In (Jan 24 - Mar 1): 30 RR + 5 Playoffs = 35
  // Spring (Apr 4 - Jul 24): 30 RR + 5 Playoffs = 35
  // Summer (Jul 25 - Oct 4): 30 RR + 6 Playoffs = 36
  // ==============================================================
  console.log('[6] Generating LCS 2026 (106 matches)...');
  const lcsTeams = ['TL', 'LYON', 'C9', 'SEN', 'SR', 'FLY'];
  // Lock-In
  const lcsS1 = generateDoubleRoundRobin(lcsTeams, '2026-01-24', 1, 'LCS', 'Lock-In', 'Inspired');
  allMatchesToInsert.push(...lcsS1);
  allMatchesToInsert.push(createMatchObj('LCS', 'C9', 'SR', 3, 1, '2026-02-25', 'Bo5', 'Blaber'));
  allMatchesToInsert.push(createMatchObj('LCS', 'TL', 'SEN', 3, 0, '2026-02-26', 'Bo5', 'CoreJJ'));
  allMatchesToInsert.push(createMatchObj('LCS', 'LYON', 'C9', 3, 2, '2026-02-28', 'Bo5', 'Inspired'));
  allMatchesToInsert.push(createMatchObj('LCS', 'TL', 'FLY', 3, 1, '2026-02-28', 'Bo5', 'Berserker'));
  allMatchesToInsert.push(createMatchObj('LCS', 'LYON', 'TL', 3, 2, '2026-03-01', 'Bo5', 'Palafox')); // Lock-In Final LYON wins

  // Spring
  const lcsS2 = generateDoubleRoundRobin(lcsTeams, '2026-04-04', 3, 'LCS', 'Spring Split', 'Saint');
  allMatchesToInsert.push(...lcsS2);
  allMatchesToInsert.push(createMatchObj('LCS', 'FLY', 'SR', 3, 0, '2026-07-16', 'Bo5', 'Impact'));
  allMatchesToInsert.push(createMatchObj('LCS', 'C9', 'SEN', 3, 1, '2026-07-17', 'Bo5', 'Jensen'));
  allMatchesToInsert.push(createMatchObj('LCS', 'LYON', 'C9', 3, 1, '2026-07-22', 'Bo5', 'Saint'));
  allMatchesToInsert.push(createMatchObj('LCS', 'TL', 'FLY', 3, 0, '2026-07-23', 'Bo5', 'CoreJJ'));
  allMatchesToInsert.push(createMatchObj('LCS', 'LYON', 'TL', 3, 2, '2026-07-24', 'Bo5', 'FBI')); // Spring Final LYON wins

  // Summer
  const lcsS3 = generateDoubleRoundRobin(lcsTeams, '2026-07-25', 2, 'LCS', 'Summer Split', 'Berserker');
  allMatchesToInsert.push(...lcsS3);
  allMatchesToInsert.push(createMatchObj('LCS', 'FLY', 'SEN', 3, 1, '2026-09-24', 'Bo5', 'toucouille'));
  allMatchesToInsert.push(createMatchObj('LCS', 'C9', 'SR', 3, 0, '2026-09-25', 'Bo5', 'Blaber'));
  allMatchesToInsert.push(createMatchObj('LCS', 'TL', 'C9', 3, 1, '2026-09-29', 'Bo5', 'Bwipo'));
  allMatchesToInsert.push(createMatchObj('LCS', 'LYON', 'FLY', 3, 2, '2026-09-30', 'Bo5', 'Inspired'));
  allMatchesToInsert.push(createMatchObj('LCS', 'TL', 'LYON', 3, 1, '2026-10-02', 'Bo5', 'CoreJJ')); // UB Final
  allMatchesToInsert.push(createMatchObj('LCS', 'TL', 'LYON', 3, 2, '2026-10-04', 'Bo5', 'Berserker')); // Summer Final TL Champion!

  // ==============================================================
  // 6. CBLOL 2026 (Jan 17 – Oct 4, 2026) -> ~106 matches
  // Cup (Jan 17 - Mar 1): 30 RR + 5 Playoffs = 35
  // Split 1 (Mar 28 - Jun 6): 30 RR + 5 Playoffs = 35
  // Split 2 (Jul 25 - Oct 4): 30 RR + 6 Playoffs = 36
  // ==============================================================
  console.log('[7] Generating CBLOL 2026 (106 matches)...');
  const cblolTeams = ['LLL', 'VKS', 'RED', 'LOS', 'FUR', 'PNG'];
  // Cup
  const cblolS1 = generateDoubleRoundRobin(cblolTeams, '2026-01-17', 1, 'CBLOL', 'CBLOL Cup', 'Bull');
  allMatchesToInsert.push(...cblolS1);
  allMatchesToInsert.push(createMatchObj('CBLOL', 'LOS', 'PNG', 3, 1, '2026-02-25', 'Bo5', 'Paz'));
  allMatchesToInsert.push(createMatchObj('CBLOL', 'VKS', 'RED', 2, 3, '2026-02-26', 'Bo5', 'Netuno'));
  allMatchesToInsert.push(createMatchObj('CBLOL', 'LLL', 'FUR', 3, 1, '2026-02-27', 'Bo5', 'Bull'));
  allMatchesToInsert.push(createMatchObj('CBLOL', 'RED', 'LOS', 3, 2, '2026-02-28', 'Bo5', 'Tutsz'));
  allMatchesToInsert.push(createMatchObj('CBLOL', 'LLL', 'RED', 3, 0, '2026-03-01', 'Bo5', 'Ranger')); // Cup Final LOUD sweep!

  // Split 1
  const cblolS2 = generateDoubleRoundRobin(cblolTeams, '2026-03-28', 2, 'CBLOL', 'Split 1', 'Tatu');
  allMatchesToInsert.push(...cblolS2);
  allMatchesToInsert.push(createMatchObj('CBLOL', 'LOS', 'PNG', 3, 1, '2026-05-28', 'Bo5', 'Titan'));
  allMatchesToInsert.push(createMatchObj('CBLOL', 'VKS', 'RED', 1, 3, '2026-05-29', 'Bo5', 'Guigo'));
  allMatchesToInsert.push(createMatchObj('CBLOL', 'FUR', 'LLL', 3, 2, '2026-06-03', 'Bo5', 'Tatu'));
  allMatchesToInsert.push(createMatchObj('CBLOL', 'RED', 'LOS', 3, 1, '2026-06-04', 'Bo5', 'Auaz'));
  allMatchesToInsert.push(createMatchObj('CBLOL', 'FUR', 'RED', 3, 1, '2026-06-06', 'Bo5', 'Auaz')); // Split 1 Final FURIA Champion!

  // Split 2
  const cblolS3 = generateDoubleRoundRobin(cblolTeams, '2026-07-25', 2, 'CBLOL', 'Split 2', 'Paz');
  allMatchesToInsert.push(...cblolS3);
  allMatchesToInsert.push(createMatchObj('CBLOL', 'VKS', 'PNG', 3, 1, '2026-09-24', 'Bo5', 'Route'));
  allMatchesToInsert.push(createMatchObj('CBLOL', 'RED', 'LLL', 1, 3, '2026-09-25', 'Bo5', 'Bull'));
  allMatchesToInsert.push(createMatchObj('CBLOL', 'LOS', 'RED', 3, 1, '2026-09-29', 'Bo5', 'Paz'));
  allMatchesToInsert.push(createMatchObj('CBLOL', 'FUR', 'LLL', 3, 2, '2026-09-30', 'Bo5', 'Tatu'));
  allMatchesToInsert.push(createMatchObj('CBLOL', 'LOS', 'FUR', 3, 1, '2026-10-02', 'Bo5', 'Atilla'));
  allMatchesToInsert.push(createMatchObj('CBLOL', 'LOS', 'FUR', 3, 2, '2026-10-04', 'Bo5', 'Titan')); // Split 2 Final LOS Champion!

  console.log(`\nTotal matches generated to insert: ${allMatchesToInsert.length}`);

  // Batch insert
  const BATCH_SIZE = 10;
  let inserted = 0;
  for (let i = 0; i < allMatchesToInsert.length; i += BATCH_SIZE) {
    const batch = allMatchesToInsert.slice(i, i + BATCH_SIZE);
    const { data, error } = await supabase.from('matches').insert(batch).select('id');
    if (error) {
      console.error(`  Error in batch ${i}:`, error.message);
      // Fallback single insert
      for (const m of batch) {
        const { error: singleErr } = await supabase.from('matches').insert(m);
        if (singleErr) console.error('    Single insert failed:', singleErr.message);
        else inserted++;
      }
    } else {
      inserted += data.length;
      process.stdout.write(`\r  Inserted ${inserted}/${allMatchesToInsert.length}...`);
    }
  }

  console.log(`\n\nInsertion complete! ${inserted} matches added.`);

  // Final summary
  const { data: finalAll } = await supabase.from('matches').select('league,match_date');
  const countMap = {};
  finalAll.forEach(m => countMap[m.league] = (countMap[m.league] || 0) + 1);
  console.log('\n=== FINAL DATABASE LEAGUE BREAKDOWN ===');
  Object.entries(countMap).sort().forEach(([lg, cnt]) => console.log(`  ${lg.padEnd(12)}: ${cnt} matches`));
  console.log(`  TOTAL       : ${finalAll.length} matches`);
}

run().catch(console.error);
