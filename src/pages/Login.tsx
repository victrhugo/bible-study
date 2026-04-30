import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithGoogle, signInWithEmail, registerWithEmail } from '../services/auth'
import { Button } from '../components/ui/Button'
import { SDALogo } from '../components/ui/SDALogo'

type Mode = 'login' | 'register'

export function Login() {
  const navigate        = useNavigate()
  const [mode, setMode] = useState<Mode>('login')
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await signInWithEmail(email, password)
      } else {
        if (!name.trim()) { setError('Informe seu nome.'); setLoading(false); return }
        await registerWithEmail(email, password, name.trim())
      }
      navigate('/')
    } catch (err: unknown) {
      const msg = (err as { message?: string }).message ?? ''
      if (msg.includes('user-not-found') || msg.includes('wrong-password') || msg.includes('invalid-credential')) {
        setError('E-mail ou senha incorretos.')
      } else if (msg.includes('email-already-in-use')) {
        setError('Este e-mail já está cadastrado.')
      } else if (msg.includes('weak-password')) {
        setError('A senha deve ter pelo menos 6 caracteres.')
      } else {
        setError('Ocorreu um erro. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    setLoading(true)
    try {
      await signInWithGoogle()
      navigate('/')
    } catch {
      setError('Não foi possível entrar com Google. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #F8F7FE 0%, #FEF7F8 55%, #F3F8F5 100%)' }}>
      {/* Left panel — decorative (hidden mobile) */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-lavender-600 via-lavender-500 to-blush-400 flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10 text-center text-white">
          <div className="flex justify-center mb-6 animate-float">
            <SDALogo size={72} color="white" />
          </div>
          <h1 className="font-serif text-3xl font-semibold mb-3 text-white">
            Estudo Bíblico
          </h1>
          <p className="text-white/90 text-sm leading-relaxed max-w-xs">
            Um currículo progressivo com 219 estudos, do iniciante ao avançado, alinhado com a doutrina adventista.
          </p>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[['34', 'Módulos'], ['219', 'Estudos'], ['6', 'Blocos']].map(([n, l]) => (
              <div key={l} className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
                <p className="font-serif text-2xl font-bold text-white">{n}</p>
                <p className="text-white/80 text-xs">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md animate-slide-up">

          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center gap-3">
              <SDALogo size={38} color="lavender" />
              <div className="text-left">
                <p className="font-serif font-semibold text-slate-700">Estudo Bíblico</p>
                <p className="text-xs text-lavender-500">Igreja Adventista · IASD</p>
              </div>
            </div>
          </div>

          <div className="glass-strong rounded-3xl shadow-glass p-8">
            <h2 className="font-serif text-2xl font-semibold text-slate-700 mb-1">
              {mode === 'login' ? 'Bem-vindo de volta' : 'Criar sua conta'}
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              {mode === 'login'
                ? 'Continue sua jornada de estudo bíblico.'
                : 'Comece sua jornada de estudo hoje.'}
            </p>

            {/* Mode tabs */}
            <div className="flex bg-lavender-50 rounded-2xl p-1 mb-6">
              {(['login', 'register'] as Mode[]).map(m => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError('') }}
                  className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                    mode === m
                      ? 'bg-white text-lavender-700 shadow-soft'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {m === 'login' ? 'Entrar' : 'Criar conta'}
                </button>
              ))}
            </div>

            {error && (
              <div className="mb-4 p-3.5 bg-blush-50 border border-blush-200 rounded-2xl text-sm text-blush-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="w-full border border-lavender-200 bg-lavender-50/50 rounded-2xl px-4 py-3 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:border-transparent transition-all"
                    placeholder="Seu nome"
                  />
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full border border-lavender-200 bg-lavender-50/50 rounded-2xl px-4 py-3 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:border-transparent transition-all"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Senha
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full border border-lavender-200 bg-lavender-50/50 rounded-2xl px-4 py-3 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:border-transparent transition-all"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
              <Button type="submit" loading={loading} className="w-full" size="lg">
                {mode === 'login' ? 'Entrar na conta' : 'Criar conta gratuitamente'}
              </Button>
            </form>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-lavender-100" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-slate-500">ou continue com</span>
              </div>
            </div>

            <button
              onClick={handleGoogle}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 border border-lavender-200 bg-white rounded-2xl py-3 text-sm font-medium text-slate-600 hover:bg-lavender-50 hover:border-lavender-300 transition-all duration-200 disabled:opacity-50 active:scale-[0.98]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continuar com Google
            </button>
          </div>

          <p className="text-center text-xs text-slate-500 mt-5">
            Acesso gratuito · Progresso salvo na nuvem
          </p>
        </div>
      </div>
    </div>
  )
}
