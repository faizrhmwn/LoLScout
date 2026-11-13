const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const api = {
  // TEAMS
  async getTeams(region = 'All') {
    const url = region && region !== 'All' ? `${API_BASE}/teams?region=${region}` : `${API_BASE}/teams`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch teams')
    return res.json()
  },

  async getTeamDetail(id) {
    const res = await fetch(`${API_BASE}/teams/${id}`)
    if (!res.ok) throw new Error('Failed to fetch team details')
    return res.json()
  },

  // MATCHES
  async getMatches(status = 'All', league = 'All') {
    const params = new URLSearchParams()
    if (status && status !== 'All') params.append('status', status)
    if (league && league !== 'All') params.append('league', league)
    const url = `${API_BASE}/matches?${params.toString()}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch matches')
    return res.json()
  },

  async getMatchDetail(id) {
    const res = await fetch(`${API_BASE}/matches/${id}`)
    if (!res.ok) throw new Error('Failed to fetch match details')
    return res.json()
  },

  // FAVORITES
  async getFavorites(userId = 'guest') {
    const res = await fetch(`${API_BASE}/favorites?user_id=${userId}`)
    if (!res.ok) throw new Error('Failed to fetch favorites')
    return res.json()
  },

  async addFavorite(teamId, notes = '', userId = 'guest') {
    const res = await fetch(`${API_BASE}/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ team_id: teamId, notes, user_id: userId })
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error || 'Failed to add favorite')
    }
    return res.json()
  },

  async updateFavorite(id, notes) {
    const res = await fetch(`${API_BASE}/favorites/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes })
    })
    if (!res.ok) throw new Error('Failed to update favorite')
    return res.json()
  },

  async removeFavorite(id) {
    const res = await fetch(`${API_BASE}/favorites/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Failed to remove favorite')
    return res.json()
  }
}
