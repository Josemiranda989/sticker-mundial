import { Router } from 'express'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { createUserSchema, updateUserStickerSchema } from '../schemas/index.js'
import * as users from '../services/users.service.js'

export const usersRouter = Router()

// POST /api/users -> crear perfil liviano
usersRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const input = createUserSchema.parse(req.body)
    res.status(201).json(await users.createUser(input))
  }),
)

// GET /api/users/:id -> datos del perfil
usersRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    res.json(await users.getUser(req.params.id))
  }),
)

// GET /api/users/:id/album -> catalogo completo con el estado del usuario
usersRouter.get(
  '/:id/album',
  asyncHandler(async (req, res) => {
    res.json(await users.getAlbum(req.params.id))
  }),
)

// GET /api/users/:id/progress -> resumen de coleccion
usersRouter.get(
  '/:id/progress',
  asyncHandler(async (req, res) => {
    res.json(await users.getProgress(req.params.id))
  }),
)

// PATCH /api/users/:id/stickers/:stickerId -> tengo / falta / repe
usersRouter.patch(
  '/:id/stickers/:stickerId',
  asyncHandler(async (req, res) => {
    const input = updateUserStickerSchema.parse(req.body)
    res.json(
      await users.updateUserSticker(req.params.id, req.params.stickerId, input),
    )
  }),
)
