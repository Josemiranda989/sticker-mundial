import type { AlbumSticker, StickerAction } from '../api/types'
import { StickerCard } from './StickerCard'

interface Props {
  stickers: AlbumSticker[]
  onAction: (stickerId: string, action: StickerAction) => void
  pendingId: string | null
}

// Agrupa las figuritas por grupo del Mundial; las que no tienen
// seleccion (especiales / leyendas) van a una banda aparte.
export function AlbumGrid({ stickers, onAction, pendingId }: Props) {
  const bands = groupStickers(stickers)

  return (
    <>
      {bands.map((band) => {
        const owned = band.items.filter((s) => s.owned).length
        return (
          <section className="band" key={band.title}>
            <h2 className="band__title">
              {band.title}
              <span className="band__chip">
                {owned}/{band.items.length}
              </span>
            </h2>
            <div className="grid">
              {band.items.map((sticker) => (
                <StickerCard
                  key={sticker.id}
                  sticker={sticker}
                  onAction={onAction}
                  pending={pendingId === sticker.id}
                />
              ))}
            </div>
          </section>
        )
      })}
    </>
  )
}

interface Band {
  title: string
  items: AlbumSticker[]
}

function groupStickers(stickers: AlbumSticker[]): Band[] {
  const groups = new Map<string, AlbumSticker[]>()

  for (const s of stickers) {
    const key = s.team ? `Grupo ${s.team.group}` : 'Especiales y leyendas'
    const list = groups.get(key) ?? []
    list.push(s)
    groups.set(key, list)
  }

  return [...groups.entries()]
    .map(([title, items]) => ({ title, items }))
    .sort((a, b) => {
      // "Especiales" siempre al final
      if (a.title.startsWith('Especiales')) return 1
      if (b.title.startsWith('Especiales')) return -1
      return a.title.localeCompare(b.title)
    })
}
