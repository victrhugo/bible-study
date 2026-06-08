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
      {/* Hero Section - Simplified for less "template AI" feel */}
      <section className="pb-8 border-b border-blush-200/70">
        <div className="animate-slide-up">
          <SDALogo size={48} color="navy" className="mb-4" />
          <h1 className="text-3xl leading-relaxed sm:text-4xl text-lavender-800">
            Uma biblioteca para estudo bíblico profundo.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-ink-500">
            Leia blocos temáticos de forma organizada, acompanhe seu progresso e aprofunde sua compreensão das Escrituras em seu próprio ritmo.
          </p>

          {!user && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-lavender-700 bg-lavender-700 px-6 py-3 text-sm font-semibold text-paper-50 shadow-soft transition-colors hover:bg-lavender-800"
              >
                Começar agora
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/blocos"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-blush-200 bg-white px-6 py-3 text-sm font-semibold text-lavender-700 shadow-soft transition-colors hover:bg-paper-50"
              >
                Explorar sem conta
              </Link>
            </div>
          )}
        </div>
      </section>

      {user && !loading && (
        <>
          {/* Continue Reading Section - Prioritized */}
          <section className="py-10">
            <div className="mb-6">
              <h2 className="text-xl text-lavender-800 leading-relaxed">
                Continue de onde parou
              </h2>
              <p className="mt-2 text-sm text-ink-500">
                Seu progresso é salvo para que você possa manter o ritmo de leitura sem interrupções.
              </p>
            </div>

            {lastStudied ? (
              <Link
                to={`/estudo/${lastStudied.id}`}
                className="surface group block overflow-hidden rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:shadow-card-hover border border-transparent hover:border-lavender-200"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-lavender-700 mb-2">
                      Retomar leitura
                    </p>
                    <h3 className="text-2xl text-lavender-800 leading-relaxed">
                      {lastStudied.title}
                    </h3>
                  </div>
                  <ArrowRight className="h-5 w-5 mt-1 text-lavender-400 group-hover:translate-x-1 transition-transform" />
                </div>

                <p className="text-base leading-7 text-ink-500 mb-4">
                  {lastStudied.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {lastStudied.references.slice(0, 3).map(reference => (
                    <span key={reference.full} className="meta-pill">
                      {reference.full}
                    </span>
                  ))}
                </div>
              </Link>
            ) : (
              <div className="rounded-3xl border border-dashed border-blush-200 bg-paper-50 px-6 py-12 text-center">
                <BookOpen className="mx-auto h-8 w-8 text-lavender-300 mb-3" />
                <p className="font-semibold text-lavender-800">Nenhum estudo em progresso.</p>
                <p className="mt-2 text-sm leading-7 text-ink-400">
                  Escolha um tema na biblioteca para começar.
                </p>
              </div>
            )}
          </section>

          {/* Progress Summary Section */}
          <section className="py-10 border-t border-blush-200/70">
            <div className="mb-8">
              <h2 className="text-xl text-lavender-800 leading-relaxed">
                Sua jornada de estudo
              </h2>
              <p className="mt-2 text-sm text-ink-500">
                Acompanhe seu progresso ao longo do currículo.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3 mb-8">
              <div className="surface rounded-2xl p-6 text-center">
                <p className="text-4xl font-semibold text-lavender-800">
                  {stats?.totalCompleted ?? 0}
                </p>
                <p className="mt-2 text-sm text-ink-500">
                  {stats?.totalCompleted === 1 ? 'estudo concluído' : 'estudos concluídos'}
                </p>
              </div>
              <div className="surface rounded-2xl p-6 text-center">
                <p className="text-4xl font-semibold text-lavender-800">
                  {globalPct}%
                </p>
                <p className="mt-2 text-sm text-ink-500">
                  do currículo
                </p>
              </div>
              <div className="surface rounded-2xl p-6 text-center">
                <p className="text-3xl font-semibold text-lavender-800">
                  {Math.max(0, (stats?.totalStudies ?? 221) - (stats?.totalCompleted ?? 0))}
                </p>
                <p className="mt-2 text-sm text-ink-500">
                  ainda para explorar
                </p>
              </div>
            </div>

            <div>
              <ProgressBar
                value={globalPct}
                label="Sua leitura"
                variant="warm"
              />
            </div>
          </section>
        </>
      )}

      {/* Library Blocks Section */}
      <section className="py-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl text-lavender-800 leading-relaxed">
              Explore a biblioteca
            </h2>
            <p className="mt-2 text-sm text-ink-500 max-w-2xl">
              Seis temas estruturados para uma leitura profunda das Escrituras, desde fundamentos até aplicações práticas.
            </p>
          </div>
          {user && (
            <Link to="/blocos" className="library-link whitespace-nowrap">
              Ver todos
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
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
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-lg font-semibold text-lavender-700">Tema {block.id}</span>
                      <LevelBadge level={block.level} />
                    </div>
                    <h3 className="text-xl text-lavender-800 font-semibold leading-relaxed mb-2">
                      {block.name}
                    </h3>
                    <p className="text-sm leading-6 text-ink-500">{block.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 flex-shrink-0 text-lavender-400 mt-1" />
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
                  <ProgressBar value={pct} size="sm" showPercent={false} variant="warm" />
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">
                    {block.moduleCount} mod • {block.studyCount} est
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
