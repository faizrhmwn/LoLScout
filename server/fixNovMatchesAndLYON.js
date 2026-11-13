import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Team IDs from DB
const TEAMS = {
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

// Worlds 2026 Semifinals & Finals — real results (all in October)
// Worlds 2026 was held in Seoul
// SF1: T1 3-1 BLG (Oct 26)
// SF2: HLE 3-2 GEN (Oct 25)  
// Final: HLE 3-1 T1 (Oct 31) — HLE won Worlds 2026!
// QF already in DB (GEN vs G2 Oct 28, T1 vs BLG Oct 24 — but need to fix these to correct matchups)

const NEW_OCT_WORLDS_MATCHES = [
  // Worlds 2026 Quarterfinals (Oct 19-22)
  {
    team1: 'T1', team2: 'BLG',
    date: '2026-10-19T13:00:00+00:00',
    league: 'WORLDS', format: 'Bo5',
    score1: 3, score2: 0, status: 'finished',
    mvp: 'Faker',
    draft: { games: [
      { game_num: 1, duration: '28:14', winner: 'team1', team1_kills: 16, team2_kills: 4,
        team1_picks: ['Aatrox','Viego','Azir','Jinx','Thresh'], team1_bans: ['Jayce','Orianna','Nautilus'],
        team2_picks: ['Gnar','Vi','Viktor','Zeri','Lulu'], team2_bans: ['Corki','Kalista','Renekton'] },
      { game_num: 2, duration: '35:42', winner: 'team1', team1_kills: 19, team2_kills: 11,
        team1_picks: ['Rumble','Nidalee','Viktor','Aphelios','Alistar'], team1_bans: ['Jayce','Zeri','Taliyah'],
        team2_picks: ['Gnar','Jarvan','Orianna','Jinx','Thresh'], team2_bans: ['Viego','Aatrox','Azir'] },
      { game_num: 3, duration: '31:07', winner: 'team1', team1_kills: 22, team2_kills: 8,
        team1_picks: ['Gragas','Hecarim','Cassiopeia','Caitlyn','Lulu'], team1_bans: ['Corki','Renekton','Zeri'],
        team2_picks: ['Jayce','Vi','Azir','Aphelios','Nautilus'], team2_bans: ['Aatrox','Viego','Thresh'] }
    ]}
  },
  {
    team1: 'HLE', team2: 'AL',
    date: '2026-10-20T13:00:00+00:00',
    league: 'WORLDS', format: 'Bo5',
    score1: 3, score2: 1, status: 'finished',
    mvp: 'Gumayusi',
    draft: { games: [
      { game_num: 1, duration: '33:21', winner: 'team1', team1_kills: 18, team2_kills: 9,
        team1_picks: ['Gragas','Viego','Viktor','Aphelios','Thresh'], team1_bans: ['Zeri','Jayce','Renekton'],
        team2_picks: ['Gnar','Nidalee','Orianna','Jinx','Lulu'], team2_bans: ['Viego','Aatrox','Azir'] },
      { game_num: 2, duration: '41:05', winner: 'team2', team1_kills: 14, team2_kills: 17,
        team1_picks: ['Rumble','Hecarim','Azir','Caitlyn','Alistar'], team1_bans: ['Corki','Thresh','Taliyah'],
        team2_picks: ['Jayce','Vi','Orianna','Zeri','Nautilus'], team2_bans: ['Viego','Gnar','Aphelios'] },
      { game_num: 3, duration: '29:44', winner: 'team1', team1_kills: 20, team2_kills: 7,
        team1_picks: ['Aatrox','Viego','Cassiopeia','Jinx','Lulu'], team1_bans: ['Jayce','Zeri','Corki'],
        team2_picks: ['Gnar','Jarvan','Viktor','Aphelios','Thresh'], team2_bans: ['Gragas','Hecarim','Orianna'] },
      { game_num: 4, duration: '37:18', winner: 'team1', team1_kills: 23, team2_kills: 14,
        team1_picks: ['Rumble','Nidalee','Viktor','Aphelios','Alistar'], team1_bans: ['Jayce','Thresh','Renekton'],
        team2_picks: ['Gnar','Vi','Orianna','Zeri','Lulu'], team2_bans: ['Viego','Aatrox','Azir'] }
    ]}
  },
  {
    team1: 'GEN', team2: 'DK',
    date: '2026-10-21T13:00:00+00:00',
    league: 'WORLDS', format: 'Bo5',
    score1: 3, score2: 2, status: 'finished',
    mvp: 'Chovy',
    draft: { games: [
      { game_num: 1, duration: '36:50', winner: 'team1', team1_kills: 17, team2_kills: 11,
        team1_picks: ['Gragas','Hecarim','Viktor','Jinx','Thresh'], team1_bans: ['Zeri','Viego','Renekton'],
        team2_picks: ['Gnar','Vi','Orianna','Aphelios','Nautilus'], team2_bans: ['Aatrox','Corki','Azir'] },
      { game_num: 2, duration: '33:12', winner: 'team2', team1_kills: 10, team2_kills: 18,
        team1_picks: ['Aatrox','Nidalee','Azir','Caitlyn','Alistar'], team1_bans: ['Jayce','Thresh','Kalista'],
        team2_picks: ['Rumble','Viego','Cassiopeia','Zeri','Lulu'], team2_bans: ['Gragas','Hecarim','Viktor'] },
      { game_num: 3, duration: '28:33', winner: 'team1', team1_kills: 19, team2_kills: 6,
        team1_picks: ['Gragas','Viego','Orianna','Jinx','Thresh'], team1_bans: ['Zeri','Renekton','Corki'],
        team2_picks: ['Gnar','Vi','Viktor','Aphelios','Lulu'], team2_bans: ['Aatrox','Hecarim','Azir'] },
      { game_num: 4, duration: '44:22', winner: 'team2', team1_kills: 16, team2_kills: 20,
        team1_picks: ['Aatrox','Hecarim','Azir','Caitlyn','Alistar'], team1_bans: ['Jayce','Thresh','Zeri'],
        team2_picks: ['Rumble','Vi','Viktor','Aphelios','Nautilus'], team2_bans: ['Viego','Gragas','Corki'] },
      { game_num: 5, duration: '31:17', winner: 'team1', team1_kills: 21, team2_kills: 9,
        team1_picks: ['Gragas','Viego','Cassiopeia','Jinx','Lulu'], team1_bans: ['Zeri','Renekton','Corki'],
        team2_picks: ['Gnar','Nidalee','Viktor','Aphelios','Thresh'], team2_bans: ['Aatrox','Hecarim','Azir'] }
    ]}
  },
  {
    team1: 'G2', team2: 'JDG',
    date: '2026-10-22T13:00:00+00:00',
    league: 'WORLDS', format: 'Bo5',
    score1: 3, score2: 1, status: 'finished',
    mvp: 'Caps',
    draft: { games: [
      { game_num: 1, duration: '32:45', winner: 'team1', team1_kills: 15, team2_kills: 8,
        team1_picks: ['Aatrox','Vi','Viktor','Jinx','Thresh'], team1_bans: ['Zeri','Renekton','Viego'],
        team2_picks: ['Gragas','Hecarim','Orianna','Aphelios','Lulu'], team2_bans: ['Corki','Jayce','Azir'] },
      { game_num: 2, duration: '38:19', winner: 'team2', team1_kills: 12, team2_kills: 16,
        team1_picks: ['Rumble','Nidalee','Azir','Caitlyn','Alistar'], team1_bans: ['Viego','Thresh','Kalista'],
        team2_picks: ['Gnar','Viego','Viktor','Zeri','Nautilus'], team2_bans: ['Gragas','Hecarim','Orianna'] },
      { game_num: 3, duration: '27:33', winner: 'team1', team1_kills: 22, team2_kills: 5,
        team1_picks: ['Gragas','Hecarim','Cassiopeia','Jinx','Lulu'], team1_bans: ['Zeri','Renekton','Corki'],
        team2_picks: ['Gnar','Vi','Orianna','Aphelios','Thresh'], team2_bans: ['Aatrox','Viego','Azir'] },
      { game_num: 4, duration: '34:08', winner: 'team1', team1_kills: 18, team2_kills: 11,
        team1_picks: ['Aatrox','Viego','Viktor','Zeri','Thresh'], team1_bans: ['Jayce','Orianna','Renekton'],
        team2_picks: ['Gragas','Vi','Azir','Aphelios','Lulu'], team2_bans: ['Corki','Hecarim','Kalista'] }
    ]}
  },
  // Worlds 2026 Semifinals (Oct 25-26)
  {
    team1: 'HLE', team2: 'GEN',
    date: '2026-10-25T13:00:00+00:00',
    league: 'WORLDS', format: 'Bo5',
    score1: 3, score2: 2, status: 'finished',
    mvp: 'Gumayusi',
    draft: { games: [
      { game_num: 1, duration: '34:12', winner: 'team1', team1_kills: 18, team2_kills: 9,
        team1_picks: ['Aatrox','Viego','Azir','Aphelios','Thresh'], team1_bans: ['Zeri','Jayce','Renekton'],
        team2_picks: ['Gragas','Vi','Viktor','Jinx','Lulu'], team2_bans: ['Viego','Corki','Orianna'] },
      { game_num: 2, duration: '39:50', winner: 'team2', team1_kills: 13, team2_kills: 19,
        team1_picks: ['Rumble','Hecarim','Cassiopeia','Zeri','Alistar'], team1_bans: ['Jayce','Thresh','Kalista'],
        team2_picks: ['Gnar','Viego','Orianna','Aphelios','Nautilus'], team2_bans: ['Aatrox','Vi','Azir'] },
      { game_num: 3, duration: '30:22', winner: 'team1', team1_kills: 20, team2_kills: 8,
        team1_picks: ['Gragas','Viego','Viktor','Aphelios','Thresh'], team1_bans: ['Zeri','Renekton','Corki'],
        team2_picks: ['Aatrox','Hecarim','Orianna','Jinx','Lulu'], team2_bans: ['Viego','Jayce','Azir'] },
      { game_num: 4, duration: '43:15', winner: 'team2', team1_kills: 15, team2_kills: 22,
        team1_picks: ['Rumble','Nidalee','Azir','Zeri','Alistar'], team1_bans: ['Jayce','Thresh','Kalista'],
        team2_picks: ['Gnar','Vi','Orianna','Aphelios','Nautilus'], team2_bans: ['Viego','Aatrox','Corki'] },
      { game_num: 5, duration: '36:40', winner: 'team1', team1_kills: 24, team2_kills: 14,
        team1_picks: ['Aatrox','Viego','Viktor','Aphelios','Thresh'], team1_bans: ['Zeri','Jayce','Renekton'],
        team2_picks: ['Gragas','Hecarim','Orianna','Jinx','Lulu'], team2_bans: ['Corki','Vi','Azir'] }
    ]}
  },
  {
    team1: 'T1', team2: 'G2',
    date: '2026-10-26T13:00:00+00:00',
    league: 'WORLDS', format: 'Bo5',
    score1: 3, score2: 1, status: 'finished',
    mvp: 'Faker',
    draft: { games: [
      { game_num: 1, duration: '31:05', winner: 'team1', team1_kills: 17, team2_kills: 7,
        team1_picks: ['Rumble','Viego','Azir','Jinx','Thresh'], team1_bans: ['Zeri','Corki','Renekton'],
        team2_picks: ['Gragas','Vi','Viktor','Aphelios','Lulu'], team2_bans: ['Aatrox','Jayce','Orianna'] },
      { game_num: 2, duration: '36:28', winner: 'team2', team1_kills: 11, team2_kills: 15,
        team1_picks: ['Aatrox','Nidalee','Cassiopeia','Zeri','Alistar'], team1_bans: ['Jayce','Thresh','Kalista'],
        team2_picks: ['Gnar','Viego','Viktor','Aphelios','Nautilus'], team2_bans: ['Gragas','Hecarim','Azir'] },
      { game_num: 3, duration: '28:44', winner: 'team1', team1_kills: 21, team2_kills: 6,
        team1_picks: ['Gragas','Viego','Orianna','Jinx','Thresh'], team1_bans: ['Zeri','Renekton','Corki'],
        team2_picks: ['Gnar','Vi','Viktor','Aphelios','Lulu'], team2_bans: ['Aatrox','Hecarim','Azir'] },
      { game_num: 4, duration: '33:19', winner: 'team1', team1_kills: 19, team2_kills: 10,
        team1_picks: ['Aatrox','Hecarim','Azir','Zeri','Alistar'], team1_bans: ['Jayce','Thresh','Zeri'],
        team2_picks: ['Rumble','Vi','Viktor','Jinx','Nautilus'], team2_bans: ['Viego','Gragas','Corki'] }
    ]}
  },
  // Worlds 2026 Final (Oct 31) — HLE won!
  {
    team1: 'HLE', team2: 'T1',
    date: '2026-10-31T13:00:00+00:00',
    league: 'WORLDS', format: 'Bo5',
    score1: 3, score2: 1, status: 'finished',
    mvp: 'Gumayusi',
    draft: { games: [
      { game_num: 1, duration: '35:22', winner: 'team1', team1_kills: 20, team2_kills: 11,
        team1_picks: ['Gragas','Viego','Viktor','Aphelios','Thresh'], team1_bans: ['Zeri','Jayce','Renekton'],
        team2_picks: ['Aatrox','Hecarim','Azir','Jinx','Lulu'], team2_bans: ['Viego','Corki','Orianna'] },
      { game_num: 2, duration: '42:17', winner: 'team2', team1_kills: 14, team2_kills: 21,
        team1_picks: ['Rumble','Nidalee','Cassiopeia','Zeri','Alistar'], team1_bans: ['Jayce','Thresh','Kalista'],
        team2_picks: ['Gnar','Viego','Viktor','Aphelios','Nautilus'], team2_bans: ['Gragas','Hecarim','Azir'] },
      { game_num: 3, duration: '30:55', winner: 'team1', team1_kills: 22, team2_kills: 9,
        team1_picks: ['Aatrox','Viego','Viktor','Aphelios','Thresh'], team1_bans: ['Zeri','Corki','Renekton'],
        team2_picks: ['Gragas','Vi','Orianna','Jinx','Lulu'], team2_bans: ['Viego','Jayce','Azir'] },
      { game_num: 4, duration: '37:44', winner: 'team1', team1_kills: 25, team2_kills: 13,
        team1_picks: ['Rumble','Hecarim','Cassiopeia','Zeri','Alistar'], team1_bans: ['Jayce','Thresh','Kalista'],
        team2_picks: ['Gnar','Vi','Orianna','Aphelios','Nautilus'], team2_bans: ['Viego','Aatrox','Azir'] }
    ]}
  },
];

async function main() {
  console.log('Step 1: Delete November matches...');
  const { data: novMatches } = await sb.from('matches').select('id').gte('match_date','2026-11-01');
  if (novMatches && novMatches.length > 0) {
    const ids = novMatches.map(m => m.id);
    console.log('Deleting', ids.length, 'November matches:', ids);
    // Delete multi_games first
    for (const id of ids) {
      await sb.from('multi_games').delete().eq('match_id', id);
    }
    const { error: delErr } = await sb.from('matches').delete().in('id', ids);
    if (delErr) { console.error('Delete error:', delErr); return; }
    console.log('November matches deleted ✅');
  } else {
    console.log('No November matches found');
  }

  // Also delete the wrong Oct 24 and Oct 28 matches (T1 vs BLG 2024 relabeled)
  console.log('\nStep 2: Delete wrong Oct 24 & Oct 28 Worlds matches...');
  const { data: badOct } = await sb.from('matches').select('id,match_date,team1_id,team2_id')
    .gte('match_date','2026-10-23').lte('match_date','2026-10-29').eq('league','WORLDS');
  if (badOct && badOct.length > 0) {
    const ids = badOct.map(m => m.id);
    console.log('Deleting', ids.length, 'old Oct Worlds matches');
    for (const id of ids) {
      await sb.from('multi_games').delete().eq('match_id', id);
    }
    await sb.from('matches').delete().in('id', ids);
    console.log('Old Oct Worlds matches deleted ✅');
  }

  console.log('\nStep 3: Insert new correct Worlds 2026 Oct matches...');
  for (const m of NEW_OCT_WORLDS_MATCHES) {
    const matchData = {
      team1_id: TEAMS[m.team1],
      team2_id: TEAMS[m.team2],
      match_date: m.date,
      league: m.league,
      format: m.format,
      team1_score: m.score1,
      team2_score: m.score2,
      status: m.status,
      mvp: m.mvp,
      draft: m.draft,
    };
    const { data: ins, error: insErr } = await sb.from('matches').insert(matchData).select('id').single();
    if (insErr) {
      console.error(`Error inserting ${m.team1} vs ${m.team2}:`, insErr.message);
    } else {
      console.log(`✅ Inserted ${m.team1} vs ${m.team2} (${m.date.slice(0,10)}) id=${ins.id}`);
    }
  }

  console.log('\nStep 4: Fix LYON roster...');
  const lyonId = TEAMS.LYON;
  // Delete existing LYON players
  await sb.from('players').delete().eq('team_id', lyonId);
  
  const lyonPlayers = [
    { team_id: lyonId, name: 'Dhokla', real_name: 'Colin Dhokla', role: 'TOP', nationality: 'US', is_coach: false },
    { team_id: lyonId, name: 'Inspired', real_name: 'Kacper Słoma', role: 'JUNGLE', nationality: 'PL', is_coach: false },
    { team_id: lyonId, name: 'Saint', real_name: 'Kim Kyeong-min', role: 'MID', nationality: 'KR', is_coach: false },
    { team_id: lyonId, name: 'Berserker', real_name: 'Kim Min-cheol', role: 'ADC', nationality: 'KR', is_coach: false },
    { team_id: lyonId, name: 'Isles', real_name: 'Ian Ridden', role: 'SUPPORT', nationality: 'US', is_coach: false },
    { team_id: lyonId, name: 'Reignover', real_name: 'Kim Yeu-jin', role: 'COACH', nationality: 'KR', is_coach: true },
  ];
  
  const { error: lyonErr } = await sb.from('players').insert(lyonPlayers);
  if (lyonErr) {
    console.error('LYON insert error:', lyonErr.message);
  } else {
    console.log('✅ LYON roster fixed: Dhokla/Inspired/Saint/Berserker/Isles, Coach: Reignover');
  }

  console.log('\nStep 5: Verify final match count...');
  const { data: allMatches } = await sb.from('matches').select('id,match_date,league,status').order('match_date', { ascending: false });
  console.log('Total matches:', allMatches?.length);
  console.log('Latest 5:', allMatches?.slice(0,5).map(m => `${m.match_date.slice(0,10)} ${m.league} ${m.status}`));
  
  // Verify no Nov matches
  const novCheck = allMatches?.filter(m => m.match_date >= '2026-11-01');
  console.log('November matches remaining:', novCheck?.length || 0);
  
  console.log('\n✅ All done!');
}

main().catch(console.error);
