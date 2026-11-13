import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const { data: matches } = await sb.from('matches').select('id, league, draft, format');
let violations = 0;
let matchViolations = 0;
for (const m of matches) {
  if (!m.draft?.games || m.draft.games.length <= 1) continue;
  const pickedInSeries = new Set();
  let matchHasViolation = false;
  for (const g of m.draft.games) {
    const allPicksThisGame = [...(g.team1_picks || []), ...(g.team2_picks || [])];
    for (const p of allPicksThisGame) {
      if (pickedInSeries.has(p)) {
        violations++;
        matchHasViolation = true;
      }
      pickedInSeries.add(p);
    }
  }
  if (matchHasViolation) matchViolations++;
}
console.log('Matches with Fearless Draft violations:', matchViolations, '/', matches.length);
console.log('Total reused champion picks:', violations);
