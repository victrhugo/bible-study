import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, CheckCircle2, ChevronRight } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../hooks/useProgress'
import { BLOCKS, STUDIES } from '../data/curriculum'
import { ProgressBar } from '../components/ui/ProgressBar'
import { LevelBadge } from '../components/ui/Badge'
import { Layout } from '../components/layout/Layout'
import { SDALogo } from '../components/ui/SDALogo'

const accentStyles: Record<string, string> = {
  A: 'border-lavender-200 bg-lavender-50/60',
  B: 'border-sage-200 bg-sage-50/60',
  C: 'border-gold-300/70 bg-cream-50/80',
  D: 'border-blush-200 bg-paper-50',
  E: 'border-lavender-300 bg-paper-50',
  F: 'border-gold-300/70 bg-cream-50/70',
}

export function Home() {
  const { user } = useAuth()
  const { stats, blockCompletionRate, progress, loading } = useProgress()

  const lastStudied = user
    ? Object.values(progress)
        .filter(p => !p.completed)
        .map(p => STUDIES.find(s => s.id === p.studyId))
        .filter(Boolean)[0]
    : null

  const globalPct = stats ? Math.round((stats.totalCompleted / stats.totalStudies) * 100) : 0

  return (
    <Layout>
      <section className="grid gap-8 border-b border-blush-200/70 pb-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <div className="animate-slide-up">
          <SDALogo size={56} color="navy" className="mb-6" />
          <p className="eyebrow mb-4">Estudo bíblico com profundidade</p>
          <h1 className="text-display max-w-3xl text-5xl leading-none sm:text-6xl lg:text-[4.5rem]">
            Uma biblioteca digital para leitura séria das Escrituras.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-500">
            Organize sua jornada por blocos temáticos, avance no seu ritmo e leia cada estudo em uma experiência pensada para clareza, reverência e permanência.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/blocos"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-lavender-700 bg-lavender-700 px-6 py-3 text-sm font-semibold text-paper-50 shadow-soft transition-colors hover:bg-lavender-800"
            >
              Explorar o currículo
              <ArrowRight className="h-4 w-4" />
            </Link>
            {!user && (
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-blush-200 bg-white px-6 py-3 text-sm font-semibold text-lavender-700 shadow-soft transition-colors hover:bg-paper-50"
              >
                Criar conta
              </Link>
            )}
          </div>
        </div>

        <aside className="surface-muted animate-slide-up p-6 sm:p-7">
          <p className="eyebrow mb-4">Acervo</p>
          <div className="space-y-5">
            <div>
              <p className="text-4xl font-serif text-lavender-800">221</p>
              <p className="mt-1 text-sm leading-6 text-ink-400">estudos distribuídos em seis grandes blocos temáticos</p>
            </div>
            <div className="section-rule" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-2xl font-serif text-lavender-800">34</p>
                <p className="text-ink-400">módulos</p>
              </div>
              <div>
                <p className="text-2xl font-serif text-lavender-800">6</p>
                <p className="text-ink-400">blocos</p>
              </div>
            </div>
            <p className="text-sm leading-7 text-ink-500">
              A trilha cobre fundamentos da fé, história bíblica, ensinos de Jesus, vida cristã, profecias e Espírito de Profecia.
            </p>
          </div>
        </aside>
      </section>

      {user && !loading && (
        <section className="grid gap-6 py-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="paper-panel animate-slide-up p-6 sm:p-8">
            <p className="eyebrow mb-3">Sua jornada</p>
            <h2 className="font-serif text-3xl text-lavender-800">
              Bem-vindo, {user.displayName?.split(' ')[0]}.
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-ink-500">
              Seu avanço fica salvo para que o estudo continue com constância, sem pressa e sem perder o fio da leitura.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="annotation">
                <p className="text-3xl font-serif text-lavender-800">{stats?.totalCompleted ?? 0}</p>
                <p className="mt-1 text-sm text-ink-400">estudos concluídos</p>
              </div>
              <div className="annotation">
                <p className="text-3xl font-serif text-lavender-800">{globalPct}%</p>
                <p className="mt-1 text-sm text-ink-400">do currículo lido</p>
              </div>
              <div className="annotation">
                <p className="text-3xl font-serif text-lavender-800">{stats?.lastStudyDate ? 'Sim' : 'Ainda não'}</p>
                <p className="mt-1 text-sm text-ink-400">registro recente</p>
              </div>
            </div>

            <div className="mt-8">
              <ProgressBar
                value={globalPct}
                label="Percurso total"
                variant="warm"
              />
            </div>
          </div>

          <div className="surface animate-slide-up p-6 sm:p-8">
            <p className="eyebrow mb-3">Retomar leitura</p>
            {lastStudied ? (
              <>
                <h3 className="font-serif text-2xl text-lavender-800">{lastStudied.title}</h3>
                <p className="mt-3 text-base leading-7 text-ink-500">{lastStudied.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {lastStudied.references.slice(0, 3).map(reference => (
                    <span key={reference.full} className="meta-pill">
                      {reference.full}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/estudo/${lastStudied.id}`}
                  className="library-link mt-8"
                >
                  Continuar estudo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </>
            ) : (
              <div className="rounded-3xl border border-dashed border-blush-200 bg-paper-50 px-6 py-10 text-center">
                <BookOpen className="mx-auto h-8 w-8 text-lavender-300" />
                <p className="mt-4 font-semibold text-lavender-800">Nenhum estudo iniciado ainda.</p>
                <p className="mt-2 text-sm leading-7 text-ink-400">
                  Escolha um bloco para começar com calma e registrar sua jornada.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="py-4">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">Currículo</p>
            <h2 className="font-serif text-3xl text-lavender-800">Blocos de estudo</h2>
          </div>
          <Link to="/blocos" className="library-link">
            Ver todos
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {BLOCKS.map((block, index) => {
            const pct = blockCompletionRate(block.id, block.studyCount)
            return (
              <Link
                key={block.id}
                to={`/bloco/${block.id}`}
                className={`surface animate-slide-up p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover ${accentStyles[block.id] ?? accentStyles.A}`}
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-4xl text-lavender-700">{block.id}</span>
                      <LevelBadge level={block.level} />
                    </div>
                    <h3 className="mt-3 font-serif text-2xl text-lavender-800">{block.name}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-ink-500">{block.description}</p>
                  </div>
                  <ArrowRight className="mt-2 h-5 w-5 flex-shrink-0 text-lavender-400" />
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
                  <ProgressBar value={pct} size="sm" showPercent={false} variant="warm" />
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">
                    {block.moduleCount} módulos • {block.studyCount} estudos
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {!user && (
        <section className="pt-12">
          <div className="surface-ink animate-slide-up p-8 sm:p-10">
            <div className="max-w-3xl">
              <CheckCircle2 className="h-8 w-8 text-gold-300" />
              <h2 className="mt-4 font-serif text-3xl text-paper-50 sm:text-4xl">
                Guarde o progresso da sua leitura.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-paper-100/85">
                Com uma conta gratuita, suas anotações, estudos concluídos e retomadas ficam disponíveis com continuidade e discrição.
              </p>
              <Link
                to="/login"
                className="mt-7 inline-flex items-center gap-2 rounded-2xl border border-gold-300 bg-gold-500 px-6 py-3 text-sm font-semibold text-lavender-900 transition-colors hover:bg-gold-400"
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
