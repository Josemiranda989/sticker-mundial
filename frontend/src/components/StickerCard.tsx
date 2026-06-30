import type { AlbumSticker, StickerAction } from '../api/types'

const TYPE_LABEL: Record<AlbumSticker['type'], string> = {
  PLAYER: 'Jugador',
  BADGE: 'Escudo',
  SPECIAL: 'Especial',
  LEGEND: 'Leyenda',
}

interface Props {
  sticker: AlbumSticker
  onAction: (stickerId: string, action: StickerAction) => void
  pending: boolean
}

export function StickerCard({ sticker, onAction, pending }: Props) {
  const state = sticker.owned ? 'is-owned' : 'is-missing'
  const isFoil = sticker.rarity === 'FOIL'

  return (
    <div className={`sticker ${state}`} aria-busy={pending}>
      {isFoil && (
        <span className="sticker__foilbadge" title="Foil / premium">
          ✦
        </span>
      )}
      {sticker.duplicates > 0 && (
        <span className="sticker__dupes" title="Repetidas">
          +{sticker.duplicates}
        </span>
      )}

      <div className="sticker__top">
        <span className="sticker__num">{sticker.number}</span>
        {sticker.team?.code && (
          <img
            className="sticker__flag"
            src={`https://flagcdn.com/${flagCode(sticker.team.code)}.svg`}
            alt={sticker.team.name}
            loading="lazy"
          />
        )}
      </div>

      <div className="sticker__body">
        <span className="sticker__name">{sticker.name}</span>
        <span className="sticker__type">{TYPE_LABEL[sticker.type]}</span>
      </div>

      <div className="sticker__footer">
        {sticker.owned ? (
          <div className="stepper">
            <button
              className="stepper__btn"
              onClick={() => onAction(sticker.id, 'decrement')}
              disabled={pending}
              aria-label="Quitar una"
            >
              −
            </button>
            <span className="stepper__count">{sticker.count}</span>
            <button
              className="stepper__btn"
              onClick={() => onAction(sticker.id, 'increment')}
              disabled={pending}
              aria-label="Sumar repetida"
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="btn btn--card"
            onClick={() => onAction(sticker.id, 'have')}
            disabled={pending}
          >
            La tengo
          </button>
        )}
      </div>
    </div>
  )
}

// flagcdn usa codigos ISO-2; mapeamos los codigos de seleccion (ISO-3-ish).
const FLAG_MAP: Record<string, string> = {
  ARG: 'ar',
  MEX: 'mx',
  POL: 'pl',
  KSA: 'sa',
  FRA: 'fr',
  DEN: 'dk',
  AUS: 'au',
  TUN: 'tn',
}

function flagCode(code: string): string {
  return FLAG_MAP[code] ?? code.slice(0, 2).toLowerCase()
}
