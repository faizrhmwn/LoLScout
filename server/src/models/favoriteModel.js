import { supabase } from '../config/supabaseClient.js'

export const FavoriteModel = {
  async getAll(userId = 'guest') {
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        id, user_id, notes, created_at,
        team:teams(id, name, short_name, region, logo_url, standing_summer)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
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
    const { error } = await supabase.from('favorites').delete().eq('id', id)
    if (error) throw error
    return { message: 'Favorite removed successfully' }
  }
}
