import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, CheckCircle, Sparkles, ChevronRight } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../hooks/useProgress'
import { BLOCKS, STUDIES } from '../data/curriculum'
import { ProgressBar } from '../components/ui/ProgressBar'
import { LevelBadge } from '../components/ui/Badge'
import { Layout } from '../components/layout/Layout'

const blockConfig: Record<string, { gradient: string; ring: string; text: string }> = {
  A: { gradient: 'from-lavender-100 to-lavender-50',  ring: 'ring-lavender-200', text: 'text-lavender-600' },
  B: { gradient: 'from-sage-100 to-sage-50',           ring: 'ring-sage-200',     text: 'text-sage-600'     },
  C: { gradient: 'from-blush-100 to-blush-50',         ring: 'ring-blush-200',    text: 'text-blush-600'    },
  D: { gradient: 'from-gold-300/20 to-cream-200',      ring: 'ring-gold-300/50',  text: 'text-gold-600'     },
  E: { gradient: 'from-lavender-200 to-blush-100',     ring: 'ring-lavender-300', text: 'text-lavender-700' },
  F: { gradient: 'from-blush-200 to-blush-50',         ring: 'ring-blush-300',    text: 'text-blush-700'    },
}

export function Home() {
  const { user }  = useAuth()
  const { stats, blockCompletionRate, progress, loading } = useProgress()

  // Find last incomplete study with progress started
  const lastStudied = user
    ? Object.values(progress)
        .filter(p => !p.completed)
        .map(p => STUDIES.find(s => s.id === p.studyId))
        .filter(Boolean)[0]
    : null

  const globalPct = stats ? Math.round((stats.totalCompleted / stats.totalStudies) * 100) : 0

  return (
    <Layout>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="text-center pt-8 pb-14 animate-slide-up">
        <div className="inline-flex items-center gap-2 bg-white/80 border border-lavender-200 text-lavender-600 rounded-full px-4 py-1.5 text-xs font-semibold mb-7 shadow-soft">
          <Sparkles className="h-3.5 w-3.5" />
          34 módulos · 221 estudos · Alinhado IASD
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-slate-700 mb-5 leading-tight">
          Sua jornada de
          <br />
          <span className="text-gradient">estudo bíblico</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto mb-9 leading-relaxed font-medium">
          Um currículo progressivo — do iniciante ao avançado — construído sobre a doutrina adventista e a Palavra de Deus.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/blocos"
            className="inline-flex items-center gap-2 bg-gradient-lavender text-white px-7 py-3.5 rounded-2xl font-semibold shadow-medium hover:shadow-glow hover:brightness-105 transition-all duration-300 active:scale-[0.97] text-sm"
          >
            Explorar blocos
            <ArrowRight className="h-4 w-4" />
          </Link>
          {!user && (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 glass-strong border border-lavender-200 text-lavender-700 px-7 py-3.5 rounded-2xl font-semibold shadow-soft hover:shadow-medium transition-all duration-300 text-sm"
            >
              Criar conta gratuita
            </Link>
          )}
        </div>
      </section>

      {/* ── Continue estudando (logado) ───────────────────────────────────── */}
      {user && !loading && (
        <section className="mb-10 animate-slide-up delay-100">
          <div className="glass-strong rounded-3xl shadow-card p-6 border border-lavender-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div>
                <p className="text-xs font-semibold text-lavender-600 uppercase tracking-widest mb-1">
                  Seu progresso
                </p>
                <h2 className="font-serif text-xl font-semibold text-slate-700">
                  Bem-vindo, {user.displayName?.split(' ')[0]} 👋
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gradient">{stats?.totalCompleted ?? 0}</p>
                  <p className="text-xs font-medium text-slate-600">concluídos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-600">{globalPct}%</p>
                  <p className="text-xs font-medium text-slate-600">do currículo</p>
                </div>
              </div>
            </div>
            <ProgressBar value={globalPct} showPercent={false} variant="warm" size="md" />

            {/* CTA continuar */}
            {lastStudied && (
              <Link
                to={`/estudo/${lastStudied.id}`}
                className="mt-4 flex items-center justify-between p-4 bg-gradient-to-r from-lavender-50 to-blush-50 border border-lavender-100 rounded-2xl hover:border-lavender-300 hover:shadow-soft transition-all duration-200 group animate-pulse-soft"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-lavender rounded-xl flex items-center justify-center shadow-soft">
                    <BookOpen className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-lavender-600 font-semibold">Continuar onde parou</p>
                    <p className="text-sm font-semibold text-slate-700 line-clamp-1">{lastStudied.title}</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-lavender-400 group-hover:text-lavender-600 group-hover:translate-x-1 transition-all" />
              </Link>
            )}
          </div>
        </section>
      )}

      {/* ── Blocks grid ──────────────────────────────────────────────────── */}
      <section className="animate-slide-up delay-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-semibold text-slate-700">Blocos de estudo</h2>
          <Link to="/blocos" className="text-sm text-lavender-500 hover:text-lavender-700 font-medium flex items-center gap-1 transition-colors">
            Ver todos <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BLOCKS.map((block, i) => {
            const pct = blockCompletionRate(block.id, block.studyCount)
            const cfg = blockConfig[block.id] ?? blockConfig['A']
            return (
              <Link
                key={block.id}
                to={`/bloco/${block.id}`}
                className={`
                  relative bg-gradient-to-br ${cfg.gradient}
                  ring-1 ${cfg.ring}
                  rounded-3xl p-5 shadow-card
                  hover:shadow-card-hover hover:-translate-y-0.5
                  transition-all duration-300
                  animate-slide-up
                `}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Block letter watermark */}
                <span className={`absolute top-3 right-4 font-serif text-5xl font-black ${cfg.text} opacity-10 select-none leading-none`}>
                  {block.id}
                </span>

                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-white/70 ${cfg.text} shadow-soft`}>
                    Bloco {block.id}
                  </span>
                  <LevelBadge level={block.level} />
                </div>

                <h3 className="font-serif font-semibold text-slate-700 mb-1 leading-snug">{block.name}</h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">{block.description}</p>

                <div className="space-y-1.5">
                  <ProgressBar value={pct} size="xs" showPercent={false} />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">{block.moduleCount} módulos · {block.studyCount} estudos</span>
                    <span className={`text-xs font-semibold ${cfg.text}`}>{Math.round(pct)}%</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── CTA visitante ────────────────────────────────────────────────── */}
      {!user && (
        <section className="mt-16 animate-slide-up delay-300">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-lavender-600 via-lavender-500 to-blush-400 p-8 sm:p-12 text-center shadow-medium">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 -translate-x-1/3 translate-y-1/3" />
            </div>
            <div className="relative">
              <CheckCircle className="h-10 w-10 text-white/80 mx-auto mb-4" />
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
                Salve seu progresso gratuitamente
              </h2>
              <p className="text-white/90 mb-7 max-w-md mx-auto text-sm leading-relaxed font-medium">
                Crie uma conta e nunca perca onde você está. Seu progresso fica salvo na nuvem e sincronizado em qualquer dispositivo.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 bg-white text-lavender-700 px-7 py-3.5 rounded-2xl font-semibold hover:bg-lavender-50 transition-all duration-200 shadow-medium active:scale-[0.97] text-sm"
              >
                Criar conta gratuita
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </Layout>
  )
}
