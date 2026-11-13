// fix_lck_v2.js - Fixed fearless draft logic + only update matches (teams sudah ada)
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://wnnhqhbwbfdreumhomll.supabase.co',
  'sb_publishable_eqIIhJcjdFFZBdfG4vZVSw_cz_hU21E'
);

const TEAM_IDS = {
  GEN: '74605734-5524-4518-9a60-5d2f8d155a4f',
  HLE: '0f67d807-ef05-46f4-9cd7-235ec6c12869',
  T1:  '49ee13bd-23b4-4aa4-ac15-3b6486b0274a',
  DK:  'f8c6d739-bcc9-4a3f-b5e1-fd2847ebb52b',
  KT:  '2fd73188-195f-4a4c-b703-bca953380eaf',
  FOX: '949135f0-51cc-40c3-b367-c9d444c55a64',
  NS:  'dce40ec4-5577-4ed1-8b40-12afa09bdc3c',
  DRX: 'b0fbd43a-6c80-4137-a8ad-106fdfe6de5e',
  BRO: '3bf5f52a-ff04-4848-aaf9-c292c3fd58cc',
  DNS: '2afa0bc9-bae2-4584-a037-3ad4a089b588',
};

const ROSTERS = {
  GEN: [{ign:'Kiin'},{ign:'Canyon'},{ign:'Chovy'},{ign:'Ruler'},{ign:'Duro'}],
  HLE: [{ign:'Zeus'},{ign:'Kanavi'},{ign:'Zeka'},{ign:'Gumayusi'},{ign:'Delight'}],
  T1:  [{ign:'Doran'},{ign:'Oner'},{ign:'Faker'},{ign:'Peyz'},{ign:'Keria'}],
  DK:  [{ign:'Aiming'},{ign:'Lucid'},{ign:'ShowMaker'},{ign:'Kellin'},{ign:'Effort'}],
  KT:  [{ign:'PerfecT'},{ign:'Cuzz'},{ign:'Bdd'},{ign:'Jiwoo'},{ign:'Pollu'}],
  FOX: [{ign:'Kingen'},{ign:'Raptor'},{ign:'Clozer'},{ign:'Viper'},{ign:'Bullseye'}],
  NS:  [{ign:'Kingen2'},{ign:'Sponge'},{ign:'Scout'},{ign:'Diable'},{ign:'Lehends'}],
  DRX: [{ign:'DuDu'},{ign:'Pyosik'},{ign:'Ucal'},{ign:'deokdam'},{ign:'Peter'}],
  BRO: [{ign:'Casting'},{ign:'GIDEON'},{ign:'Roamer'},{ign:'Teddy'},{ign:'Namgung'}],
  DNS: [{ign:'Rich'},{ign:'Sharvel'},{ign:'Clozer2'},{ign:'Jiwoo2'},{ign:'Life'}],
};

// Large unique champion pool per role - no overlaps across roles
const TOP_POOL   = ['Gnar','Rumble','K\'Sante','Gwen','Sion','Gragas','Jax','Malphite','Olaf','Ambessa','Fiora','Camille','Darius','Aatrox','Irelia','Cho\'Gath','Renekton','Jayce','Kennen','Gangplank','Ornn','Mordekaiser','Tryndamere','Volibear','Poppy','Urgot','Illaoi','Nasus'];
const JNG_POOL   = ['Skarner','Vi','Viego','Lee Sin','Jarvan IV','Nocturne','Hecarim','Sejuani','Nidalee','Rek\'Sai','Kha\'Zix','Taliyah','Bel\'Veth','Xin Zhao','Wukong','Trundle','Elise','Graves','Kindred','Nunu','Diana','Warwick','Rammus','Amumu','Shyvana','Fiddlesticks'];
const MID_POOL   = ['Orianna','Azir','Ahri','Sylas','Ryze','Zed','Viktor','Akali','Cassiopeia','Lissandra','Syndra','Corki','Yone','Zoe','Aurelion Sol','Hwei','Naafiri','Tristana','Twisted Fate','LeBlanc','Vex','Ekko','Qiyana','Fizz','Xerath','Ziggs','Lux','Jayce'];
const ADC_POOL   = ['Caitlyn','Jinx','Zeri','Kalista','Varus','Ezreal','Jhin','Xayah','Ashe','Kai\'Sa','Lucian','Sivir','Aphelios','Smolder','Yunara','Draven','Miss Fortune','Nilah','Kogmaw','Tristana'];
const SUP_POOL   = ['Nautilus','Thresh','Lulu','Leona','Alistar','Rakan','Milio','Bard','Renata Glasc','Seraphine','Soraka','Blitzcrank','Karma','Rell','Braum','Yuumi','Janna','Nami','Sona','Senna','Pyke','Xerath'];
const BAN_POOL   = ['Skarner','Rumble','Gnar','Jarvan IV','Cassiopeia','Olaf','Hecarim','Viego','Zeri','Kalista','Thresh','Akali','K\'Sante','Ahri','Orianna','Vi','Nocturne','Poppy','Caitlyn','Lee Sin','Lulu','Nidalee','Corki','Zed','Sylas','Ezreal','Jhin','Renata Glasc','Yone','Hwei'];

function pickFrom(pool, exclude) {
  const avail = pool.filter(x => !exclude.has(x));
  if (!avail.length) {
    // fallback: pick any not in exclude from entire pool
    const fallback = ['Teemo','Sivir','Nunu','Rammus','Urgot','Nasus','Illaoi','Tryndamere','Volibear','Gangplank','Mordekaiser','Ornn'];
    const fb = fallback.filter(x => !exclude.has(x));
    return fb[Math.floor(Math.random() * fb.length)] || 'Teemo';
  }
  return avail[Math.floor(Math.random() * avail.length)];
}

function pickBans(n, exclude) {
  const result = [];
  const ex = new Set(exclude);
  for (let i = 0; i < n; i++) {
    const avail = BAN_POOL.filter(x => !ex.has(x));
    const pick = avail[Math.floor(Math.random() * avail.length)] || `BanChamp${i}`;
    result.push(pick);
    ex.add(pick);
  }
  return result;
}

// FEARLESS: usedInSeries tracks ALL picks by BOTH teams across the series
function makeDraftGames(t1r, t2r, scores) {
  const games = [];
  const usedInSeries = new Set(); // fearless: no repeat picks in entire series

  for (let i = 0; i < scores.length; i++) {
    const { winner, duration, vodId } = scores[i];

    // Pick 5 unique champs per team, none used in series before
    const t1picks = [
      pickFrom(TOP_POOL, usedInSeries),
      pickFrom(JNG_POOL, usedInSeries),
      pickFrom(MID_POOL, usedInSeries),
      pickFrom(ADC_POOL, usedInSeries),
      pickFrom(SUP_POOL, usedInSeries),
    ];
    t1picks.forEach(p => usedInSeries.add(p));

    const t2picks = [
      pickFrom(TOP_POOL, usedInSeries),
      pickFrom(JNG_POOL, usedInSeries),
      pickFrom(MID_POOL, usedInSeries),
      pickFrom(ADC_POOL, usedInSeries),
      pickFrom(SUP_POOL, usedInSeries),
    ];
    t2picks.forEach(p => usedInSeries.add(p));

    const bannedSoFar = [];
    const t1bans = pickBans(5, bannedSoFar);
    t1bans.forEach(b => bannedSoFar.push(b));
    const t2bans = pickBans(5, bannedSoFar);

    const t1stats = t1r.map((p, idx) => ({
      player: p.ign, champ: t1picks[idx],
      kda: winner==='team1' ? `${2+idx}/1/${6-idx}` : `${idx}/3/${3+idx}`,
      cs: winner==='team1' ? 280+idx*20 : 220+idx*15
    }));
    const t2stats = t2r.map((p, idx) => ({
      player: p.ign, champ: t2picks[idx],
      kda: winner==='team2' ? `${2+idx}/1/${6-idx}` : `${idx}/3/${3+idx}`,
      cs: winner==='team2' ? 280+idx*20 : 220+idx*15
    }));

    games.push({
      game_num: i+1,
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
      team1_kills: winner==='team1' ? 18 : 10,
      team2_kills: winner==='team2' ? 18 : 10,
      team1_gold: winner==='team1' ? '68.5k' : '54.2k',
      team2_gold: winner==='team2' ? '68.5k' : '54.2k',
      team1_towers: winner==='team1' ? 9 : 2,
      team2_towers: winner==='team2' ? 9 : 2,
      team1_barons: winner==='team1' ? 1 : 0,
      team2_barons: winner==='team2' ? 1 : 0,
      team1_dragons: winner==='team1' ? 3 : 1,
      team2_dragons: winner==='team2' ? 3 : 1,
    });
  }
  return games;
}

// VOD IDs pool
const VODS = [
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
];
let vi = 0;
const nv = () => VODS[vi++ % VODS.length];

// Grand Final real draft (GEN vs HLE, Sep 13 2026)
// Game 1: HLE wins, Game 2-4: GEN wins
function makeGrandFinal() {
  return [
    {
      game_num:1, winner:'team2', patch:'v16.21', duration:'38:10',
      vod_url:'https://www.youtube.com/watch?v=kS73pMPn0xc',
      team1_picks:['Rumble','Vi','Ryze','Lucian','Milio'],
      team1_bans:['Camille','Nocturne','Pantheon','Fiora','Skarner'],
      team2_picks:['Galio','Naafiri','Orianna','Caitlyn','Bard'],
      team2_bans:['Ezreal','Cassiopeia','Olaf','Jhin','Kalista'],
      team1_stats:[{player:'Kiin',champ:'Rumble',kda:'2/4/3',cs:234},{player:'Canyon',champ:'Vi',kda:'3/3/5',cs:178},{player:'Chovy',champ:'Ryze',kda:'3/4/4',cs:312},{player:'Ruler',champ:'Lucian',kda:'4/5/3',cs:298},{player:'Duro',champ:'Milio',kda:'1/4/8',cs:32}],
      team2_stats:[{player:'Zeus',champ:'Galio',kda:'2/2/9',cs:245},{player:'Kanavi',champ:'Naafiri',kda:'4/2/6',cs:201},{player:'Zeka',champ:'Orianna',kda:'5/2/8',cs:331},{player:'Gumayusi',champ:'Caitlyn',kda:'7/2/5',cs:342},{player:'Delight',champ:'Bard',kda:'2/2/13',cs:38}],
      team1_kills:12, team2_kills:20, team1_gold:'58.1k', team2_gold:'72.4k',
      team1_towers:3, team2_towers:10, team1_barons:0, team2_barons:1, team1_dragons:1, team2_dragons:4,
    },
    {
      game_num:2, winner:'team1', patch:'v16.21', duration:'31:20',
      vod_url:'https://www.youtube.com/watch?v=OeajTfKzKH4',
      team1_picks:['Varus','Nocturne','Lissandra','Kalista','Renata Glasc'],
      team1_bans:['Camille','Jayce','Seraphine','Gnar','Cho\'Gath'],
      team2_picks:['Anivia','Jarvan IV','Akali','Yunara','Lulu'],
      team2_bans:['Ezreal','Cassiopeia','Lee Sin','Olaf','Orianna'],
      team1_stats:[{player:'Kiin',champ:'Varus',kda:'3/1/8',cs:267},{player:'Canyon',champ:'Nocturne',kda:'5/2/6',cs:189},{player:'Chovy',champ:'Lissandra',kda:'4/1/9',cs:308},{player:'Ruler',champ:'Kalista',kda:'8/1/6',cs:356},{player:'Duro',champ:'Renata Glasc',kda:'1/1/15',cs:28}],
      team2_stats:[{player:'Zeus',champ:'Anivia',kda:'2/4/3',cs:251},{player:'Kanavi',champ:'Jarvan IV',kda:'3/4/5',cs:195},{player:'Zeka',champ:'Akali',kda:'2/5/3',cs:289},{player:'Gumayusi',champ:'Yunara',kda:'3/5/2',cs:311},{player:'Delight',champ:'Lulu',kda:'0/5/8',cs:34}],
      team1_kills:21, team2_kills:9, team1_gold:'70.2k', team2_gold:'55.8k',
      team1_towers:10, team2_towers:2, team1_barons:1, team2_barons:0, team1_dragons:4, team2_dragons:1,
    },
    {
      game_num:3, winner:'team1', patch:'v16.21', duration:'26:40',
      vod_url:'https://www.youtube.com/watch?v=5qkMFD3AHa8',
      team1_picks:['Sion','Lee Sin','Sylas','Zeri','Yuumi'],
      team1_bans:['Camille','Jayce','Pantheon','Rumble','Orianna'],
      team2_picks:['Dr. Mundo','Cho\'Gath','Syndra','Ashe','Seraphine'],
      team2_bans:['Cassiopeia','Ezreal','Olaf','Kalista','Lissandra'],
      team1_stats:[{player:'Kiin',champ:'Sion',kda:'1/0/12',cs:198},{player:'Canyon',champ:'Lee Sin',kda:'6/1/8',cs:201},{player:'Chovy',champ:'Sylas',kda:'7/1/5',cs:276},{player:'Ruler',champ:'Zeri',kda:'9/0/8',cs:334},{player:'Duro',champ:'Yuumi',kda:'0/1/18',cs:16}],
      team2_stats:[{player:'Zeus',champ:'Dr. Mundo',kda:'1/4/2',cs:224},{player:'Kanavi',champ:'Cho\'Gath',kda:'2/4/3',cs:187},{player:'Zeka',champ:'Syndra',kda:'2/6/1',cs:261},{player:'Gumayusi',champ:'Ashe',kda:'2/5/4',cs:298},{player:'Delight',champ:'Seraphine',kda:'1/4/6',cs:36}],
      team1_kills:23, team2_kills:8, team1_gold:'65.3k', team2_gold:'48.9k',
      team1_towers:11, team2_towers:1, team1_barons:1, team2_barons:0, team1_dragons:3, team2_dragons:0,
    },
    {
      game_num:4, winner:'team1', patch:'v16.21', duration:'34:50',
      vod_url:'https://www.youtube.com/watch?v=PQjSAT4HKRU',
      team1_picks:['Gwen','Trundle','Viktor','Corki','Alistar'],
      team1_bans:['Camille','Jayce','Nocturne','Viego','Hecarim'],
      team2_picks:['Fiora','Skarner','Locke','Jhin','Karma'],
      team2_bans:['Cassiopeia','Ezreal','Lee Sin','Zeri','Naafiri'],
      team1_stats:[{player:'Kiin',champ:'Gwen',kda:'4/2/7',cs:289},{player:'Canyon',champ:'Trundle',kda:'3/2/9',cs:214},{player:'Chovy',champ:'Viktor',kda:'6/1/8',cs:328},{player:'Ruler',champ:'Corki',kda:'7/2/6',cs:341},{player:'Duro',champ:'Alistar',kda:'0/2/18',cs:21}],
      team2_stats:[{player:'Zeus',champ:'Fiora',kda:'3/4/2',cs:267},{player:'Kanavi',champ:'Skarner',kda:'2/5/4',cs:198},{player:'Zeka',champ:'Locke',kda:'2/5/3',cs:278},{player:'Gumayusi',champ:'Jhin',kda:'4/5/3',cs:312},{player:'Delight',champ:'Karma',kda:'1/4/8',cs:33}],
      team1_kills:20, team2_kills:12, team1_gold:'72.1k', team2_gold:'62.4k',
      team1_towers:9, team2_towers:4, team1_barons:2, team2_barons:0, team1_dragons:3, team2_dragons:1,
    },
  ];
}

function bo3Scores(t1s, t2s) {
  if (t1s===2&&t2s===0) return [{winner:'team1',duration:'31:20'},{winner:'team1',duration:'28:45'}];
  if (t1s===0&&t2s===2) return [{winner:'team2',duration:'33:10'},{winner:'team2',duration:'29:50'}];
  if (t1s===2&&t2s===1) return [{winner:'team1',duration:'32:30'},{winner:'team2',duration:'35:15'},{winner:'team1',duration:'29:40'}];
  return [{winner:'team2',duration:'30:50'},{winner:'team1',duration:'34:20'},{winner:'team2',duration:'31:10'}];
}

function bo5Scores(t1s, t2s) {
  if (t1s===3&&t2s===0) return [{winner:'team1',duration:'31:00'},{winner:'team1',duration:'27:30'},{winner:'team1',duration:'33:10'}];
  if (t1s===3&&t2s===1) return [{winner:'team2',duration:'34:20'},{winner:'team1',duration:'31:50'},{winner:'team1',duration:'28:40'},{winner:'team1',duration:'36:10'}];
  if (t1s===3&&t2s===2) return [{winner:'team1',duration:'34:00'},{winner:'team2',duration:'31:20'},{winner:'team1',duration:'29:30'},{winner:'team2',duration:'38:00'},{winner:'team1',duration:'33:50'}];
  if (t1s===1&&t2s===3) return [{winner:'team1',duration:'33:00'},{winner:'team2',duration:'30:00'},{winner:'team2',duration:'29:00'},{winner:'team2',duration:'31:00'}];
  if (t1s===2&&t2s===3) return [{winner:'team1',duration:'32:00'},{winner:'team2',duration:'30:00'},{winner:'team2',duration:'29:00'},{winner:'team1',duration:'34:00'},{winner:'team2',duration:'33:00'}];
  return [{winner:'team2',duration:'30:00'},{winner:'team2',duration:'28:00'},{winner:'team2',duration:'32:00'}]; // 0-3
}

function makeBo3(t1r, t2r, t1s, t2s) {
  const sc = bo3Scores(t1s,t2s).map(s=>({...s,vodId:nv()}));
  return makeDraftGames(t1r,t2r,sc);
}

function makeBo5(t1r, t2r, t1s, t2s) {
  const sc = bo5Scores(t1s,t2s).map(s=>({...s,vodId:nv()}));
  return makeDraftGames(t1r,t2r,sc);
}

const matches = [];
function add(league, t1k, t2k, t1s, t2s, date, fmt, mvp, games) {
  const vodUrl = `https://www.youtube.com/watch?v=${games[0]?.vod_url?.split('v=')[1] || nv()}`;
  matches.push({
    league, team1_id:TEAM_IDS[t1k], team2_id:TEAM_IDS[t2k],
    team1_score:t1s, team2_score:t2s,
    match_date:`${date}T08:00:00+00:00`,
    format:fmt, status:'finished', mvp, vod_url:vodUrl,
    draft:{games},
  });
}

// === ROUNDS 1-2 (Apr 1 - May 31, 2026) ===
// Week 1
add('LCK','HLE','BRO',2,0,'2026-04-01','Bo3','Zeus',       makeBo3(ROSTERS.HLE,ROSTERS.BRO,2,0));
add('LCK','T1','KT',0,2,'2026-04-01','Bo3','Bdd',          makeBo3(ROSTERS.T1,ROSTERS.KT,0,2));
add('LCK','DK','NS',0,2,'2026-04-02','Bo3','Scout',        makeBo3(ROSTERS.DK,ROSTERS.NS,0,2));
add('LCK','GEN','FOX',2,0,'2026-04-02','Bo3','Chovy',      makeBo3(ROSTERS.GEN,ROSTERS.FOX,2,0));
add('LCK','DRX','DNS',2,0,'2026-04-03','Bo3','DuDu',       makeBo3(ROSTERS.DRX,ROSTERS.DNS,2,0));
add('LCK','T1','HLE',2,1,'2026-04-04','Bo3','Faker',       makeBo3(ROSTERS.T1,ROSTERS.HLE,2,1));
add('LCK','KT','GEN',2,1,'2026-04-05','Bo3','Jiwoo',       makeBo3(ROSTERS.KT,ROSTERS.GEN,2,1));
add('LCK','FOX','DRX',2,0,'2026-04-05','Bo3','Viper',      makeBo3(ROSTERS.FOX,ROSTERS.DRX,2,0));
// Week 2
add('LCK','GEN','HLE',1,2,'2026-04-08','Bo3','Zeka',       makeBo3(ROSTERS.GEN,ROSTERS.HLE,1,2));
add('LCK','DK','KT',0,2,'2026-04-09','Bo3','PerfecT',      makeBo3(ROSTERS.DK,ROSTERS.KT,0,2));
add('LCK','DRX','BRO',1,2,'2026-04-09','Bo3','Teddy',      makeBo3(ROSTERS.DRX,ROSTERS.BRO,1,2));
add('LCK','NS','FOX',2,1,'2026-04-10','Bo3','Scout',       makeBo3(ROSTERS.NS,ROSTERS.FOX,2,1));
add('LCK','T1','DK',2,0,'2026-04-11','Bo3','Doran',        makeBo3(ROSTERS.T1,ROSTERS.DK,2,0));
add('LCK','HLE','DRX',2,0,'2026-04-12','Bo3','Kanavi',     makeBo3(ROSTERS.HLE,ROSTERS.DRX,2,0));
add('LCK','KT','NS',2,1,'2026-04-12','Bo3','Bdd',          makeBo3(ROSTERS.KT,ROSTERS.NS,2,1));
// Week 3
add('LCK','HLE','GEN',2,0,'2026-04-15','Bo3','Zeus',       makeBo3(ROSTERS.HLE,ROSTERS.GEN,2,0));
add('LCK','T1','BRO',2,0,'2026-04-16','Bo3','Peyz',        makeBo3(ROSTERS.T1,ROSTERS.BRO,2,0));
add('LCK','DK','DNS',2,0,'2026-04-16','Bo3','ShowMaker',   makeBo3(ROSTERS.DK,ROSTERS.DNS,2,0));
add('LCK','FOX','KT',0,2,'2026-04-17','Bo3','Cuzz',        makeBo3(ROSTERS.FOX,ROSTERS.KT,0,2));
add('LCK','GEN','T1',2,1,'2026-04-18','Bo3','Canyon',      makeBo3(ROSTERS.GEN,ROSTERS.T1,2,1));
add('LCK','HLE','NS',2,0,'2026-04-19','Bo3','Gumayusi',    makeBo3(ROSTERS.HLE,ROSTERS.NS,2,0));
add('LCK','DRX','DNS',2,0,'2026-04-19','Bo3','Ucal',       makeBo3(ROSTERS.DRX,ROSTERS.DNS,2,0));
// Week 4
add('LCK','KT','HLE',1,2,'2026-04-22','Bo3','Zeka',        makeBo3(ROSTERS.KT,ROSTERS.HLE,1,2));
add('LCK','T1','NS',2,0,'2026-04-23','Bo3','Faker',        makeBo3(ROSTERS.T1,ROSTERS.NS,2,0));
add('LCK','GEN','DK',2,0,'2026-04-23','Bo3','Ruler',       makeBo3(ROSTERS.GEN,ROSTERS.DK,2,0));
add('LCK','BRO','DNS',2,0,'2026-04-24','Bo3','Roamer',     makeBo3(ROSTERS.BRO,ROSTERS.DNS,2,0));
add('LCK','HLE','DK',2,0,'2026-04-25','Bo3','Kanavi',      makeBo3(ROSTERS.HLE,ROSTERS.DK,2,0));
add('LCK','FOX','BRO',1,2,'2026-04-25','Bo3','Teddy',      makeBo3(ROSTERS.FOX,ROSTERS.BRO,1,2));
add('LCK','KT','DRX',2,0,'2026-04-26','Bo3','Jiwoo',       makeBo3(ROSTERS.KT,ROSTERS.DRX,2,0));
// Week 5
add('LCK','T1','GEN',1,2,'2026-04-29','Bo3','Chovy',       makeBo3(ROSTERS.T1,ROSTERS.GEN,1,2));
add('LCK','HLE','KT',2,0,'2026-04-30','Bo3','Zeus',        makeBo3(ROSTERS.HLE,ROSTERS.KT,2,0));
add('LCK','DK','DRX',2,0,'2026-04-30','Bo3','ShowMaker',   makeBo3(ROSTERS.DK,ROSTERS.DRX,2,0));
add('LCK','NS','BRO',2,1,'2026-05-01','Bo3','Scout',       makeBo3(ROSTERS.NS,ROSTERS.BRO,2,1));
add('LCK','GEN','FOX',2,0,'2026-05-02','Bo3','Canyon',     makeBo3(ROSTERS.GEN,ROSTERS.FOX,2,0));
add('LCK','T1','DRX',2,0,'2026-05-03','Bo3','Peyz',        makeBo3(ROSTERS.T1,ROSTERS.DRX,2,0));
add('LCK','DNS','FOX',0,2,'2026-05-03','Bo3','Viper',      makeBo3(ROSTERS.DNS,ROSTERS.FOX,0,2));
// Week 6
add('LCK','HLE','T1',2,0,'2026-05-06','Bo3','Zeka',        makeBo3(ROSTERS.HLE,ROSTERS.T1,2,0));
add('LCK','GEN','KT',2,1,'2026-05-07','Bo3','Chovy',       makeBo3(ROSTERS.GEN,ROSTERS.KT,2,1));
add('LCK','DK','BRO',2,0,'2026-05-07','Bo3','ShowMaker',   makeBo3(ROSTERS.DK,ROSTERS.BRO,2,0));
add('LCK','NS','DRX',2,1,'2026-05-08','Bo3','Scout',       makeBo3(ROSTERS.NS,ROSTERS.DRX,2,1));
add('LCK','FOX','DNS',2,0,'2026-05-09','Bo3','Clozer',     makeBo3(ROSTERS.FOX,ROSTERS.DNS,2,0));
add('LCK','HLE','FOX',2,0,'2026-05-10','Bo3','Gumayusi',   makeBo3(ROSTERS.HLE,ROSTERS.FOX,2,0));
add('LCK','KT','BRO',2,0,'2026-05-10','Bo3','Jiwoo',       makeBo3(ROSTERS.KT,ROSTERS.BRO,2,0));
// Week 7
add('LCK','BRO','HLE',0,2,'2026-05-13','Bo3','Zeus',       makeBo3(ROSTERS.BRO,ROSTERS.HLE,0,2));
add('LCK','KT','T1',2,1,'2026-05-14','Bo3','Bdd',          makeBo3(ROSTERS.KT,ROSTERS.T1,2,1));
add('LCK','NS','DK',1,2,'2026-05-14','Bo3','Lucid',        makeBo3(ROSTERS.NS,ROSTERS.DK,1,2));
add('LCK','FOX','GEN',0,2,'2026-05-15','Bo3','Ruler',      makeBo3(ROSTERS.FOX,ROSTERS.GEN,0,2));
add('LCK','DNS','DRX',0,2,'2026-05-15','Bo3','DuDu',       makeBo3(ROSTERS.DNS,ROSTERS.DRX,0,2));
add('LCK','HLE','T1',2,1,'2026-05-16','Bo3','Zeka',        makeBo3(ROSTERS.HLE,ROSTERS.T1,2,1));
add('LCK','GEN','KT',2,1,'2026-05-17','Bo3','Canyon',      makeBo3(ROSTERS.GEN,ROSTERS.KT,2,1));
// Week 8
add('LCK','T1','FOX',2,0,'2026-05-20','Bo3','Faker',       makeBo3(ROSTERS.T1,ROSTERS.FOX,2,0));
add('LCK','DK','HLE',0,2,'2026-05-21','Bo3','Kanavi',      makeBo3(ROSTERS.DK,ROSTERS.HLE,0,2));
add('LCK','BRO','DRX',2,0,'2026-05-21','Bo3','Roamer',     makeBo3(ROSTERS.BRO,ROSTERS.DRX,2,0));
add('LCK','NS','GEN',0,2,'2026-05-22','Bo3','Chovy',       makeBo3(ROSTERS.NS,ROSTERS.GEN,0,2));
add('LCK','KT','DK',2,0,'2026-05-23','Bo3','PerfecT',      makeBo3(ROSTERS.KT,ROSTERS.DK,2,0));
add('LCK','HLE','BRO',2,0,'2026-05-24','Bo3','Zeus',       makeBo3(ROSTERS.HLE,ROSTERS.BRO,2,0));
add('LCK','DRX','FOX',1,2,'2026-05-24','Bo3','Viper',      makeBo3(ROSTERS.DRX,ROSTERS.FOX,1,2));
// Week 9
add('LCK','T1','KT',2,1,'2026-05-27','Bo3','Doran',        makeBo3(ROSTERS.T1,ROSTERS.KT,2,1));
add('LCK','GEN','DK',2,1,'2026-05-28','Bo3','Ruler',       makeBo3(ROSTERS.GEN,ROSTERS.DK,2,1));
add('LCK','BRO','NS',1,2,'2026-05-28','Bo3','Scout',       makeBo3(ROSTERS.BRO,ROSTERS.NS,1,2));
add('LCK','DNS','BRO',0,2,'2026-05-29','Bo3','Casting',    makeBo3(ROSTERS.DNS,ROSTERS.BRO,0,2));
add('LCK','HLE','GEN',2,1,'2026-05-30','Bo3','Zeka',       makeBo3(ROSTERS.HLE,ROSTERS.GEN,2,1));
add('LCK','T1','DK',2,0,'2026-05-31','Bo3','Peyz',         makeBo3(ROSTERS.T1,ROSTERS.DK,2,0));
add('LCK','KT','FOX',2,0,'2026-05-31','Bo3','Jiwoo',       makeBo3(ROSTERS.KT,ROSTERS.FOX,2,0));

// === ROUNDS 3-4 (Jul 29 - Aug 23, 2026) ===
// Legend Group: GEN, HLE, T1, DK, KT
// Week 10
add('LCK','GEN','T1',2,0,'2026-07-29','Bo3','Canyon',      makeBo3(ROSTERS.GEN,ROSTERS.T1,2,0));
add('LCK','HLE','KT',1,2,'2026-07-30','Bo3','Bdd',         makeBo3(ROSTERS.HLE,ROSTERS.KT,1,2));
add('LCK','DK','T1',2,1,'2026-07-30','Bo3','Aiming',       makeBo3(ROSTERS.DK,ROSTERS.T1,2,1));
add('LCK','GEN','HLE',2,0,'2026-07-31','Bo3','Chovy',      makeBo3(ROSTERS.GEN,ROSTERS.HLE,2,0));
add('LCK','KT','DK',0,2,'2026-08-01','Bo3','ShowMaker',    makeBo3(ROSTERS.KT,ROSTERS.DK,0,2));
// Rise Group: NS, BRO, FOX, DRX, DNS
add('LCK','NS','DRX',2,1,'2026-07-29','Bo3','Scout',       makeBo3(ROSTERS.NS,ROSTERS.DRX,2,1));
add('LCK','BRO','FOX',2,1,'2026-07-30','Bo3','Roamer',     makeBo3(ROSTERS.BRO,ROSTERS.FOX,2,1));
add('LCK','DNS','NS',0,2,'2026-07-31','Bo3','Sponge',      makeBo3(ROSTERS.DNS,ROSTERS.NS,0,2));
add('LCK','FOX','DRX',2,1,'2026-08-01','Bo3','Viper',      makeBo3(ROSTERS.FOX,ROSTERS.DRX,2,1));
add('LCK','BRO','DNS',2,0,'2026-08-02','Bo3','Teddy',      makeBo3(ROSTERS.BRO,ROSTERS.DNS,2,0));
// Week 11
add('LCK','HLE','DK',2,0,'2026-08-05','Bo3','Zeus',        makeBo3(ROSTERS.HLE,ROSTERS.DK,2,0));
add('LCK','T1','KT',0,2,'2026-08-06','Bo3','Jiwoo',        makeBo3(ROSTERS.T1,ROSTERS.KT,0,2));
add('LCK','GEN','DK',2,1,'2026-08-07','Bo3','Ruler',       makeBo3(ROSTERS.GEN,ROSTERS.DK,2,1));
add('LCK','HLE','T1',2,0,'2026-08-08','Bo3','Kanavi',      makeBo3(ROSTERS.HLE,ROSTERS.T1,2,0));
add('LCK','GEN','KT',2,1,'2026-08-09','Bo3','Canyon',      makeBo3(ROSTERS.GEN,ROSTERS.KT,2,1));
add('LCK','NS','BRO',1,2,'2026-08-05','Bo3','Casting',     makeBo3(ROSTERS.NS,ROSTERS.BRO,1,2));
add('LCK','DRX','DNS',2,0,'2026-08-06','Bo3','Ucal',       makeBo3(ROSTERS.DRX,ROSTERS.DNS,2,0));
add('LCK','FOX','NS',0,2,'2026-08-07','Bo3','Lehends',     makeBo3(ROSTERS.FOX,ROSTERS.NS,0,2));
add('LCK','BRO','DRX',2,0,'2026-08-08','Bo3','GIDEON',     makeBo3(ROSTERS.BRO,ROSTERS.DRX,2,0));
add('LCK','DNS','FOX',0,2,'2026-08-09','Bo3','Viper',      makeBo3(ROSTERS.DNS,ROSTERS.FOX,0,2));
// Week 12
add('LCK','T1','DK',0,2,'2026-08-12','Bo3','ShowMaker',    makeBo3(ROSTERS.T1,ROSTERS.DK,0,2));
add('LCK','HLE','KT',1,2,'2026-08-13','Bo3','PerfecT',     makeBo3(ROSTERS.HLE,ROSTERS.KT,1,2));
add('LCK','GEN','T1',2,0,'2026-08-14','Bo3','Chovy',       makeBo3(ROSTERS.GEN,ROSTERS.T1,2,0));
add('LCK','DK','KT',2,0,'2026-08-15','Bo3','Lucid',        makeBo3(ROSTERS.DK,ROSTERS.KT,2,0));
add('LCK','HLE','GEN',0,2,'2026-08-16','Bo3','Canyon',     makeBo3(ROSTERS.HLE,ROSTERS.GEN,0,2));
add('LCK','NS','FOX',2,1,'2026-08-12','Bo3','Diable',      makeBo3(ROSTERS.NS,ROSTERS.FOX,2,1));
add('LCK','DRX','BRO',0,2,'2026-08-13','Bo3','Roamer',     makeBo3(ROSTERS.DRX,ROSTERS.BRO,0,2));
add('LCK','BRO','NS',1,2,'2026-08-14','Bo3','Kingen2',     makeBo3(ROSTERS.BRO,ROSTERS.NS,1,2));
add('LCK','FOX','DRX',2,1,'2026-08-15','Bo3','Clozer',     makeBo3(ROSTERS.FOX,ROSTERS.DRX,2,1));
add('LCK','DNS','BRO',0,2,'2026-08-16','Bo3','Teddy',      makeBo3(ROSTERS.DNS,ROSTERS.BRO,0,2));
// Week 13
add('LCK','HLE','T1',2,0,'2026-08-19','Bo3','Zeka',        makeBo3(ROSTERS.HLE,ROSTERS.T1,2,0));
add('LCK','GEN','DK',2,1,'2026-08-20','Bo3','Ruler',       makeBo3(ROSTERS.GEN,ROSTERS.DK,2,1));
add('LCK','KT','T1',2,1,'2026-08-21','Bo3','Bdd',          makeBo3(ROSTERS.KT,ROSTERS.T1,2,1));
add('LCK','HLE','DK',2,0,'2026-08-22','Bo3','Zeus',        makeBo3(ROSTERS.HLE,ROSTERS.DK,2,0));
add('LCK','GEN','KT',2,1,'2026-08-23','Bo3','Canyon',      makeBo3(ROSTERS.GEN,ROSTERS.KT,2,1));
add('LCK','NS','DNS',2,0,'2026-08-19','Bo3','Sponge',      makeBo3(ROSTERS.NS,ROSTERS.DNS,2,0));
add('LCK','DRX','FOX',1,2,'2026-08-20','Bo3','Raptor',     makeBo3(ROSTERS.DRX,ROSTERS.FOX,1,2));
add('LCK','BRO','FOX',2,1,'2026-08-21','Bo3','GIDEON',     makeBo3(ROSTERS.BRO,ROSTERS.FOX,2,1));
add('LCK','NS','DRX',2,0,'2026-08-22','Bo3','Scout',       makeBo3(ROSTERS.NS,ROSTERS.DRX,2,0));
add('LCK','DNS','DRX',0,2,'2026-08-23','Bo3','Ucal',       makeBo3(ROSTERS.DNS,ROSTERS.DRX,0,2));

// === PLAY-IN (Aug 26-28) ===
add('LCK','KT','BRO',3,2,'2026-08-26','Bo5','Jiwoo',       makeBo5(ROSTERS.KT,ROSTERS.BRO,3,2));
add('LCK','NS','FOX',1,3,'2026-08-27','Bo5','Clozer',      makeBo5(ROSTERS.NS,ROSTERS.FOX,1,3));
add('LCK','BRO','FOX',3,2,'2026-08-28','Bo5','Roamer',     makeBo5(ROSTERS.BRO,ROSTERS.FOX,3,2));

// === PLAYOFFS (Aug 29 - Sep 10) ===
add('LCK','KT','DK',3,0,'2026-08-29','Bo5','Jiwoo',        makeBo5(ROSTERS.KT,ROSTERS.DK,3,0));
add('LCK','HLE','T1',3,2,'2026-08-30','Bo5','Zeka',        makeBo5(ROSTERS.HLE,ROSTERS.T1,3,2));
add('LCK','T1','BRO',3,1,'2026-09-01','Bo5','Faker',       makeBo5(ROSTERS.T1,ROSTERS.BRO,3,1));
add('LCK','GEN','KT',3,0,'2026-09-03','Bo5','Canyon',      makeBo5(ROSTERS.GEN,ROSTERS.KT,3,0));
add('LCK','HLE','BRO',3,1,'2026-09-04','Bo5','Zeus',       makeBo5(ROSTERS.HLE,ROSTERS.BRO,3,1));
add('LCK','T1','DK',3,1,'2026-09-05','Bo5','Doran',        makeBo5(ROSTERS.T1,ROSTERS.DK,3,1));
add('LCK','GEN','HLE',3,1,'2026-09-07','Bo5','Chovy',      makeBo5(ROSTERS.GEN,ROSTERS.HLE,3,1));
add('LCK','HLE','T1',3,1,'2026-09-10','Bo5','Zeka',        makeBo5(ROSTERS.HLE,ROSTERS.T1,3,1));

// === GRAND FINAL (Sep 13) - REAL DATA ===
// Delete existing a05af5d3 dan re-insert dengan real picks
// Kita update langsung via upsert match yang match_date Sep 13
// (tidak perlu delete, kita tambah dengan match berbeda)
// Actually Grand Final sudah ada di DB (a05af5d3) - kita update draftnya saja
// Jadi tidak perlu insert ulang, tapi kita akan update draft dengan real data
// => Ini ditangani di bagian update bawah

async function run() {
  console.log('=== LCK 2026 V2 Fix ===');

  // Delete semua LCK matches kecuali Jun 7 (Road to MSI) dan Sep 13 (Grand Final)
  console.log('[1] Deleting wrong LCK matches...');
  const {data: allLck} = await supabase.from('matches').select('id,match_date').eq('league','LCK');
  const toDelete = allLck?.filter(m => {
    const d = m.match_date?.substring(0,10);
    return d !== '2026-06-07' && d !== '2026-09-13';
  }).map(m => m.id) || [];
  console.log(`  Deleting ${toDelete.length} matches...`);
  if (toDelete.length > 0) {
    const {error} = await supabase.from('matches').delete().in('id', toDelete);
    if (error) console.log('  Error:', error.message);
    else console.log('  OK');
  }

  // Update Grand Final draft dengan real data
  console.log('[2] Updating Grand Final draft with real picks/bans...');
  const {data: gfMatch} = await supabase.from('matches').select('id').eq('league','LCK').eq('match_date','2026-09-13T08:00:00+00:00').single();
  if (gfMatch) {
    const {error} = await supabase.from('matches').update({
      draft: { games: makeGrandFinal() },
      vod_url: 'https://www.youtube.com/watch?v=kS73pMPn0xc',
      mvp: 'Ruler',
    }).eq('id', gfMatch.id);
    if (error) console.log('  GF update error:', error.message);
    else console.log('  Grand Final updated with real picks/bans');
  } else {
    console.log('  Grand Final match not found by exact date, trying range...');
    const {data: gfMatches} = await supabase.from('matches').select('id,match_date').eq('league','LCK').gte('match_date','2026-09-13').lte('match_date','2026-09-14');
    if (gfMatches?.[0]) {
      await supabase.from('matches').update({
        draft: { games: makeGrandFinal() },
        vod_url: 'https://www.youtube.com/watch?v=kS73pMPn0xc',
        mvp: 'Ruler',
      }).eq('id', gfMatches[0].id);
      console.log('  Grand Final updated');
    }
  }

  // Insert all new matches
  console.log(`[3] Inserting ${matches.length} LCK matches...`);
  let inserted = 0;
  const BATCH = 5;
  for (let i = 0; i < matches.length; i += BATCH) {
    const batch = matches.slice(i, i + BATCH);
    const {data, error} = await supabase.from('matches').insert(batch).select('id');
    if (error) {
      console.log(`  Batch ${Math.floor(i/BATCH)+1} error:`, error.message);
      // Try one by one
      for (const m of batch) {
        const {data: d2, error: e2} = await supabase.from('matches').insert(m).select('id');
        if (e2) console.log('    Single insert error:', e2.message, JSON.stringify(m).substring(0,100));
        else inserted++;
      }
    } else {
      inserted += data.length;
      process.stdout.write(`\r  Inserted ${inserted}/${matches.length}...`);
    }
  }
  console.log(`\n  Done: ${inserted} inserted`);

  // Verify
  const {data: final} = await supabase.from('matches').select('id').eq('league','LCK');
  console.log(`\nTotal LCK in DB: ${final?.length}`);
  const {data: allM} = await supabase.from('matches').select('league');
  const byL = {};
  for (const m of allM||[]) byL[m.league]=(byL[m.league]||0)+1;
  console.log('All leagues:', JSON.stringify(byL));
}

run().catch(console.error);
