import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Fix LYON roster to match correct array format (same as other teams)
const lyonRosterCorrect = [
  { ign: 'Dhokla', name: 'Niship Doshi', role: 'Top', nationality: 'US' },
  { ign: 'Inspired', name: 'Kacper Słoma', role: 'Jungle', nationality: 'PL' },
  { ign: 'Saint', name: 'Kang Seong-in', role: 'Mid', nationality: 'KR' },
  { ign: 'Berserker', name: 'Kim Min-cheol', role: 'ADC', nationality: 'KR' },
  { ign: 'Isles', name: 'Ian Ridden', role: 'Support', nationality: 'US' },
  { ign: 'Reignover', name: 'Kim Yeu-jin', role: 'Coach', nationality: 'KR' },
];

const { error } = await sb.from('teams').update({ roster: lyonRosterCorrect }).eq('short_name', 'LYON');
if (error) console.error('Error:', error.message);
else console.log('✅ LYON roster fixed to correct array format!');

// Verify
const { data } = await sb.from('teams').select('short_name,roster').eq('short_name','LYON').single();
console.log('LYON roster now:', JSON.stringify(data?.roster, null, 2));
