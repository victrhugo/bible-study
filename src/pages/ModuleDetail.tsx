import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ChevronRight, BookOpen } from 'lucide-react'
import { MODULES, getBlock, getStudiesByModule } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'
import { ProgressBar, CircularProgress } from '../components/ui/ProgressBar'
import { CompletedBadge } from '../components/ui/Badge'
import { Layout } from '../components/layout/Layout'

export function ModuleDetail() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const mod     = MODULES.find(m => m.id === moduleId)
  const block   = getBlock(mod?.blockId ?? '')
  const studies = getStudiesByModule(moduleId ?? '')
  const { isCompleted, moduleCompletionRate } = useProgress()

  if (!mod || !block) {
    return (
      <Layout>
        <p className="text-center text-slate-500 py-24">Módulo não encontrado.</p>
      </Layout>
    )
  }

  const pct       = moduleCompletionRate(mod.id, mod.studyCount)
  const doneCount = studies.filter(s => isCompleted(s.id)).length

  return (
    <Layout>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap animate-fade-in">
        <Link to="/" className="hover:text-lavender-600 transition-colors">Início</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to={`/bloco/${block.id}`} className="hover:text-lavender-600 transition-colors">Bloco {block.id}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-slate-600 font-medium">{mod.id}</span>
      </nav>

      {/* Header card */}
      <div className="glass-strong rounded-3xl shadow-card p-6 sm:p-8 mb-6 animate-slide-up">
        <Link
          to={`/bloco/${block.id}`}
          className="inline-flex items-center gap-1.5 text-xs text-lavender-500 hover:text-lavender-700 font-semibold uppercase tracking-wide mb-4 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {block.name}
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex-1">
            <span className="text-xs font-mono font-bold text-lavender-400 bg-lavender-50 px-2.5 py-1 rounded-full border border-lavender-100 mb-2 inline-block">
              {mod.id}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-700 mb-2 mt-2">
              {mod.name}
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xl">{mod.objective}</p>
          </div>
          <div className="flex-shrink-0">
            <CircularProgress value={pct} size={72} />
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-lavender-100/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500">{doneCount} de {mod.studyCount} estudos concluídos</span>
            <span className="text-xs font-semibold text-lavender-600">{Math.round(pct)}%</span>
          </div>
          <ProgressBar value={pct} size="sm" showPercent={false} variant="warm" />
        </div>
      </div>

      {/* Studies list */}
      <div className="space-y-2.5">
        {studies.map((study, idx) => {
          const done = isCompleted(study.id)
          return (
            <Link
              key={study.id}
              to={`/estudo/${study.id}`}
              className={`
                group flex items-start gap-4 p-4 sm:p-5 rounded-2xl border transition-all duration-300
                animate-slide-up
                ${done
                  ? 'bg-sage-50/60 border-sage-200 hover:border-sage-300 hover:shadow-soft'
                  : 'glass-strong border-white/80 hover:border-lavender-200 hover:shadow-card'
                }
              `}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Check indicator */}
              <div className={`
                flex-shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                ${done
                  ? 'bg-sage-500 shadow-soft'
                  : 'border-2 border-lavender-200 group-hover:border-lavender-400'
                }
              `}>
                {done && (
                  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-mono text-slate-500">{study.id}</span>
                  {done && <CompletedBadge />}
                </div>
                <h3 className={`font-semibold text-sm leading-snug mb-1 transition-colors ${done ? 'text-sage-800' : 'text-slate-700 group-hover:text-lavender-700'}`}>
                  {idx + 1}. {study.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-2">{study.description}</p>
                {study.references.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <BookOpen className="h-3 w-3 text-slate-400" />
                    {study.references.slice(0, 3).map(r => (
                      <span key={r.full} className="text-xs text-lavender-400 bg-lavender-50 px-2 py-0.5 rounded-full border border-lavender-100">
                        {r.full}
                      </span>
                    ))}
                    {study.references.length > 3 && (
                      <span className="text-xs text-slate-500">+{study.references.length - 3}</span>
                    )}
                  </div>
                )}
              </div>

              <ChevronRight className={`h-4 w-4 flex-shrink-0 mt-1 transition-all duration-200 group-hover:translate-x-0.5 ${done ? 'text-sage-400' : 'text-lavender-300 group-hover:text-lavender-500'}`} />
            </Link>
          )
        })}
      </div>
    </Layout>
  )
}
