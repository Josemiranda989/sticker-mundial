import { useAlbum, useProgress, useUpdateSticker } from '../api/hooks'
import { AlbumGrid } from '../components/AlbumGrid'
import { ScoreBar } from '../components/ScoreBar'
import type { StickerAction } from '../api/types'

export function AlbumPage({ userId }: { userId: string }) {
  const album = useAlbum(userId)
  const progress = useProgress(userId)
  const update = useUpdateSticker(userId)

  function handleAction(stickerId: string, action: StickerAction) {
    update.mutate({ stickerId, action })
  }

  if (album.isLoading || progress.isLoading) {
    return <p className="state">Abriendo el album...</p>
  }

  if (album.isError) {
    return (
      <p className="state">
        No se pudo cargar el album. ¿Esta corriendo el backend?
      </p>
    )
  }

  return (
    <>
      {progress.data && <ScoreBar progress={progress.data} />}
      {album.data && (
        <AlbumGrid
          stickers={album.data}
          onAction={handleAction}
          pendingId={update.isPending ? (update.variables?.stickerId ?? null) : null}
        />
      )}
    </>
  )
}
