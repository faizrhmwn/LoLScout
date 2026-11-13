import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Check Oct 23-29 matches and player table name
const { data: oct } = await sb.from('matches').select('id,match_date,league,team1_id,team2_id').gte('match_date','2026-10-23').lte('match_date','2026-10-29');
console.log('Oct 23-29 matches:', JSON.stringify(oct, null, 2));

// Try different player table names
const tableNames = ['players', 'player', 'team_players', 'rosters', 'roster_players'];
for (const tbl of tableNames) {
  const { data, error } = await sb.from(tbl).select('id').limit(1);
  if (!error) {
    console.log(`Table '${tbl}' EXISTS, sample:`, data);
  }
}
