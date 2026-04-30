import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { getBlock, getModulesByBlock } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'
import { ProgressBar, CircularProgress } from '../components/ui/ProgressBar'
import { LevelBadge } from '../components/ui/Badge'
import { Layout } from '../components/layout/Layout'

export function BlockDetail() {
  const { blockId }  = useParams<{ blockId: string }>()
  const block        = getBlock(blockId ?? '')
  const modules      = getModulesByBlock(blockId ?? '')
  const { moduleCompletionRate } = useProgress()

  if (!block) {
    return (
      <Layout>
        <p className="text-center text-slate-400 py-24">Bloco não encontrado.</p>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 animate-fade-in">
        <Link to="/" className="hover:text-lavender-600 transition-colors">Início</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/blocos" className="hover:text-lavender-600 transition-colors">Blocos</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-slate-600 font-medium">Bloco {block.id}</span>
      </nav>

      {/* Header */}
      <div className="mb-8 animate-slide-up">
        <Link
          to="/blocos"
          className="inline-flex items-center gap-1.5 text-xs text-lavender-500 hover:text-lavender-700 font-semibold uppercase tracking-wide mb-4 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Todos os blocos
        </Link>

        <div className="glass-strong rounded-3xl shadow-card p-7">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5">
            {/* Big letter */}
            <span className="font-serif text-7xl font-black text-gradient opacity-30 select-none leading-none flex-shrink-0">
              {block.id}
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <LevelBadge level={block.level} />
                <span className="text-sm text-slate-500">{block.moduleCount} módulos · {block.studyCount} estudos</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-700 mb-2">{block.name}</h1>
              <p className="text-slate-600 text-sm leading-relaxed max-w-lg">{block.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-3">
        {modules.map((mod, idx) => {
          const pct = moduleCompletionRate(mod.id, mod.studyCount)
          return (
            <Link
              key={mod.id}
              to={`/modulo/${mod.id}`}
              className="group flex items-center gap-4 glass-strong rounded-2xl p-5 shadow-soft hover:shadow-card hover:-translate-y-0.5 border border-white/80 hover:border-lavender-100 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              {/* Number circle */}
              <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-br from-lavender-100 to-lavender-50 border border-lavender-200 flex items-center justify-center text-sm font-bold text-lavender-600 group-hover:from-lavender-200 group-hover:to-lavender-100 transition-all duration-300">
                {idx + 1}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <h3 className="font-semibold text-slate-700 text-sm group-hover:text-lavender-700 transition-colors">
                    {mod.name}
                  </h3>
                  <span className="text-sm text-slate-500 flex-shrink-0">{mod.studyCount} est.</span>
                </div>
                <p className="text-sm text-slate-600 mb-3 line-clamp-2 leading-relaxed">{mod.objective}</p>
                <ProgressBar value={pct} size="xs" showPercent={false} />
              </div>

              <CircularProgress value={pct} size={40} />
            </Link>
          )
        })}
      </div>
    </Layout>
  )
}
