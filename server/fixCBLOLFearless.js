import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const { data: m } = await sb.from('matches').select('id, draft').eq('id', '56378a3b-162b-4b3b-b4b0-d82972e72972').single();
m.draft.games[2] = {
  game_num: 3, duration: '28:50', winner: 'team1', team1_kills: 22, team2_kills: 6,
  team1_picks: ['Aatrox', 'Nocturne', 'Sylas', 'Kalista', 'Renata Glasc'],
  team1_bans: ['Kalista', 'Rumble', 'Ashe'],
  team2_picks: ['Rumble', 'Xin Zhao', 'Azir', 'Xayah', 'Rakan'],
  team2_bans: ['Skarner', 'Aurora', 'Poppy']
};
m.draft.games[3] = {
  game_num: 4, duration: '33:15', winner: 'team1', team1_kills: 23, team2_kills: 9,
  team1_picks: ['Camille', 'Jarvan IV', 'Viktor', 'Miss Fortune', 'Lulu'],
  team1_bans: ['Ashe', 'Yone', 'K\'Sante'],
  team2_picks: ['Sion', 'Lee Sin', 'Syndra', 'Lucian', 'Alistar'],
  team2_bans: ['Orianna', 'Kalista', 'Rumble']
};
await sb.from('matches').update({ draft: m.draft }).eq('id', m.id);
console.log('✅ CBLOL games 3 and 4 updated strictly Fearless');
