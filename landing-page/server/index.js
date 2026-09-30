import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import Lead from './models/Lead.js'

const app = express()
const port = Number(process.env.PORT) || 4000
const allowedOrigins = new Set(
  (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
)

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true)
    }

    return callback(new Error('Origin is not allowed by CORS'))
  },
}))
app.use(express.json({ limit: '10kb' }))

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'unavailable',
  })
})

app.post('/api/leads', async (request, response) => {
  const email = String(request.body?.email || '').trim().toLowerCase()

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return response.status(400).json({ message: 'Enter a valid email address.' })
  }

  if (mongoose.connection.readyState !== 1) {
    return response.status(503).json({
      message: 'Signups are temporarily offline. Configure MongoDB to join the list.',
    })
  }

  try {
    await Lead.create({ email })
    return response.status(201).json({ message: 'You are on the early-access list.' })
  } catch (error) {
    if (error.code === 11000) {
      return response.status(409).json({ message: 'That email is already on the list.' })
    }

    console.error('Could not save early-access signup:', error.message)
    return response.status(500).json({ message: 'We could not save your email. Please try again.' })
  }
})

async function start() {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI)
      console.info('MongoDB connected')
    } catch (error) {
      console.error('MongoDB connection failed:', error.message)
    }
  } else {
    console.info('MongoDB is not configured; signup storage is disabled')
  }

  app.listen(port, () => {
    console.info(`Landing API listening on http://localhost:${port}`)
  })
}

start()
