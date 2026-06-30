import { useState } from 'react'
import { useCreateUser } from '../api/hooks'

// Puerta de entrada: sin auth, solo pedimos un nombre y creamos
// un perfil liviano. El id queda guardado en localStorage.
export function ProfileGate({ onReady }: { onReady: (id: string) => void }) {
  const [name, setName] = useState('')
  const createUser = useCreateUser()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    createUser.mutate(trimmed, {
      onSuccess: (user) => onReady(user.id),
    })
  }

  return (
    <div className="gate">
      <h1>Abri tu album</h1>
      <p>Elegi un nombre y arranca a completar la coleccion del Mundial.</p>
      <form className="field" onSubmit={handleSubmit}>
        <input
          className="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
          autoFocus
        />
        <button
          className="btn btn--foil"
          type="submit"
          disabled={!name.trim() || createUser.isPending}
        >
          {createUser.isPending ? 'Creando...' : 'Empezar'}
        </button>
      </form>
      {createUser.isError && (
        <p style={{ color: '#ff8090', marginTop: 14 }}>
          {createUser.error.message}
        </p>
      )}
    </div>
  )
}
