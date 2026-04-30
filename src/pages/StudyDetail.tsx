import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ChevronRight, BookOpen, Lightbulb,
  Link2, Heart, HelpCircle, Star, ChevronDown, ChevronUp, Lock,
} from 'lucide-react'
import { getStudy, MODULES, getBlock, getStudiesByModule } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/Button'
import { CompletedBadge } from '../components/ui/Badge'
import { Layout } from '../components/layout/Layout'
import type { StudyContent } from '../types'

// ─── Collapsible section ──────────────────────────────────────────────────────

const sectionConfig = {
  '1. Contexto':            { icon: BookOpen,    color: 'text-lavender-500', bg: 'bg-lavender-50',  border: 'border-lavender-100' },
  '2. Narrativa Bíblica':   { icon: BookOpen,    color: 'text-sage-500',     bg: 'bg-sage-50',      border: 'border-sage-100'     },
  '3. Versículos-Chave':    { icon: Star,        color: 'text-gold-500',     bg: 'bg-cream-200',    border: 'border-gold-300/40'  },
  '4. Explicação':          { icon: Lightbulb,   color: 'text-blush-500',    bg: 'bg-blush-50',     border: 'border-blush-100'    },
  '5. Conexões Bíblicas':   { icon: Link2,       color: 'text-sage-500',     bg: 'bg-sage-50',      border: 'border-sage-100'     },
  '6. Aplicação':           { icon: Heart,       color: 'text-blush-500',    bg: 'bg-blush-50',     border: 'border-blush-100'    },
  '7. Reflexão':            { icon: HelpCircle,  color: 'text-lavender-500', bg: 'bg-lavender-50',  border: 'border-lavender-100' },
  '8. Espírito de Profecia':{ icon: Star,        color: 'text-gold-500',     bg: 'bg-cream-200',    border: 'border-gold-300/40'  },
}

function Section({
  title, children, defaultOpen = true,
}: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const cfg = sectionConfig[title as keyof typeof sectionConfig] ?? { icon: BookOpen, color: 'text-lavender-500', bg: 'bg-lavender-50', border: 'border-lavender-100' }
  const Icon = cfg.icon

  return (
    <div className={`glass-strong rounded-2xl shadow-soft border ${open ? 'border-white/80' : 'border-white/60'} overflow-hidden transition-all duration-300`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-5 py-4 hover:${cfg.bg} transition-all duration-200`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-7 h-7 rounded-xl ${cfg.bg} border ${cfg.border} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`h-3.5 w-3.5 ${cfg.color}`} />
          </div>
          <span className="font-semibold text-slate-700 text-sm">{title}</span>
        </div>
        {open
          ? <ChevronUp className="h-4 w-4 text-slate-400" />
          : <ChevronDown className="h-4 w-4 text-slate-400" />}
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  )
}

// ─── Content renderer ─────────────────────────────────────────────────────────

function StudyContentView({ content }: { content: StudyContent }) {
  return (
    <div className="space-y-3">
      <Section title="1. Contexto">
        <p className="text-sm text-slate-600 leading-relaxed">{content.context}</p>
      </Section>

      <Section title="2. Narrativa Bíblica">
        {content.narrative.split('\n\n').map((p, i) => (
          <p key={i} className="text-sm text-slate-600 leading-relaxed mb-3 last:mb-0">{p}</p>
        ))}
      </Section>

      <Section title="3. Versículos-Chave">
        <div className="space-y-3">
          {content.keyVerses.map(v => (
            <div key={v.reference} className="verse-block">
              <p className="text-xs font-bold text-lavender-600 mb-1.5">{v.reference}</p>
              <p className="text-sm text-slate-600 italic leading-relaxed">"{v.text}"</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="4. Explicação">
        {content.explanation.split('\n\n').map((p, i) => (
          <p key={i} className="text-sm text-slate-600 leading-relaxed mb-3 last:mb-0">{p}</p>
        ))}
      </Section>

      <Section title="5. Conexões Bíblicas" defaultOpen={false}>
        <ul className="space-y-2.5">
          {content.connections.map((c, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-sage-100 border border-sage-200 flex items-center justify-center mt-0.5">
                <span className="text-sage-500 text-[10px] font-bold">→</span>
              </span>
              <span className="leading-relaxed">{c}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="6. Aplicação">
        {content.application.split('\n\n').map((p, i) => (
          <p key={i} className="text-sm text-slate-600 leading-relaxed mb-3 last:mb-0">{p}</p>
        ))}
      </Section>

      <Section title="7. Reflexão">
        <div className="space-y-3">
          {content.reflection.map((q, i) => (
            <div key={i} className="bg-gradient-to-br from-lavender-50 to-blush-50 border border-lavender-100 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-gradient-lavender rounded-full flex items-center justify-center text-white text-xs font-bold shadow-soft">
                  {i + 1}
                </span>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">{q}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {content.spiritOfProphecy && (
        <Section title="8. Espírito de Profecia" defaultOpen={false}>
          <div className="bg-gradient-to-br from-cream-200 to-cream-100 border border-gold-300/30 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-gold-500" />
              <span className="text-xs font-bold text-gold-600 uppercase tracking-wide">Ellen G. White</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed italic">{content.spiritOfProphecy}</p>
          </div>
        </Section>
      )}
    </div>
  )
}

// ─── Notes panel ─────────────────────────────────────────────────────────────

function NotesPanel({ studyId, moduleId, blockId }: { studyId: string; moduleId: string; blockId: string }) {
  const { user }   = useAuth()
  const { progress, updateNotes } = useProgress()
  const [notes, setNotes]  = useState(progress[studyId]?.notes ?? '')
  const [saved, setSaved]  = useState(false)

  const save = async () => {
    await updateNotes(studyId, moduleId, blockId, notes)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (!user) return null

  return (
    <div className="glass-strong rounded-2xl shadow-soft p-5">
      <h3 className="font-semibold text-slate-700 text-sm mb-3 flex items-center gap-2">
        <span className="w-5 h-5 rounded-xl bg-lavender-50 border border-lavender-100 flex items-center justify-center">
          <svg className="w-3 h-3 text-lavender-500" fill="none" viewBox="0 0 12 12">
            <path d="M2 2h8M2 5h6M2 8h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
        Minhas anotações
      </h3>
      <textarea
        value={notes}
        onChange={e => setNotes(e.target.value)}
        rows={4}
        className="w-full border border-lavender-100 bg-lavender-50/50 rounded-xl p-3 text-sm text-slate-600 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-lavender-300 focus:border-transparent resize-none transition-all leading-relaxed"
        placeholder="Escreva suas reflexões, insights ou perguntas..."
      />
      <div className="flex justify-end mt-2">
        <Button onClick={save} variant="secondary" size="sm">
          {saved ? '✓ Salvo' : 'Salvar anotações'}
        </Button>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function StudyDetail() {
  const { studyId }  = useParams<{ studyId: string }>()
  const { user }     = useAuth()
  const navigate     = useNavigate()
  const study        = getStudy(studyId ?? '')
  const mod          = MODULES.find(m => m.id === study?.moduleId)
  const block        = getBlock(study?.blockId ?? '')
  const moduleStudies = getStudiesByModule(study?.moduleId ?? '')
  const { isCompleted, toggleComplete } = useProgress()
  const [toggling, setToggling]         = useState(false)

  if (!study || !mod || !block) {
    return (
      <Layout>
        <p className="text-center text-slate-500 py-24">Estudo não encontrado.</p>
      </Layout>
    )
  }

  const done    = isCompleted(study.id)
  const currIdx = moduleStudies.findIndex(s => s.id === study.id)
  const prev    = moduleStudies[currIdx - 1]
  const next    = moduleStudies[currIdx + 1]

  const handleToggle = async () => {
    if (!user) { navigate('/login'); return }
    setToggling(true)
    await toggleComplete(study.id, study.moduleId, study.blockId)
    setToggling(false)
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap animate-fade-in">
        <Link to="/" className="hover:text-lavender-600 transition-colors">Início</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to={`/bloco/${block.id}`} className="hover:text-lavender-600 transition-colors">Bloco {block.id}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to={`/modulo/${mod.id}`} className="hover:text-lavender-600 transition-colors">{mod.name}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-slate-600 font-medium">{study.id}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* ── Main content ─────────────────────────────────────────────── */}
        <div className="lg:col-span-3 space-y-4 animate-slide-up">

          {/* Study header card */}
          <div className={`
            glass-strong rounded-3xl shadow-card p-6
            ${done ? 'border border-sage-200 bg-sage-50/30' : 'border border-white/80'}
          `}>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-xs font-mono font-bold text-lavender-400 bg-lavender-50 px-2.5 py-0.5 rounded-full border border-lavender-100">
                    {study.id}
                  </span>
                  {done && <CompletedBadge />}
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-700 mb-2 leading-tight">
                  {study.title}
                </h1>
                <p className="text-slate-600 text-sm leading-relaxed">{study.description}</p>
              </div>

              <Button
                onClick={handleToggle}
                loading={toggling}
                variant={done ? 'secondary' : 'primary'}
                size="md"
                className="flex-shrink-0 sm:mt-1"
              >
                {!user ? (
                  <><Lock className="h-4 w-4" /> Entrar para marcar</>
                ) : done ? (
                  'Desmarcar'
                ) : (
                  'Marcar concluído'
                )}
              </Button>
            </div>

            {/* References */}
            {study.references.length > 0 && (
              <div className="mt-5 pt-4 border-t border-lavender-100/60">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Referências principais</p>
                <div className="flex flex-wrap gap-2">
                  {study.references.map(r => (
                    <span key={r.full} className="text-xs bg-gradient-to-r from-lavender-50 to-blush-50 text-lavender-700 px-3 py-1 rounded-full border border-lavender-100 font-medium">
                      {r.full}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Content sections */}
          {study.content ? (
            <StudyContentView content={study.content} />
          ) : (
            <div className="glass-strong rounded-2xl border border-dashed border-lavender-200 p-12 text-center">
              <BookOpen className="h-10 w-10 text-lavender-200 mx-auto mb-3" />
              <p className="font-semibold text-slate-600">Conteúdo em desenvolvimento</p>
              <p className="text-sm text-slate-500 mt-1">Este estudo terá seu conteúdo completo em breve.</p>
            </div>
          )}

          {/* Notes */}
          <NotesPanel studyId={study.id} moduleId={study.moduleId} blockId={study.blockId} />

          {/* Prev / Next nav */}
          <div className="flex items-center justify-between gap-4 pt-2">
            {prev ? (
              <Link
                to={`/estudo/${prev.id}`}
                className="flex items-center gap-2 text-sm text-lavender-500 hover:text-lavender-700 font-semibold transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                <span className="line-clamp-1 max-w-[160px]">{prev.title}</span>
              </Link>
            ) : <div />}
            {next && (
              <Link
                to={`/estudo/${next.id}`}
                className="flex items-center gap-2 text-sm text-lavender-500 hover:text-lavender-700 font-semibold transition-colors group ml-auto"
              >
                <span className="line-clamp-1 max-w-[160px]">{next.title}</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            )}
          </div>
        </div>

        {/* ── Sidebar ──────────────────────────────────────────────────── */}
        <aside className="lg:col-span-1 animate-slide-up delay-200">
          <div className="glass-strong rounded-2xl shadow-soft p-4 sticky top-24">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 px-1">
              {mod.name}
            </p>
            <ul className="space-y-0.5">
              {moduleStudies.map(s => {
                const sDone     = isCompleted(s.id)
                const isCurrent = s.id === study.id
                return (
                  <li key={s.id}>
                    <Link
                      to={`/estudo/${s.id}`}
                      className={`
                        flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs transition-all duration-200
                        ${isCurrent
                          ? 'bg-gradient-to-r from-lavender-100 to-blush-50 text-lavender-700 font-semibold border border-lavender-100'
                          : 'text-slate-500 hover:bg-lavender-50 hover:text-lavender-600'
                        }
                      `}
                    >
                      <div className={`
                        flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center transition-all
                        ${sDone ? 'bg-sage-400' : isCurrent ? 'bg-lavender-400' : 'bg-slate-200'}
                      `}>
                        {sDone && (
                          <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                            <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        )}
                      </div>
                      <span className="line-clamp-2 leading-snug">{s.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>
      </div>
    </Layout>
  )
}
