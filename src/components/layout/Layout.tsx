import type { ReactNode } from 'react'
import { Header } from './Header'
import { SDALogo } from '../ui/SDALogo'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #F8F7FE 0%, #FEF7F8 55%, #F3F8F5 100%)' }}>
      {/* Decorative orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #C9C1F1 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/3 -left-32 w-80 h-80 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #F4C5CA 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-20 right-1/4 w-64 h-64 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #AECFBC 0%, transparent 70%)' }}
        />
      </div>

      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {children}
      </main>

      <footer className="mt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-strong rounded-3xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <SDALogo size={26} color="lavender" />
              <span className="text-sm font-medium text-lavender-500">Igreja Adventista do Sétimo Dia</span>
            </div>
            <p className="text-xs text-slate-400 text-center sm:text-right">
              Sistema de Estudo Bíblico · Currículo completo · 34 módulos
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
