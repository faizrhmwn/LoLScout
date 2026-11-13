import { TeamModel } from '../models/teamModel.js'

export const TeamController = {
  async getAll(req, res) {
    try {
      const { region } = req.query
      const teams = await TeamModel.getAll(region)
      res.json(teams)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params
      const team = await TeamModel.getById(id)
      res.json(team)
    } catch (err) {
      res.status(404).json({ error: err.message })
    }
  },

  async create(req, res) {
    try {
      const team = await TeamModel.create(req.body)
      res.status(201).json(team)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params
      const team = await TeamModel.update(id, req.body)
      res.json(team)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params
      const result = await TeamModel.remove(id)
      res.json(result)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}
