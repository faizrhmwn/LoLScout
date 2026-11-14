import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import teamRoutes from './routes/teamRoutes.js'
import matchRoutes from './routes/matchRoutes.js'
import favoriteRoutes from './routes/favoriteRoutes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Root endpoint for health check
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to RiftDraft LoL Esports RESTful API',
    endpoints: {
      teams: '/api/teams',
      matches: '/api/matches',
      favorites: '/api/favorites'
    },
    version: '1.0.0'
  })
})

app.use('/api/teams', teamRoutes)
app.use('/api/matches', matchRoutes)
app.use('/api/favorites', favoriteRoutes)

const port = process.env.PORT || 5000

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`)
  })
}

export default app
