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

// Proxy image endpoint to bypass Wikia/Fandom hotlink referrer restrictions
app.get('/api/proxy-image', async (req, res) => {
  const imageUrl = req.query.url
  if (!imageUrl) return res.status(400).send('Missing url')
  try {
    const upstream = await fetch(imageUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      signal: AbortSignal.timeout(10000)
    })
    if (!upstream.ok) {
      return res.status(upstream.status).send('Upstream error')
    }
    const contentType = upstream.headers.get('content-type') || 'image/png'
    res.setHeader('Content-Type', contentType)
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable')
    const buffer = await upstream.arrayBuffer()
    res.send(Buffer.from(buffer))
  } catch (err) {
    res.status(500).send('Proxy error: ' + err.message)
  }
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
