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
      {/* Glassmorphism bar */}
      <div className="glass border-b border-lavender-100/60 shadow-soft">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <SDALogo size={32} color="natural" className="group-hover:opacity-80 transition-opacity" />
              <div className="flex flex-col leading-tight">
                <span className="font-serif font-semibold text-slate-700 text-sm leading-none">
                  Estudo Bíblico
                </span>
                <span className="text-xs text-lavender-500 leading-none mt-0.5 font-medium tracking-wide">
                  Igreja Adventista · IASD
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/blocos"
                className={`nav-link ${isActive('/bloco') || isActive('/blocos') ? 'text-lavender-600' : ''}`}
              >
                Blocos
              </Link>
              {user && (
                <Link
                  to="/perfil"
                  className={`nav-link ${isActive('/perfil') ? 'text-lavender-600' : ''}`}
                >
                  Meu progresso
                </Link>
              )}
            </nav>

            {/* User area */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <Link
                    to="/perfil"
                    className="flex items-center gap-2.5 group"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt=""
                        className="h-8 w-8 rounded-full ring-2 ring-lavender-200 group-hover:ring-lavender-400 transition-all"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gradient-lavender flex items-center justify-center shadow-soft">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-lavender-700 transition-colors">
                      {user.displayName?.split(' ')[0]}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-1.5 text-slate-400 hover:text-blush-500 hover:bg-blush-50 rounded-xl transition-all duration-200"
                    title="Sair"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-gradient-lavender text-white px-5 py-2 rounded-xl text-sm font-medium shadow-soft hover:shadow-medium hover:brightness-105 transition-all duration-200 active:scale-95"
                >
                  Entrar
                </Link>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 text-slate-500 hover:text-lavender-600 hover:bg-lavender-50 rounded-xl transition-all"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden glass-strong border-b border-lavender-100 animate-fade-in">
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-1">
            <Link
              to="/blocos"
              className="flex items-center px-4 py-3 rounded-2xl text-slate-700 font-medium hover:bg-lavender-50 hover:text-lavender-700 transition-all"
              onClick={() => setOpen(false)}
            >
              Blocos de estudo
            </Link>
            {user && (
              <Link
                to="/perfil"
                className="flex items-center px-4 py-3 rounded-2xl text-slate-700 font-medium hover:bg-lavender-50 hover:text-lavender-700 transition-all"
                onClick={() => setOpen(false)}
              >
                Meu progresso
              </Link>
            )}
            <div className="pt-2 border-t border-lavender-100 mt-2">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 rounded-2xl text-blush-600 font-medium hover:bg-blush-50 transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  Sair da conta
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block px-4 py-3 rounded-2xl text-lavender-700 font-medium hover:bg-lavender-50 transition-all"
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
