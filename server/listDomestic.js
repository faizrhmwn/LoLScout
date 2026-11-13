import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const { data: teams } = await sb.from('teams').select('id, short_name');
const map = Object.fromEntries(teams.map(t => [t.id, t.short_name]));
const { data: matches } = await sb.from('matches').select('id, match_date, league, format, team1_id, team2_id, team1_score, team2_score, status, mvp').in('league', ['LCK', 'LPL', 'LEC', 'LCS', 'CBLOL']).order('match_date', { ascending: true });
console.log('Total domestic matches:', matches.length);
matches.forEach(m => {
  console.log(`[${m.league.padEnd(5)}] ${m.match_date.slice(0, 10)} | ${map[m.team1_id]?.padEnd(4)} vs ${map[m.team2_id]?.padEnd(4)} (${m.team1_score}:${m.team2_score}) ${m.format} | MVP: ${m.mvp}`);
});
