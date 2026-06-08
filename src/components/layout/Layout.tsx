import type { ReactNode } from 'react'
import { Header } from './Header'
import { SDALogo } from '../ui/SDALogo'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="page-shell">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-40 bg-grid-faint" />
        <div className="absolute left-0 right-0 top-0 h-48 bg-gradient-to-b from-gold-300/10 to-transparent" />
      </div>

      <Header />

      <main className="page-frame py-8 sm:py-10 animate-fade-in">
        {children}
      </main>

      <footer className="mt-20 pb-10">
        <div className="page-frame">
          <div className="surface-muted px-6 py-5 sm:px-8 sm:py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <SDALogo size={44} color="navy" />
              <div>
                <p className="text-sm font-semibold text-lavender-800">Biblioteca Digital de Estudo</p>
                <p className="text-xs uppercase tracking-[0.16em] text-ink-400">Currículo bíblico organizado para leitura séria</p>
              </div>
            </div>
            <p className="max-w-md text-xs leading-6 text-ink-400 text-center sm:text-right">
              Currículo completo em uma experiência de leitura orientada à reverência, clareza e aprofundamento bíblico.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
