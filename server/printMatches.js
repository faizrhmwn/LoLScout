import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const { data: teams } = await sb.from('teams').select('id, short_name');
const teamMap = Object.fromEntries(teams.map(t => [t.id, t.short_name]));
const { data: matches } = await sb.from('matches').select('id, match_date, league, format, status, team1_id, team2_id, team1_score, team2_score').order('match_date', { ascending: false }).limit(25);
console.log(matches.map(m => `${m.match_date.slice(0, 10)} | ${m.league} | ${teamMap[m.team1_id]} vs ${teamMap[m.team2_id]} (${m.team1_score}:${m.team2_score}) | ${m.status}`).join('\n'));
