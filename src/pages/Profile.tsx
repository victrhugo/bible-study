import { useNavigate, Link } from 'react-router-dom'
import { User, BookOpen, CheckCircle2, LogOut, ChevronRight, Bookmark } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../hooks/useProgress'
import { logout } from '../services/auth'
import { BLOCKS } from '../data/curriculum'
import { ProgressBar, CircularProgress } from '../components/ui/ProgressBar'
import { LevelBadge } from '../components/ui/Badge'
import { Layout } from '../components/layout/Layout'

export function Profile() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { stats, blockCompletionRate, loading } = useProgress()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  if (!user) {
    return (
      <Layout>
        <div className="py-24 text-center animate-fade-in">
          <p className="mb-4 text-ink-500">Você precisa estar logado para ver o perfil.</p>
          <Link to="/login" className="font-semibold text-lavender-700 hover:text-lavender-800">
            Entrar →
          </Link>
        </div>
      </Layout>
    )
  }

  const globalPct = stats ? Math.round((stats.totalCompleted / stats.totalStudies) * 100) : 0

  return (
    <Layout>
      <div className="mx-auto max-w-4xl space-y-6">
        <section className="paper-panel animate-slide-up p-7 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt=""
                  className="h-16 w-16 rounded-2xl ring-2 ring-blush-200"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-lavender-700 shadow-soft">
                  <User className="h-8 w-8 text-paper-50" />
                </div>
              )}
              <div>
                <p className="eyebrow mb-2">Perfil de leitura</p>
                <h1 className="font-serif text-3xl text-lavender-800">{user.displayName}</h1>
                <p className="mt-1 text-sm text-ink-400">{user.email}</p>
              </div>
            </div>

            <div className="annotation">
              <div className="flex items-center gap-2 text-sm font-semibold text-lavender-700">
                <Bookmark className="h-4 w-4" />
                Biblioteca pessoal ativa
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="surface animate-slide-up p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow mb-2">Resumo</p>
                <h2 className="font-serif text-3xl text-lavender-800">Progresso geral</h2>
              </div>
              <CircularProgress value={globalPct} size={68} />
            </div>

            {loading ? (
              <div className="mt-6 animate-pulse space-y-3">
                <div className="h-10 rounded-2xl bg-lavender-100" />
                <div className="h-3 rounded-full bg-lavender-50" />
              </div>
            ) : (
              <>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="annotation">
                    <CheckCircle2 className="h-5 w-5 text-sage-600" />
                    <p className="mt-3 font-serif text-3xl text-lavender-800">{stats?.totalCompleted ?? 0}</p>
                    <p className="mt-1 text-sm text-ink-400">estudos concluídos</p>
                  </div>
                  <div className="annotation">
                    <BookOpen className="h-5 w-5 text-lavender-600" />
                    <p className="mt-3 font-serif text-3xl text-lavender-800">{stats?.totalStudies ?? 221}</p>
                    <p className="mt-1 text-sm text-ink-400">estudos disponíveis</p>
                  </div>
                </div>

                <div className="mt-6">
                  <ProgressBar value={globalPct} variant="warm" label="Currículo completo" />
                </div>
              </>
            )}
          </div>

          <div className="surface animate-slide-up p-6 sm:p-7">
            <p className="eyebrow mb-2">Acompanhamento</p>
            <h2 className="font-serif text-3xl text-lavender-800">Por bloco</h2>
            <div className="mt-6 space-y-4">
              {BLOCKS.map((block, index) => {
                const pct = blockCompletionRate(block.id, block.studyCount)
                const doneCount = stats?.completedByBlock[block.id] ?? 0

                return (
                  <Link
                    key={block.id}
                    to={`/bloco/${block.id}`}
                    className="block rounded-2xl border border-blush-200/70 bg-paper-50/70 px-4 py-4 transition-colors hover:border-lavender-200 hover:bg-white"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blush-200 bg-white font-serif text-2xl text-lavender-700">
                          {block.id}
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="truncate text-sm font-semibold text-lavender-800">{block.name}</span>
                            <LevelBadge level={block.level} />
                          </div>
                          <p className="mt-1 text-xs uppercase tracking-[0.12em] text-ink-400">{doneCount}/{block.studyCount} concluídos</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 flex-shrink-0 text-lavender-300" />
                    </div>
                    <div className="mt-3">
                      <ProgressBar value={pct} size="xs" showPercent={false} variant="warm" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <button
          onClick={handleLogout}
          className="surface animate-slide-up flex w-full items-center justify-center gap-2 border-blush-300 py-3.5 text-sm font-semibold text-blush-700 transition-colors hover:bg-cream-50"
        >
          <LogOut className="h-4 w-4" />
          Sair da conta
        </button>
      </div>
    </Layout>
  )
}
