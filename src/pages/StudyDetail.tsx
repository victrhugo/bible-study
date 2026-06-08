import { useEffect, useState, type ReactNode } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ChevronRight,
  BookOpen,
  Lightbulb,
  Link2,
  Heart,
  HelpCircle,
  Star,
  ChevronDown,
  ChevronUp,
  Lock,
} from 'lucide-react'
import { getStudy, MODULES, getBlock, getStudiesByModule } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/Button'
import { CompletedBadge } from '../components/ui/Badge'
import { Layout } from '../components/layout/Layout'
import type { StudyContent } from '../types'

const sectionConfig = {
  Contexto: { icon: BookOpen, accent: 'text-lavender-700' },
  'Narrativa bíblica': { icon: BookOpen, accent: 'text-lavender-700' },
  'Versículos-chave': { icon: Star, accent: 'text-gold-600' },
  Explicação: { icon: Lightbulb, accent: 'text-gold-600' },
  'Conexões bíblicas': { icon: Link2, accent: 'text-sage-700' },
  Aplicação: { icon: Heart, accent: 'text-sage-700' },
  Reflexão: { icon: HelpCircle, accent: 'text-lavender-700' },
  'Espírito de Profecia': { icon: Star, accent: 'text-gold-600' },
}

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: keyof typeof sectionConfig
  children: ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const Icon = sectionConfig[title].icon

  return (
    <section className="study-section">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blush-200 bg-paper-50">
            <Icon className={`h-4 w-4 ${sectionConfig[title].accent}`} />
          </div>
          <div>
            <p className="eyebrow mb-1">Seção de estudo</p>
            <h2 className="font-serif text-3xl text-lavender-800">{title}</h2>
          </div>
        </div>
        {open ? (
          <ChevronUp className="h-5 w-5 text-ink-300" />
        ) : (
          <ChevronDown className="h-5 w-5 text-ink-300" />
        )}
      </button>

      {open && <div className="mt-6">{children}</div>}
    </section>
  )
}

function ReadingParagraphs({ text }: { text: string }) {
  return (
    <div className="study-prose space-y-5">
      {text.split('\n\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  )
}

function StudyContentView({ content }: { content: StudyContent }) {
  return (
    <div className="space-y-4">
      <Section title="Contexto">
        <ReadingParagraphs text={content.context} />
      </Section>

      <Section title="Narrativa bíblica">
        <ReadingParagraphs text={content.narrative} />
      </Section>

      <Section title="Versículos-chave">
        <div className="space-y-4">
          {content.keyVerses.map(verse => (
            <div key={verse.reference} className="verse-block">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-600">{verse.reference}</p>
              <p className="mt-3 font-reading text-xl leading-8 text-lavender-800">
                “{verse.text}”
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Explicação">
        <ReadingParagraphs text={content.explanation} />
      </Section>

      <Section title="Conexões bíblicas" defaultOpen={false}>
        <ul className="space-y-3">
          {content.connections.map((connection, index) => (
            <li key={index} className="annotation flex items-start gap-3">
              <span className="mt-1 text-sm font-semibold text-sage-700">•</span>
              <p className="text-base leading-8 text-ink-500">{connection}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Aplicação">
        <ReadingParagraphs text={content.application} />
      </Section>

      <Section title="Reflexão">
        <div className="space-y-3">
          {content.reflection.map((question, index) => (
            <div key={index} className="annotation">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-lavender-500">
                Pergunta {index + 1}
              </p>
              <p className="font-reading text-lg leading-8 text-lavender-800">{question}</p>
            </div>
          ))}
        </div>
      </Section>

      {content.spiritOfProphecy && (
        <Section title="Espírito de Profecia" defaultOpen={false}>
          <div className="rounded-[1.75rem] border border-gold-300/70 bg-cream-50/75 p-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-gold-600">
              Ellen G. White
            </p>
            <p className="font-reading text-lg leading-8 text-lavender-800">
              {content.spiritOfProphecy}
            </p>
          </div>
        </Section>
      )}
    </div>
  )
}

function NotesPanel({
  studyId,
  moduleId,
  blockId,
}: {
  studyId: string
  moduleId: string
  blockId: string
}) {
  const { user } = useAuth()
  const { progress, updateNotes } = useProgress()
  const [notes, setNotes] = useState(progress[studyId]?.notes ?? '')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setNotes(progress[studyId]?.notes ?? '')
  }, [progress, studyId])

  const save = async () => {
    await updateNotes(studyId, moduleId, blockId, notes)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (!user) {
    return (
      <div className="surface-muted p-5">
        <p className="text-sm leading-7 text-ink-500">
          Entre para registrar anotações pessoais e manter sua leitura organizada.
        </p>
      </div>
    )
  }

  return (
    <div className="surface-muted p-5">
      <p className="eyebrow mb-2">Anotações</p>
      <h3 className="font-serif text-2xl text-lavender-800">Margens do leitor</h3>
      <textarea
        value={notes}
        onChange={e => setNotes(e.target.value)}
        rows={8}
        aria-label="Minhas anotações sobre este estudo"
        className="mt-4 w-full rounded-2xl border border-blush-200 bg-white px-4 py-4 text-sm leading-7 text-ink-600 placeholder:text-ink-300 focus:border-lavender-300 focus:ring-2 focus:ring-lavender-100"
        placeholder="Escreva reflexões, perguntas ou aplicações pessoais..."
      />
      <div className="mt-3 flex justify-end">
        <Button onClick={save} variant="secondary" size="sm">
          {saved ? 'Anotações salvas' : 'Salvar anotações'}
        </Button>
      </div>
    </div>
  )
}

export function StudyDetail() {
  const { studyId } = useParams<{ studyId: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  const study = getStudy(studyId ?? '')
  const mod = MODULES.find(m => m.id === study?.moduleId)
  const block = getBlock(study?.blockId ?? '')
  const moduleStudies = getStudiesByModule(study?.moduleId ?? '')
  const { isCompleted, toggleComplete } = useProgress()
  const [toggling, setToggling] = useState(false)

  if (!study || !mod || !block) {
    return (
      <Layout>
        <p className="py-24 text-center text-ink-400">Estudo não encontrado.</p>
      </Layout>
    )
  }

  const done = isCompleted(study.id)
  const currIdx = moduleStudies.findIndex(s => s.id === study.id)
  const prev = moduleStudies[currIdx - 1]
  const next = moduleStudies[currIdx + 1]

  const handleToggle = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    setToggling(true)
    await toggleComplete(study.id, study.moduleId, study.blockId)
    setToggling(false)
  }

  return (
    <Layout>
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-ink-400">
        <Link to="/" className="hover:text-lavender-700">Início</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to={`/bloco/${block.id}`} className="hover:text-lavender-700">Bloco {block.id}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to={`/modulo/${mod.id}`} className="hover:text-lavender-700">{mod.name}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-semibold text-lavender-700">{study.id}</span>
      </nav>

      <section className="reading-surface animate-slide-up p-7 sm:p-10">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="meta-pill">{study.id}</span>
            <span className="meta-pill">Bloco {block.id}</span>
            {done && <CompletedBadge />}
          </div>

          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-none text-lavender-800 sm:text-6xl">
            {study.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-500">{study.description}</p>

          {study.references.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-2">
              {study.references.map(reference => (
                <span key={reference.full} className="meta-pill">
                  {reference.full}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="pt-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <div className="min-w-0">
            {study.content ? (
              <StudyContentView content={study.content} />
            ) : (
              <div className="study-section text-center">
                <BookOpen className="mx-auto h-10 w-10 text-lavender-300" />
                <h2 className="mt-4 font-serif text-3xl text-lavender-800">Conteúdo em desenvolvimento</h2>
                <p className="mt-3 text-base leading-8 text-ink-500">
                  Este estudo ainda será ampliado com contexto, explicação, conexões e aplicações.
                </p>
              </div>
            )}

            <div className="flex items-center justify-between gap-6 pt-8">
              {prev ? (
                <Link to={`/estudo/${prev.id}`} className="library-link">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="line-clamp-1 max-w-[220px]">{prev.title}</span>
                </Link>
              ) : (
                <div />
              )}

              {next && (
                <Link to={`/estudo/${next.id}`} className="library-link ml-auto">
                  <span className="line-clamp-1 max-w-[220px]">{next.title}</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="surface-muted p-5">
              <p className="eyebrow mb-2">Ação</p>
              <h2 className="font-serif text-2xl text-lavender-800">Marcar leitura</h2>
              <p className="mt-3 text-sm leading-7 text-ink-500">
                Registre seu avanço ao concluir o estudo.
              </p>
              <Button
                onClick={handleToggle}
                loading={toggling}
                variant={done ? 'secondary' : 'primary'}
                size="lg"
                className="mt-5 w-full"
              >
                {!user ? (
                  <>
                    <Lock className="h-4 w-4" />
                    Entrar para marcar
                  </>
                ) : done ? (
                  'Desmarcar conclusão'
                ) : (
                  'Marcar concluído'
                )}
              </Button>
            </div>

            <div className="surface-muted p-5">
              <p className="eyebrow mb-2">Módulo</p>
              <h2 className="font-serif text-2xl text-lavender-800">{mod.name}</h2>
              <ul className="mt-4 space-y-2">
                {moduleStudies.map(s => {
                  const sDone = isCompleted(s.id)
                  const isCurrent = s.id === study.id

                  return (
                    <li key={s.id}>
                      <Link
                        to={`/estudo/${s.id}`}
                        className={`study-sidebar-link ${isCurrent ? 'border-blush-200 bg-white text-lavender-800 shadow-soft' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold ${sDone ? 'bg-sage-600 text-paper-50' : isCurrent ? 'bg-lavender-700 text-paper-50' : 'bg-blush-100 text-ink-400'}`}>
                            {sDone ? '✓' : s.id.split('.').pop()}
                          </span>
                          <span className="line-clamp-2">{s.title}</span>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            <NotesPanel studyId={study.id} moduleId={study.moduleId} blockId={study.blockId} />
          </aside>
        </div>
      </section>
    </Layout>
  )
}
