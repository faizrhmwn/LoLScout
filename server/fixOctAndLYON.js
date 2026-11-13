import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function main() {
  // 1. Delete Oct 24 and Oct 28 "Worlds" matches (old 2024-relabeled data)
  console.log('Step 1: Delete old Oct 24 & Oct 28 Worlds matches...');
  const { data: badMatches } = await sb.from('matches').select('id,match_date,league')
    .or('match_date.eq.2026-10-24T12:00:00+00:00,match_date.eq.2026-10-28T12:00:00+00:00');
  
  console.log('Found matches to delete:', JSON.stringify(badMatches));
  
  if (badMatches && badMatches.length > 0) {
    const ids = badMatches.map(m => m.id);
    for (const id of ids) {
      try { await sb.from('multi_games').delete().eq('match_id', id); } catch(e) {}
    }
    const { error } = await sb.from('matches').delete().in('id', ids);
    if (error) console.error('Delete error:', error.message);
    else console.log('✅ Deleted', ids.length, 'old Oct matches');
  }

  // 2. Fix LYON roster in teams table (roster column is JSONB)
  console.log('\nStep 2: Fix LYON roster...');
  const lyonRoster = {
    players: [
      { role: 'Top', ign: 'Dhokla', name: 'Colin Dhokla', nationality: 'US' },
      { role: 'Jungle', ign: 'Inspired', name: 'Kacper Słoma', nationality: 'PL' },
      { role: 'Mid', ign: 'Saint', name: 'Kim Kyeong-min', nationality: 'KR' },
      { role: 'ADC', ign: 'Berserker', name: 'Kim Min-cheol', nationality: 'KR' },
      { role: 'Support', ign: 'Isles', name: 'Ian Ridden', nationality: 'US' },
    ],
    coach: { ign: 'Reignover', name: 'Kim Yeu-jin', nationality: 'KR' }
  };

  const { data: lyonTeam } = await sb.from('teams').select('id,short_name,roster').eq('short_name','LYON').single();
  console.log('Current LYON roster:', JSON.stringify(lyonTeam?.roster));
  
  const { error: lyonErr } = await sb.from('teams').update({ roster: lyonRoster }).eq('short_name', 'LYON');
  if (lyonErr) console.error('LYON update error:', lyonErr.message);
  else console.log('✅ LYON roster fixed: Dhokla/Inspired/Saint/Berserker/Isles, Coach: Reignover');

  // 3. Verify final state
  console.log('\nStep 3: Verify...');
  const { data: allM } = await sb.from('matches').select('id,match_date,league,status').order('match_date', { ascending: false });
  console.log('Total matches:', allM?.length);
  console.log('All match dates:');
  allM?.forEach(m => console.log(`  ${m.match_date.slice(0,10)} ${m.league} ${m.status}`));
  
  const novCheck = allM?.filter(m => m.match_date >= '2026-11-01');
  console.log('\nNovember matches:', novCheck?.length || 0);

  const { data: lyon } = await sb.from('teams').select('short_name,roster').eq('short_name','LYON').single();
  console.log('\nLYON roster after fix:', JSON.stringify(lyon?.roster, null, 2));
}

main().catch(console.error);
