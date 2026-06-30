import { Router } from 'express'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { stickersQuerySchema } from '../schemas/index.js'
import * as catalog from '../services/catalog.service.js'

export const catalogRouter = Router()

// GET /api/teams -> selecciones con sus figuritas
catalogRouter.get(
  '/teams',
  asyncHandler(async (_req, res) => {
    res.json(await catalog.getTeams())
  }),
)

// GET /api/stickers?team=ARG&type=PLAYER -> catalogo filtrable
catalogRouter.get(
  '/stickers',
  asyncHandler(async (req, res) => {
    const query = stickersQuerySchema.parse(req.query)
    res.json(await catalog.getStickers(query))
  }),
)
