export type StickerType = 'PLAYER' | 'BADGE' | 'SPECIAL' | 'LEGEND'
export type Rarity = 'NORMAL' | 'FOIL'

export interface TeamRef {
  code: string
  name: string
  group: string
}

export interface AlbumSticker {
  id: string
  number: string
  name: string
  type: StickerType
  rarity: Rarity
  imageUrl: string | null
  teamId: string | null
  team: TeamRef | null
  count: number
  owned: boolean
  duplicates: number
}

export interface Progress {
  total: number
  owned: number
  missing: number
  duplicates: number
  percentage: number
}

export interface User {
  id: string
  name: string
  createdAt: string
}

export type StickerAction = 'have' | 'missing' | 'increment' | 'decrement'
