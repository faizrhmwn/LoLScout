import { supabase } from '../config/supabaseClient.js'

export const TeamModel = {
  async getAll(region) {
    let query = supabase.from('teams').select('*').order('standing_summer', { ascending: true })
    if (region && region !== 'All') {
      query = query.eq('region', region)
    }
    const { data, error } = await query
    if (error) throw error
    return data
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  async create(payload) {
    const { data, error } = await supabase
      .from('teams')
      .insert([payload])
      .select()
      .single()
    if (error) throw error
    return data
  },

  async update(id, payload) {
    const { data, error } = await supabase
      .from('teams')
      .update(payload)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async remove(id) {
    const { error } = await supabase.from('teams').delete().eq('id', id)
    if (error) throw error
    return { message: 'Team deleted successfully' }
  }
}
