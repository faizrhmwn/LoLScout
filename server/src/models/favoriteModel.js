import { supabase } from '../config/supabaseClient.js'

export const FavoriteModel = {
  async getAll(userId = 'guest') {
    const { data: favs, error } = await supabase
      .from('favorites')
      .select(`
        id, user_id, notes, created_at,
        team:teams(id, name, short_name, region, logo_url, standing_summer)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    if (!favs || favs.length === 0) return []

    // Enrich each favorite team with recent match, winrate, and latest VOD
    const enriched = await Promise.all(
      favs.map(async (fav) => {
        if (!fav.team?.id) return fav

        const { data: teamMatches } = await supabase
          .from('matches')
          .select(`
            id, league, match_date, team1_id, team2_id, team1_score, team2_score, vod_url,
            team1:teams!matches_team1_id_fkey(short_name, logo_url),
            team2:teams!matches_team2_id_fkey(short_name, logo_url)
          `)
          .or(`team1_id.eq.${fav.team.id},team2_id.eq.${fav.team.id}`)
          .order('match_date', { ascending: false })

        if (!teamMatches || teamMatches.length === 0) {
          return {
            ...fav,
            stats: { wins: 0, losses: 0, total: 0, winRate: 0, form: [] },
            latestMatch: null
          }
        }

        let wins = 0
        let losses = 0
        const form = []

        teamMatches.forEach((m, idx) => {
          const isTeam1 = m.team1_id === fav.team.id
          const teamScore = isTeam1 ? m.team1_score : m.team2_score
          const oppScore = isTeam1 ? m.team2_score : m.team1_score
          const won = teamScore > oppScore

          if (won) wins++
          else if (oppScore > teamScore) losses++

          if (idx < 5) {
            form.push(won ? 'W' : 'L')
          }
        })

        const total = wins + losses
        const winRate = total > 0 ? Math.round((wins / total) * 100) : 0

        // Latest match details
        const latest = teamMatches[0]
        const isTeam1Latest = latest.team1_id === fav.team.id
        const opponent = isTeam1Latest ? latest.team2 : latest.team1
        const teamScore = isTeam1Latest ? latest.team1_score : latest.team2_score
        const oppScore = isTeam1Latest ? latest.team2_score : latest.team1_score
        const wonLatest = teamScore > oppScore

        const latestMatch = {
          id: latest.id,
          league: latest.league,
          match_date: latest.match_date,
          vod_url: latest.vod_url,
          score: `${teamScore} - ${oppScore}`,
          won: wonLatest,
          opponent: opponent?.short_name || 'OPP',
          opponentLogo: opponent?.logo_url
        }

        return {
          ...fav,
          stats: { wins, losses, total, winRate, form },
          latestMatch
        }
      })
    )

    return enriched
  },

  async create(userId = 'guest', teamId, notes = '') {
    // Check if already favorited
    const { data: existing } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('team_id', teamId)
      .single()

    if (existing) {
      throw new Error('Team is already in your favorites')
    }

    const { data, error } = await supabase
      .from('favorites')
      .insert([{ user_id: userId, team_id: teamId, notes }])
      .select(`
        id, user_id, notes, created_at,
        team:teams(id, name, short_name, region, logo_url, standing_summer)
      `)
      .single()

    if (error) throw error
    return data
  },

  async update(id, notes) {
    const { data, error } = await supabase
      .from('favorites')
      .update({ notes })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async remove(id) {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { success: true }
  }
}
