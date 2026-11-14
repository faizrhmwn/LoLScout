import { supabase } from '../config/supabaseClient.js'

export const MatchModel = {
  async getAll(status, league) {
    let query = supabase
      .from('matches')
      .select(`
        id, league, team1_score, team2_score, status, match_date, format, vod_url, mvp,
        team1:teams!matches_team1_id_fkey(id, name, short_name, logo_url, region),
        team2:teams!matches_team2_id_fkey(id, name, short_name, logo_url, region)
      `)
      .order('match_date', { ascending: false })

    if (status && status !== 'All') {
      query = query.eq('status', status.toLowerCase())
    }
    if (league && league !== 'All') {
      query = query.ilike('league', league)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('matches')
      .select(`
        id, league, team1_score, team2_score, status, match_date, format, vod_url, mvp, draft,
        team1:teams!matches_team1_id_fkey(id, name, short_name, logo_url, banner_url, region, roster),
        team2:teams!matches_team2_id_fkey(id, name, short_name, logo_url, banner_url, region, roster)
      `)
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  async create(payload) {
    const { data, error } = await supabase
      .from('matches')
      .insert([payload])
      .select()
      .single()
    if (error) throw error
    return data
  },

  async update(id, payload) {
    const { data, error } = await supabase
      .from('matches')
      .update(payload)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async remove(id) {
    const { error } = await supabase.from('matches').delete().eq('id', id)
    if (error) throw error
    return { message: 'Match deleted successfully' }
  }
}
