import { useState } from 'react'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { useUser } from './api/hooks'
import { ProfileGate } from './components/ProfileGate'
import {
  clearProfileId,
  getProfileId,
  setProfileId,
} from './lib/profile'
import { AlbumPage } from './pages/AlbumPage'
import { ProgressPage } from './pages/ProgressPage'

export function App() {
  const [userId, setUserId] = useState<string | null>(getProfileId())
  const { data: user } = useUser(userId)

  function handleReady(id: string) {
    setProfileId(id)
    setUserId(id)
  }

  function handleSignOut() {
    clearProfileId()
    setUserId(null)
  }

  if (!userId) {
    return <ProfileGate onReady={handleReady} />
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand__mark">✦</div>
          <div className="brand__name">
            Album Mundial
            <small>EDICION FIGURITAS</small>
          </div>
        </div>

        <nav className="nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'is-active' : '')}
          >
            Album
          </NavLink>
          <NavLink
            to="/progreso"
            className={({ isActive }) => (isActive ? 'is-active' : '')}
          >
            Progreso
          </NavLink>
        </nav>

        <div className="profilebar">
          <span>
            Perfil: <b>{user?.name ?? '...'}</b>
          </span>
          <button className="linkbtn" onClick={handleSignOut}>
            cambiar
          </button>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<AlbumPage userId={userId} />} />
          <Route path="/progreso" element={<ProgressPage userId={userId} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
