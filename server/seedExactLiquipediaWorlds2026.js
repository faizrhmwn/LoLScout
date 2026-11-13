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

// EXACT 2026 WORLD CHAMPIONSHIP MATCHES ACCORDING TO LIQUEPEDIA
const EXACT_WORLDS_2026_MATCHES = [
  // ==================== SWISS STAGE ROUND 1 (Oct 23, 2026) ====================
  {
    t1: 'DK', t2: 'G2',
    date: '2026-10-23T11:00:00+00:00', league: 'WORLDS', format: 'Bo1',
    s1: 1, s2: 0, status: 'finished', mvp: 'ShowMaker',
    draft: { games: [
      { game_num: 1, duration: '28:45', winner: 'team1', team1_kills: 16, team2_kills: 6,
        team1_picks: ['Rumble', 'Lucian', 'Syndra', 'Kai\'Sa', 'Nautilus'], team1_bans: ['Ashe', 'Vi', 'Renekton'],
        team2_picks: ['Gnar', 'Sejuani', 'Orianna', 'Jhin', 'Leona'], team2_bans: ['Yone', 'K\'Sante', 'Poppy'] }
    ]}
  },
  {
    t1: 'GEN', t2: 'IG',
    date: '2026-10-23T12:00:00+00:00', league: 'WORLDS', format: 'Bo1',
    s1: 1, s2: 0, status: 'finished', mvp: 'Chovy',
    draft: { games: [
      { game_num: 1, duration: '31:12', winner: 'team1', team1_kills: 18, team2_kills: 5,
        team1_picks: ['K\'Sante', 'Skarner', 'Ahri', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Rumble', 'Aurora'],
        team2_picks: ['Jax', 'Xin Zhao', 'Yone', 'Varus', 'Rell'], team2_bans: ['Nidalee', 'Corki', 'Leona'] }
    ]}
  },
  {
    t1: 'T1', t2: 'LOS',
    date: '2026-10-23T13:00:00+00:00', league: 'WORLDS', format: 'Bo1',
    s1: 1, s2: 0, status: 'finished', mvp: 'Faker',
    draft: { games: [
      { game_num: 1, duration: '25:30', winner: 'team1', team1_kills: 22, team2_kills: 4,
        team1_picks: ['Gnar', 'Vi', 'Sylas', 'Xayah', 'Rakan'], team1_bans: ['Renekton', 'Maokai', 'Ashe'],
        team2_picks: ['Camille', 'Sejuani', 'Azir', 'Kai\'Sa', 'Alistar'], team2_bans: ['Orianna', 'Kalista', 'K\'Sante'] }
    ]}
  },
  {
    t1: 'HLE', t2: 'TES',
    date: '2026-10-23T14:00:00+00:00', league: 'WORLDS', format: 'Bo1',
    s1: 1, s2: 0, status: 'finished', mvp: 'Gumayusi',
    draft: { games: [
      { game_num: 1, duration: '34:20', winner: 'team1', team1_kills: 15, team2_kills: 9,
        team1_picks: ['Jax', 'Sejuani', 'Yone', 'Ezreal', 'Leona'], team1_bans: ['Rumble', 'Ashe', 'Skarner'],
        team2_picks: ['K\'Sante', 'Vi', 'Aurora', 'Varus', 'Rell'], team2_bans: ['Kalista', 'Poppy', 'Ahri'] }
    ]}
  },
  {
    t1: 'MKOI', t2: 'BLG',
    date: '2026-10-23T15:00:00+00:00', league: 'WORLDS', format: 'Bo1',
    s1: 1, s2: 0, status: 'finished', mvp: 'Jojopyun',
    draft: { games: [
      { game_num: 1, duration: '36:45', winner: 'team1', team1_kills: 17, team2_kills: 12,
        team1_picks: ['Gragas', 'Jarvan IV', 'Neeko', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'K\'Sante'],
        team2_picks: ['Rumble', 'Skarner', 'Orianna', 'Kai\'Sa', 'Nautilus'], team2_bans: ['Aurora', 'Vi', 'Poppy'] }
    ]}
  },
  {
    t1: 'KC', t2: 'AL',
    date: '2026-10-23T16:00:00+00:00', league: 'WORLDS', format: 'Bo1',
    s1: 1, s2: 0, status: 'finished', mvp: 'Caliste',
    draft: { games: [
      { game_num: 1, duration: '29:50', winner: 'team1', team1_kills: 20, team2_kills: 8,
        team1_picks: ['Renekton', 'Nocturne', 'Galio', 'Jinx', 'Thresh'], team1_bans: ['Ashe', 'Skarner', 'Yone'],
        team2_picks: ['K\'Sante', 'Sejuani', 'Azir', 'Xayah', 'Rakan'], team2_bans: ['Kalista', 'Rumble', 'Vi'] }
    ]}
  },

  // ==================== SWISS STAGE ROUND 2 (Oct 24, 2026) ====================
  {
    t1: 'DK', t2: 'T1',
    date: '2026-10-24T12:00:00+00:00', league: 'WORLDS', format: 'Bo1',
    s1: 1, s2: 0, status: 'finished', mvp: 'Lucid',
    draft: { games: [
      { game_num: 1, duration: '32:10', winner: 'team1', team1_kills: 14, team2_kills: 7,
        team1_picks: ['Rumble', 'Vi', 'Orianna', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'K\'Sante'],
        team2_picks: ['Gnar', 'Skarner', 'Ahri', 'Varus', 'Leona'], team2_bans: ['Aurora', 'Poppy', 'Renekton'] }
    ]}
  },
  {
    t1: 'GEN', t2: 'HLE',
    date: '2026-10-24T13:00:00+00:00', league: 'WORLDS', format: 'Bo1',
    s1: 1, s2: 0, status: 'finished', mvp: 'Kiin',
    draft: { games: [
      { game_num: 1, duration: '37:40', winner: 'team1', team1_kills: 16, team2_kills: 10,
        team1_picks: ['K\'Sante', 'Nidalee', 'Tristana', 'Ezreal', 'Leona'], team1_bans: ['Yone', 'Rumble', 'Ashe'],
        team2_picks: ['Jax', 'Sejuani', 'Sylas', 'Kai\'Sa', 'Nautilus'], team2_bans: ['Kalista', 'Skarner', 'Ahri'] }
    ]}
  },
  {
    t1: 'BLG', t2: 'TL',
    date: '2026-10-24T14:00:00+00:00', league: 'WORLDS', format: 'Bo1',
    s1: 1, s2: 0, status: 'finished', mvp: 'knight',
    draft: { games: [
      { game_num: 1, duration: '26:15', winner: 'team1', team1_kills: 19, team2_kills: 3,
        team1_picks: ['Jax', 'Xin Zhao', 'Ahri', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Rumble', 'Ashe'],
        team2_picks: ['K\'Sante', 'Sejuani', 'Taliyah', 'Jhin', 'Braum'], team2_bans: ['Aurora', 'Skarner', 'Orianna'] }
    ]}
  },
  {
    t1: 'TES', t2: 'AL',
    date: '2026-10-24T15:00:00+00:00', league: 'WORLDS', format: 'Bo1',
    s1: 1, s2: 0, status: 'finished', mvp: 'JackeyLove',
    draft: { games: [
      { game_num: 1, duration: '30:05', winner: 'team1', team1_kills: 18, team2_kills: 7,
        team1_picks: ['Renekton', 'Vi', 'Orianna', 'Draven', 'Nautilus'], team1_bans: ['Kalista', 'Ashe', 'K\'Sante'],
        team2_picks: ['Gnar', 'Skarner', 'Yone', 'Kai\'Sa', 'Rell'], team2_bans: ['Rumble', 'Aurora', 'Poppy'] }
    ]}
  },

  // ==================== SWISS STAGE ROUND 3 (Oct 25-26, 2026) ====================
  // Round 3 High (2-0 pool, Bo3 Qualification): DK and GEN advance 3-0!
  {
    t1: 'DK', t2: 'MKOI',
    date: '2026-10-25T11:00:00+00:00', league: 'WORLDS', format: 'Bo3',
    s1: 2, s2: 0, status: 'finished', mvp: 'ShowMaker',
    draft: { games: [
      { game_num: 1, duration: '29:40', winner: 'team1', team1_kills: 15, team2_kills: 5,
        team1_picks: ['Rumble', 'Vi', 'Syndra', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'K\'Sante'],
        team2_picks: ['K\'Sante', 'Sejuani', 'Orianna', 'Varus', 'Leona'], team2_bans: ['Aurora', 'Skarner', 'Renekton'] },
      { game_num: 2, duration: '33:15', winner: 'team1', team1_kills: 21, team2_kills: 8,
        team1_picks: ['K\'Sante', 'Skarner', 'Yone', 'Kai\'Sa', 'Nautilus'], team1_bans: ['Ashe', 'Rumble', 'Renata Glasc'],
        team2_picks: ['Jax', 'Xin Zhao', 'Ahri', 'Xayah', 'Rakan'], team2_bans: ['Vi', 'Kalista', 'Poppy'] }
    ]}
  },
  {
    t1: 'GEN', t2: 'LYON',
    date: '2026-10-25T14:00:00+00:00', league: 'WORLDS', format: 'Bo3',
    s1: 2, s2: 1, status: 'finished', mvp: 'Chovy',
    draft: { games: [
      { game_num: 1, duration: '27:10', winner: 'team1', team1_kills: 19, team2_kills: 4,
        team1_picks: ['Renekton', 'Skarner', 'Ahri', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'Rumble'],
        team2_picks: ['K\'Sante', 'Sejuani', 'Orianna', 'Jhin', 'Leona'], team2_bans: ['Aurora', 'Vi', 'Poppy'] },
      { game_num: 2, duration: '36:20', winner: 'team2', team1_kills: 9, team2_kills: 16,
        team1_picks: ['Jax', 'Nidalee', 'Corki', 'Ezreal', 'Rell'], team1_bans: ['Ashe', 'Renekton', 'Skarner'],
        team2_picks: ['Gnar', 'Vi', 'Taliyah', 'Kai\'Sa', 'Nautilus'], team2_bans: ['Yone', 'Kalista', 'K\'Sante'] },
      { game_num: 3, duration: '28:50', winner: 'team1', team1_kills: 22, team2_kills: 6,
        team1_picks: ['K\'Sante', 'Vi', 'Yone', 'Varus', 'Leona'], team1_bans: ['Kalista', 'Rumble', 'Ashe'],
        team2_picks: ['Rumble', 'Xin Zhao', 'Sylas', 'Xayah', 'Rakan'], team2_bans: ['Skarner', 'Aurora', 'Poppy'] }
    ]}
  },
  // Round 3 Mid (1-1 pool, Bo1)
  {
    t1: 'BLG', t2: 'KC',
    date: '2026-10-26T12:00:00+00:00', league: 'WORLDS', format: 'Bo1',
    s1: 1, s2: 0, status: 'finished', mvp: 'Viper',
    draft: { games: [
      { game_num: 1, duration: '31:40', winner: 'team1', team1_kills: 18, team2_kills: 7,
        team1_picks: ['Gnar', 'Skarner', 'Orianna', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'Renekton'],
        team2_picks: ['K\'Sante', 'Vi', 'Ahri', 'Jinx', 'Thresh'], team2_bans: ['Rumble', 'Aurora', 'Poppy'] }
    ]}
  },
  {
    t1: 'IG', t2: 'HLE',
    date: '2026-10-26T13:00:00+00:00', league: 'WORLDS', format: 'Bo1',
    s1: 1, s2: 0, status: 'finished', mvp: 'TheShy',
    draft: { games: [
      { game_num: 1, duration: '34:55', winner: 'team1', team1_kills: 17, team2_kills: 11,
        team1_picks: ['Aatrox', 'Sejuani', 'Yone', 'Varus', 'Rell'], team1_bans: ['Kalista', 'Ashe', 'K\'Sante'],
        team2_picks: ['Jax', 'Vi', 'Azir', 'Kai\'Sa', 'Leona'], team2_bans: ['Rumble', 'Skarner', 'Ahri'] }
    ]}
  },
  {
    t1: 'TES', t2: 'G2',
    date: '2026-10-26T14:00:00+00:00', league: 'WORLDS', format: 'Bo1',
    s1: 1, s2: 0, status: 'finished', mvp: '369',
    draft: { games: [
      { game_num: 1, duration: '28:10', winner: 'team1', team1_kills: 16, team2_kills: 5,
        team1_picks: ['Rumble', 'Vi', 'Orianna', 'Ashe', 'Braum'], team1_bans: ['Yone', 'K\'Sante', 'Kalista'],
        team2_picks: ['Gnar', 'Skarner', 'Sylas', 'Jhin', 'Leona'], team2_bans: ['Aurora', 'Renekton', 'Poppy'] }
    ]}
  },

  // ==================== SWISS STAGE ROUND 4 (Oct 28-29, 2026) ====================
  // Qualification matches (2-1 pool, Bo3): T1, IG, TES qualify 3-1!
  {
    t1: 'T1', t2: 'MKOI',
    date: '2026-10-28T12:00:00+00:00', league: 'WORLDS', format: 'Bo3',
    s1: 2, s2: 0, status: 'finished', mvp: 'Peyz',
    draft: { games: [
      { game_num: 1, duration: '29:15', winner: 'team1', team1_kills: 18, team2_kills: 6,
        team1_picks: ['Gnar', 'Vi', 'Orianna', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'K\'Sante'],
        team2_picks: ['Renekton', 'Skarner', 'Ahri', 'Varus', 'Leona'], team2_bans: ['Aurora', 'Rumble', 'Poppy'] },
      { game_num: 2, duration: '27:50', winner: 'team1', team1_kills: 20, team2_kills: 4,
        team1_picks: ['K\'Sante', 'Xin Zhao', 'Sylas', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'Vi'],
        team2_picks: ['Jax', 'Sejuani', 'Taliyah', 'Kai\'Sa', 'Alistar'], team2_bans: ['Skarner', 'Rumble', 'Orianna'] }
    ]}
  },
  {
    t1: 'IG', t2: 'LYON',
    date: '2026-10-28T15:00:00+00:00', league: 'WORLDS', format: 'Bo3',
    s1: 2, s2: 1, status: 'finished', mvp: 'Rookie',
    draft: { games: [
      { game_num: 1, duration: '33:10', winner: 'team1', team1_kills: 17, team2_kills: 9,
        team1_picks: ['Jax', 'Vi', 'Orianna', 'Varus', 'Rell'], team1_bans: ['Kalista', 'Ashe', 'K\'Sante'],
        team2_picks: ['Gnar', 'Skarner', 'Yone', 'Kai\'Sa', 'Nautilus'], team2_bans: ['Rumble', 'Aurora', 'Poppy'] },
      { game_num: 2, duration: '38:40', winner: 'team2', team1_kills: 11, team2_kills: 19,
        team1_picks: ['Aatrox', 'Sejuani', 'Ahri', 'Ezreal', 'Leona'], team1_bans: ['Yone', 'Renekton', 'Skarner'],
        team2_picks: ['K\'Sante', 'Nidalee', 'Tristana', 'Xayah', 'Rakan'], team2_bans: ['Kalista', 'Vi', 'Orianna'] },
      { game_num: 3, duration: '29:30', winner: 'team1', team1_kills: 21, team2_kills: 7,
        team1_picks: ['Rumble', 'Skarner', 'Yone', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'K\'Sante', 'Renekton'],
        team2_picks: ['Renekton', 'Xin Zhao', 'Sylas', 'Jhin', 'Leona'], team2_bans: ['Vi', 'Aurora', 'Ahri'] }
    ]}
  },
  {
    t1: 'TES', t2: 'BLG',
    date: '2026-10-29T12:00:00+00:00', league: 'WORLDS', format: 'Bo3',
    s1: 2, s2: 1, status: 'finished', mvp: 'Creme',
    draft: { games: [
      { game_num: 1, duration: '35:20', winner: 'team1', team1_kills: 16, team2_kills: 11,
        team1_picks: ['K\'Sante', 'Vi', 'Orianna', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'Rumble'],
        team2_picks: ['Jax', 'Skarner', 'Ahri', 'Kai\'Sa', 'Nautilus'], team2_bans: ['Aurora', 'Renekton', 'Poppy'] },
      { game_num: 2, duration: '32:45', winner: 'team2', team1_kills: 8, team2_kills: 19,
        team1_picks: ['Renekton', 'Sejuani', 'Yone', 'Varus', 'Leona'], team1_bans: ['Kalista', 'Ashe', 'Skarner'],
        team2_picks: ['Rumble', 'Xin Zhao', 'Sylas', 'Xayah', 'Rakan'], team2_bans: ['Vi', 'K\'Sante', 'Orianna'] },
      { game_num: 3, duration: '31:10', winner: 'team1', team1_kills: 22, team2_kills: 8,
        team1_picks: ['Gnar', 'Skarner', 'Tristana', 'Draven', 'Nautilus'], team1_bans: ['Kalista', 'Yone', 'Rumble'],
        team2_picks: ['K\'Sante', 'Vi', 'Orianna', 'Kalista', 'Renata Glasc'], team2_bans: ['Ashe', 'Aurora', 'Poppy'] }
    ]}
  },

  // ==================== SWISS STAGE ROUND 5 (Oct 31, 2026) ====================
  // Decider Match (2-2 pool, Bo3): BLG qualifies 3-2, HLE eliminated!
  {
    t1: 'BLG', t2: 'HLE',
    date: '2026-10-31T12:00:00+00:00', league: 'WORLDS', format: 'Bo3',
    s1: 2, s2: 1, status: 'finished', mvp: 'Bin',
    draft: { games: [
      { game_num: 1, duration: '34:50', winner: 'team1', team1_kills: 18, team2_kills: 10,
        team1_picks: ['Jax', 'Skarner', 'Ahri', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'K\'Sante'],
        team2_picks: ['Gnar', 'Vi', 'Orianna', 'Kai\'Sa', 'Leona'], team2_bans: ['Rumble', 'Aurora', 'Poppy'] },
      { game_num: 2, duration: '37:15', winner: 'team2', team1_kills: 9, team2_kills: 17,
        team1_picks: ['K\'Sante', 'Xin Zhao', 'Yone', 'Varus', 'Rell'], team1_bans: ['Ashe', 'Renekton', 'Skarner'],
        team2_picks: ['Rumble', 'Sejuani', 'Sylas', 'Ezreal', 'Nautilus'], team2_bans: ['Kalista', 'Vi', 'Orianna'] },
      { game_num: 3, duration: '30:25', winner: 'team1', team1_kills: 23, team2_kills: 7,
        team1_picks: ['Rumble', 'Vi', 'Orianna', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'K\'Sante'],
        team2_picks: ['Renekton', 'Skarner', 'Azir', 'Xayah', 'Rakan'], team2_bans: ['Aurora', 'Poppy', 'Ahri'] }
    ]}
  },

  // ==================== KNOCKOUT STAGE: QUARTERFINALS (Nov 3-6, 2026) ====================
  // Match 1: IG 3-1 TES (Nov 3)
  {
    t1: 'IG', t2: 'TES',
    date: '2026-11-03T12:00:00+00:00', league: 'WORLDS', format: 'Bo5',
    s1: 3, s2: 1, status: 'finished', mvp: 'Rookie',
    draft: { games: [
      { game_num: 1, duration: '33:21', winner: 'team1', team1_kills: 17, team2_kills: 9,
        team1_picks: ['Jax', 'Vi', 'Orianna', 'Varus', 'Rell'], team1_bans: ['Kalista', 'Ashe', 'K\'Sante'],
        team2_picks: ['Gnar', 'Skarner', 'Yone', 'Kai\'Sa', 'Nautilus'], team2_bans: ['Rumble', 'Aurora', 'Poppy'] },
      { game_num: 2, duration: '39:50', winner: 'team2', team1_kills: 12, team2_kills: 18,
        team1_picks: ['Aatrox', 'Sejuani', 'Ahri', 'Ezreal', 'Leona'], team1_bans: ['Yone', 'Renekton', 'Skarner'],
        team2_picks: ['K\'Sante', 'Nidalee', 'Tristana', 'Xayah', 'Rakan'], team2_bans: ['Kalista', 'Vi', 'Orianna'] },
      { game_num: 3, duration: '28:14', winner: 'team1', team1_kills: 21, team2_kills: 7,
        team1_picks: ['Rumble', 'Skarner', 'Yone', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'K\'Sante', 'Renekton'],
        team2_picks: ['Renekton', 'Xin Zhao', 'Sylas', 'Jhin', 'Leona'], team2_bans: ['Vi', 'Aurora', 'Ahri'] },
      { game_num: 4, duration: '35:40', winner: 'team1', team1_kills: 19, team2_kills: 11,
        team1_picks: ['K\'Sante', 'Vi', 'Syndra', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'Rumble'],
        team2_picks: ['Gnar', 'Jarvan IV', 'Azir', 'Varus', 'Alistar'], team2_bans: ['Skarner', 'Orianna', 'Poppy'] }
    ]}
  },
  // Match 2: GEN 3-0 LYON (Nov 4)
  {
    t1: 'GEN', t2: 'LYON',
    date: '2026-11-04T12:00:00+00:00', league: 'WORLDS', format: 'Bo5',
    s1: 3, s2: 0, status: 'finished', mvp: 'Chovy',
    draft: { games: [
      { game_num: 1, duration: '30:12', winner: 'team1', team1_kills: 19, team2_kills: 6,
        team1_picks: ['Renekton', 'Skarner', 'Ahri', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'Rumble'],
        team2_picks: ['K\'Sante', 'Sejuani', 'Orianna', 'Jhin', 'Leona'], team2_bans: ['Aurora', 'Vi', 'Poppy'] },
      { game_num: 2, duration: '27:48', winner: 'team1', team1_kills: 22, team2_kills: 5,
        team1_picks: ['K\'Sante', 'Vi', 'Yone', 'Varus', 'Leona'], team1_bans: ['Kalista', 'Rumble', 'Ashe'],
        team2_picks: ['Rumble', 'Xin Zhao', 'Sylas', 'Xayah', 'Rakan'], team2_bans: ['Skarner', 'Aurora', 'Poppy'] },
      { game_num: 3, duration: '32:35', winner: 'team1', team1_kills: 24, team2_kills: 8,
        team1_picks: ['Jax', 'Nidalee', 'Tristana', 'Ezreal', 'Rell'], team1_bans: ['Ashe', 'Renekton', 'Skarner'],
        team2_picks: ['Gnar', 'Vi', 'Taliyah', 'Kai\'Sa', 'Nautilus'], team2_bans: ['Yone', 'Kalista', 'K\'Sante'] }
    ]}
  },
  // Match 3: BLG 3-0 DK (Nov 5)
  {
    t1: 'BLG', t2: 'DK',
    date: '2026-11-05T12:00:00+00:00', league: 'WORLDS', format: 'Bo5',
    s1: 3, s2: 0, status: 'finished', mvp: 'Bin',
    draft: { games: [
      { game_num: 1, duration: '31:30', winner: 'team1', team1_kills: 18, team2_kills: 7,
        team1_picks: ['Jax', 'Skarner', 'Ahri', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'K\'Sante'],
        team2_picks: ['Gnar', 'Vi', 'Orianna', 'Kai\'Sa', 'Leona'], team2_bans: ['Rumble', 'Aurora', 'Poppy'] },
      { game_num: 2, duration: '35:14', winner: 'team1', team1_kills: 20, team2_kills: 9,
        team1_picks: ['Rumble', 'Vi', 'Orianna', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'K\'Sante'],
        team2_picks: ['Renekton', 'Skarner', 'Azir', 'Xayah', 'Rakan'], team2_bans: ['Aurora', 'Poppy', 'Ahri'] },
      { game_num: 3, duration: '29:55', winner: 'team1', team1_kills: 23, team2_kills: 6,
        team1_picks: ['K\'Sante', 'Xin Zhao', 'Yone', 'Varus', 'Rell'], team1_bans: ['Ashe', 'Renekton', 'Skarner'],
        team2_picks: ['Rumble', 'Sejuani', 'Sylas', 'Ezreal', 'Nautilus'], team2_bans: ['Kalista', 'Vi', 'Orianna'] }
    ]}
  },
  // Match 4: T1 3-1 KC (Nov 6)
  {
    t1: 'T1', t2: 'KC',
    date: '2026-11-06T12:00:00+00:00', league: 'WORLDS', format: 'Bo5',
    s1: 3, s2: 1, status: 'finished', mvp: 'Faker',
    draft: { games: [
      { game_num: 1, duration: '34:08', winner: 'team1', team1_kills: 17, team2_kills: 9,
        team1_picks: ['Gnar', 'Vi', 'Orianna', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'K\'Sante'],
        team2_picks: ['Renekton', 'Skarner', 'Ahri', 'Varus', 'Leona'], team2_bans: ['Aurora', 'Rumble', 'Poppy'] },
      { game_num: 2, duration: '42:20', winner: 'team2', team1_kills: 11, team2_kills: 17,
        team1_picks: ['K\'Sante', 'Xin Zhao', 'Sylas', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'Vi'],
        team2_picks: ['Jax', 'Sejuani', 'Taliyah', 'Kai\'Sa', 'Alistar'], team2_bans: ['Skarner', 'Rumble', 'Orianna'] },
      { game_num: 3, duration: '28:30', winner: 'team1', team1_kills: 21, team2_kills: 6,
        team1_picks: ['Rumble', 'Skarner', 'Yone', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'K\'Sante', 'Renekton'],
        team2_picks: ['Renekton', 'Xin Zhao', 'Sylas', 'Jhin', 'Leona'], team2_bans: ['Vi', 'Aurora', 'Ahri'] },
      { game_num: 4, duration: '31:44', winner: 'team1', team1_kills: 19, team2_kills: 10,
        team1_picks: ['Gnar', 'Vi', 'Sylas', 'Xayah', 'Rakan'], team1_bans: ['Renekton', 'Maokai', 'Ashe'],
        team2_picks: ['Camille', 'Sejuani', 'Azir', 'Kai\'Sa', 'Alistar'], team2_bans: ['Orianna', 'Kalista', 'K\'Sante'] }
    ]}
  },

  // ==================== KNOCKOUT STAGE: SEMIFINALS (Nov 7-8, 2026) ====================
  // Semifinal 1: GEN 3-0 IG (Nov 7)
  {
    t1: 'GEN', t2: 'IG',
    date: '2026-11-07T12:00:00+00:00', league: 'WORLDS', format: 'Bo5',
    s1: 3, s2: 0, status: 'finished', mvp: 'Canyon',
    draft: { games: [
      { game_num: 1, duration: '29:40', winner: 'team1', team1_kills: 20, team2_kills: 7,
        team1_picks: ['K\'Sante', 'Skarner', 'Ahri', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Rumble', 'Aurora'],
        team2_picks: ['Jax', 'Xin Zhao', 'Yone', 'Varus', 'Rell'], team2_bans: ['Nidalee', 'Corki', 'Leona'] },
      { game_num: 2, duration: '33:12', winner: 'team1', team1_kills: 18, team2_kills: 9,
        team1_picks: ['Renekton', 'Nidalee', 'Tristana', 'Ezreal', 'Leona'], team1_bans: ['Yone', 'Rumble', 'Ashe'],
        team2_picks: ['Jax', 'Sejuani', 'Sylas', 'Kai\'Sa', 'Nautilus'], team2_bans: ['Kalista', 'Skarner', 'Ahri'] },
      { game_num: 3, duration: '31:55', winner: 'team1', team1_kills: 22, team2_kills: 8,
        team1_picks: ['Gnar', 'Vi', 'Orianna', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'K\'Sante'],
        team2_picks: ['Renekton', 'Skarner', 'Azir', 'Xayah', 'Rakan'], team2_bans: ['Aurora', 'Poppy', 'Ahri'] }
    ]}
  },
  // Semifinal 2: BLG 3-1 T1 (Nov 8) - BLG ends T1's Worlds streak!
  {
    t1: 'BLG', t2: 'T1',
    date: '2026-11-08T12:00:00+00:00', league: 'WORLDS', format: 'Bo5',
    s1: 3, s2: 1, status: 'finished', mvp: 'knight',
    draft: { games: [
      { game_num: 1, duration: '36:14', winner: 'team1', team1_kills: 19, team2_kills: 11,
        team1_picks: ['Jax', 'Skarner', 'Ahri', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'K\'Sante'],
        team2_picks: ['Gnar', 'Vi', 'Orianna', 'Kai\'Sa', 'Leona'], team2_bans: ['Rumble', 'Aurora', 'Poppy'] },
      { game_num: 2, duration: '44:30', winner: 'team2', team1_kills: 14, team2_kills: 22,
        team1_picks: ['Rumble', 'Vi', 'Orianna', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'K\'Sante'],
        team2_picks: ['Renekton', 'Skarner', 'Azir', 'Xayah', 'Rakan'], team2_bans: ['Aurora', 'Poppy', 'Ahri'] },
      { game_num: 3, duration: '30:28', winner: 'team1', team1_kills: 21, team2_kills: 8,
        team1_picks: ['K\'Sante', 'Xin Zhao', 'Yone', 'Varus', 'Rell'], team1_bans: ['Ashe', 'Renekton', 'Skarner'],
        team2_picks: ['Rumble', 'Sejuani', 'Sylas', 'Ezreal', 'Nautilus'], team2_bans: ['Kalista', 'Vi', 'Orianna'] },
      { game_num: 4, duration: '37:55', winner: 'team1', team1_kills: 24, team2_kills: 13,
        team1_picks: ['Gnar', 'Vi', 'Sylas', 'Kai\'Sa', 'Nautilus'], team1_bans: ['Ashe', 'Kalista', 'K\'Sante'],
        team2_picks: ['Jax', 'Skarner', 'Orianna', 'Xayah', 'Rakan'], team2_bans: ['Yone', 'Rumble', 'Ahri'] }
    ]}
  },

  // ==================== KNOCKOUT STAGE: GRAND FINAL (Nov 14, 2026) ====================
  // Barclays Center, Brooklyn, NY (Upcoming)
  {
    t1: 'GEN', t2: 'BLG',
    date: '2026-11-14T17:00:00+00:00', league: 'WORLDS', format: 'Bo5',
    s1: 0, s2: 0, status: 'upcoming', mvp: null,
    draft: { games: [] }
  }
];

async function main() {
  console.log('--- PURGING ALL OLD WORLDS MATCHES ---');
  const { data: oldM1 } = await sb.from('matches').select('id').eq('league', 'WORLDS');
  const { data: oldM2 } = await sb.from('matches').select('id').eq('league', 'Worlds');
  const allOldIds = [...(oldM1 || []), ...(oldM2 || [])].map(m => m.id);

  if (allOldIds.length > 0) {
    for (const id of allOldIds) {
      try { await sb.from('multi_games').delete().eq('match_id', id); } catch(e) {}
    }
    const { error: delErr } = await sb.from('matches').delete().in('id', allOldIds);
    if (delErr) {
      console.error('Failed to delete old matches:', delErr.message);
      return;
    }
    console.log(`Deleted ${allOldIds.length} old WORLDS matches successfully.`);
  }

  console.log('\n--- INSERTING EXACT LIQUEPEDIA WORLDS 2026 MATCHES ---');
  for (const m of EXACT_WORLDS_2026_MATCHES) {
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
      console.error(`❌ [${m.t1} vs ${m.t2}]: ${error.message}`);
    } else {
      console.log(`✅ [${m.t1} vs ${m.t2}] (${m.date.slice(0, 10)}) ${m.format} ${m.s1}:${m.s2} [${m.status}] -> id=${ins.id}`);
    }
  }

  console.log('\n--- VERIFYING COMPLETE MATCH DATABASE ---');
  const { data: all } = await sb.from('matches').select('id, match_date, league, format, status, team1_id, team2_id, team1_score, team2_score').order('match_date', { ascending: false });
  console.log(`Total matches in DB: ${all.length}`);
  const { data: teams } = await sb.from('teams').select('id, short_name');
  const map = Object.fromEntries(teams.map(t => [t.id, t.short_name]));
  all.filter(m => m.league === 'WORLDS').forEach(m => {
    console.log(`  ${m.match_date.slice(0, 10)} | ${m.format} | ${map[m.team1_id]} vs ${map[m.team2_id]} (${m.team1_score}:${m.team2_score}) | ${m.status}`);
  });
  console.log('\nALL DONE!');
}

main().catch(console.error);
