const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api'

// Wrapper minimo sobre fetch: arma la URL, parsea JSON y traduce
// los errores de la API a Error con el mensaje del backend.
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.error ?? `Error ${res.status}`)
  }

  return res.json() as Promise<T>
}
