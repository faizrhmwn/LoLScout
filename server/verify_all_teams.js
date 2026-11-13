import { supabase } from './src/config/supabaseClient.js';

async function verifyAll() {
  const { data: teams } = await supabase.from('teams').select('id, name, short_name, region');
  const { data: matches } = await supabase.from('matches').select(`
    id, league, format, team1_id, team2_id, team1_score, team2_score,
    team1:teams!matches_team1_id_fkey(short_name),
    team2:teams!matches_team2_id_fkey(short_name)
  `);

  console.log(`Total teams: ${teams.length}`);
  console.log(`Total matches in DB: ${matches.length}`);

  const counts = {};
  teams.forEach(t => { counts[t.short_name] = { region: t.region, total: 0, byLeague: {} }; });

  matches.forEach(m => {
    const t1 = m.team1?.short_name;
    const t2 = m.team2?.short_name;
    if (t1 && counts[t1]) {
      counts[t1].total++;
      counts[t1].byLeague[m.league] = (counts[t1].byLeague[m.league] || 0) + 1;
    }
    if (t2 && counts[t2]) {
      counts[t2].total++;
      counts[t2].byLeague[m.league] = (counts[t2].byLeague[m.league] || 0) + 1;
    }
  });

  console.log("\nMatch count per team:");
  const sorted = Object.entries(counts).sort((a, b) => b[1].total - a[1].total);
  sorted.forEach(([t, info]) => {
    console.log(`  ${t.padEnd(6)} (${info.region.padEnd(5)}): ${info.total} matches | Breakdown: ${JSON.stringify(info.byLeague)}`);
  });

  const under5 = sorted.filter(([t, info]) => info.total < 5);
  console.log("\nTeams with under 5 matches:", under5.length);
}

verifyAll();
