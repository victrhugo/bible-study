import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { Home }         from './pages/Home'
import { Login }        from './pages/Login'
import { BlockList }    from './pages/BlockList'
import { BlockDetail }  from './pages/BlockDetail'
import { ModuleDetail } from './pages/ModuleDetail'
import { StudyDetail }  from './pages/StudyDetail'
import { Profile }      from './pages/Profile'

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"              element={<Home />} />
          <Route path="/login"         element={<Login />} />
          <Route path="/blocos"        element={<BlockList />} />
          <Route path="/bloco/:blockId"   element={<BlockDetail />} />
          <Route path="/modulo/:moduleId" element={<ModuleDetail />} />
          <Route path="/estudo/:studyId"  element={<StudyDetail />} />
          <Route path="/perfil"        element={<Profile />} />
          <Route path="*"              element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
