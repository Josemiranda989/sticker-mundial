import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { api } from './client'
import type {
  AlbumSticker,
  Progress,
  StickerAction,
  User,
} from './types'

// ---- Perfil ----
export function useCreateUser() {
  return useMutation({
    mutationFn: (name: string) =>
      api<User>('/users', {
        method: 'POST',
        body: JSON.stringify({ name }),
      }),
  })
}

export function useUser(userId: string | null) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => api<User>(`/users/${userId}`),
    enabled: !!userId,
  })
}

// ---- Album + progreso ----
export function useAlbum(userId: string | null) {
  return useQuery({
    queryKey: ['album', userId],
    queryFn: () => api<AlbumSticker[]>(`/users/${userId}/album`),
    enabled: !!userId,
  })
}

export function useProgress(userId: string | null) {
  return useQuery({
    queryKey: ['progress', userId],
    queryFn: () => api<Progress>(`/users/${userId}/progress`),
    enabled: !!userId,
  })
}

// ---- Actualizar estado de una figurita ----
export function useUpdateSticker(userId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({
      stickerId,
      action,
    }: {
      stickerId: string
      action: StickerAction
    }) =>
      api(`/users/${userId}/stickers/${stickerId}`, {
        method: 'PATCH',
        body: JSON.stringify({ action }),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['album', userId] })
      qc.invalidateQueries({ queryKey: ['progress', userId] })
    },
  })
}
