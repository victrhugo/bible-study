import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { BLOCKS } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'
import { ProgressBar } from '../components/ui/ProgressBar'
import { LevelBadge } from '../components/ui/Badge'
import { Layout } from '../components/layout/Layout'

export function BlockList() {
  const { blockCompletionRate } = useProgress()

  return (
    <Layout>
      <nav className="mb-6 flex items-center gap-2 text-sm text-ink-400">
        <Link to="/" className="hover:text-lavender-700">Início</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-semibold text-lavender-700">Blocos</span>
      </nav>

      <section className="border-b border-blush-200/70 pb-8">
        <p className="eyebrow mb-3">Estrutura do currículo</p>
        <h1 className="font-serif text-5xl text-lavender-800 sm:text-6xl">Blocos de estudo</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-500">
          O currículo foi organizado como uma biblioteca progressiva. Cada bloco reúne temas com unidade doutrinária e pedagógica, respeitando a maturidade do estudo.
        </p>
      </section>

      <section className="space-y-4 py-8">
        {BLOCKS.map((block, index) => {
          const pct = blockCompletionRate(block.id, block.studyCount)

          return (
            <Link
              key={block.id}
              to={`/bloco/${block.id}`}
              className="surface animate-slide-up block p-6 sm:p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="grid gap-5 sm:grid-cols-[88px_1fr_auto] sm:items-start">
                <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-blush-200 bg-paper-50">
                  <span className="font-serif text-5xl leading-none text-lavender-700">{block.id}</span>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <LevelBadge level={block.level} />
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                      {block.moduleCount} módulos • {block.studyCount} estudos
                    </span>
                  </div>
                  <h2 className="mt-3 font-serif text-3xl text-lavender-800">{block.name}</h2>
                  <p className="mt-3 max-w-3xl text-base leading-8 text-ink-500">{block.description}</p>
                  <div className="mt-5 max-w-xl">
                    <ProgressBar value={pct} size="sm" variant="warm" label="Leitura concluída" />
                  </div>
                </div>

                <div className="hidden items-center gap-2 text-sm font-semibold text-lavender-600 sm:flex">
                  Abrir
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          )
        })}
      </section>
    </Layout>
  )
}
