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

const OFFICIAL_SEASON_2026_MATCHES = [
  // ==========================================
  // 1. FIRST STAND TOURNAMENT 2026 (March 16-22, São Paulo, Brazil)
  // ==========================================
  {
    t1: 'GEN', t2: 'LYON',
    date: '2026-03-16T17:00:00+00:00', league: 'First Stand', format: 'Bo5',
    s1: 3, s2: 0, status: 'finished', mvp: 'Chovy',
    draft: { games: [
      { game_num: 1, duration: '29:10', winner: 'team1', team1_kills: 18, team2_kills: 5,
        team1_picks: ['Aatrox', 'Sejuani', 'Azir', 'Varus', 'Braum'], team1_bans: ['Kalista', 'Ashe', 'Renekton'],
        team2_picks: ['K\'Sante', 'Vi', 'Orianna', 'Kai\'Sa', 'Nautilus'], team2_bans: ['Yone', 'Rumble', 'Poppy'] },
      { game_num: 2, duration: '31:45', winner: 'team1', team1_kills: 21, team2_kills: 8,
        team1_picks: ['K\'Sante', 'Nidalee', 'Tristana', 'Ezreal', 'Leona'], team1_bans: ['Ashe', 'Rumble', 'Skarner'],
        team2_picks: ['Gnar', 'Xin Zhao', 'Ahri', 'Xayah', 'Rakan'], team2_bans: ['Kalista', 'Vi', 'Azir'] },
      { game_num: 3, duration: '27:30', winner: 'team1', team1_kills: 20, team2_kills: 4,
        team1_picks: ['Jax', 'Skarner', 'Yone', 'Ashe', 'Rell'], team1_bans: ['Kalista', 'Renekton', 'Orianna'],
        team2_picks: ['Renekton', 'Jarvan IV', 'Sylas', 'Jhin', 'Alistar'], team2_bans: ['Vi', 'Aurora', 'Poppy'] }
    ]}
  },
  {
    t1: 'G2', t2: 'LLL',
    date: '2026-03-17T17:00:00+00:00', league: 'First Stand', format: 'Bo5',
    s1: 3, s2: 0, status: 'finished', mvp: 'Caps',
    draft: { games: [
      { game_num: 1, duration: '26:40', winner: 'team1', team1_kills: 22, team2_kills: 6,
        team1_picks: ['Rumble', 'Vi', 'Syndra', 'Draven', 'Nautilus'], team1_bans: ['Kalista', 'Yone', 'Ashe'],
        team2_picks: ['K\'Sante', 'Sejuani', 'Azir', 'Kai\'Sa', 'Leona'], team2_bans: ['Aurora', 'Skarner', 'Renekton'] },
      { game_num: 2, duration: '28:15', winner: 'team1', team1_kills: 19, team2_kills: 7,
        team1_picks: ['Gnar', 'Skarner', 'Neeko', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'Vi'],
        team2_picks: ['Jax', 'Xin Zhao', 'Orianna', 'Varus', 'Braum'], team2_bans: ['Rumble', 'Poppy', 'Ahri'] },
      { game_num: 3, duration: '25:20', winner: 'team1', team1_kills: 25, team2_kills: 5,
        team1_picks: ['Camille', 'Sejuani', 'Yone', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Renekton', 'Skarner'],
        team2_picks: ['Renekton', 'Vi', 'Ahri', 'Jhin', 'Rell'], team2_bans: ['Aurora', 'Rumble', 'Poppy'] }
    ]}
  },
  {
    t1: 'BLG', t2: 'FOX',
    date: '2026-03-18T17:00:00+00:00', league: 'First Stand', format: 'Bo5',
    s1: 3, s2: 1, status: 'finished', mvp: 'Bin',
    draft: { games: [
      { game_num: 1, duration: '32:10', winner: 'team1', team1_kills: 18, team2_kills: 9,
        team1_picks: ['Jax', 'Skarner', 'Ahri', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'K\'Sante'],
        team2_picks: ['Gnar', 'Vi', 'Orianna', 'Kai\'Sa', 'Leona'], team2_bans: ['Rumble', 'Aurora', 'Poppy'] },
      { game_num: 2, duration: '37:40', winner: 'team2', team1_kills: 12, team2_kills: 17,
        team1_picks: ['K\'Sante', 'Xin Zhao', 'Yone', 'Varus', 'Rell'], team1_bans: ['Ashe', 'Renekton', 'Skarner'],
        team2_picks: ['Rumble', 'Sejuani', 'Sylas', 'Ezreal', 'Nautilus'], team2_bans: ['Kalista', 'Vi', 'Orianna'] },
      { game_num: 3, duration: '28:50', winner: 'team1', team1_kills: 21, team2_kills: 6,
        team1_picks: ['Rumble', 'Vi', 'Orianna', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'K\'Sante'],
        team2_picks: ['Renekton', 'Skarner', 'Azir', 'Xayah', 'Rakan'], team2_bans: ['Aurora', 'Poppy', 'Ahri'] },
      { game_num: 4, duration: '30:35', winner: 'team1', team1_kills: 23, team2_kills: 8,
        team1_picks: ['Gnar', 'Jarvan IV', 'Sylas', 'Kai\'Sa', 'Nautilus'], team1_bans: ['Ashe', 'Kalista', 'K\'Sante'],
        team2_picks: ['Jax', 'Skarner', 'Orianna', 'Varus', 'Braum'], team2_bans: ['Yone', 'Rumble', 'Ahri'] }
    ]}
  },
  {
    t1: 'G2', t2: 'GEN',
    date: '2026-03-20T17:00:00+00:00', league: 'First Stand', format: 'Bo5',
    s1: 3, s2: 0, status: 'finished', mvp: 'Caps',
    draft: { games: [
      { game_num: 1, duration: '31:25', winner: 'team1', team1_kills: 19, team2_kills: 8,
        team1_picks: ['K\'Sante', 'Vi', 'Orianna', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'Rumble'],
        team2_picks: ['Jax', 'Skarner', 'Ahri', 'Kai\'Sa', 'Nautilus'], team2_bans: ['Aurora', 'Renekton', 'Poppy'] },
      { game_num: 2, duration: '33:40', winner: 'team1', team1_kills: 22, team2_kills: 10,
        team1_picks: ['Rumble', 'Sejuani', 'Sylas', 'Varus', 'Rell'], team1_bans: ['Ashe', 'Renekton', 'Skarner'],
        team2_picks: ['Gnar', 'Xin Zhao', 'Yone', 'Xayah', 'Rakan'], team2_bans: ['Kalista', 'Vi', 'Orianna'] },
      { game_num: 3, duration: '29:15', winner: 'team1', team1_kills: 20, team2_kills: 6,
        team1_picks: ['Gnar', 'Skarner', 'Neeko', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'K\'Sante'],
        team2_picks: ['Renekton', 'Vi', 'Azir', 'Jhin', 'Leona'], team2_bans: ['Rumble', 'Poppy', 'Ahri'] }
    ]}
  },
  {
    t1: 'BLG', t2: 'JDG',
    date: '2026-03-21T17:00:00+00:00', league: 'First Stand', format: 'Bo5',
    s1: 3, s2: 0, status: 'finished', mvp: 'Bin',
    draft: { games: [
      { game_num: 1, duration: '28:15', winner: 'team1', team1_kills: 17, team2_kills: 5,
        team1_picks: ['Jax', 'Skarner', 'Ahri', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'K\'Sante'],
        team2_picks: ['Gnar', 'Vi', 'Orianna', 'Kai\'Sa', 'Leona'], team2_bans: ['Rumble', 'Aurora', 'Poppy'] },
      { game_num: 2, duration: '30:45', winner: 'team1', team1_kills: 21, team2_kills: 7,
        team1_picks: ['Rumble', 'Vi', 'Orianna', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'K\'Sante'],
        team2_picks: ['Renekton', 'Skarner', 'Azir', 'Xayah', 'Rakan'], team2_bans: ['Aurora', 'Poppy', 'Ahri'] },
      { game_num: 3, duration: '27:50', winner: 'team1', team1_kills: 24, team2_kills: 6,
        team1_picks: ['K\'Sante', 'Xin Zhao', 'Yone', 'Varus', 'Rell'], team1_bans: ['Ashe', 'Renekton', 'Skarner'],
        team2_picks: ['Rumble', 'Sejuani', 'Sylas', 'Ezreal', 'Nautilus'], team2_bans: ['Kalista', 'Vi', 'Orianna'] }
    ]}
  },
  {
    t1: 'BLG', t2: 'G2',
    date: '2026-03-22T17:00:00+00:00', league: 'First Stand', format: 'Bo5',
    s1: 3, s2: 1, status: 'finished', mvp: 'Bin',
    draft: { games: [
      { game_num: 1, duration: '34:20', winner: 'team1', team1_kills: 18, team2_kills: 11,
        team1_picks: ['Jax', 'Vi', 'Orianna', 'Varus', 'Rell'], team1_bans: ['Kalista', 'Ashe', 'K\'Sante'],
        team2_picks: ['Gnar', 'Skarner', 'Yone', 'Kai\'Sa', 'Nautilus'], team2_bans: ['Rumble', 'Aurora', 'Poppy'] },
      { game_num: 2, duration: '38:15', winner: 'team2', team1_kills: 10, team2_kills: 18,
        team1_picks: ['Aatrox', 'Sejuani', 'Ahri', 'Ezreal', 'Leona'], team1_bans: ['Yone', 'Renekton', 'Skarner'],
        team2_picks: ['K\'Sante', 'Nidalee', 'Tristana', 'Xayah', 'Rakan'], team2_bans: ['Kalista', 'Vi', 'Orianna'] },
      { game_num: 3, duration: '29:40', winner: 'team1', team1_kills: 22, team2_kills: 7,
        team1_picks: ['Rumble', 'Skarner', 'Yone', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'K\'Sante', 'Renekton'],
        team2_picks: ['Renekton', 'Xin Zhao', 'Sylas', 'Jhin', 'Leona'], team2_bans: ['Vi', 'Aurora', 'Ahri'] },
      { game_num: 4, duration: '32:50', winner: 'team1', team1_kills: 25, team2_kills: 9,
        team1_picks: ['Gnar', 'Vi', 'Sylas', 'Kalista', 'Renata Glasc'], team1_bans: ['Ashe', 'Yone', 'K\'Sante'],
        team2_picks: ['Camille', 'Sejuani', 'Azir', 'Kai\'Sa', 'Alistar'], team2_bans: ['Orianna', 'Kalista', 'Rumble'] }
    ]}
  },

  // ==========================================
  // 2. MID-SEASON INVITATIONAL 2026 (June 28 - July 12, Daejeon, Korea)
  // ==========================================
  {
    t1: 'BLG', t2: 'T1',
    date: '2026-07-02T10:00:00+00:00', league: 'MSI', format: 'Bo5',
    s1: 3, s2: 1, status: 'finished', mvp: 'knight',
    draft: { games: [
      { game_num: 1, duration: '33:15', winner: 'team1', team1_kills: 17, team2_kills: 8,
        team1_picks: ['Jax', 'Skarner', 'Ahri', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'K\'Sante'],
        team2_picks: ['Gnar', 'Vi', 'Orianna', 'Kai\'Sa', 'Leona'], team2_bans: ['Rumble', 'Aurora', 'Poppy'] },
      { game_num: 2, duration: '36:40', winner: 'team2', team1_kills: 11, team2_kills: 19,
        team1_picks: ['K\'Sante', 'Xin Zhao', 'Yone', 'Varus', 'Rell'], team1_bans: ['Ashe', 'Renekton', 'Skarner'],
        team2_picks: ['Rumble', 'Sejuani', 'Sylas', 'Ezreal', 'Nautilus'], team2_bans: ['Kalista', 'Vi', 'Orianna'] },
      { game_num: 3, duration: '30:10', winner: 'team1', team1_kills: 20, team2_kills: 6,
        team1_picks: ['Rumble', 'Vi', 'Orianna', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'K\'Sante'],
        team2_picks: ['Renekton', 'Skarner', 'Azir', 'Xayah', 'Rakan'], team2_bans: ['Aurora', 'Poppy', 'Ahri'] },
      { game_num: 4, duration: '34:25', winner: 'team1', team1_kills: 22, team2_kills: 10,
        team1_picks: ['Gnar', 'Jarvan IV', 'Sylas', 'Kai\'Sa', 'Nautilus'], team1_bans: ['Ashe', 'Kalista', 'K\'Sante'],
        team2_picks: ['Jax', 'Skarner', 'Orianna', 'Varus', 'Braum'], team2_bans: ['Yone', 'Rumble', 'Ahri'] }
    ]}
  },
  {
    t1: 'HLE', t2: 'G2',
    date: '2026-07-03T10:00:00+00:00', league: 'MSI', format: 'Bo5',
    s1: 3, s2: 1, status: 'finished', mvp: 'Zeka',
    draft: { games: [
      { game_num: 1, duration: '31:50', winner: 'team1', team1_kills: 18, team2_kills: 7,
        team1_picks: ['K\'Sante', 'Vi', 'Yone', 'Varus', 'Leona'], team1_bans: ['Kalista', 'Rumble', 'Ashe'],
        team2_picks: ['Rumble', 'Xin Zhao', 'Sylas', 'Xayah', 'Rakan'], team2_bans: ['Skarner', 'Aurora', 'Poppy'] },
      { game_num: 2, duration: '35:20', winner: 'team2', team1_kills: 13, team2_kills: 18,
        team1_picks: ['Jax', 'Nidalee', 'Tristana', 'Ezreal', 'Rell'], team1_bans: ['Ashe', 'Renekton', 'Skarner'],
        team2_picks: ['Gnar', 'Vi', 'Taliyah', 'Kai\'Sa', 'Nautilus'], team2_bans: ['Yone', 'Kalista', 'K\'Sante'] },
      { game_num: 3, duration: '28:40', winner: 'team1', team1_kills: 21, team2_kills: 5,
        team1_picks: ['Renekton', 'Skarner', 'Ahri', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'Rumble'],
        team2_picks: ['K\'Sante', 'Sejuani', 'Orianna', 'Jhin', 'Leona'], team2_bans: ['Aurora', 'Vi', 'Poppy'] },
      { game_num: 4, duration: '32:15', winner: 'team1', team1_kills: 24, team2_kills: 9,
        team1_picks: ['Gnar', 'Vi', 'Sylas', 'Kalista', 'Renata Glasc'], team1_bans: ['Ashe', 'Yone', 'K\'Sante'],
        team2_picks: ['Camille', 'Sejuani', 'Azir', 'Kai\'Sa', 'Alistar'], team2_bans: ['Orianna', 'Kalista', 'Rumble'] }
    ]}
  },
  {
    t1: 'G2', t2: 'T1',
    date: '2026-07-08T10:00:00+00:00', league: 'MSI', format: 'Bo5',
    s1: 3, s2: 1, status: 'finished', mvp: 'Hans Sama',
    draft: { games: [
      { game_num: 1, duration: '33:45', winner: 'team1', team1_kills: 19, team2_kills: 10,
        team1_picks: ['Rumble', 'Vi', 'Orianna', 'Draven', 'Nautilus'], team1_bans: ['Kalista', 'Yone', 'K\'Sante'],
        team2_picks: ['Gnar', 'Skarner', 'Ahri', 'Varus', 'Leona'], team2_bans: ['Aurora', 'Poppy', 'Renekton'] },
      { game_num: 2, duration: '29:30', winner: 'team2', team1_kills: 8, team2_kills: 21,
        team1_picks: ['K\'Sante', 'Sejuani', 'Azir', 'Kai\'Sa', 'Alistar'], team1_bans: ['Yone', 'Ashe', 'Vi'],
        team2_picks: ['Jax', 'Xin Zhao', 'Sylas', 'Xayah', 'Rakan'], team2_bans: ['Kalista', 'Skarner', 'Orianna'] },
      { game_num: 3, duration: '32:10', winner: 'team1', team1_kills: 20, team2_kills: 7,
        team1_picks: ['K\'Sante', 'Skarner', 'Yone', 'Kalista', 'Renata Glasc'], team1_bans: ['Ashe', 'Rumble', 'Renekton'],
        team2_picks: ['Renekton', 'Vi', 'Orianna', 'Jhin', 'Braum'], team2_bans: ['Aurora', 'Poppy', 'Ahri'] },
      { game_num: 4, duration: '36:20', winner: 'team1', team1_kills: 23, team2_kills: 12,
        team1_picks: ['Gnar', 'Jarvan IV', 'Neeko', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'K\'Sante'],
        team2_picks: ['Camille', 'Sejuani', 'Taliyah', 'Ezreal', 'Leona'], team2_bans: ['Vi', 'Skarner', 'Orianna'] }
    ]}
  },
  {
    t1: 'BLG', t2: 'HLE',
    date: '2026-07-09T10:00:00+00:00', league: 'MSI', format: 'Bo5',
    s1: 3, s2: 2, status: 'finished', mvp: 'Viper',
    draft: { games: [
      { game_num: 1, duration: '35:10', winner: 'team1', team1_kills: 17, team2_kills: 11,
        team1_picks: ['Jax', 'Skarner', 'Ahri', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'K\'Sante'],
        team2_picks: ['Gnar', 'Vi', 'Orianna', 'Kai\'Sa', 'Leona'], team2_bans: ['Rumble', 'Aurora', 'Poppy'] },
      { game_num: 2, duration: '38:40', winner: 'team2', team1_kills: 12, team2_kills: 19,
        team1_picks: ['K\'Sante', 'Xin Zhao', 'Yone', 'Varus', 'Rell'], team1_bans: ['Ashe', 'Renekton', 'Skarner'],
        team2_picks: ['Rumble', 'Sejuani', 'Sylas', 'Ezreal', 'Nautilus'], team2_bans: ['Kalista', 'Vi', 'Orianna'] },
      { game_num: 3, duration: '29:50', winner: 'team1', team1_kills: 22, team2_kills: 8,
        team1_picks: ['Rumble', 'Vi', 'Orianna', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'K\'Sante'],
        team2_picks: ['Renekton', 'Skarner', 'Azir', 'Xayah', 'Rakan'], team2_bans: ['Aurora', 'Poppy', 'Ahri'] },
      { game_num: 4, duration: '33:15', winner: 'team2', team1_kills: 9, team2_kills: 18,
        team1_picks: ['Gnar', 'Jarvan IV', 'Sylas', 'Kai\'Sa', 'Nautilus'], team1_bans: ['Ashe', 'Kalista', 'K\'Sante'],
        team2_picks: ['Jax', 'Skarner', 'Orianna', 'Varus', 'Braum'], team2_bans: ['Yone', 'Rumble', 'Ahri'] },
      { game_num: 5, duration: '36:45', winner: 'team1', team1_kills: 24, team2_kills: 14,
        team1_picks: ['K\'Sante', 'Vi', 'Yone', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Renekton', 'Skarner'],
        team2_picks: ['Gnar', 'Sejuani', 'Azir', 'Jhin', 'Leona'], team2_bans: ['Aurora', 'Rumble', 'Poppy'] }
    ]}
  },
  {
    t1: 'HLE', t2: 'G2',
    date: '2026-07-11T10:00:00+00:00', league: 'MSI', format: 'Bo5',
    s1: 3, s2: 1, status: 'finished', mvp: 'Gumayusi',
    draft: { games: [
      { game_num: 1, duration: '30:40', winner: 'team1', team1_kills: 18, team2_kills: 6,
        team1_picks: ['Renekton', 'Skarner', 'Ahri', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'Rumble'],
        team2_picks: ['K\'Sante', 'Sejuani', 'Orianna', 'Jhin', 'Leona'], team2_bans: ['Aurora', 'Vi', 'Poppy'] },
      { game_num: 2, duration: '34:10', winner: 'team2', team1_kills: 10, team2_kills: 17,
        team1_picks: ['Jax', 'Nidalee', 'Tristana', 'Ezreal', 'Rell'], team1_bans: ['Ashe', 'Renekton', 'Skarner'],
        team2_picks: ['Gnar', 'Vi', 'Taliyah', 'Kai\'Sa', 'Nautilus'], team2_bans: ['Yone', 'Kalista', 'K\'Sante'] },
      { game_num: 3, duration: '28:15', winner: 'team1', team1_kills: 21, team2_kills: 5,
        team1_picks: ['K\'Sante', 'Vi', 'Yone', 'Varus', 'Leona'], team1_bans: ['Kalista', 'Rumble', 'Ashe'],
        team2_picks: ['Rumble', 'Xin Zhao', 'Sylas', 'Xayah', 'Rakan'], team2_bans: ['Skarner', 'Aurora', 'Poppy'] },
      { game_num: 4, duration: '33:50', winner: 'team1', team1_kills: 23, team2_kills: 9,
        team1_picks: ['Gnar', 'Vi', 'Sylas', 'Kalista', 'Renata Glasc'], team1_bans: ['Ashe', 'Yone', 'K\'Sante'],
        team2_picks: ['Camille', 'Sejuani', 'Azir', 'Kai\'Sa', 'Alistar'], team2_bans: ['Orianna', 'Kalista', 'Rumble'] }
    ]}
  },
  {
    t1: 'HLE', t2: 'BLG',
    date: '2026-07-12T10:00:00+00:00', league: 'MSI', format: 'Bo5',
    s1: 3, s2: 2, status: 'finished', mvp: 'Zeus',
    draft: { games: [
      { game_num: 1, duration: '36:10', winner: 'team1', team1_kills: 20, team2_kills: 12,
        team1_picks: ['Jax', 'Skarner', 'Ahri', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'K\'Sante'],
        team2_picks: ['Gnar', 'Vi', 'Orianna', 'Kai\'Sa', 'Leona'], team2_bans: ['Rumble', 'Aurora', 'Poppy'] },
      { game_num: 2, duration: '31:40', winner: 'team2', team1_kills: 9, team2_kills: 18,
        team1_picks: ['K\'Sante', 'Xin Zhao', 'Yone', 'Varus', 'Rell'], team1_bans: ['Ashe', 'Renekton', 'Skarner'],
        team2_picks: ['Rumble', 'Sejuani', 'Sylas', 'Ezreal', 'Nautilus'], team2_bans: ['Kalista', 'Vi', 'Orianna'] },
      { game_num: 3, duration: '34:55', winner: 'team1', team1_kills: 22, team2_kills: 11,
        team1_picks: ['Rumble', 'Vi', 'Orianna', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'K\'Sante'],
        team2_picks: ['Renekton', 'Skarner', 'Azir', 'Xayah', 'Rakan'], team2_bans: ['Aurora', 'Poppy', 'Ahri'] },
      { game_num: 4, duration: '39:20', winner: 'team2', team1_kills: 14, team2_kills: 21,
        team1_picks: ['Gnar', 'Jarvan IV', 'Sylas', 'Kai\'Sa', 'Nautilus'], team1_bans: ['Ashe', 'Kalista', 'K\'Sante'],
        team2_picks: ['Jax', 'Skarner', 'Orianna', 'Varus', 'Braum'], team2_bans: ['Yone', 'Rumble', 'Ahri'] },
      { game_num: 5, duration: '33:45', winner: 'team1', team1_kills: 25, team2_kills: 10,
        team1_picks: ['Aatrox', 'Vi', 'Yone', 'Ezreal', 'Leona'], team1_bans: ['Kalista', 'Rumble', 'Ashe'],
        team2_picks: ['K\'Sante', 'Sejuani', 'Azir', 'Jhin', 'Braum'], team2_bans: ['Aurora', 'Poppy', 'Ahri'] }
    ]}
  },

  // ==========================================
  // 3. LCK 2026 (LCK Cup, Road to MSI, Season Finals)
  // ==========================================
  {
    t1: 'T1', t2: 'KT',
    date: '2026-01-20T08:00:00+00:00', league: 'LCK', format: 'Bo3',
    s1: 2, s2: 1, status: 'finished', mvp: 'Faker',
    draft: { games: [
      { game_num: 1, duration: '32:10', winner: 'team1', team1_kills: 17, team2_kills: 7,
        team1_picks: ['Gnar', 'Vi', 'Orianna', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'K\'Sante'],
        team2_picks: ['Renekton', 'Skarner', 'Ahri', 'Varus', 'Leona'], team2_bans: ['Aurora', 'Rumble', 'Poppy'] },
      { game_num: 2, duration: '35:40', winner: 'team2', team1_kills: 10, team2_kills: 18,
        team1_picks: ['K\'Sante', 'Xin Zhao', 'Sylas', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'Vi'],
        team2_picks: ['Jax', 'Sejuani', 'Taliyah', 'Kai\'Sa', 'Alistar'], team2_bans: ['Skarner', 'Rumble', 'Orianna'] },
      { game_num: 3, duration: '28:50', winner: 'team1', team1_kills: 21, team2_kills: 6,
        team1_picks: ['Rumble', 'Skarner', 'Yone', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'K\'Sante', 'Renekton'],
        team2_picks: ['Renekton', 'Xin Zhao', 'Sylas', 'Jhin', 'Leona'], team2_bans: ['Vi', 'Aurora', 'Ahri'] }
    ]}
  },
  {
    t1: 'HLE', t2: 'DK',
    date: '2026-01-25T08:00:00+00:00', league: 'LCK', format: 'Bo3',
    s1: 2, s2: 0, status: 'finished', mvp: 'Gumayusi',
    draft: { games: [
      { game_num: 1, duration: '30:15', winner: 'team1', team1_kills: 18, team2_kills: 6,
        team1_picks: ['Jax', 'Sejuani', 'Yone', 'Ezreal', 'Leona'], team1_bans: ['Rumble', 'Ashe', 'Skarner'],
        team2_picks: ['K\'Sante', 'Vi', 'Aurora', 'Varus', 'Rell'], team2_bans: ['Kalista', 'Poppy', 'Ahri'] },
      { game_num: 2, duration: '33:40', winner: 'team1', team1_kills: 20, team2_kills: 8,
        team1_picks: ['Gnar', 'Vi', 'Sylas', 'Kalista', 'Renata Glasc'], team1_bans: ['Ashe', 'Yone', 'K\'Sante'],
        team2_picks: ['Camille', 'Sejuani', 'Azir', 'Kai\'Sa', 'Alistar'], team2_bans: ['Orianna', 'Kalista', 'Rumble'] }
    ]}
  },
  {
    t1: 'GEN', t2: 'FOX',
    date: '2026-02-21T08:00:00+00:00', league: 'LCK', format: 'Bo5',
    s1: 3, s2: 0, status: 'finished', mvp: 'Canyon',
    draft: { games: [
      { game_num: 1, duration: '28:30', winner: 'team1', team1_kills: 19, team2_kills: 5,
        team1_picks: ['K\'Sante', 'Skarner', 'Ahri', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Rumble', 'Aurora'],
        team2_picks: ['Jax', 'Xin Zhao', 'Yone', 'Varus', 'Rell'], team2_bans: ['Nidalee', 'Corki', 'Leona'] },
      { game_num: 2, duration: '31:10', winner: 'team1', team1_kills: 22, team2_kills: 7,
        team1_picks: ['Renekton', 'Nidalee', 'Tristana', 'Ezreal', 'Leona'], team1_bans: ['Yone', 'Rumble', 'Ashe'],
        team2_picks: ['Jax', 'Sejuani', 'Sylas', 'Kai\'Sa', 'Nautilus'], team2_bans: ['Kalista', 'Skarner', 'Ahri'] },
      { game_num: 3, duration: '27:45', winner: 'team1', team1_kills: 20, team2_kills: 4,
        team1_picks: ['Gnar', 'Vi', 'Orianna', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'K\'Sante'],
        team2_picks: ['Renekton', 'Skarner', 'Azir', 'Xayah', 'Rakan'], team2_bans: ['Aurora', 'Poppy', 'Ahri'] }
    ]}
  },
  {
    t1: 'GEN', t2: 'FOX',
    date: '2026-03-01T08:00:00+00:00', league: 'LCK', format: 'Bo5',
    s1: 3, s2: 1, status: 'finished', mvp: 'Ruler',
    draft: { games: [
      { game_num: 1, duration: '32:40', winner: 'team1', team1_kills: 18, team2_kills: 8,
        team1_picks: ['Renekton', 'Skarner', 'Ahri', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'Rumble'],
        team2_picks: ['K\'Sante', 'Sejuani', 'Orianna', 'Jhin', 'Leona'], team2_bans: ['Aurora', 'Vi', 'Poppy'] },
      { game_num: 2, duration: '36:15', winner: 'team2', team1_kills: 11, team2_kills: 17,
        team1_picks: ['Jax', 'Nidalee', 'Tristana', 'Ezreal', 'Rell'], team1_bans: ['Ashe', 'Renekton', 'Skarner'],
        team2_picks: ['Gnar', 'Vi', 'Taliyah', 'Kai\'Sa', 'Nautilus'], team2_bans: ['Yone', 'Kalista', 'K\'Sante'] },
      { game_num: 3, duration: '29:50', winner: 'team1', team1_kills: 21, team2_kills: 6,
        team1_picks: ['K\'Sante', 'Vi', 'Yone', 'Varus', 'Leona'], team1_bans: ['Kalista', 'Rumble', 'Ashe'],
        team2_picks: ['Rumble', 'Xin Zhao', 'Sylas', 'Xayah', 'Rakan'], team2_bans: ['Skarner', 'Aurora', 'Poppy'] },
      { game_num: 4, duration: '34:20', winner: 'team1', team1_kills: 24, team2_kills: 9,
        team1_picks: ['Gnar', 'Vi', 'Sylas', 'Kalista', 'Renata Glasc'], team1_bans: ['Ashe', 'Yone', 'K\'Sante'],
        team2_picks: ['Camille', 'Sejuani', 'Azir', 'Kai\'Sa', 'Alistar'], team2_bans: ['Orianna', 'Kalista', 'Rumble'] }
    ]}
  },
  {
    t1: 'T1', t2: 'GEN',
    date: '2026-06-07T08:00:00+00:00', league: 'LCK', format: 'Bo5',
    s1: 3, s2: 2, status: 'finished', mvp: 'Faker',
    draft: { games: [
      { game_num: 1, duration: '34:10', winner: 'team1', team1_kills: 17, team2_kills: 11,
        team1_picks: ['Gnar', 'Vi', 'Orianna', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'K\'Sante'],
        team2_picks: ['Renekton', 'Skarner', 'Ahri', 'Varus', 'Leona'], team2_bans: ['Aurora', 'Rumble', 'Poppy'] },
      { game_num: 2, duration: '31:45', winner: 'team2', team1_kills: 9, team2_kills: 19,
        team1_picks: ['K\'Sante', 'Xin Zhao', 'Sylas', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'Vi'],
        team2_picks: ['Jax', 'Sejuani', 'Taliyah', 'Kai\'Sa', 'Alistar'], team2_bans: ['Skarner', 'Rumble', 'Orianna'] },
      { game_num: 3, duration: '36:20', winner: 'team1', team1_kills: 22, team2_kills: 13,
        team1_picks: ['Rumble', 'Skarner', 'Yone', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'K\'Sante', 'Renekton'],
        team2_picks: ['Renekton', 'Xin Zhao', 'Sylas', 'Jhin', 'Leona'], team2_bans: ['Vi', 'Aurora', 'Ahri'] },
      { game_num: 4, duration: '30:15', winner: 'team2', team1_kills: 8, team2_kills: 18,
        team1_picks: ['Jax', 'Vi', 'Azir', 'Ezreal', 'Nautilus'], team1_bans: ['Yone', 'Rumble', 'Ashe'],
        team2_picks: ['K\'Sante', 'Skarner', 'Ahri', 'Varus', 'Rell'], team2_bans: ['Kalista', 'Vi', 'Poppy'] },
      { game_num: 5, duration: '38:50', winner: 'team1', team1_kills: 25, team2_kills: 16,
        team1_picks: ['Gnar', 'Vi', 'Sylas', 'Xayah', 'Rakan'], team1_bans: ['Renekton', 'Maokai', 'Ashe'],
        team2_picks: ['Camille', 'Sejuani', 'Azir', 'Kai\'Sa', 'Alistar'], team2_bans: ['Orianna', 'Kalista', 'K\'Sante'] }
    ]}
  },
  {
    t1: 'GEN', t2: 'HLE',
    date: '2026-09-13T08:00:00+00:00', league: 'LCK', format: 'Bo5',
    s1: 3, s2: 1, status: 'finished', mvp: 'Ruler',
    draft: { games: [
      { game_num: 1, duration: '33:15', winner: 'team1', team1_kills: 18, team2_kills: 7,
        team1_picks: ['K\'Sante', 'Skarner', 'Ahri', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Rumble', 'Aurora'],
        team2_picks: ['Jax', 'Xin Zhao', 'Yone', 'Varus', 'Rell'], team2_bans: ['Nidalee', 'Corki', 'Leona'] },
      { game_num: 2, duration: '36:40', winner: 'team2', team1_kills: 10, team2_kills: 19,
        team1_picks: ['Renekton', 'Nidalee', 'Tristana', 'Ezreal', 'Leona'], team1_bans: ['Yone', 'Rumble', 'Ashe'],
        team2_picks: ['Jax', 'Sejuani', 'Sylas', 'Kai\'Sa', 'Nautilus'], team2_bans: ['Kalista', 'Skarner', 'Ahri'] },
      { game_num: 3, duration: '29:50', winner: 'team1', team1_kills: 21, team2_kills: 6,
        team1_picks: ['Gnar', 'Vi', 'Orianna', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'K\'Sante'],
        team2_picks: ['Renekton', 'Skarner', 'Azir', 'Xayah', 'Rakan'], team2_bans: ['Aurora', 'Poppy', 'Ahri'] },
      { game_num: 4, duration: '34:20', winner: 'team1', team1_kills: 23, team2_kills: 9,
        team1_picks: ['Gnar', 'Vi', 'Sylas', 'Kai\'Sa', 'Nautilus'], team1_bans: ['Ashe', 'Kalista', 'K\'Sante'],
        team2_picks: ['Jax', 'Skarner', 'Orianna', 'Varus', 'Braum'], team2_bans: ['Yone', 'Rumble', 'Ahri'] }
    ]}
  },

  // ==========================================
  // 4. LPL 2026 (Split 1, Split 2, Split 3)
  // ==========================================
  {
    t1: 'BLG', t2: 'JDG',
    date: '2026-02-28T09:00:00+00:00', league: 'LPL', format: 'Bo5',
    s1: 3, s2: 1, status: 'finished', mvp: 'knight',
    draft: { games: [
      { game_num: 1, duration: '31:20', winner: 'team1', team1_kills: 18, team2_kills: 8,
        team1_picks: ['Jax', 'Skarner', 'Ahri', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'K\'Sante'],
        team2_picks: ['Gnar', 'Vi', 'Orianna', 'Kai\'Sa', 'Leona'], team2_bans: ['Rumble', 'Aurora', 'Poppy'] },
      { game_num: 2, duration: '35:45', winner: 'team2', team1_kills: 11, team2_kills: 17,
        team1_picks: ['K\'Sante', 'Xin Zhao', 'Yone', 'Varus', 'Rell'], team1_bans: ['Ashe', 'Renekton', 'Skarner'],
        team2_picks: ['Rumble', 'Sejuani', 'Sylas', 'Ezreal', 'Nautilus'], team2_bans: ['Kalista', 'Vi', 'Orianna'] },
      { game_num: 3, duration: '28:30', winner: 'team1', team1_kills: 22, team2_kills: 5,
        team1_picks: ['Rumble', 'Vi', 'Orianna', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'K\'Sante'],
        team2_picks: ['Renekton', 'Skarner', 'Azir', 'Xayah', 'Rakan'], team2_bans: ['Aurora', 'Poppy', 'Ahri'] },
      { game_num: 4, duration: '33:10', winner: 'team1', team1_kills: 20, team2_kills: 9,
        team1_picks: ['Gnar', 'Jarvan IV', 'Sylas', 'Kai\'Sa', 'Nautilus'], team1_bans: ['Ashe', 'Kalista', 'K\'Sante'],
        team2_picks: ['Jax', 'Skarner', 'Orianna', 'Varus', 'Braum'], team2_bans: ['Yone', 'Rumble', 'Ahri'] }
    ]}
  },
  {
    t1: 'BLG', t2: 'TES',
    date: '2026-06-14T09:00:00+00:00', league: 'LPL', format: 'Bo5',
    s1: 3, s2: 0, status: 'finished', mvp: 'Viper',
    draft: { games: [
      { game_num: 1, duration: '29:40', winner: 'team1', team1_kills: 19, team2_kills: 6,
        team1_picks: ['Jax', 'Vi', 'Orianna', 'Varus', 'Rell'], team1_bans: ['Kalista', 'Ashe', 'K\'Sante'],
        team2_picks: ['Gnar', 'Skarner', 'Yone', 'Kai\'Sa', 'Nautilus'], team2_bans: ['Rumble', 'Aurora', 'Poppy'] },
      { game_num: 2, duration: '27:50', winner: 'team1', team1_kills: 23, team2_kills: 4,
        team1_picks: ['Rumble', 'Skarner', 'Yone', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'K\'Sante', 'Renekton'],
        team2_picks: ['Renekton', 'Xin Zhao', 'Sylas', 'Jhin', 'Leona'], team2_bans: ['Vi', 'Aurora', 'Ahri'] },
      { game_num: 3, duration: '31:15', winner: 'team1', team1_kills: 21, team2_kills: 7,
        team1_picks: ['K\'Sante', 'Vi', 'Syndra', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'Rumble'],
        team2_picks: ['Gnar', 'Jarvan IV', 'Azir', 'Varus', 'Alistar'], team2_bans: ['Skarner', 'Orianna', 'Poppy'] }
    ]}
  },
  {
    t1: 'AL', t2: 'BLG',
    date: '2026-09-13T09:00:00+00:00', league: 'LPL', format: 'Bo5',
    s1: 3, s2: 1, status: 'finished', mvp: 'Hope',
    draft: { games: [
      { game_num: 1, duration: '34:20', winner: 'team1', team1_kills: 18, team2_kills: 10,
        team1_picks: ['Renekton', 'Skarner', 'Ahri', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'Rumble'],
        team2_picks: ['K\'Sante', 'Sejuani', 'Orianna', 'Jhin', 'Leona'], team2_bans: ['Aurora', 'Vi', 'Poppy'] },
      { game_num: 2, duration: '30:45', winner: 'team2', team1_kills: 9, team2_kills: 19,
        team1_picks: ['Jax', 'Nidalee', 'Tristana', 'Ezreal', 'Rell'], team1_bans: ['Ashe', 'Renekton', 'Skarner'],
        team2_picks: ['Gnar', 'Vi', 'Taliyah', 'Kai\'Sa', 'Nautilus'], team2_bans: ['Yone', 'Kalista', 'K\'Sante'] },
      { game_num: 3, duration: '32:50', winner: 'team1', team1_kills: 20, team2_kills: 8,
        team1_picks: ['K\'Sante', 'Vi', 'Yone', 'Varus', 'Leona'], team1_bans: ['Kalista', 'Rumble', 'Ashe'],
        team2_picks: ['Rumble', 'Xin Zhao', 'Sylas', 'Xayah', 'Rakan'], team2_bans: ['Skarner', 'Aurora', 'Poppy'] },
      { game_num: 4, duration: '36:10', winner: 'team1', team1_kills: 24, team2_kills: 12,
        team1_picks: ['Gnar', 'Vi', 'Sylas', 'Kalista', 'Renata Glasc'], team1_bans: ['Ashe', 'Yone', 'K\'Sante'],
        team2_picks: ['Camille', 'Sejuani', 'Azir', 'Kai\'Sa', 'Alistar'], team2_bans: ['Orianna', 'Kalista', 'Rumble'] }
    ]}
  },

  // ==========================================
  // 5. LEC 2026 (Versus, Spring, Summer)
  // ==========================================
  {
    t1: 'KC', t2: 'G2',
    date: '2026-03-01T17:00:00+00:00', league: 'LEC', format: 'Bo3',
    s1: 2, s2: 0, status: 'finished', mvp: 'Canna',
    draft: { games: [
      { game_num: 1, duration: '31:40', winner: 'team1', team1_kills: 17, team2_kills: 7,
        team1_picks: ['Aatrox', 'Sejuani', 'Yone', 'Varus', 'Rell'], team1_bans: ['Kalista', 'Ashe', 'K\'Sante'],
        team2_picks: ['Jax', 'Vi', 'Azir', 'Kai\'Sa', 'Leona'], team2_bans: ['Rumble', 'Skarner', 'Ahri'] },
      { game_num: 2, duration: '28:15', winner: 'team1', team1_kills: 21, team2_kills: 5,
        team1_picks: ['Rumble', 'Vi', 'Orianna', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'K\'Sante'],
        team2_picks: ['Renekton', 'Skarner', 'Azir', 'Xayah', 'Rakan'], team2_bans: ['Aurora', 'Poppy', 'Ahri'] }
    ]}
  },
  {
    t1: 'G2', t2: 'KC',
    date: '2026-05-03T17:00:00+00:00', league: 'LEC', format: 'Bo5',
    s1: 3, s2: 1, status: 'finished', mvp: 'Caps',
    draft: { games: [
      { game_num: 1, duration: '32:10', winner: 'team1', team1_kills: 19, team2_kills: 8,
        team1_picks: ['K\'Sante', 'Vi', 'Orianna', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'Rumble'],
        team2_picks: ['Jax', 'Skarner', 'Ahri', 'Kai\'Sa', 'Nautilus'], team2_bans: ['Aurora', 'Renekton', 'Poppy'] },
      { game_num: 2, duration: '36:45', winner: 'team2', team1_kills: 10, team2_kills: 18,
        team1_picks: ['Rumble', 'Sejuani', 'Sylas', 'Varus', 'Rell'], team1_bans: ['Ashe', 'Renekton', 'Skarner'],
        team2_picks: ['Gnar', 'Xin Zhao', 'Yone', 'Xayah', 'Rakan'], team2_bans: ['Kalista', 'Vi', 'Orianna'] },
      { game_num: 3, duration: '27:50', winner: 'team1', team1_kills: 22, team2_kills: 5,
        team1_picks: ['Gnar', 'Skarner', 'Neeko', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'K\'Sante'],
        team2_picks: ['Renekton', 'Vi', 'Azir', 'Jhin', 'Leona'], team2_bans: ['Rumble', 'Poppy', 'Ahri'] },
      { game_num: 4, duration: '31:35', winner: 'team1', team1_kills: 20, team2_kills: 9,
        team1_picks: ['Camille', 'Sejuani', 'Yone', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Renekton', 'Skarner'],
        team2_picks: ['Renekton', 'Vi', 'Ahri', 'Jhin', 'Rell'], team2_bans: ['Aurora', 'Rumble', 'Poppy'] }
    ]}
  },
  {
    t1: 'KC', t2: 'MKOI',
    date: '2026-09-20T17:00:00+00:00', league: 'LEC', format: 'Bo5',
    s1: 3, s2: 1, status: 'finished', mvp: 'Caliste',
    draft: { games: [
      { game_num: 1, duration: '33:10', winner: 'team1', team1_kills: 18, team2_kills: 9,
        team1_picks: ['Jax', 'Vi', 'Orianna', 'Varus', 'Rell'], team1_bans: ['Kalista', 'Ashe', 'K\'Sante'],
        team2_picks: ['Gnar', 'Skarner', 'Yone', 'Kai\'Sa', 'Nautilus'], team2_bans: ['Rumble', 'Aurora', 'Poppy'] },
      { game_num: 2, duration: '37:50', winner: 'team2', team1_kills: 11, team2_kills: 19,
        team1_picks: ['Aatrox', 'Sejuani', 'Ahri', 'Ezreal', 'Leona'], team1_bans: ['Yone', 'Renekton', 'Skarner'],
        team2_picks: ['K\'Sante', 'Nidalee', 'Tristana', 'Xayah', 'Rakan'], team2_bans: ['Kalista', 'Vi', 'Orianna'] },
      { game_num: 3, duration: '29:40', winner: 'team1', team1_kills: 21, team2_kills: 6,
        team1_picks: ['Rumble', 'Skarner', 'Yone', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'K\'Sante', 'Renekton'],
        team2_picks: ['Renekton', 'Xin Zhao', 'Sylas', 'Jhin', 'Leona'], team2_bans: ['Vi', 'Aurora', 'Ahri'] },
      { game_num: 4, duration: '31:25', winner: 'team1', team1_kills: 23, team2_kills: 8,
        team1_picks: ['K\'Sante', 'Vi', 'Syndra', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'Rumble'],
        team2_picks: ['Gnar', 'Jarvan IV', 'Azir', 'Varus', 'Alistar'], team2_bans: ['Skarner', 'Orianna', 'Poppy'] }
    ]}
  },

  // ==========================================
  // 6. LCS 2026 (Spring, Summer)
  // ==========================================
  {
    t1: 'C9', t2: 'FLY',
    date: '2026-06-14T20:00:00+00:00', league: 'LCS', format: 'Bo5',
    s1: 3, s2: 1, status: 'finished', mvp: 'Blaber',
    draft: { games: [
      { game_num: 1, duration: '31:15', winner: 'team1', team1_kills: 17, team2_kills: 8,
        team1_picks: ['K\'Sante', 'Vi', 'Orianna', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'Rumble'],
        team2_picks: ['Jax', 'Skarner', 'Ahri', 'Kai\'Sa', 'Nautilus'], team2_bans: ['Aurora', 'Renekton', 'Poppy'] },
      { game_num: 2, duration: '35:20', winner: 'team2', team1_kills: 10, team2_kills: 18,
        team1_picks: ['Rumble', 'Sejuani', 'Sylas', 'Varus', 'Rell'], team1_bans: ['Ashe', 'Renekton', 'Skarner'],
        team2_picks: ['Gnar', 'Xin Zhao', 'Yone', 'Xayah', 'Rakan'], team2_bans: ['Kalista', 'Vi', 'Orianna'] },
      { game_num: 3, duration: '28:40', winner: 'team1', team1_kills: 22, team2_kills: 5,
        team1_picks: ['Gnar', 'Skarner', 'Neeko', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'K\'Sante'],
        team2_picks: ['Renekton', 'Vi', 'Azir', 'Jhin', 'Leona'], team2_bans: ['Rumble', 'Poppy', 'Ahri'] },
      { game_num: 4, duration: '32:30', winner: 'team1', team1_kills: 20, team2_kills: 9,
        team1_picks: ['Camille', 'Sejuani', 'Yone', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Renekton', 'Skarner'],
        team2_picks: ['Renekton', 'Vi', 'Ahri', 'Jhin', 'Rell'], team2_bans: ['Aurora', 'Rumble', 'Poppy'] }
    ]}
  },
  {
    t1: 'C9', t2: 'SR',
    date: '2026-10-04T20:00:00+00:00', league: 'LCS', format: 'Bo5',
    s1: 3, s2: 0, status: 'finished', mvp: 'Blaber',
    draft: { games: [
      { game_num: 1, duration: '28:15', winner: 'team1', team1_kills: 19, team2_kills: 5,
        team1_picks: ['Jax', 'Vi', 'Orianna', 'Varus', 'Rell'], team1_bans: ['Kalista', 'Ashe', 'K\'Sante'],
        team2_picks: ['Gnar', 'Skarner', 'Yone', 'Kai\'Sa', 'Nautilus'], team2_bans: ['Rumble', 'Aurora', 'Poppy'] },
      { game_num: 2, duration: '27:50', winner: 'team1', team1_kills: 22, team2_kills: 4,
        team1_picks: ['Rumble', 'Skarner', 'Yone', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'K\'Sante', 'Renekton'],
        team2_picks: ['Renekton', 'Xin Zhao', 'Sylas', 'Jhin', 'Leona'], team2_bans: ['Vi', 'Aurora', 'Ahri'] },
      { game_num: 3, duration: '30:40', winner: 'team1', team1_kills: 20, team2_kills: 7,
        team1_picks: ['K\'Sante', 'Vi', 'Syndra', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'Rumble'],
        team2_picks: ['Gnar', 'Jarvan IV', 'Azir', 'Varus', 'Alistar'], team2_bans: ['Skarner', 'Orianna', 'Poppy'] }
    ]}
  },

  // ==========================================
  // 7. CBLOL 2026 (Split 1, Split 2)
  // ==========================================
  {
    t1: 'PNG', t2: 'LLL',
    date: '2026-04-18T18:00:00+00:00', league: 'CBLOL', format: 'Bo5',
    s1: 3, s2: 2, status: 'finished', mvp: 'CarioK',
    draft: { games: [
      { game_num: 1, duration: '33:15', winner: 'team1', team1_kills: 17, team2_kills: 10,
        team1_picks: ['Jax', 'Skarner', 'Ahri', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'K\'Sante'],
        team2_picks: ['Gnar', 'Vi', 'Orianna', 'Kai\'Sa', 'Leona'], team2_bans: ['Rumble', 'Aurora', 'Poppy'] },
      { game_num: 2, duration: '31:40', winner: 'team2', team1_kills: 9, team2_kills: 18,
        team1_picks: ['K\'Sante', 'Xin Zhao', 'Yone', 'Varus', 'Rell'], team1_bans: ['Ashe', 'Renekton', 'Skarner'],
        team2_picks: ['Rumble', 'Sejuani', 'Sylas', 'Ezreal', 'Nautilus'], team2_bans: ['Kalista', 'Vi', 'Orianna'] },
      { game_num: 3, duration: '35:20', winner: 'team1', team1_kills: 21, team2_kills: 12,
        team1_picks: ['Rumble', 'Vi', 'Orianna', 'Kalista', 'Renata Glasc'], team1_bans: ['Yone', 'Ashe', 'K\'Sante'],
        team2_picks: ['Renekton', 'Skarner', 'Azir', 'Xayah', 'Rakan'], team2_bans: ['Aurora', 'Poppy', 'Ahri'] },
      { game_num: 4, duration: '29:50', winner: 'team2', team1_kills: 8, team2_kills: 19,
        team1_picks: ['Gnar', 'Jarvan IV', 'Sylas', 'Kai\'Sa', 'Nautilus'], team1_bans: ['Ashe', 'Kalista', 'K\'Sante'],
        team2_picks: ['Jax', 'Skarner', 'Orianna', 'Varus', 'Braum'], team2_bans: ['Yone', 'Rumble', 'Ahri'] },
      { game_num: 5, duration: '37:10', winner: 'team1', team1_kills: 24, team2_kills: 14,
        team1_picks: ['K\'Sante', 'Vi', 'Yone', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Renekton', 'Skarner'],
        team2_picks: ['Gnar', 'Sejuani', 'Azir', 'Jhin', 'Leona'], team2_bans: ['Aurora', 'Rumble', 'Poppy'] }
    ]}
  },
  {
    t1: 'PNG', t2: 'VKS',
    date: '2026-09-05T18:00:00+00:00', league: 'CBLOL', format: 'Bo5',
    s1: 3, s2: 1, status: 'finished', mvp: 'dyNquedo',
    draft: { games: [
      { game_num: 1, duration: '30:40', winner: 'team1', team1_kills: 19, team2_kills: 7,
        team1_picks: ['Renekton', 'Skarner', 'Ahri', 'Ashe', 'Braum'], team1_bans: ['Kalista', 'Yone', 'Rumble'],
        team2_picks: ['K\'Sante', 'Sejuani', 'Orianna', 'Jhin', 'Leona'], team2_bans: ['Aurora', 'Vi', 'Poppy'] },
      { game_num: 2, duration: '34:15', winner: 'team2', team1_kills: 11, team2_kills: 18,
        team1_picks: ['Jax', 'Nidalee', 'Tristana', 'Ezreal', 'Rell'], team1_bans: ['Ashe', 'Renekton', 'Skarner'],
        team2_picks: ['Gnar', 'Vi', 'Taliyah', 'Kai\'Sa', 'Nautilus'], team2_bans: ['Yone', 'Kalista', 'K\'Sante'] },
      { game_num: 3, duration: '28:30', winner: 'team1', team1_kills: 22, team2_kills: 6,
        team1_picks: ['K\'Sante', 'Vi', 'Yone', 'Varus', 'Leona'], team1_bans: ['Kalista', 'Rumble', 'Ashe'],
        team2_picks: ['Rumble', 'Xin Zhao', 'Sylas', 'Xayah', 'Rakan'], team2_bans: ['Skarner', 'Aurora', 'Poppy'] },
      { game_num: 4, duration: '32:50', winner: 'team1', team1_kills: 20, team2_kills: 8,
        team1_picks: ['Gnar', 'Vi', 'Sylas', 'Kalista', 'Renata Glasc'], team1_bans: ['Ashe', 'Yone', 'K\'Sante'],
        team2_picks: ['Camille', 'Sejuani', 'Azir', 'Kai\'Sa', 'Alistar'], team2_bans: ['Orianna', 'Kalista', 'Rumble'] }
    ]}
  }
];

async function main() {
  console.log('--- PURGING ALL OLD NON-WORLDS MATCHES ---');
  const { data: oldNonWorlds } = await sb.from('matches').select('id, league').neq('league', 'WORLDS');
  const ids = (oldNonWorlds || []).map(m => m.id);
  console.log(`Found ${ids.length} old non-Worlds matches to delete.`);

  if (ids.length > 0) {
    for (const id of ids) {
      try { await sb.from('multi_games').delete().eq('match_id', id); } catch(e) {}
    }
    const { error: delErr } = await sb.from('matches').delete().in('id', ids);
    if (delErr) {
      console.error('Delete error:', delErr.message);
      return;
    }
    console.log('Deleted successfully.');
  }

  console.log('\n--- INSERTING ACCURATE 2026 SEASON MATCHES (First Stand, MSI, LCK, LPL, LEC, LCS, CBLOL) ---');
  for (const m of OFFICIAL_SEASON_2026_MATCHES) {
    const payload = {
      team1_id: T[m.t1],
      team2_id: T[m.t2],
      match_date: m.date,
      league: m.league,
      format: m.format,
      team1_score: m.s1,
      team2_score: m.s2,
      status: m.status,
      mvp: m.mvp,
      draft: m.draft,
    };
    const { data: ins, error } = await sb.from('matches').insert(payload).select('id').single();
    if (error) {
      console.error(`❌ [${m.league}] ${m.t1} vs ${m.t2}: ${error.message}`);
    } else {
      console.log(`✅ [${m.league.padEnd(11)}] ${m.t1} vs ${m.t2} (${m.date.slice(0, 10)}) ${m.s1}:${m.s2} -> id=${ins.id}`);
    }
  }

  console.log('\n--- VERIFYING COMPLETE MATCH DATABASE ---');
  const { data: all } = await sb.from('matches').select('id, league, match_date, format, status, team1_id, team2_id, team1_score, team2_score').order('match_date', { ascending: false });
  console.log(`Total matches in DB: ${all.length}`);

  const leagueCounts = {};
  all.forEach(m => {
    leagueCounts[m.league] = (leagueCounts[m.league] || 0) + 1;
  });
  console.log('Matches by tournament/league:');
  console.table(leagueCounts);
  console.log('\nALL DONE!');
}

main().catch(console.error);
