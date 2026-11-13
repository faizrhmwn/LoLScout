import { FavoriteModel } from '../models/favoriteModel.js'

export const FavoriteController = {
  async getAll(req, res) {
    try {
      const { user_id } = req.query
      const favorites = await FavoriteModel.getAll(user_id || 'guest')
      res.json(favorites)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async create(req, res) {
    try {
      const { user_id, team_id, notes } = req.body
      if (!team_id) {
        return res.status(400).json({ error: 'team_id is required' })
      }
      const favorite = await FavoriteModel.create(user_id || 'guest', team_id, notes || '')
      res.status(201).json(favorite)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params
      const { notes } = req.body
      const favorite = await FavoriteModel.update(id, notes)
      res.json(favorite)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params
      const result = await FavoriteModel.remove(id)
      res.json(result)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}
