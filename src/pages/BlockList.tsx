import { Link } from 'react-router-dom'
import { ChevronRight, ArrowRight } from 'lucide-react'
import { BLOCKS } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'
import { ProgressBar } from '../components/ui/ProgressBar'
import { LevelBadge } from '../components/ui/Badge'
import { Layout } from '../components/layout/Layout'

const blockConfig: Record<string, { gradient: string; border: string; letter: string; bar: 'lavender' | 'sage' | 'blush' | 'warm' }> = {
  A: { gradient: 'from-lavender-50 to-white',  border: 'border-lavender-100', letter: 'text-lavender-200', bar: 'lavender' },
  B: { gradient: 'from-sage-50 to-white',       border: 'border-sage-100',     letter: 'text-sage-200',     bar: 'sage'     },
  C: { gradient: 'from-blush-50 to-white',      border: 'border-blush-100',    letter: 'text-blush-200',    bar: 'blush'    },
  D: { gradient: 'from-cream-200 to-white',     border: 'border-cream-400',    letter: 'text-gold-300',     bar: 'warm'     },
  E: { gradient: 'from-lavender-100 to-white',  border: 'border-lavender-200', letter: 'text-lavender-300', bar: 'warm'     },
  F: { gradient: 'from-blush-100 to-white',     border: 'border-blush-200',    letter: 'text-blush-300',    bar: 'blush'    },
}

export function BlockList() {
  const { blockCompletionRate } = useProgress()

  return (
    <Layout>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-lavender-600 transition-colors">Início</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-slate-600 font-medium">Blocos</span>
      </nav>

      <div className="mb-8 animate-slide-up">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-700 mb-2">
          Blocos de estudo
        </h1>
        <p className="text-slate-600 text-base leading-relaxed font-medium">
          Seis blocos temáticos, do nível iniciante ao avançado. Estude no seu ritmo — seu progresso é salvo automaticamente.
        </p>
      </div>

      <div className="space-y-4">
        {BLOCKS.map((block, i) => {
          const pct = blockCompletionRate(block.id, block.studyCount)
          const cfg = blockConfig[block.id] ?? blockConfig['A']

          return (
            <Link
              key={block.id}
              to={`/bloco/${block.id}`}
              className={`
                relative group flex items-center gap-5 sm:gap-8
                bg-gradient-to-r ${cfg.gradient}
                border ${cfg.border}
                rounded-3xl p-5 sm:p-6
                shadow-card hover:shadow-card-hover hover:-translate-y-0.5
                transition-all duration-300
                animate-slide-up
              `}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Large letter */}
              <span className={`hidden sm:block font-serif text-7xl font-black ${cfg.letter} select-none leading-none flex-shrink-0 w-16 text-center`}>
                {block.id}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                  <span className="text-xs font-bold text-lavender-600 uppercase tracking-widest">
                    Bloco {block.id}
                  </span>
                  <LevelBadge level={block.level} />
                </div>
                <h2 className="font-serif text-lg sm:text-xl font-semibold text-slate-700 mb-1 leading-snug">
                  {block.name}
                </h2>
                <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed font-medium">
                  {block.description}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex-1 max-w-xs">
                    <ProgressBar value={pct} size="xs" showPercent={false} variant={cfg.bar} />
                  </div>
                  <span className="text-xs font-medium text-slate-500 flex-shrink-0">
                    {Math.round(pct)}% · {block.moduleCount} módulos · {block.studyCount} estudos
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/80 border border-lavender-100 flex items-center justify-center shadow-soft group-hover:bg-lavender-50 group-hover:border-lavender-200 group-hover:scale-110 transition-all duration-300">
                <ArrowRight className="h-4 w-4 text-lavender-400" />
              </div>
            </Link>
          )
        })}
      </div>
    </Layout>
  )
}
