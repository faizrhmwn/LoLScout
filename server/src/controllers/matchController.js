import { MatchModel } from '../models/matchModel.js'

export const MatchController = {
  async getAll(req, res) {
    try {
      const { status, league } = req.query
      const matches = await MatchModel.getAll(status, league)
      res.json(matches)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params
      const match = await MatchModel.getById(id)
      res.json(match)
    } catch (err) {
      res.status(404).json({ error: err.message })
    }
  },

  async create(req, res) {
    try {
      const match = await MatchModel.create(req.body)
      res.status(201).json(match)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params
      const match = await MatchModel.update(id, req.body)
      res.json(match)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params
      const result = await MatchModel.remove(id)
      res.json(result)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}
