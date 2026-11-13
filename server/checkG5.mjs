import { supabase } from './src/config/supabaseClient.js'

const { data: matches } = await supabase.from('matches').select('id, league, draft, team1_id, team2_id').eq('league', 'MSI')
for (const m of matches || []) {
  const g5 = m.draft?.games?.find(g => g.game_num === 5)
  if (g5) {
    console.log('Match ID:', m.id)
    console.log('G5 t1_bans:', g5.team1_bans)
    console.log('G5 t2_bans:', g5.team2_bans)
    console.log('G5 t1_picks:', g5.team1_picks)
    console.log('G5 t2_picks:', g5.team2_picks)
  }
}
