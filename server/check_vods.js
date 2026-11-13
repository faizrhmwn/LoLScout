import { supabase } from './src/config/supabaseClient.js';

async function check() {
  const { data: matches, error } = await supabase
    .from('matches')
    .select(`
      id, league, status, match_date, vod_url, draft,
      team1:teams!matches_team1_id_fkey(short_name),
      team2:teams!matches_team2_id_fkey(short_name)
    `)
    .order('match_date', { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  console.log(`Total matches in DB: ${matches.length}`);
  
  let totalGames = 0;
  let searchGames = 0;
  let watchGames = 0;
  let otherGames = 0;

  const matchesWithVodDetails = [];

  matches.forEach(m => {
    const t1 = m.team1?.short_name || 'T1';
    const t2 = m.team2?.short_name || 'T2';
    const games = m.draft?.games || [];
    totalGames += games.length;

    const gameVods = games.map((g, idx) => {
      const url = g.vod_url || m.vod_url || '';
      let type = 'unknown';
      if (!url) type = 'empty';
      else if (url.includes('results?search_query=')) {
        type = 'search';
        searchGames++;
      } else if (url.includes('watch?v=')) {
        type = 'watch';
        watchGames++;
      } else {
        type = 'other';
        otherGames++;
      }
      return { game: g.game_number || (idx + 1), type, url };
    });

    matchesWithVodDetails.push({
      id: m.id,
      league: m.league,
      match: `${t1} vs ${t2}`,
      matchVod: m.vod_url,
      gameVods
    });
  });

  console.log(`Total games: ${totalGames}`);
  console.log(`Search URL games: ${searchGames}`);
  console.log(`Watch URL games: ${watchGames}`);
  console.log(`Other/empty games: ${otherGames}`);

  console.log("\nSummary by match:");
  matchesWithVodDetails.forEach((m, idx) => {
    const searchCount = m.gameVods.filter(g => g.type === 'search').length;
    const watchCount = m.gameVods.filter(g => g.type === 'watch').length;
    console.log(`[${idx+1}] ${m.id} | ${m.league} | ${m.match} | Games: ${m.gameVods.length} (Watch: ${watchCount}, Search: ${searchCount})`);
  });
}

check();
