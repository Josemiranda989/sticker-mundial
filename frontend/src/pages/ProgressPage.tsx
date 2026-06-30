import { useAlbum, useProgress } from '../api/hooks'
import { ScoreBar } from '../components/ScoreBar'

export function ProgressPage({ userId }: { userId: string }) {
  const album = useAlbum(userId)
  const progress = useProgress(userId)

  if (album.isLoading || progress.isLoading) {
    return <p className="state">Calculando el marcador...</p>
  }

  if (!album.data || !progress.data) {
    return <p className="state">No hay datos todavia.</p>
  }

  const missing = album.data.filter((s) => !s.owned)
  const dupes = album.data.filter((s) => s.duplicates > 0)

  return (
    <>
      <ScoreBar progress={progress.data} />

      <section className="band">
        <h2 className="band__title">
          Te faltan
          <span className="band__chip">{missing.length}</span>
        </h2>
        {missing.length === 0 ? (
          <p className="state">¡Golazo! Album completo.</p>
        ) : (
          <ul className="taglist">
            {missing.map((s) => (
              <li className="tag" key={s.id}>
                <span className="tag__num">{s.number}</span>
                {s.name}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="band">
        <h2 className="band__title">
          Repetidas para cambiar
          <span className="band__chip">{dupes.length}</span>
        </h2>
        {dupes.length === 0 ? (
          <p className="state">Todavia no tenes repetidas.</p>
        ) : (
          <ul className="taglist">
            {dupes.map((s) => (
              <li className="tag tag--dupe" key={s.id}>
                <span className="tag__num">{s.number}</span>
                {s.name}
                <span className="tag__x">×{s.duplicates}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
