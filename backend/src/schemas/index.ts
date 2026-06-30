import { z } from 'zod'

// Validacion de inputs ANTES de tocar la base de datos.

export const createUserSchema = z.object({
  name: z.string().trim().min(1, 'El nombre no puede estar vacio').max(40),
})

// Para actualizar el estado de una figurita en el album.
// O bien mandas un count absoluto, o bien una accion incremental.
export const updateUserStickerSchema = z
  .object({
    count: z.number().int().min(0).max(99).optional(),
    action: z.enum(['have', 'missing', 'increment', 'decrement']).optional(),
  })
  .refine((d) => d.count !== undefined || d.action !== undefined, {
    message: 'Mandar "count" o "action"',
  })

export const stickersQuerySchema = z.object({
  team: z.string().optional(),
  type: z.enum(['PLAYER', 'BADGE', 'SPECIAL', 'LEGEND']).optional(),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserStickerInput = z.infer<typeof updateUserStickerSchema>
export type StickersQuery = z.infer<typeof stickersQuerySchema>
