import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ChevronRight, BookOpen } from 'lucide-react'
import { MODULES, getBlock, getStudiesByModule } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'
import { ProgressBar, CircularProgress } from '../components/ui/ProgressBar'
import { CompletedBadge } from '../components/ui/Badge'
import { Layout } from '../components/layout/Layout'

export function ModuleDetail() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const mod = MODULES.find(m => m.id === moduleId)
  const block = getBlock(mod?.blockId ?? '')
  const studies = getStudiesByModule(moduleId ?? '')
  const { isCompleted, moduleCompletionRate } = useProgress()

  if (!mod || !block) {
    return (
      <Layout>
        <p className="py-24 text-center text-ink-400">Módulo não encontrado.</p>
      </Layout>
    )
  }

  const pct = moduleCompletionRate(mod.id, mod.studyCount)
  const doneCount = studies.filter(s => isCompleted(s.id)).length

  return (
    <Layout>
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-ink-400">
        <Link to="/" className="hover:text-lavender-700">Início</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to={`/bloco/${block.id}`} className="hover:text-lavender-700">Bloco {block.id}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-semibold text-lavender-700">{mod.id}</span>
      </nav>

      <section className="paper-panel animate-slide-up p-7 sm:p-9">
        <Link to={`/bloco/${block.id}`} className="library-link">
          <ArrowLeft className="h-4 w-4" />
          Voltar ao bloco
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_160px] lg:items-start">
          <div>
            <p className="eyebrow mb-3">{mod.id}</p>
            <h1 className="font-serif text-4xl text-lavender-800 sm:text-5xl">{mod.name}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-500">{mod.objective}</p>
          </div>

          <div className="surface-muted flex flex-col items-center justify-center p-5 text-center">
            <CircularProgress value={pct} size={78} />
            <p className="mt-4 text-sm text-ink-500">{doneCount} de {mod.studyCount} estudos</p>
          </div>
        </div>

        <div className="mt-8">
          <ProgressBar value={pct} variant="warm" label="Avanço no módulo" />
        </div>
      </section>

      <section className="pt-8">
        <div className="mb-5">
          <p className="eyebrow mb-2">Estudos</p>
          <h2 className="font-serif text-3xl text-lavender-800">Sequência de leitura</h2>
        </div>

        <div className="space-y-3">
          {studies.map((study, index) => {
            const done = isCompleted(study.id)

            return (
              <Link
                key={study.id}
                to={`/estudo/${study.id}`}
                className="surface animate-slide-up block p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
                style={{ animationDelay: `${index * 45}ms` }}
              >
                <div className="flex gap-4">
                  <div className={`mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border ${done ? 'border-sage-600 bg-sage-600 text-paper-50' : 'border-blush-200 bg-paper-50 text-ink-300'}`}>
                    {done ? (
                      <svg className="h-3.5 w-3.5" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <span className="text-[10px] font-semibold">{index + 1}</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">{study.id}</span>
                      {done && <CompletedBadge />}
                    </div>
                    <h3 className="mt-2 font-serif text-2xl text-lavender-800">{study.title}</h3>
                    <p className="mt-2 max-w-3xl text-base leading-8 text-ink-500">{study.description}</p>
                    {study.references.length > 0 && (
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <BookOpen className="h-4 w-4 text-lavender-400" />
                        {study.references.slice(0, 3).map(r => (
                          <span key={r.full} className="meta-pill">
                            {r.full}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </Layout>
  )
}
