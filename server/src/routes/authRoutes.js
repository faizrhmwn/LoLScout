import express from 'express'
import { supabaseAdmin } from '../config/supabaseClient.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' })
    }

    // Create user pre-confirmed using Supabase Admin API
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    res.status(201).json({
      message: 'User registered successfully and auto-confirmed',
      user: data.user
    })
  } catch (err) {
    res.status(500).json({ error: err.message || 'Internal server error' })
  }
})

export default router
