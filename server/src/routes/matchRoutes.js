import express from 'express'
import { MatchController } from '../controllers/matchController.js'

const router = express.Router()

router.get('/', MatchController.getAll)
router.get('/:id', MatchController.getById)
router.post('/', MatchController.create)
router.put('/:id', MatchController.update)
router.delete('/:id', MatchController.remove)

export default router
