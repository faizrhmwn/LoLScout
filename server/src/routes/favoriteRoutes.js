import express from 'express'
import { FavoriteController } from '../controllers/favoriteController.js'

const router = express.Router()

router.get('/', FavoriteController.getAll)
router.post('/', FavoriteController.create)
router.put('/:id', FavoriteController.update)
router.delete('/:id', FavoriteController.remove)

export default router
