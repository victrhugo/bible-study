import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { getBlock, getModulesByBlock } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'
import { ProgressBar, CircularProgress } from '../components/ui/ProgressBar'
import { LevelBadge } from '../components/ui/Badge'
import { Layout } from '../components/layout/Layout'

export function BlockDetail() {
  const { blockId } = useParams<{ blockId: string }>()
  const block = getBlock(blockId ?? '')
  const modules = getModulesByBlock(blockId ?? '')
  const { moduleCompletionRate, blockCompletionRate } = useProgress()

  if (!block) {
    return (
      <Layout>
        <p className="py-24 text-center text-ink-400">Bloco não encontrado.</p>
      </Layout>
    )
  }

  const blockPct = blockCompletionRate(block.id, block.studyCount)

  return (
    <Layout>
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-ink-400">
        <Link to="/" className="hover:text-lavender-700">Início</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/blocos" className="hover:text-lavender-700">Blocos</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-semibold text-lavender-700">Bloco {block.id}</span>
      </nav>

      <section className="paper-panel animate-slide-up p-7 sm:p-9">
        <Link to="/blocos" className="library-link">
          <ArrowLeft className="h-4 w-4" />
          Voltar aos blocos
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_220px]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="meta-pill">Bloco {block.id}</span>
              <LevelBadge level={block.level} />
            </div>
            <h1 className="mt-4 font-serif text-5xl text-lavender-800 sm:text-6xl">{block.name}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-500">{block.description}</p>
          </div>

          <div className="surface-muted flex flex-col items-center justify-center p-6 text-center">
            <CircularProgress value={blockPct} size={90} />
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
              {block.moduleCount} módulos
            </p>
            <p className="mt-1 text-sm text-ink-500">{block.studyCount} estudos no bloco</p>
          </div>
        </div>
      </section>

      <section className="pt-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">Módulos</p>
            <h2 className="font-serif text-3xl text-lavender-800">Percurso interno</h2>
          </div>
        </div>

        <div className="space-y-4">
          {modules.map((mod, index) => {
            const pct = moduleCompletionRate(mod.id, mod.studyCount)
            return (
              <Link
                key={mod.id}
                to={`/modulo/${mod.id}`}
                className="surface animate-slide-up flex gap-4 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-blush-200 bg-paper-50 font-serif text-2xl text-lavender-700">
                  {index + 1}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">{mod.id}</p>
                      <h3 className="mt-1 font-serif text-2xl text-lavender-800">{mod.name}</h3>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">Estudos</p>
                      <p className="mt-1 text-sm text-ink-500">{mod.studyCount}</p>
                    </div>
                  </div>

                  <p className="mt-3 max-w-3xl text-base leading-8 text-ink-500">{mod.objective}</p>

                  <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
                    <ProgressBar value={pct} size="sm" variant="warm" label="Concluído" />
                    <CircularProgress value={pct} size={52} />
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
