import { useNavigate, Link } from 'react-router-dom'
import { User, BookOpen, CheckCircle, LogOut, ChevronRight, Sparkles } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../hooks/useProgress'
import { logout } from '../services/auth'
import { BLOCKS } from '../data/curriculum'
import { ProgressBar, CircularProgress } from '../components/ui/ProgressBar'
import { LevelBadge } from '../components/ui/Badge'
import { Layout } from '../components/layout/Layout'

export function Profile() {
  const { user }    = useAuth()
  const navigate    = useNavigate()
  const { stats, blockCompletionRate, loading } = useProgress()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  if (!user) {
    return (
      <Layout>
        <div className="text-center py-24 animate-fade-in">
          <p className="text-slate-500 mb-4">Você precisa estar logado para ver o perfil.</p>
          <Link to="/login" className="text-lavender-600 font-semibold hover:text-lavender-800 transition-colors">
            Entrar →
          </Link>
        </div>
      </Layout>
    )
  }

  const globalPct = stats ? Math.round((stats.totalCompleted / stats.totalStudies) * 100) : 0

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-5">

        {/* User card */}
        <div className="relative glass-strong rounded-3xl shadow-card p-6 overflow-hidden animate-slide-up">
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-lavender-50 to-blush-50 opacity-60" />
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-gradient-to-br from-lavender-200 to-blush-200 opacity-20 translate-x-1/3 -translate-y-1/3" />

          <div className="relative flex items-center gap-4">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt=""
                className="h-16 w-16 rounded-2xl ring-4 ring-white shadow-medium"
              />
            ) : (
              <div className="h-16 w-16 rounded-2xl bg-gradient-lavender flex items-center justify-center shadow-medium">
                <User className="h-8 w-8 text-white" />
              </div>
            )}
            <div>
              <h1 className="font-serif text-xl font-bold text-slate-700">{user.displayName}</h1>
              <p className="text-sm text-slate-500 mt-0.5">{user.email}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <Sparkles className="h-3.5 w-3.5 text-lavender-400" />
                <span className="text-xs text-lavender-500 font-medium">Em jornada de estudo bíblico</span>
              </div>
            </div>
          </div>
        </div>

        {/* Overall stats */}
        <div className="glass-strong rounded-3xl shadow-card p-6 animate-slide-up delay-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-lg font-semibold text-slate-700">Progresso geral</h2>
            <CircularProgress value={globalPct} size={56} />
          </div>

          {loading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-10 bg-lavender-100 rounded-2xl" />
              <div className="h-3 bg-lavender-50 rounded-full" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-gradient-to-br from-lavender-50 to-lavender-100/50 rounded-2xl p-4 text-center border border-lavender-100">
                  <CheckCircle className="h-6 w-6 text-lavender-500 mx-auto mb-1.5" />
                  <p className="text-3xl font-bold text-gradient">{stats?.totalCompleted ?? 0}</p>
                  <p className="text-xs text-slate-500 mt-0.5">estudos concluídos</p>
                </div>
                <div className="bg-gradient-to-br from-sage-50 to-sage-100/50 rounded-2xl p-4 text-center border border-sage-100">
                  <BookOpen className="h-6 w-6 text-sage-500 mx-auto mb-1.5" />
                  <p className="text-3xl font-bold text-gradient-sage">{stats?.totalStudies ?? 219}</p>
                  <p className="text-xs text-slate-500 mt-0.5">total disponível</p>
                </div>
              </div>
              <ProgressBar
                value={globalPct}
                label="Progresso no currículo completo"
                variant="warm"
              />
            </>
          )}
        </div>

        {/* Progress by block */}
        <div className="glass-strong rounded-3xl shadow-card p-6 animate-slide-up delay-200">
          <h2 className="font-serif text-lg font-semibold text-slate-700 mb-4">Por bloco</h2>
          <div className="space-y-4">
            {BLOCKS.map((block, i) => {
              const pct = blockCompletionRate(block.id, block.studyCount)
              const doneCount = stats?.completedByBlock[block.id] ?? 0
              return (
                <Link
                  key={block.id}
                  to={`/bloco/${block.id}`}
                  className="flex items-center gap-3 group animate-slide-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-lavender-50 to-lavender-100 border border-lavender-100 flex items-center justify-center text-xs font-black text-lavender-400 flex-shrink-0 group-hover:from-lavender-100 group-hover:to-lavender-200 transition-all">
                    {block.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-600 group-hover:text-lavender-700 transition-colors">
                          {block.name}
                        </span>
                        <LevelBadge level={block.level} />
                      </div>
                      <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                        <span className="text-xs text-slate-500">{doneCount}/{block.studyCount}</span>
                        <ChevronRight className="h-3.5 w-3.5 text-lavender-200 group-hover:text-lavender-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                    <ProgressBar value={pct} size="xs" showPercent={false} />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3.5 border border-blush-200 text-blush-500 rounded-2xl font-medium hover:bg-blush-50 hover:border-blush-300 transition-all duration-200 text-sm glass-strong animate-slide-up delay-300"
        >
          <LogOut className="h-4 w-4" />
          Sair da conta
        </button>
      </div>
    </Layout>
  )
}
