import { prisma } from '../lib/prisma.js'
import { HttpError } from '../middleware/errorHandler.js'
import type { CreateUserInput, UpdateUserStickerInput } from '../schemas/index.js'

// Gestion de perfiles livianos y del estado de coleccion de cada uno.

export function createUser(input: CreateUserInput) {
  return prisma.user.create({ data: { name: input.name } })
}

export async function getUser(id: string) {
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) throw new HttpError(404, 'Perfil no encontrado')
  return user
}

// El album completo: TODAS las figuritas del catalogo con el estado
// del usuario (count) mergeado encima. Si no tiene registro, count = 0.
export async function getAlbum(userId: string) {
  await getUser(userId)

  const stickers = await prisma.sticker.findMany({
    orderBy: { number: 'asc' },
    include: {
      team: { select: { code: true, name: true, group: true } },
      userStickers: { where: { userId }, select: { count: true } },
    },
  })

  return stickers.map((s) => {
    const count = s.userStickers[0]?.count ?? 0
    const { userStickers, ...sticker } = s
    return {
      ...sticker,
      count,
      owned: count >= 1,
      duplicates: Math.max(0, count - 1),
    }
  })
}

// Progreso de coleccion: total, completadas, faltantes, repetidas y %.
export async function getProgress(userId: string) {
  await getUser(userId)

  const [total, owned, duplicatesAgg] = await Promise.all([
    prisma.sticker.count(),
    prisma.userSticker.count({ where: { userId, count: { gte: 1 } } }),
    prisma.userSticker.aggregate({
      where: { userId, count: { gt: 1 } },
      _sum: { count: true },
      _count: true,
    }),
  ])

  const duplicates =
    (duplicatesAgg._sum.count ?? 0) - (duplicatesAgg._count ?? 0)

  return {
    total,
    owned,
    missing: total - owned,
    duplicates,
    percentage: total === 0 ? 0 : Math.round((owned / total) * 100),
  }
}

// Actualiza el estado de una figurita. Soporta count absoluto o acciones.
export async function updateUserSticker(
  userId: string,
  stickerId: string,
  input: UpdateUserStickerInput,
) {
  await getUser(userId)

  const sticker = await prisma.sticker.findUnique({ where: { id: stickerId } })
  if (!sticker) throw new HttpError(404, 'Figurita no encontrada')

  const current = await prisma.userSticker.findUnique({
    where: { userId_stickerId: { userId, stickerId } },
  })
  const currentCount = current?.count ?? 0

  const nextCount = resolveCount(currentCount, input)

  const result = await prisma.userSticker.upsert({
    where: { userId_stickerId: { userId, stickerId } },
    create: { userId, stickerId, count: nextCount },
    update: { count: nextCount },
  })

  return {
    stickerId,
    count: result.count,
    owned: result.count >= 1,
    duplicates: Math.max(0, result.count - 1),
  }
}

function resolveCount(current: number, input: UpdateUserStickerInput): number {
  if (input.count !== undefined) return input.count
  switch (input.action) {
    case 'have':
      return Math.max(1, current)
    case 'missing':
      return 0
    case 'increment':
      return current + 1
    case 'decrement':
      return Math.max(0, current - 1)
    default:
      return current
  }
}
