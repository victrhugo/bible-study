import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LogOut, User, Menu, X } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { logout } from '../../services/auth'
import { SDALogo } from '../ui/SDALogo'

export function Header() {
  const { user }        = useAuth()
  const navigate        = useNavigate()
  const { pathname }    = useLocation()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const isActive = (path: string) => pathname.startsWith(path)

  return (
    <header className="sticky top-0 z-40">
      <div className="glass shadow-soft">
        <div className="page-frame">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="group flex items-center">
              <SDALogo size={44} color="navy" className="transition-opacity group-hover:opacity-80" />
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/blocos"
                className={`nav-link ${isActive('/bloco') || isActive('/blocos') ? 'text-lavender-700' : ''}`}
              >
                Blocos
              </Link>
              {user && (
                <Link
                  to="/perfil"
                  className={`nav-link ${isActive('/perfil') ? 'text-lavender-700' : ''}`}
                >
                  Meu progresso
                </Link>
              )}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <Link
                    to="/perfil"
                    className="flex items-center gap-2.5 rounded-full border border-transparent px-2 py-1 group hover:border-blush-200"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt=""
                        className="h-8 w-8 rounded-full ring-2 ring-blush-200 transition-all group-hover:ring-gold-300"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lavender-700 shadow-soft">
                        <User className="h-4 w-4 text-paper-50" />
                      </div>
                    )}
                    <span className="text-sm font-semibold text-ink-600 transition-colors group-hover:text-lavender-700">
                      {user.displayName?.split(' ')[0]}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="rounded-xl p-2 text-ink-300 transition-all duration-200 hover:bg-paper-50 hover:text-blush-600"
                    title="Sair"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="rounded-xl border border-lavender-700 bg-lavender-700 px-5 py-2 text-sm font-semibold text-paper-50 shadow-soft transition-all duration-200 hover:bg-lavender-800"
                >
                  Entrar
                </Link>
              )}
            </div>

            <button
              className="rounded-xl p-2 text-ink-400 transition-all hover:bg-paper-50 hover:text-lavender-700 md:hidden"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="glass-strong border-b border-blush-200/70 animate-fade-in md:hidden">
          <div className="page-frame space-y-1 py-4">
            <Link
              to="/blocos"
              className="flex items-center rounded-2xl px-4 py-3 font-semibold text-ink-600 transition-all hover:bg-paper-50 hover:text-lavender-700"
              onClick={() => setOpen(false)}
            >
              Blocos de estudo
            </Link>
            {user && (
              <Link
                to="/perfil"
                className="flex items-center rounded-2xl px-4 py-3 font-semibold text-ink-600 transition-all hover:bg-paper-50 hover:text-lavender-700"
                onClick={() => setOpen(false)}
              >
                Meu progresso
              </Link>
            )}
            <div className="mt-2 border-t border-blush-200/70 pt-2">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-2xl px-4 py-3 font-semibold text-blush-700 transition-all hover:bg-cream-50"
                >
                  <LogOut className="h-4 w-4" />
                  Sair da conta
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block rounded-2xl px-4 py-3 font-semibold text-lavender-700 transition-all hover:bg-paper-50"
                  onClick={() => setOpen(false)}
                >
                  Entrar
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
