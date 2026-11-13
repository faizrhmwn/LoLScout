import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

// Champion pools for realistic varied games
const samplePools = [
  {
    t1_picks: ['Aatrox', 'Sejuani', 'Azir', 'Varus', 'Braum'],
    t1_bans: ['Kalista', 'Ashe', 'Skarner', 'Poppy', 'Vi'],
    t2_picks: ['K\'Sante', 'Maokai', 'Corki', 'Kai\'Sa', 'Rell'],
    t2_bans: ['Yone', 'Rumble', 'Renata Glasc', 'Sylas', 'Jax']
  },
  {
    t1_picks: ['Gnar', 'Vi', 'Orianna', 'Caitlyn', 'Lux'],
    t1_bans: ['Aurora', 'Rumble', 'Skarner', 'Renata Glasc', 'Ashe'],
    t2_picks: ['Renekton', 'Xin Zhao', 'Sylas', 'Ezreal', 'Leona'],
    t2_bans: ['Kalista', 'Yone', 'Jax', 'Poppy', 'Alistar']
  },
  {
    t1_picks: ['Camille', 'Nocturne', 'Neeko', 'Jhin', 'Tahm Kench'],
    t1_bans: ['Ashe', 'Skarner', 'Yone', 'Renata Glasc', 'Vi'],
    t2_picks: ['Sion', 'Jarvan IV', 'Tristana', 'Ziggs', 'Nautilus'],
    t2_bans: ['Kalista', 'Rumble', 'Aurora', 'Poppy', 'Leona']
  },
  {
    t1_picks: ['Jax', 'Lillia', 'Jayce', 'Draven', 'Poppy'],
    t1_bans: ['Aurora', 'Ashe', 'Renata Glasc', 'Ivern', 'Nautilus'],
    t2_picks: ['Gragas', 'Sejuani', 'Smolder', 'Miss Fortune', 'Alistar'],
    t2_bans: ['Kalista', 'Rumble', 'Skarner', 'Leona', 'Jax']
  },
  {
    t1_picks: ['K\'Sante', 'Wukong', 'Ahri', 'Kalista', 'Renata Glasc'],
    t1_bans: ['Poppy', 'Skarner', 'Ashe', 'Lucian', 'Nami'],
    t2_picks: ['Gwen', 'Lee Sin', 'LeBlanc', 'Xayah', 'Rakan'],
    t2_bans: ['Yone', 'Aurora', 'Vi', 'Smolder', 'Braum']
  }
]

async function addMultiGames() {
  console.log('Generating multi-game drafts (Game 1, 2, 3, 4, 5) for all matches...')
  const { data: matches, error } = await supabase.from('matches').select('*')
  if (error || !matches) {
    console.error('Error fetching matches:', error)
    return
  }

  for (const m of matches) {
    const totalGames = (m.team1_score + m.team2_score) || (m.format === 'Bo5' ? 5 : 3)
    const games = []

    let t1WinsRemaining = m.team1_score
    let t2WinsRemaining = m.team2_score

    for (let i = 1; i <= (m.status === 'finished' ? (m.team1_score + m.team2_score) : (m.format === 'Bo5' ? 4 : 2)); i++) {
      const pool = samplePools[(i - 1) % samplePools.length]
      
      let winner = 'team1'
      if (t2WinsRemaining > 0 && (i % 2 === 0 || t1WinsRemaining === 0)) {
        winner = 'team2'
        t2WinsRemaining--
      } else if (t1WinsRemaining > 0) {
        winner = 'team1'
        t1WinsRemaining--
      }

      games.push({
        game_num: i,
        duration: `${28 + (i * 3) % 11}:${(15 + (i * 13) % 45).toString().padStart(2, '0')}`,
        winner: winner,
        team1_kills: winner === 'team1' ? 14 + (i * 3) % 10 : 6 + (i * 2) % 6,
        team2_kills: winner === 'team2' ? 14 + (i * 3) % 10 : 6 + (i * 2) % 6,
        team1_picks: pool.t1_picks,
        team1_bans: pool.t1_bans,
        team2_picks: pool.t2_picks,
        team2_bans: pool.t2_bans
      })
    }

    const updatedDraft = {
      total_games: games.length,
      games: games,
      // fallback for backwards compatibility
      team1_picks: games[0]?.team1_picks || [],
      team1_bans: games[0]?.team1_bans || [],
      team2_picks: games[0]?.team2_picks || [],
      team2_bans: games[0]?.team2_bans || []
    }

    await supabase.from('matches').update({ draft: updatedDraft }).eq('id', m.id)
  }

  console.log(`Successfully updated ${matches.length} matches with full multi-game drafts!`)
}

addMultiGames()
