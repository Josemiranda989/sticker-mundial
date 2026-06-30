// Perfil liviano: guardamos el id del usuario activo en localStorage.
// El dia que metamos Supabase Auth, este id pasa a venir del token.

const KEY = 'sticker-mundial:userId'

export function getProfileId(): string | null {
  return localStorage.getItem(KEY)
}

export function setProfileId(id: string): void {
  localStorage.setItem(KEY, id)
}

export function clearProfileId(): void {
  localStorage.removeItem(KEY)
}
