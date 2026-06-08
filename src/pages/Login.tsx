import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithGoogle, signInWithEmail, registerWithEmail } from '../services/auth'
import { Button } from '../components/ui/Button'
import { SDALogo } from '../components/ui/SDALogo'

type Mode = 'login' | 'register'

export function Login() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'login') {
        await signInWithEmail(email, password)
      } else {
        if (!name.trim()) {
          setError('Informe seu nome.')
          setLoading(false)
          return
        }

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
    <div className="min-h-screen bg-paper-100">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[0.92fr_1.08fr]">
        <aside className="surface-ink hidden m-5 rounded-[2rem] p-10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <SDALogo size={72} color="white" />

            <div className="mt-16 max-w-lg">
              <p className="eyebrow !text-paper-100/65">Leitura orientada</p>
              <h1 className="mt-4 font-serif text-5xl leading-none text-paper-50">
                Um espaço de estudo com reverência, memória e continuidade.
              </h1>
              <p className="mt-6 text-base leading-8 text-paper-100/80">
                Salve seu percurso, registre anotações e retome cada módulo como quem volta a uma mesa de leitura já preparada.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              ['34', 'Módulos'],
              ['221', 'Estudos'],
              ['6', 'Blocos'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-paper-100/10 bg-white/5 p-4">
                <p className="font-serif text-4xl text-paper-50">{value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-paper-100/65">{label}</p>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-xl animate-slide-up">
          <div className="mb-8 lg:hidden">
              <SDALogo size={58} color="navy" />
            </div>

            <div className="paper-panel p-7 sm:p-9">
              <p className="eyebrow mb-3">{mode === 'login' ? 'Acesso' : 'Cadastro'}</p>
              <h2 className="font-serif text-4xl text-lavender-800">
                {mode === 'login' ? 'Entre para continuar sua leitura.' : 'Crie sua conta de estudo.'}
              </h2>
              <p className="mt-4 max-w-lg text-base leading-8 text-ink-500">
                {mode === 'login'
                  ? 'Retome o ponto onde parou, com anotações e progresso preservados.'
                  : 'Comece a registrar sua jornada no currículo completo.'}
              </p>

              <div className="mt-8 flex rounded-2xl border border-blush-200 bg-paper-50 p-1">
                {(['login', 'register'] as Mode[]).map(currentMode => (
                  <button
                    key={currentMode}
                    onClick={() => { setMode(currentMode); setError('') }}
                    className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                      mode === currentMode
                        ? 'bg-white text-lavender-700 shadow-soft'
                        : 'text-ink-400 hover:text-lavender-700'
                    }`}
                  >
                    {currentMode === 'login' ? 'Entrar' : 'Criar conta'}
                  </button>
                ))}
              </div>

              {error && (
                <div className="mt-5 rounded-2xl border border-blush-200 bg-cream-50 px-4 py-3 text-sm text-blush-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {mode === 'register' && (
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                      Nome completo
                    </span>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                      className="w-full rounded-2xl border border-blush-200 bg-white px-4 py-3 text-sm text-ink-600 placeholder:text-ink-300 focus:border-lavender-300 focus:ring-2 focus:ring-lavender-100"
                      placeholder="Seu nome"
                    />
                  </label>
                )}

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                    E-mail
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-blush-200 bg-white px-4 py-3 text-sm text-ink-600 placeholder:text-ink-300 focus:border-lavender-300 focus:ring-2 focus:ring-lavender-100"
                    placeholder="seu@email.com"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                    Senha
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full rounded-2xl border border-blush-200 bg-white px-4 py-3 text-sm text-ink-600 placeholder:text-ink-300 focus:border-lavender-300 focus:ring-2 focus:ring-lavender-100"
                    placeholder="Mínimo de 6 caracteres"
                  />
                </label>

                <Button type="submit" loading={loading} className="w-full" size="lg">
                  {mode === 'login' ? 'Entrar na conta' : 'Criar conta'}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-blush-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                    ou continuar com
                  </span>
                </div>
              </div>

              <button
                onClick={handleGoogle}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-blush-200 bg-white py-3 text-sm font-semibold text-ink-600 transition-colors hover:bg-paper-50 disabled:opacity-50"
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
          </div>
        </main>
      </div>
    </div>
  )
}
