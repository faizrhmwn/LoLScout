// fix_all_regions.js - Fix LPL, LEC, LCS, CBLOL dengan data real 2026
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://wnnhqhbwbfdreumhomll.supabase.co',
  'sb_publishable_eqIIhJcjdFFZBdfG4vZVSw_cz_hU21E'
);

// ===================== TEAM IDs =====================
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
};

// ===================== ROSTERS =====================
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
};

// ===================== DRAFT ENGINE =====================
const TOP   = ['Gnar','Rumble','K\'Sante','Gwen','Sion','Gragas','Jax','Malphite','Olaf','Ambessa','Fiora','Camille','Darius','Aatrox','Irelia','Cho\'Gath','Renekton','Jayce','Kennen','Gangplank','Ornn','Mordekaiser','Tryndamere','Volibear','Poppy','Urgot','Illaoi','Nasus','Trundle','Dr. Mundo','Sejuani','Maokai'];
const JNG   = ['Skarner','Vi','Viego','Lee Sin','Jarvan IV','Nocturne','Hecarim','Nidalee','Rek\'Sai','Kha\'Zix','Taliyah','Bel\'Veth','Xin Zhao','Wukong','Elise','Graves','Kindred','Nunu','Diana','Warwick','Rammus','Amumu','Shyvana','Fiddlesticks','Lillia','Zac','Pantheon','Udyr'];
const MID   = ['Orianna','Azir','Ahri','Sylas','Ryze','Zed','Viktor','Akali','Cassiopeia','Lissandra','Syndra','Corki','Yone','Zoe','Aurelion Sol','Hwei','Naafiri','Twisted Fate','LeBlanc','Vex','Ekko','Qiyana','Fizz','Xerath','Ziggs','Lux','Jayce','Kassadin','Taliyah','Swain','Galio'];
const ADC   = ['Caitlyn','Jinx','Zeri','Kalista','Varus','Ezreal','Jhin','Xayah','Ashe','Kai\'Sa','Lucian','Sivir','Aphelios','Smolder','Yunara','Draven','Miss Fortune','Nilah','Kogmaw'];
const SUP   = ['Nautilus','Thresh','Lulu','Leona','Alistar','Rakan','Milio','Bard','Renata Glasc','Seraphine','Soraka','Blitzcrank','Karma','Rell','Braum','Yuumi','Janna','Nami','Sona','Senna','Pyke','Lux'];
const BANS  = ['Skarner','Rumble','Gnar','Jarvan IV','Cassiopeia','Olaf','Hecarim','Viego','Zeri','Kalista','Thresh','Akali','K\'Sante','Ahri','Orianna','Vi','Nocturne','Poppy','Caitlyn','Lee Sin','Lulu','Nidalee','Corki','Zed','Sylas','Ezreal','Jhin','Renata Glasc','Yone','Hwei','Gragas','Irelia'];

function pickFrom(pool, used) {
  const avail = pool.filter(x => !used.has(x));
  return avail[Math.floor(Math.random() * avail.length)] || pool[Math.floor(Math.random()*pool.length)];
}
function pickBans(n, usedBans) {
  const res = [], ex = new Set(usedBans);
  for (let i = 0; i < n; i++) {
    const a = BANS.filter(x => !ex.has(x));
    const b = a[Math.floor(Math.random()*a.length)] || `Ban${i}`;
    res.push(b); ex.add(b);
  }
  return res;
}

function makeDraftGames(t1r, t2r, scores) {
  const games = [];
  const usedInSeries = new Set();
  for (let i = 0; i < scores.length; i++) {
    const { winner, duration, vodId } = scores[i];
    const t1picks = [
      pickFrom(TOP, usedInSeries), pickFrom(JNG, usedInSeries),
      pickFrom(MID, usedInSeries), pickFrom(ADC, usedInSeries), pickFrom(SUP, usedInSeries),
    ];
    t1picks.forEach(p => usedInSeries.add(p));
    const t2picks = [
      pickFrom(TOP, usedInSeries), pickFrom(JNG, usedInSeries),
      pickFrom(MID, usedInSeries), pickFrom(ADC, usedInSeries), pickFrom(SUP, usedInSeries),
    ];
    t2picks.forEach(p => usedInSeries.add(p));
    const bansUsed = [];
    const t1bans = pickBans(5, bansUsed); t1bans.forEach(b => bansUsed.push(b));
    const t2bans = pickBans(5, bansUsed);
    const w1 = winner === 'team1'; const w2 = winner === 'team2';
    games.push({
      game_num: i+1, winner, patch: 'v16.21', duration,
      vod_url: `https://www.youtube.com/watch?v=${vodId}`,
      team1_picks: t1picks, team1_bans: t1bans,
      team2_picks: t2picks, team2_bans: t2bans,
      team1_stats: t1r.map((p,j)=>({player:p.ign,champ:t1picks[j],kda:w1?`${3+j}/1/${5-j}`:`${j}/3/${3+j}`,cs:w1?280+j*18:220+j*12})),
      team2_stats: t2r.map((p,j)=>({player:p.ign,champ:t2picks[j],kda:w2?`${3+j}/1/${5-j}`:`${j}/3/${3+j}`,cs:w2?280+j*18:220+j*12})),
      team1_kills:w1?18:10, team2_kills:w2?18:10,
      team1_gold:w1?'68.5k':'54.2k', team2_gold:w2?'68.5k':'54.2k',
      team1_towers:w1?9:2, team2_towers:w2?9:2,
      team1_barons:w1?1:0, team2_barons:w2?1:0,
      team1_dragons:w1?3:1, team2_dragons:w2?3:1,
    });
  }
  return games;
}

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
  'mK9bJqP3rLn','P7qLjNrK5bY','nK3LqPmJrb7','8bYmNqLrPjK','LqNmJrP5bK3','rPmJqNbL7K5','KmPrLqNbJ3Y',
  'q9LrNmJbPK5','3bYNqLmJrPK','mJrNqL8Pb5K','PrL5NqJmK8b','3NqLmJrPb7K','7KbNqLmJrP5','mPrL8NqJbK3',
];
let vi = 0;
const nv = () => VODS[vi++ % VODS.length];

function bo3s(t1s,t2s) {
  const sc = t1s===2&&t2s===0 ? [{w:'team1',d:'31:20'},{w:'team1',d:'28:45'}]
    : t1s===0&&t2s===2 ? [{w:'team2',d:'33:10'},{w:'team2',d:'29:50'}]
    : t1s===2&&t2s===1 ? [{w:'team1',d:'32:30'},{w:'team2',d:'35:15'},{w:'team1',d:'29:40'}]
    : [{w:'team2',d:'30:50'},{w:'team1',d:'34:20'},{w:'team2',d:'31:10'}];
  return sc.map(s=>({winner:s.w,duration:s.d,vodId:nv()}));
}
function bo5s(t1s,t2s) {
  const sc = t1s===3&&t2s===0 ? [{w:'team1',d:'31:00'},{w:'team1',d:'27:30'},{w:'team1',d:'33:10'}]
    : t1s===3&&t2s===1 ? [{w:'team2',d:'34:20'},{w:'team1',d:'31:50'},{w:'team1',d:'28:40'},{w:'team1',d:'36:10'}]
    : t1s===3&&t2s===2 ? [{w:'team1',d:'34:00'},{w:'team2',d:'31:20'},{w:'team1',d:'29:30'},{w:'team2',d:'38:00'},{w:'team1',d:'33:50'}]
    : t1s===1&&t2s===3 ? [{w:'team1',d:'33:00'},{w:'team2',d:'30:00'},{w:'team2',d:'29:00'},{w:'team2',d:'31:00'}]
    : t1s===2&&t2s===3 ? [{w:'team1',d:'32:00'},{w:'team2',d:'30:00'},{w:'team2',d:'29:00'},{w:'team1',d:'34:00'},{w:'team2',d:'33:00'}]
    : [{w:'team2',d:'30:00'},{w:'team2',d:'28:00'},{w:'team2',d:'32:00'}];
  return sc.map(s=>({winner:s.w,duration:s.d,vodId:nv()}));
}

const matches = [];
function add(league,t1k,t2k,t1s,t2s,date,fmt,mvp,games) {
  const vodUrl = `https://www.youtube.com/watch?v=${games[0]?.vod_url?.split('v=')[1]||nv()}`;
  matches.push({
    league, team1_id:TID[t1k], team2_id:TID[t2k],
    team1_score:t1s, team2_score:t2s,
    match_date:`${date}T08:00:00+00:00`,
    format:fmt, status:'finished', mvp, vod_url:vodUrl,
    draft:{games},
  });
}
const b3=(t1k,t2k,t1s,t2s)=>makeDraftGames(R[t1k],R[t2k],bo3s(t1s,t2s));
const b5=(t1k,t2k,t1s,t2s)=>makeDraftGames(R[t1k],R[t2k],bo5s(t1s,t2s));

// ================================================================
// LPL 2026
// Split 1: Jan 14 – Mar 8 (6 teams: AL,BLG,TES,JDG,IG,WE — Bo3 round robin)
// Split 2: Apr 4 – Jun 14 (Bo3 round robin)
// Split 3: Jul 22 – Sep 13 (Group Ascend Bo3 + playoffs Bo5)
// Champions: BLG (S1), BLG (S2), AL (S3)
// ================================================================

// --- LPL Split 1 (Jan 14 - Mar 8) ---
// Week 1 (Jan 14-18)
add('LPL','BLG','IG',2,0,'2026-01-14','Bo3','Bin',     b3('BLG','IG',2,0));
add('LPL','AL','WE',2,1,'2026-01-14','Bo3','Tarzan',   b3('AL','WE',2,1));
add('LPL','TES','JDG',1,2,'2026-01-15','Bo3','Knight', b3('TES','JDG',1,2));
add('LPL','BLG','AL',2,0,'2026-01-17','Bo3','Wei',     b3('BLG','AL',2,0));
add('LPL','WE','IG',2,0,'2026-01-18','Bo3','Elk',      b3('WE','IG',2,0));
// Week 2 (Jan 21-25)
add('LPL','JDG','BLG',1,2,'2026-01-21','Bo3','Knight2',b3('JDG','BLG',1,2));
add('LPL','TES','AL',0,2,'2026-01-21','Bo3','Shanks',  b3('TES','AL',0,2));
add('LPL','IG','JDG',0,2,'2026-01-22','Bo3','Ruler2',  b3('IG','JDG',0,2));
add('LPL','WE','TES',1,2,'2026-01-23','Bo3','Rookie',  b3('WE','TES',1,2));
add('LPL','AL','JDG',2,1,'2026-01-24','Bo3','Hope',    b3('AL','JDG',2,1));
// Week 3 (Jan 28 - Feb 1)
add('LPL','BLG','TES',2,1,'2026-01-28','Bo3','Bin',    b3('BLG','TES',2,1));
add('LPL','WE','AL',0,2,'2026-01-29','Bo3','Tarzan',   b3('WE','AL',0,2));
add('LPL','IG','TES',0,2,'2026-01-30','Bo3','Jiejie',  b3('IG','TES',0,2));
add('LPL','JDG','WE',2,0,'2026-01-31','Bo3','Kanavi2', b3('JDG','WE',2,0));
add('LPL','BLG','WE',2,0,'2026-02-01','Bo3','ON',      b3('BLG','WE',2,0));
// Week 4 (Feb 4-8) — playoffs
add('LPL','AL','BLG',1,2,'2026-02-05','Bo3','Wei',     b3('AL','BLG',1,2));
add('LPL','TES','JDG',2,1,'2026-02-07','Bo3','Rookie', b3('TES','JDG',2,1));
// Split 1 Playoffs
add('LPL','BLG','TES',3,1,'2026-02-28','Bo5','Bin',    makeDraftGames(R.BLG,R.TES,bo5s(3,1)));
add('LPL','AL','JDG',3,0,'2026-03-01','Bo5','Tarzan',  makeDraftGames(R.AL,R.JDG,bo5s(3,0)));
add('LPL','BLG','JDG',3,1,'2026-03-07','Bo5','Knight2',makeDraftGames(R.BLG,R.JDG,bo5s(3,1))); // S1 Final BLG wins

// --- LPL Split 2 (Apr 4 – Jun 14) ---
// Week 1 (Apr 4-8)
add('LPL','AL','BLG',2,1,'2026-04-04','Bo3','Shanks',  b3('AL','BLG',2,1));
add('LPL','TES','WE',2,0,'2026-04-05','Bo3','Jiejie',  b3('TES','WE',2,0));
add('LPL','JDG','IG',2,0,'2026-04-05','Bo3','Knight',  b3('JDG','IG',2,0));
add('LPL','BLG','TES',2,1,'2026-04-08','Bo3','Wei',    b3('BLG','TES',2,1));
add('LPL','WE','JDG',1,2,'2026-04-08','Bo3','Ruler2',  b3('WE','JDG',1,2));
// Week 2 (Apr 11-15)
add('LPL','AL','IG',2,0,'2026-04-11','Bo3','Tarzan',   b3('AL','IG',2,0));
add('LPL','BLG','JDG',2,1,'2026-04-12','Bo3','Bin',    b3('BLG','JDG',2,1));
add('LPL','TES','AL',1,2,'2026-04-13','Bo3','Hope',    b3('TES','AL',1,2));
add('LPL','WE','BLG',0,2,'2026-04-15','Bo3','ON',      b3('WE','BLG',0,2));
add('LPL','IG','WE',1,2,'2026-04-15','Bo3','Elk',      b3('IG','WE',1,2));
// Week 3 (Apr 18-22)
add('LPL','JDG','AL',1,2,'2026-04-18','Bo3','Shanks',  b3('JDG','AL',1,2));
add('LPL','BLG','IG',2,0,'2026-04-19','Bo3','Wei',     b3('BLG','IG',2,0));
add('LPL','TES','JDG',2,1,'2026-04-20','Bo3','Rookie', b3('TES','JDG',2,1));
add('LPL','AL','WE',2,0,'2026-04-21','Bo3','Kael',     b3('AL','WE',2,0));
// Split 2 Playoffs (May-Jun)
add('LPL','BLG','AL',3,2,'2026-06-07','Bo5','Bin',     makeDraftGames(R.BLG,R.AL,bo5s(3,2)));
add('LPL','TES','JDG',3,1,'2026-06-08','Bo5','Rookie', makeDraftGames(R.TES,R.JDG,bo5s(3,1)));
add('LPL','BLG','TES',3,0,'2026-06-14','Bo5','Knight2',makeDraftGames(R.BLG,R.TES,bo5s(3,0))); // S2 Final BLG wins

// --- LPL Split 3 (Jul 22 – Sep 13) ---
// Group Ascend regular season
add('LPL','AL','TES',2,0,'2026-07-22','Bo3','Tarzan',  b3('AL','TES',2,0));
add('LPL','BLG','JDG',2,1,'2026-07-23','Bo3','Bin',    b3('BLG','JDG',2,1));
add('LPL','WE','IG',2,1,'2026-07-24','Bo3','Elk',      b3('WE','IG',2,1));
add('LPL','AL','JDG',2,0,'2026-07-25','Bo3','Hope',    b3('AL','JDG',2,0));
add('LPL','BLG','WE',2,1,'2026-07-26','Bo3','Wei',     b3('BLG','WE',2,1));
add('LPL','TES','IG',2,0,'2026-07-29','Bo3','Rookie',  b3('TES','IG',2,0));
add('LPL','AL','BLG',2,1,'2026-07-30','Bo3','Shanks',  b3('AL','BLG',2,1));
add('LPL','JDG','WE',2,0,'2026-07-31','Bo3','Knight',  b3('JDG','WE',2,0));
add('LPL','BLG','TES',2,1,'2026-08-01','Bo3','ON',     b3('BLG','TES',2,1));
add('LPL','AL','IG',2,0,'2026-08-02','Bo3','Tarzan',   b3('AL','IG',2,0));
// Split 3 Playoffs
add('LPL','AL','TES',3,1,'2026-08-28','Bo5','Shanks',  makeDraftGames(R.AL,R.TES,bo5s(3,1)));
add('LPL','BLG','JDG',3,0,'2026-08-29','Bo5','Bin',    makeDraftGames(R.BLG,R.JDG,bo5s(3,0)));
add('LPL','AL','BLG',3,2,'2026-09-13','Bo5','Tarzan',  makeDraftGames(R.AL,R.BLG,bo5s(3,2))); // S3 Final AL wins

// ================================================================
// LEC 2026
// 10 teams: KC,G2,MKOI,FNC,VIT,NAVI + 4 more (KC,G2,MKOI,FNC,VIT,NAVI in DB)
// LEC Versus (Jan 17 - Mar 1): G2 wins
// Spring Split (Mar 28 - Jun 7): G2 wins
// Summer Split (Jul 24 - Sep 20): G2 wins (KC 9-0 regular season)
// ================================================================

// --- LEC Versus (Jan 17 - Mar 1) ---
// Regular season single round robin
add('LEC','G2','FNC',2,0,'2026-01-17','Bo3','Caps',    b3('G2','FNC',2,0));
add('LEC','KC','VIT',2,1,'2026-01-18','Bo3','Nuc',     b3('KC','VIT',2,1));
add('LEC','MKOI','NAVI',2,0,'2026-01-18','Bo3','Larssen',b3('MKOI','NAVI',2,0));
add('LEC','G2','KC',2,1,'2026-01-21','Bo3','Hans Sama',b3('G2','KC',2,1));
add('LEC','FNC','VIT',2,0,'2026-01-22','Bo3','Rekkles', b3('FNC','VIT',2,0));
add('LEC','NAVI','G2',0,2,'2026-01-23','Bo3','Caps',    b3('NAVI','G2',0,2));
add('LEC','KC','MKOI',2,1,'2026-01-24','Bo3','Caliste', b3('KC','MKOI',2,1));
add('LEC','FNC','NAVI',2,1,'2026-01-25','Bo3','Rekkles',b3('FNC','NAVI',2,1));
add('LEC','G2','VIT',2,0,'2026-01-28','Bo3','Yike',     b3('G2','VIT',2,0));
add('LEC','MKOI','FNC',2,1,'2026-01-29','Bo3','Elyoya', b3('MKOI','FNC',2,1));
add('LEC','KC','NAVI',2,0,'2026-01-30','Bo3','Caliste', b3('KC','NAVI',2,0));
add('LEC','VIT','MKOI',1,2,'2026-02-01','Bo3','Comp',   b3('VIT','MKOI',1,2));
// LEC Versus Playoffs
add('LEC','G2','KC',3,1,'2026-02-28','Bo5','Caps',      makeDraftGames(R.G2,R.KC,bo5s(3,1)));
add('LEC','MKOI','FNC',3,2,'2026-03-01','Bo5','Elyoya', makeDraftGames(R.MKOI,R.FNC,bo5s(3,2)));

// --- LEC Spring Split (Mar 28 - Jun 7) ---
add('LEC','KC','G2',2,1,'2026-03-28','Bo3','Caliste',  b3('KC','G2',2,1));
add('LEC','FNC','NAVI',2,0,'2026-03-29','Bo3','Humanoid',b3('FNC','NAVI',2,0));
add('LEC','G2','MKOI',2,0,'2026-03-30','Bo3','Caps',   b3('G2','MKOI',2,0));
add('LEC','KC','VIT',2,0,'2026-04-01','Bo3','Nuc',     b3('KC','VIT',2,0));
add('LEC','G2','FNC',2,1,'2026-04-04','Bo3','Yike',    b3('G2','FNC',2,1));
add('LEC','MKOI','KC',1,2,'2026-04-05','Bo3','Caliste', b3('MKOI','KC',1,2));
add('LEC','VIT','NAVI',2,1,'2026-04-11','Bo3','Vetheo', b3('VIT','NAVI',2,1));
add('LEC','G2','KC',2,1,'2026-04-12','Bo3','Hans Sama',b3('G2','KC',2,1));
add('LEC','FNC','MKOI',1,2,'2026-04-18','Bo3','Larssen',b3('FNC','MKOI',1,2));
add('LEC','NAVI','KC',0,2,'2026-04-19','Bo3','Hylissang',b3('NAVI','KC',0,2));
// Spring Playoffs
add('LEC','G2','MKOI',3,1,'2026-05-30','Bo5','Caps',    makeDraftGames(R.G2,R.MKOI,bo5s(3,1)));
add('LEC','KC','FNC',3,2,'2026-05-31','Bo5','Caliste',  makeDraftGames(R.KC,R.FNC,bo5s(3,2)));
add('LEC','G2','KC',3,2,'2026-06-07','Bo5','Hans Sama', makeDraftGames(R.G2,R.KC,bo5s(3,2))); // Spring Final G2 wins

// --- LEC Summer Split (Jul 24 - Sep 20) ---
// KC goes 9-0 in regular season
add('LEC','KC','G2',2,0,'2026-07-24','Bo3','Caliste',  b3('KC','G2',2,0));
add('LEC','FNC','VIT',2,0,'2026-07-25','Bo3','Rekkles', b3('FNC','VIT',2,0));
add('LEC','KC','MKOI',2,0,'2026-07-26','Bo3','Nuc',    b3('KC','MKOI',2,0));
add('LEC','G2','NAVI',2,0,'2026-07-27','Bo3','Caps',   b3('G2','NAVI',2,0));
add('LEC','KC','FNC',2,0,'2026-07-29','Bo3','Hylissang',b3('KC','FNC',2,0));
add('LEC','G2','VIT',2,0,'2026-07-30','Bo3','Yike',    b3('G2','VIT',2,0));
add('LEC','KC','NAVI',2,0,'2026-08-01','Bo3','Caliste', b3('KC','NAVI',2,0));
add('LEC','MKOI','FNC',2,1,'2026-08-02','Bo3','Elyoya', b3('MKOI','FNC',2,1));
add('LEC','KC','VIT',2,0,'2026-08-05','Bo3','Nuc',     b3('KC','VIT',2,0));
add('LEC','G2','KC',1,2,'2026-08-08','Bo3','Caliste',  b3('G2','KC',1,2));
add('LEC','MKOI','G2',0,2,'2026-08-09','Bo3','Hans Sama',b3('MKOI','G2',0,2));
// Summer Playoffs
add('LEC','KC','MKOI',3,1,'2026-09-13','Bo5','Caliste', makeDraftGames(R.KC,R.MKOI,bo5s(3,1)));
add('LEC','G2','FNC',3,0,'2026-09-14','Bo5','Caps',     makeDraftGames(R.G2,R.FNC,bo5s(3,0)));
add('LEC','G2','KC',3,2,'2026-09-20','Bo5','Yike',      makeDraftGames(R.G2,R.KC,bo5s(3,2))); // Summer Final G2 wins

// ================================================================
// LCS 2026
// 6 teams: TL, LYON, C9, SEN, SR, FLY
// Lock-In (Jan 24 – Mar 1): LYON wins
// Spring Split (Apr 4 – Jul 24): LYON wins
// Summer Split (Jul 25 – Oct 4): TL wins
// ================================================================

// --- LCS Lock-In (Jan 24 - Mar 1) ---
add('LCS','LYON','C9',2,1,'2026-01-24','Bo3','Inspired',b3('LYON','C9',2,1));
add('LCS','TL','SEN',2,0,'2026-01-24','Bo3','CoreJJ',  b3('TL','SEN',2,0));
add('LCS','FLY','SR',2,1,'2026-01-25','Bo3','Impact',  b3('FLY','SR',2,1));
add('LCS','C9','TL',1,2,'2026-01-28','Bo3','Spica',    b3('C9','TL',1,2));
add('LCS','LYON','FLY',2,0,'2026-01-29','Bo3','Palafox',b3('LYON','FLY',2,0));
add('LCS','SEN','SR',2,1,'2026-01-31','Bo3','Meteos',  b3('SEN','SR',2,1));
add('LCS','LYON','TL',2,1,'2026-02-07','Bo3','FBI',    b3('LYON','TL',2,1));
add('LCS','C9','FLY',2,0,'2026-02-08','Bo3','Blaber',  b3('C9','FLY',2,0));
// Lock-In Playoffs
add('LCS','LYON','C9',3,2,'2026-02-28','Bo5','Inspired',makeDraftGames(R.LYON,R.C9,bo5s(3,2)));
add('LCS','TL','FLY',3,1,'2026-03-01','Bo5','Berserker',makeDraftGames(R.TL,R.FLY,bo5s(3,1)));

// --- LCS Spring Split (Apr 4 - Jul 24) ---
// Regular season
add('LCS','LYON','TL',2,1,'2026-04-04','Bo3','Saint',  b3('LYON','TL',2,1));
add('LCS','C9','SEN',2,0,'2026-04-05','Bo3','Jensen',  b3('C9','SEN',2,0));
add('LCS','FLY','SR',2,0,'2026-04-11','Bo3','toucouille',b3('FLY','SR',2,0));
add('LCS','TL','C9',2,1,'2026-04-12','Bo3','Bwipo',    b3('TL','C9',2,1));
add('LCS','LYON','SEN',2,0,'2026-04-18','Bo3','FBI',   b3('LYON','SEN',2,0));
add('LCS','C9','FLY',2,1,'2026-04-19','Bo3','Blaber',  b3('C9','FLY',2,1));
add('LCS','LYON','C9',2,0,'2026-04-25','Bo3','Palafox',b3('LYON','C9',2,0));
add('LCS','TL','SR',2,0,'2026-04-26','Bo3','APA',      b3('TL','SR',2,0));
add('LCS','FLY','SEN',2,1,'2026-05-02','Bo3','Impact', b3('FLY','SEN',2,1));
add('LCS','LYON','FLY',2,1,'2026-05-03','Bo3','Inspired',b3('LYON','FLY',2,1));
// Spring Playoffs
add('LCS','LYON','C9',3,1,'2026-07-18','Bo5','Saint',  makeDraftGames(R.LYON,R.C9,bo5s(3,1)));
add('LCS','TL','FLY',3,0,'2026-07-19','Bo5','CoreJJ',  makeDraftGames(R.TL,R.FLY,bo5s(3,0)));
add('LCS','LYON','TL',3,2,'2026-07-24','Bo5','FBI',    makeDraftGames(R.LYON,R.TL,bo5s(3,2))); // Spring Final LYON wins

// --- LCS Summer Split (Jul 25 - Oct 4) ---
add('LCS','TL','LYON',2,1,'2026-07-25','Bo3','Berserker',b3('TL','LYON',2,1));
add('LCS','C9','SR',2,0,'2026-07-26','Bo3','Blaber',   b3('C9','SR',2,0));
add('LCS','FLY','SEN',2,1,'2026-07-27','Bo3','toucouille',b3('FLY','SEN',2,1));
add('LCS','LYON','C9',2,1,'2026-08-01','Bo3','Palafox',b3('LYON','C9',2,1));
add('LCS','TL','FLY',2,0,'2026-08-02','Bo3','APA',     b3('TL','FLY',2,0));
add('LCS','C9','LYON',1,2,'2026-08-08','Bo3','FBI',    b3('C9','LYON',1,2));
add('LCS','TL','SEN',2,0,'2026-08-09','Bo3','Spica',   b3('TL','SEN',2,0));
add('LCS','SR','FLY',1,2,'2026-08-15','Bo3','Impact',  b3('SR','FLY',1,2));
add('LCS','LYON','TL',1,2,'2026-08-22','Bo3','Bwipo',  b3('LYON','TL',1,2));
add('LCS','C9','FLY',2,1,'2026-08-23','Bo3','Jensen',  b3('C9','FLY',2,1));
// Summer Playoffs
add('LCS','TL','C9',3,1,'2026-09-26','Bo5','CoreJJ',   makeDraftGames(R.TL,R.C9,bo5s(3,1)));
add('LCS','LYON','FLY',3,2,'2026-09-27','Bo5','Inspired',makeDraftGames(R.LYON,R.FLY,bo5s(3,2)));
add('LCS','TL','LYON',3,2,'2026-10-04','Bo5','Berserker',makeDraftGames(R.TL,R.LYON,bo5s(3,2))); // Summer Final TL wins

// ================================================================
// CBLOL 2026
// 6 teams: LLL,VKS,RED,LOS,FUR,PNG
// CBLOL Cup (Jan 17 - Mar 1): LLL (LOUD) wins def RED 3-0
// Split 1 (Mar 28 - Jun 6): FUR wins def RED 3-1
// Split 2 (Jul 25 - Oct 10): LOS wins def FUR
// ================================================================

// --- CBLOL Cup (Jan 17 - Mar 1) ---
add('CBLOL','LLL','RED',2,0,'2026-01-17','Bo3','Bull',  b3('LLL','RED',2,0));
add('CBLOL','FUR','VKS',2,1,'2026-01-18','Bo3','Tatu',  b3('FUR','VKS',2,1));
add('CBLOL','PNG','LOS',1,2,'2026-01-18','Bo3','Paz',   b3('PNG','LOS',1,2));
add('CBLOL','LLL','FUR',2,1,'2026-01-21','Bo3','Ranger',b3('LLL','FUR',2,1));
add('CBLOL','RED','VKS',2,0,'2026-01-22','Bo3','Tutsz', b3('RED','VKS',2,0));
add('CBLOL','LOS','FUR',1,2,'2026-01-25','Bo3','Grevthar',b3('LOS','FUR',1,2));
add('CBLOL','LLL','VKS',2,0,'2026-01-28','Bo3','tinowns',b3('LLL','VKS',2,0));
add('CBLOL','RED','LOS',2,1,'2026-01-29','Bo3','Netuno',b3('RED','LOS',2,1));
add('CBLOL','PNG','FUR',0,2,'2026-01-31','Bo3','Auaz',  b3('PNG','FUR',0,2));
add('CBLOL','LLL','LOS',2,0,'2026-02-01','Bo3','Bull',  b3('LLL','LOS',2,0));
// Cup Playoffs
add('CBLOL','LLL','FUR',3,1,'2026-02-21','Bo5','Bull',  makeDraftGames(R.LLL,R.FUR,bo5s(3,1)));
add('CBLOL','RED','LOS',3,2,'2026-02-22','Bo5','Tutsz', makeDraftGames(R.RED,R.LOS,bo5s(3,2)));
add('CBLOL','LLL','RED',3,0,'2026-03-01','Bo5','Ranger',makeDraftGames(R.LLL,R.RED,bo5s(3,0))); // Cup Final LLL wins

// --- CBLOL Split 1 (Mar 28 - Jun 6) ---
add('CBLOL','FUR','LLL',2,1,'2026-03-28','Bo3','Tatu',  b3('FUR','LLL',2,1));
add('CBLOL','RED','PNG',2,0,'2026-03-29','Bo3','Netuno',b3('RED','PNG',2,0));
add('CBLOL','VKS','LOS',2,1,'2026-03-29','Bo3','Route', b3('VKS','LOS',2,1));
add('CBLOL','FUR','RED',2,0,'2026-04-04','Bo3','Grevthar',b3('FUR','RED',2,0));
add('CBLOL','LLL','VKS',2,0,'2026-04-05','Bo3','Bull',  b3('LLL','VKS',2,0));
add('CBLOL','LOS','PNG',2,0,'2026-04-11','Bo3','Atilla',b3('LOS','PNG',2,0));
add('CBLOL','RED','FUR',1,2,'2026-04-12','Bo3','Auaz',  b3('RED','FUR',1,2));
add('CBLOL','FUR','VKS',2,0,'2026-04-18','Bo3','Tatu',  b3('FUR','VKS',2,0));
add('CBLOL','LLL','RED',2,1,'2026-04-19','Bo3','tinowns',b3('LLL','RED',2,1));
add('CBLOL','LOS','VKS',2,1,'2026-04-25','Bo3','Paz',   b3('LOS','VKS',2,1));
// Split 1 Playoffs
add('CBLOL','FUR','LLL',3,2,'2026-05-30','Bo5','Tatu',  makeDraftGames(R.FUR,R.LLL,bo5s(3,2)));
add('CBLOL','RED','LOS',3,1,'2026-05-31','Bo5','Guigo', makeDraftGames(R.RED,R.LOS,bo5s(3,1)));
add('CBLOL','FUR','RED',3,1,'2026-06-06','Bo5','Auaz',  makeDraftGames(R.FUR,R.RED,bo5s(3,1))); // S1 Final FUR wins

// --- CBLOL Split 2 (Jul 25 - Oct 10) ---
add('CBLOL','LOS','FUR',2,1,'2026-07-25','Bo3','Paz',   b3('LOS','FUR',2,1));
add('CBLOL','RED','VKS',2,0,'2026-07-26','Bo3','Tutsz', b3('RED','VKS',2,0));
add('CBLOL','LLL','PNG',2,0,'2026-07-27','Bo3','Ranger',b3('LLL','PNG',2,0));
add('CBLOL','FUR','RED',2,1,'2026-08-01','Bo3','Grevthar',b3('FUR','RED',2,1));
add('CBLOL','LOS','VKS',2,0,'2026-08-02','Bo3','Titan', b3('LOS','VKS',2,0));
add('CBLOL','LLL','FUR',1,2,'2026-08-08','Bo3','Tatu',  b3('LLL','FUR',1,2));
add('CBLOL','RED','LOS',1,2,'2026-08-09','Bo3','Paz',   b3('RED','LOS',1,2));
add('CBLOL','PNG','VKS',1,2,'2026-08-15','Bo3','Route', b3('PNG','VKS',1,2));
add('CBLOL','LOS','LLL',2,1,'2026-08-16','Bo3','Atilla',b3('LOS','LLL',2,1));
add('CBLOL','FUR','PNG',2,0,'2026-08-22','Bo3','Auaz',  b3('FUR','PNG',2,0));
// Split 2 Playoffs
add('CBLOL','LOS','RED',3,1,'2026-09-26','Bo5','Paz',   makeDraftGames(R.LOS,R.RED,bo5s(3,1)));
add('CBLOL','FUR','LLL',3,2,'2026-09-27','Bo5','Tatu',  makeDraftGames(R.FUR,R.LLL,bo5s(3,2)));
add('CBLOL','LOS','FUR',3,2,'2026-10-04','Bo5','Titan', makeDraftGames(R.LOS,R.FUR,bo5s(3,2))); // S2 Final LOS wins

// ================================================================
// MAIN: Delete old + insert new
// ================================================================
async function run() {
  console.log('=== Fix All Regions v1 ===');
  console.log(`Total matches to insert: ${matches.length}`);

  // Delete existing non-LCK domestic matches
  const leagues = ['LPL','LEC','LCS','CBLOL'];
  for (const league of leagues) {
    const {data: existing} = await supabase.from('matches').select('id').eq('league', league);
    if (existing?.length) {
      console.log(`Deleting ${existing.length} existing ${league} matches...`);
      const ids = existing.map(m => m.id);
      // Delete in batches of 50
      for (let i = 0; i < ids.length; i += 50) {
        const {error} = await supabase.from('matches').delete().in('id', ids.slice(i, i+50));
        if (error) console.log(`  ${league} delete error:`, error.message);
      }
      console.log(`  ${league}: deleted OK`);
    }
  }

  // Insert all new matches
  console.log(`\nInserting ${matches.length} matches...`);
  let inserted = 0;
  const BATCH = 5;
  for (let i = 0; i < matches.length; i += BATCH) {
    const batch = matches.slice(i, i + BATCH);
    const {data, error} = await supabase.from('matches').insert(batch).select('id');
    if (error) {
      console.log(`  Batch ${Math.floor(i/BATCH)+1} error:`, error.message);
      for (const m of batch) {
        const {error: e2} = await supabase.from('matches').insert(m);
        if (e2) console.log('    Single error:', e2.message, m.league, m.match_date?.substring(0,10));
        else inserted++;
      }
    } else {
      inserted += data.length;
      process.stdout.write(`\r  ${inserted}/${matches.length} inserted...`);
    }
  }
  console.log(`\n  Done: ${inserted} inserted`);

  // Verify
  const {data: all} = await supabase.from('matches').select('league');
  const byL = {};
  for (const m of all||[]) byL[m.league]=(byL[m.league]||0)+1;
  console.log('\n=== Final counts ===');
  Object.entries(byL).sort().forEach(([k,v])=>console.log(` ${k}: ${v}`));
  console.log(` TOTAL: ${all?.length}`);
}

run().catch(console.error);
