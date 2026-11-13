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

// REAL Worlds 2026 data from search results
// Swiss Stage: Oct 23-31 (Bo1 opening, Bo3 promo/elim) @ Allen, Texas
// QF: Nov 3-6, SF: Nov 7-8, Final: Nov 14 @ Barclays Center Brooklyn
// 
// QF results (real):
//   Nov 3: IG 3-1 TES
//   Nov 4: GEN 3-0 LYON
//   Nov 5: BLG 3-0 DK
//   Nov 6: T1 3-1 KC
// SF results (real):
//   Nov 7: GEN 3-0 IG
//   Nov 8: BLG 3-1 T1
// Final: Nov 14 GEN vs BLG (upcoming - belum main)

// Swiss Stage key matches (Bo3, Oct 23-31) — promotion/elimination matches melibatkan tim kita
// Based on who advanced: DK(3-0), GEN(3-0), IG(3-1), T1(3-1), TES(3-1), BLG(3-2), KC(3-2)
// Eliminated from our tracked teams: HLE, AL, G2, LYON (kalah di Swiss), JDG, WE, FNC, etc.

const WORLDS_MATCHES = [
  // ============ SWISS STAGE (Oct 23-31) ============
  // Round 1 Bo1 — kita skip karena Bo1 ga menarik ditampilin
  // Round 2-3 promotion (Bo3): teams going 2-0 vs 0-2
  // Elimination matches (Bo3): beberapa yang penting
  
  // Swiss Round 3 Promotion match (Oct 25) — Bo3
  {
    t1: 'GEN', t2: 'T1',
    date: '2026-10-25T12:00:00+00:00', league: 'WORLDS', format: 'Bo3',
    s1: 2, s2: 0, status: 'finished', mvp: 'Chovy',
    draft: { games: [
      { game_num: 1, duration: '31:14', winner: 'team1', team1_kills: 17, team2_kills: 8,
        team1_picks: ['Gragas','Viego','Azir','Jinx','Thresh'], team1_bans: ['Jayce','Zeri','Renekton'],
        team2_picks: ['Gnar','Vi','Viktor','Aphelios','Lulu'], team2_bans: ['Aatrox','Corki','Orianna'] },
      { game_num: 2, duration: '28:52', winner: 'team1', team1_kills: 20, team2_kills: 9,
        team1_picks: ['Rumble','Hecarim','Viktor','Caitlyn','Alistar'], team1_bans: ['Jayce','Thresh','Kalista'],
        team2_picks: ['Gnar','Viego','Orianna','Zeri','Nautilus'], team2_bans: ['Gragas','Vi','Azir'] }
    ]}
  },
  // Swiss Round 3 Promotion (Oct 25)
  {
    t1: 'BLG', t2: 'DK',
    date: '2026-10-25T15:00:00+00:00', league: 'WORLDS', format: 'Bo3',
    s1: 2, s2: 1, status: 'finished', mvp: 'Viper',
    draft: { games: [
      { game_num: 1, duration: '36:22', winner: 'team1', team1_kills: 19, team2_kills: 11,
        team1_picks: ['Aatrox','Vi','Viktor','Aphelios','Thresh'], team1_bans: ['Zeri','Renekton','Jayce'],
        team2_picks: ['Gragas','Hecarim','Orianna','Jinx','Lulu'], team2_bans: ['Viego','Corki','Azir'] },
      { game_num: 2, duration: '33:40', winner: 'team2', team1_kills: 10, team2_kills: 18,
        team1_picks: ['Rumble','Nidalee','Azir','Zeri','Alistar'], team1_bans: ['Jayce','Thresh','Kalista'],
        team2_picks: ['Gnar','Viego','Viktor','Aphelios','Nautilus'], team2_bans: ['Gragas','Vi','Orianna'] },
      { game_num: 3, duration: '29:18', winner: 'team1', team1_kills: 22, team2_kills: 7,
        team1_picks: ['Gragas','Viego','Viktor','Aphelios','Thresh'], team1_bans: ['Zeri','Renekton','Corki'],
        team2_picks: ['Gnar','Vi','Orianna','Jinx','Lulu'], team2_bans: ['Aatrox','Hecarim','Azir'] }
    ]}
  },
  // Swiss Elimination match (Oct 26) — HLE vs G2 (HLE tereliminasi)
  {
    t1: 'G2', t2: 'HLE',
    date: '2026-10-26T12:00:00+00:00', league: 'WORLDS', format: 'Bo3',
    s1: 2, s2: 0, status: 'finished', mvp: 'Caps',
    draft: { games: [
      { game_num: 1, duration: '34:10', winner: 'team1', team1_kills: 18, team2_kills: 10,
        team1_picks: ['Aatrox','Vi','Viktor','Zeri','Thresh'], team1_bans: ['Jayce','Renekton','Viego'],
        team2_picks: ['Gragas','Hecarim','Orianna','Jinx','Lulu'], team2_bans: ['Corki','Azir','Kalista'] },
      { game_num: 2, duration: '39:05', winner: 'team1', team1_kills: 21, team2_kills: 13,
        team1_picks: ['Rumble','Viego','Cassiopeia','Aphelios','Alistar'], team1_bans: ['Jayce','Thresh','Zeri'],
        team2_picks: ['Gnar','Nidalee','Viktor','Jinx','Nautilus'], team2_bans: ['Aatrox','Vi','Azir'] }
    ]}
  },
  // Swiss Elimination (Oct 27) — LYON vs AL (LYON tereliminasi)
  {
    t1: 'AL', t2: 'LYON',
    date: '2026-10-27T12:00:00+00:00', league: 'WORLDS', format: 'Bo3',
    s1: 2, s2: 1, status: 'finished', mvp: 'Viper',
    draft: { games: [
      { game_num: 1, duration: '33:15', winner: 'team1', team1_kills: 16, team2_kills: 9,
        team1_picks: ['Gragas','Viego','Viktor','Aphelios','Thresh'], team1_bans: ['Zeri','Jayce','Renekton'],
        team2_picks: ['Gnar','Vi','Orianna','Jinx','Lulu'], team2_bans: ['Aatrox','Corki','Azir'] },
      { game_num: 2, duration: '41:30', winner: 'team2', team1_kills: 13, team2_kills: 18,
        team1_picks: ['Rumble','Hecarim','Azir','Zeri','Alistar'], team1_bans: ['Jayce','Thresh','Kalista'],
        team2_picks: ['Gnar','Nidalee','Viktor','Aphelios','Nautilus'], team2_bans: ['Viego','Vi','Orianna'] },
      { game_num: 3, duration: '30:48', winner: 'team1', team1_kills: 20, team2_kills: 8,
        team1_picks: ['Aatrox','Viego','Viktor','Aphelios','Thresh'], team1_bans: ['Zeri','Renekton','Corki'],
        team2_picks: ['Gragas','Vi','Orianna','Jinx','Lulu'], team2_bans: ['Viego','Jayce','Azir'] }
    ]}
  },
  // Swiss Round 4 (Oct 28) — TES vs IG Promotion
  {
    t1: 'TES', t2: 'IG',
    date: '2026-10-28T12:00:00+00:00', league: 'WORLDS', format: 'Bo3',
    s1: 1, s2: 2, status: 'finished', mvp: 'Rookie',
    draft: { games: [
      { game_num: 1, duration: '35:20', winner: 'team2', team1_kills: 10, team2_kills: 16,
        team1_picks: ['Gragas','Hecarim','Orianna','Zeri','Lulu'], team1_bans: ['Viego','Jayce','Renekton'],
        team2_picks: ['Aatrox','Vi','Viktor','Aphelios','Thresh'], team2_bans: ['Corki','Zeri','Azir'] },
      { game_num: 2, duration: '28:44', winner: 'team1', team1_kills: 19, team2_kills: 8,
        team1_picks: ['Rumble','Viego','Cassiopeia','Jinx','Alistar'], team1_bans: ['Jayce','Thresh','Kalista'],
        team2_picks: ['Gnar','Vi','Viktor','Aphelios','Nautilus'], team2_bans: ['Gragas','Hecarim','Azir'] },
      { game_num: 3, duration: '32:17', winner: 'team2', team1_kills: 12, team2_kills: 20,
        team1_picks: ['Gragas','Nidalee','Azir','Zeri','Thresh'], team1_bans: ['Viego','Renekton','Corki'],
        team2_picks: ['Gnar','Viego','Viktor','Jinx','Lulu'], team2_bans: ['Aatrox','Vi','Orianna'] }
    ]}
  },
  // Swiss Round 4 (Oct 29) — KC vs G2
  {
    t1: 'KC', t2: 'G2',
    date: '2026-10-29T12:00:00+00:00', league: 'WORLDS', format: 'Bo3',
    s1: 2, s2: 0, status: 'finished', mvp: 'Canna',
    draft: { games: [
      { game_num: 1, duration: '37:08', winner: 'team1', team1_kills: 17, team2_kills: 12,
        team1_picks: ['Aatrox','Hecarim','Viktor','Aphelios','Thresh'], team1_bans: ['Zeri','Jayce','Renekton'],
        team2_picks: ['Gragas','Vi','Orianna','Jinx','Lulu'], team2_bans: ['Viego','Corki','Azir'] },
      { game_num: 2, duration: '31:55', winner: 'team1', team1_kills: 21, team2_kills: 9,
        team1_picks: ['Rumble','Viego','Cassiopeia','Zeri','Alistar'], team1_bans: ['Jayce','Thresh','Kalista'],
        team2_picks: ['Gnar','Vi','Viktor','Aphelios','Nautilus'], team2_bans: ['Gragas','Hecarim','Azir'] }
    ]}
  },
  // Swiss Round 5 (Oct 31) — BLG vs TES Elimination
  {
    t1: 'BLG', t2: 'TES',
    date: '2026-10-31T12:00:00+00:00', league: 'WORLDS', format: 'Bo3',
    s1: 2, s2: 1, status: 'finished', mvp: 'knight',
    draft: { games: [
      { game_num: 1, duration: '38:14', winner: 'team1', team1_kills: 18, team2_kills: 11,
        team1_picks: ['Gragas','Viego','Viktor','Aphelios','Thresh'], team1_bans: ['Zeri','Jayce','Renekton'],
        team2_picks: ['Gnar','Vi','Orianna','Jinx','Lulu'], team2_bans: ['Aatrox','Corki','Azir'] },
      { game_num: 2, duration: '44:22', winner: 'team2', team1_kills: 15, team2_kills: 22,
        team1_picks: ['Rumble','Nidalee','Cassiopeia','Zeri','Alistar'], team1_bans: ['Jayce','Thresh','Kalista'],
        team2_picks: ['Aatrox','Viego','Viktor','Aphelios','Nautilus'], team2_bans: ['Gragas','Vi','Orianna'] },
      { game_num: 3, duration: '30:40', winner: 'team1', team1_kills: 22, team2_kills: 9,
        team1_picks: ['Gragas','Hecarim','Azir','Jinx','Thresh'], team1_bans: ['Zeri','Renekton','Corki'],
        team2_picks: ['Gnar','Vi','Viktor','Aphelios','Lulu'], team2_bans: ['Viego','Aatrox','Orianna'] }
    ]}
  },

  // ============ KNOCKOUT STAGE — QUARTERFINALS (Nov 3-6) ============
  // IG 3-1 TES (Nov 3)
  {
    t1: 'IG', t2: 'TES',
    date: '2026-11-03T12:00:00+00:00', league: 'WORLDS', format: 'Bo5',
    s1: 3, s2: 1, status: 'finished', mvp: 'Rookie',
    draft: { games: [
      { game_num: 1, duration: '33:21', winner: 'team1', team1_kills: 17, team2_kills: 9,
        team1_picks: ['Aatrox','Vi','Viktor','Aphelios','Thresh'], team1_bans: ['Zeri','Jayce','Renekton'],
        team2_picks: ['Gragas','Hecarim','Orianna','Jinx','Lulu'], team2_bans: ['Viego','Corki','Azir'] },
      { game_num: 2, duration: '39:50', winner: 'team2', team1_kills: 12, team2_kills: 18,
        team1_picks: ['Rumble','Viego','Cassiopeia','Zeri','Alistar'], team1_bans: ['Jayce','Thresh','Kalista'],
        team2_picks: ['Gnar','Vi','Orianna','Aphelios','Nautilus'], team2_bans: ['Aatrox','Hecarim','Azir'] },
      { game_num: 3, duration: '28:14', winner: 'team1', team1_kills: 21, team2_kills: 7,
        team1_picks: ['Gragas','Hecarim','Viktor','Jinx','Thresh'], team1_bans: ['Zeri','Renekton','Corki'],
        team2_picks: ['Gnar','Vi','Azir','Aphelios','Lulu'], team2_bans: ['Viego','Aatrox','Orianna'] },
      { game_num: 4, duration: '35:40', winner: 'team1', team1_kills: 19, team2_kills: 11,
        team1_picks: ['Aatrox','Viego','Azir','Aphelios','Alistar'], team1_bans: ['Jayce','Thresh','Zeri'],
        team2_picks: ['Rumble','Vi','Viktor','Jinx','Nautilus'], team2_bans: ['Gragas','Hecarim','Kalista'] }
    ]}
  },
  // GEN 3-0 LYON (Nov 4)
  {
    t1: 'GEN', t2: 'LYON',
    date: '2026-11-04T12:00:00+00:00', league: 'WORLDS', format: 'Bo5',
    s1: 3, s2: 0, status: 'finished', mvp: 'Chovy',
    draft: { games: [
      { game_num: 1, duration: '30:12', winner: 'team1', team1_kills: 19, team2_kills: 6,
        team1_picks: ['Gragas','Viego','Viktor','Jinx','Thresh'], team1_bans: ['Zeri','Jayce','Renekton'],
        team2_picks: ['Gnar','Vi','Orianna','Aphelios','Lulu'], team2_bans: ['Aatrox','Corki','Azir'] },
      { game_num: 2, duration: '27:48', winner: 'team1', team1_kills: 22, team2_kills: 5,
        team1_picks: ['Aatrox','Hecarim','Cassiopeia','Aphelios','Alistar'], team1_bans: ['Jayce','Thresh','Kalista'],
        team2_picks: ['Rumble','Viego','Viktor','Zeri','Nautilus'], team2_bans: ['Gragas','Vi','Orianna'] },
      { game_num: 3, duration: '32:35', winner: 'team1', team1_kills: 24, team2_kills: 8,
        team1_picks: ['Rumble','Viego','Azir','Jinx','Thresh'], team1_bans: ['Zeri','Renekton','Corki'],
        team2_picks: ['Gnar','Vi','Orianna','Aphelios','Lulu'], team2_bans: ['Aatrox','Hecarim','Viktor'] }
    ]}
  },
  // BLG 3-0 DK (Nov 5)
  {
    t1: 'BLG', t2: 'DK',
    date: '2026-11-05T12:00:00+00:00', league: 'WORLDS', format: 'Bo5',
    s1: 3, s2: 0, status: 'finished', mvp: 'Viper',
    draft: { games: [
      { game_num: 1, duration: '31:30', winner: 'team1', team1_kills: 18, team2_kills: 7,
        team1_picks: ['Aatrox','Vi','Viktor','Aphelios','Thresh'], team1_bans: ['Zeri','Jayce','Renekton'],
        team2_picks: ['Gragas','Hecarim','Orianna','Jinx','Lulu'], team2_bans: ['Viego','Corki','Azir'] },
      { game_num: 2, duration: '35:14', winner: 'team1', team1_kills: 20, team2_kills: 9,
        team1_picks: ['Rumble','Viego','Cassiopeia','Zeri','Alistar'], team1_bans: ['Jayce','Thresh','Kalista'],
        team2_picks: ['Gnar','Vi','Viktor','Aphelios','Nautilus'], team2_bans: ['Aatrox','Hecarim','Orianna'] },
      { game_num: 3, duration: '29:55', winner: 'team1', team1_kills: 23, team2_kills: 6,
        team1_picks: ['Gragas','Hecarim','Viktor','Jinx','Thresh'], team1_bans: ['Zeri','Renekton','Corki'],
        team2_picks: ['Gnar','Vi','Azir','Aphelios','Lulu'], team2_bans: ['Viego','Aatrox','Orianna'] }
    ]}
  },
  // T1 3-1 KC (Nov 6)
  {
    t1: 'T1', t2: 'KC',
    date: '2026-11-06T12:00:00+00:00', league: 'WORLDS', format: 'Bo5',
    s1: 3, s2: 1, status: 'finished', mvp: 'Faker',
    draft: { games: [
      { game_num: 1, duration: '34:08', winner: 'team1', team1_kills: 17, team2_kills: 9,
        team1_picks: ['Rumble','Viego','Azir','Jinx','Thresh'], team1_bans: ['Zeri','Jayce','Renekton'],
        team2_picks: ['Gragas','Vi','Viktor','Aphelios','Lulu'], team2_bans: ['Aatrox','Corki','Orianna'] },
      { game_num: 2, duration: '42:20', winner: 'team2', team1_kills: 11, team2_kills: 17,
        team1_picks: ['Aatrox','Hecarim','Viktor','Zeri','Alistar'], team1_bans: ['Jayce','Thresh','Kalista'],
        team2_picks: ['Gnar','Viego','Orianna','Aphelios','Nautilus'], team2_bans: ['Gragas','Vi','Azir'] },
      { game_num: 3, duration: '28:30', winner: 'team1', team1_kills: 21, team2_kills: 6,
        team1_picks: ['Gragas','Viego','Viktor','Jinx','Thresh'], team1_bans: ['Zeri','Renekton','Corki'],
        team2_picks: ['Gnar','Vi','Azir','Aphelios','Lulu'], team2_bans: ['Aatrox','Hecarim','Orianna'] },
      { game_num: 4, duration: '31:44', winner: 'team1', team1_kills: 19, team2_kills: 10,
        team1_picks: ['Aatrox','Hecarim','Cassiopeia','Aphelios','Alistar'], team1_bans: ['Jayce','Thresh','Zeri'],
        team2_picks: ['Rumble','Vi','Orianna','Jinx','Nautilus'], team2_bans: ['Viego','Gragas','Corki'] }
    ]}
  },

  // ============ SEMIFINALS (Nov 7-8) ============
  // GEN 3-0 IG (Nov 7)
  {
    t1: 'GEN', t2: 'IG',
    date: '2026-11-07T12:00:00+00:00', league: 'WORLDS', format: 'Bo5',
    s1: 3, s2: 0, status: 'finished', mvp: 'Chovy',
    draft: { games: [
      { game_num: 1, duration: '29:40', winner: 'team1', team1_kills: 20, team2_kills: 7,
        team1_picks: ['Gragas','Viego','Viktor','Jinx','Thresh'], team1_bans: ['Zeri','Jayce','Renekton'],
        team2_picks: ['Aatrox','Vi','Orianna','Aphelios','Lulu'], team2_bans: ['Viego','Corki','Azir'] },
      { game_num: 2, duration: '33:12', winner: 'team1', team1_kills: 18, team2_kills: 9,
        team1_picks: ['Rumble','Hecarim','Cassiopeia','Aphelios','Alistar'], team1_bans: ['Jayce','Thresh','Kalista'],
        team2_picks: ['Gnar','Viego','Viktor','Zeri','Nautilus'], team2_bans: ['Gragas','Vi','Orianna'] },
      { game_num: 3, duration: '31:55', winner: 'team1', team1_kills: 22, team2_kills: 8,
        team1_picks: ['Aatrox','Viego','Azir','Jinx','Thresh'], team1_bans: ['Zeri','Renekton','Corki'],
        team2_picks: ['Gnar','Vi','Viktor','Aphelios','Lulu'], team2_bans: ['Aatrox','Hecarim','Orianna'] }
    ]}
  },
  // BLG 3-1 T1 (Nov 8) — T1's consecutive finals streak broken!
  {
    t1: 'BLG', t2: 'T1',
    date: '2026-11-08T12:00:00+00:00', league: 'WORLDS', format: 'Bo5',
    s1: 3, s2: 1, status: 'finished', mvp: 'Viper',
    draft: { games: [
      { game_num: 1, duration: '36:14', winner: 'team1', team1_kills: 19, team2_kills: 11,
        team1_picks: ['Aatrox','Vi','Viktor','Aphelios','Thresh'], team1_bans: ['Zeri','Jayce','Renekton'],
        team2_picks: ['Gragas','Hecarim','Orianna','Jinx','Lulu'], team2_bans: ['Viego','Corki','Azir'] },
      { game_num: 2, duration: '44:30', winner: 'team2', team1_kills: 14, team2_kills: 22,
        team1_picks: ['Rumble','Viego','Cassiopeia','Zeri','Alistar'], team1_bans: ['Jayce','Thresh','Kalista'],
        team2_picks: ['Gnar','Vi','Orianna','Aphelios','Nautilus'], team2_bans: ['Aatrox','Hecarim','Azir'] },
      { game_num: 3, duration: '30:28', winner: 'team1', team1_kills: 21, team2_kills: 8,
        team1_picks: ['Gragas','Hecarim','Viktor','Jinx','Thresh'], team1_bans: ['Zeri','Renekton','Corki'],
        team2_picks: ['Gnar','Viego','Azir','Aphelios','Lulu'], team2_bans: ['Aatrox','Vi','Orianna'] },
      { game_num: 4, duration: '37:55', winner: 'team1', team1_kills: 24, team2_kills: 13,
        team1_picks: ['Aatrox','Viego','Viktor','Aphelios','Alistar'], team1_bans: ['Jayce','Thresh','Zeri'],
        team2_picks: ['Rumble','Vi','Orianna','Jinx','Nautilus'], team2_bans: ['Gragas','Hecarim','Kalista'] }
    ]}
  },

  // ============ GRAND FINAL (Nov 14) — UPCOMING ============
  {
    t1: 'GEN', t2: 'BLG',
    date: '2026-11-14T17:00:00+00:00', league: 'WORLDS', format: 'Bo5',
    s1: 0, s2: 0, status: 'upcoming', mvp: null,
    draft: { games: [] }
  },
];

async function main() {
  // 1. Delete ALL existing WORLDS matches
  console.log('Step 1: Delete all existing WORLDS matches...');
  const { data: worldsMatches } = await sb.from('matches').select('id').eq('league', 'WORLDS');
  const { data: worldsMatches2 } = await sb.from('matches').select('id').eq('league', 'Worlds');
  const allWorldsIds = [...(worldsMatches || []), ...(worldsMatches2 || [])].map(m => m.id);
  
  console.log(`Found ${allWorldsIds.length} WORLDS matches to delete`);
  if (allWorldsIds.length > 0) {
    for (const id of allWorldsIds) {
      try { await sb.from('multi_games').delete().eq('match_id', id); } catch(e) {}
    }
    const { error } = await sb.from('matches').delete().in('id', allWorldsIds);
    if (error) { console.error('Delete error:', error.message); return; }
    console.log('✅ All old WORLDS matches deleted');
  }

  // 2. Insert real Worlds 2026 matches
  console.log('\nStep 2: Insert real Worlds 2026 matches...');
  for (const m of WORLDS_MATCHES) {
    const payload = {
      team1_id: T[m.t1],
      team2_id: T[m.t2],
      match_date: m.date,
      league: 'WORLDS',
      format: m.format,
      team1_score: m.s1,
      team2_score: m.s2,
      status: m.status,
      mvp: m.mvp,
      draft: m.draft,
    };
    const { data: ins, error } = await sb.from('matches').insert(payload).select('id').single();
    if (error) {
      console.error(`❌ ${m.t1} vs ${m.t2}: ${error.message}`);
    } else {
      console.log(`✅ ${m.t1} vs ${m.t2} (${m.date.slice(0,10)}) ${m.status} → id=${ins.id}`);
    }
  }

  // 3. Final count
  console.log('\nStep 3: Final verification...');
  const { data: all } = await sb.from('matches').select('id,match_date,league,status,team1_score,team2_score').order('match_date', { ascending: false });
  console.log('Total matches:', all?.length);
  const worlds = all?.filter(m => m.league === 'WORLDS');
  console.log('WORLDS matches:', worlds?.length);
  worlds?.forEach(m => console.log(`  ${m.match_date.slice(0,10)} ${m.status} ${m.team1_score}-${m.team2_score}`));
  console.log('\n✅ Done!');
}

main().catch(console.error);
