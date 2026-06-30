import type { Progress } from '../api/types'

// El progreso como un marcador de partido.
export function ScoreBar({ progress }: { progress: Progress }) {
  return (
    <section className="scorebar" aria-label="Progreso de la coleccion">
      <div className="scorebar__head">
        <div className="scorebar__pct">{progress.percentage}%</div>
        <div className="scorebar__count">
          <b>{progress.owned}</b> / {progress.total} figuritas
        </div>
      </div>

      <div className="bar">
        <div
          className="bar__fill"
          style={{ width: `${progress.percentage}%` }}
        />
      </div>

      <div className="scorebar__stats">
        <div className="stat">
          <span className="stat__num">{progress.owned}</span>
          <span className="stat__label">Tenes</span>
        </div>
        <div className="stat">
          <span className="stat__num">{progress.missing}</span>
          <span className="stat__label">Te faltan</span>
        </div>
        <div className="stat">
          <span className="stat__num">{progress.duplicates}</span>
          <span className="stat__label">Repetidas</span>
        </div>
      </div>
    </section>
  )
}
