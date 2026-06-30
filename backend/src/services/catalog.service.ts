import { prisma } from '../lib/prisma.js'
import type { StickersQuery } from '../schemas/index.js'

// Lectura del catalogo: selecciones y figuritas. No depende del usuario.

export function getTeams() {
  return prisma.team.findMany({
    orderBy: [{ group: 'asc' }, { name: 'asc' }],
    include: {
      stickers: { orderBy: { number: 'asc' } },
    },
  })
}

export function getStickers(query: StickersQuery) {
  return prisma.sticker.findMany({
    where: {
      type: query.type,
      team: query.team ? { code: query.team.toUpperCase() } : undefined,
    },
    orderBy: { number: 'asc' },
    include: { team: { select: { code: true, name: true, group: true } } },
  })
}
