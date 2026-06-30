import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import { catalogRouter } from './routes/catalog.routes.js'
import { usersRouter } from './routes/users.routes.js'

const app = express()
const PORT = Number(process.env.PORT) || 4000

// CORS: solo dejamos entrar al frontend declarado en FRONTEND_URL.
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  }),
)
app.use(express.json())

// Healthcheck: importante para Render (y para pinguear el cold start).
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'sticker-mundial-api' })
})

app.use('/api', catalogRouter)
app.use('/api/users', usersRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`)
})
