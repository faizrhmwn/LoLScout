import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Structured Champion Pools by competitive role
const POOLS = {
  TOP: [
    'Aatrox', 'K\'Sante', 'Renekton', 'Gnar', 'Rumble', 
    'Jax', 'Camille', 'Gragas', 'Jayce', 'Kennen', 
    'Ornn', 'Sion', 'Poppy', 'Gwen', 'Fiora', 
    'Shen', 'Urgot', 'Gangplank', 'Malphite', 'Cho\'Gath', 
    'Vladimir', 'Volibear'
  ],
  JUNGLE: [
    'Vi', 'Skarner', 'Sejuani', 'Xin Zhao', 'Viego', 
    'Jarvan IV', 'Nocturne', 'Nidalee', 'Maokai', 'Lee Sin', 
    'Wukong', 'Elise', 'Lillia', 'Hecarim', 'Kindred', 
    'Graves', 'Zac', 'Trundle', 'Brand', 'Karthus'
  ],
  MID: [
    'Ahri', 'Orianna', 'Yone', 'Azir', 'Sylas', 
    'Tristana', 'Corki', 'Taliyah', 'Syndra', 'LeBlanc', 
    'Akali', 'Viktor', 'Galio', 'Neeko', 'Ryze', 
    'Zoe', 'Hwei', 'Aurelion Sol', 'Cassiopeia', 'Twisted Fate'
  ],
  ADC: [
    'Ashe', 'Kalista', 'Varus', 'Kai\'Sa', 'Ezreal', 
    'Xayah', 'Jhin', 'Jinx', 'Draven', 'Lucian', 
    'Zeri', 'Miss Fortune', 'Caitlyn', 'Sivir', 'Aphelios', 
    'Senna', 'Samira', 'Ziggs', 'Kog\'Maw'
  ],
  SUPPORT: [
    'Braum', 'Leona', 'Nautilus', 'Rell', 'Rakan', 
    'Renata Glasc', 'Alistar', 'Thresh', 'Tahm Kench', 'Lulu', 
    'Nami', 'Karma', 'Blitzcrank', 'Bard', 'Taric', 
    'Milio', 'Pyke', 'Soraka'
  ]
};

// Realistic Ban pool of unpicked champions
const BAN_CANDIDATES = [
  'Aurora', 'Yone', 'Ashe', 'Kalista', 'Rumble', 'K\'Sante', 
  'Renekton', 'Vi', 'Skarner', 'Poppy', 'Orianna', 'Ahri', 
  'Sejuani', 'Xin Zhao', 'Nautilus', 'Leona', 'Varus', 'Kai\'Sa', 
  'Caitlyn', 'Sylas', 'Azir', 'Jax', 'Camille', 'Nocturne'
];

function generateFearlessDraft(numGames, gameResults) {
  const pickedInSeries = new Set();
  const games = [];

  for (let g = 0; g < numGames; g++) {
    const gameResult = gameResults[g] || { winner: g % 2 === 0 ? 'team1' : 'team2', t1_k: 18, t2_k: 9, dur: '32:15' };

    // Select distinct picks for each role
    const getAvailable = (role) => POOLS[role].filter(c => !pickedInSeries.has(c));

    const availTop = getAvailable('TOP');
    const availJgl = getAvailable('JUNGLE');
    const availMid = getAvailable('MID');
    const availAdc = getAvailable('ADC');
    const availSup = getAvailable('SUPPORT');

    if (availTop.length < 2 || availJgl.length < 2 || availMid.length < 2 || availAdc.length < 2 || availSup.length < 2) {
      throw new Error(`Exhausted champions for game ${g + 1}`);
    }

    const t1Picks = [
      availTop[0],
      availJgl[0],
      availMid[0],
      availAdc[0],
      availSup[0]
    ];

    const t2Picks = [
      availTop[1],
      availJgl[1],
      availMid[1],
      availAdc[1],
      availSup[1]
    ];

    // Mark all 10 picks as used in this series
    t1Picks.forEach(c => pickedInSeries.add(c));
    t2Picks.forEach(c => pickedInSeries.add(c));

    // Bans must not include already picked champions
    const availBans = BAN_CANDIDATES.filter(c => !pickedInSeries.has(c));
    const t1Bans = availBans.slice(0, 3);
    const t2Bans = availBans.slice(3, 6);

    games.push({
      game_num: g + 1,
      duration: gameResult.dur,
      winner: gameResult.winner,
      team1_kills: gameResult.t1_k,
      team2_kills: gameResult.t2_k,
      team1_picks: t1Picks,
      team1_bans: t1Bans,
      team2_picks: t2Picks,
      team2_bans: t2Bans
    });
  }

  return games;
}

async function fixAllMatchDrafts() {
  console.log('Fetching all matches from DB...');
  const { data: matches, error } = await sb.from('matches').select('id, league, format, team1_score, team2_score, status, draft').order('match_date', { ascending: false });
  if (error) {
    console.error('Fetch error:', error);
    return;
  }

  console.log(`Processing ${matches.length} matches for Fearless Draft compliance...`);
  let updatedCount = 0;

  for (const m of matches) {
    if (m.status === 'upcoming') continue;

    const s1 = m.team1_score || 0;
    const s2 = m.team2_score || 0;
    const numGames = s1 + s2;
    if (numGames === 0) continue;

    // Preserve existing game stats if available
    const existingGames = m.draft?.games || [];
    const gameResults = [];
    let wins1 = 0;
    let wins2 = 0;

    for (let i = 0; i < numGames; i++) {
      const eg = existingGames[i];
      let winner;
      if (eg?.winner) {
        winner = eg.winner;
      } else {
        if (wins1 < s1 && wins2 < s2) {
          winner = (i % 2 === 0 && wins1 < s1) ? 'team1' : 'team2';
        } else if (wins1 < s1) {
          winner = 'team1';
        } else {
          winner = 'team2';
        }
      }
      if (winner === 'team1') wins1++; else wins2++;

      gameResults.push({
        winner: winner,
        t1_k: eg?.team1_kills || (winner === 'team1' ? 18 + (i * 2) : 8 + i),
        t2_k: eg?.team2_kills || (winner === 'team2' ? 18 + (i * 2) : 8 + i),
        dur: eg?.duration || `${28 + ((i * 3) % 12)}:${15 + ((i * 17) % 40)}`
      });
    }

    // Ensure final match score matches game results
    const actualWins1 = gameResults.filter(g => g.winner === 'team1').length;
    const actualWins2 = gameResults.filter(g => g.winner === 'team2').length;
    if (actualWins1 !== s1 || actualWins2 !== s2) {
      // Re-assign winners to strictly match s1 and s2
      let remainingWins1 = s1;
      let remainingWins2 = s2;
      for (let i = 0; i < numGames; i++) {
        if (remainingWins1 > 0 && (i === numGames - 1 ? s1 > s2 : (remainingWins1 >= remainingWins2 || i % 2 === 0))) {
          gameResults[i].winner = 'team1';
          remainingWins1--;
        } else {
          gameResults[i].winner = 'team2';
          remainingWins2--;
        }
        if (gameResults[i].winner === 'team1') {
          gameResults[i].t1_k = Math.max(gameResults[i].t1_k, gameResults[i].t2_k + 5);
        } else {
          gameResults[i].t2_k = Math.max(gameResults[i].t2_k, gameResults[i].t1_k + 5);
        }
      }
    }

    const newGames = generateFearlessDraft(numGames, gameResults);

    const { error: updErr } = await sb.from('matches').update({
      draft: { games: newGames }
    }).eq('id', m.id);

    if (updErr) {
      console.error(`Error updating match ${m.id}:`, updErr.message);
    } else {
      updatedCount++;
    }
  }

  console.log(`\nSuccessfully updated ${updatedCount} matches with 100% compliant Fearless Draft!`);
}

fixAllMatchDrafts().catch(console.error);
