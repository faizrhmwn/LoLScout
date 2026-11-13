import React, { useState, useEffect } from 'react'
import { ShieldCheck, Download, Database, Server, Smartphone, CheckCircle2 } from 'lucide-react'

export default function ProfilePage() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    })

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }
  }, [])

  async function handleInstall() {
    if (!deferredPrompt) {
      alert('PWA already installed or browser install prompt is not available. You can add to home screen via browser menu.')
      return
    }
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setIsInstalled(true)
    }
    setDeferredPrompt(null)
  }

  return (
    <div className="pb-24 pt-3 px-2 sm:px-4 max-w-4xl mx-auto space-y-3 font-sans text-slate-200">
      {/* Top Header */}
      <div className="bg-[#101722] border border-[#1b2533] p-3 rounded-sm flex items-center justify-between">
        <div>
          <h1 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
            LoLScout Developer & System Profile
          </h1>
          <p className="text-[11px] font-mono text-slate-400">
            Author verification & PWA client environment status
          </p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00bcd4]/10 text-[#00bcd4] border border-[#00bcd4]/30 font-bold uppercase">
          Client Verified
        </span>
      </div>

      {/* Developer Identification Card */}
      <div className="bg-[#0e151e] border border-[#1b2533] rounded-sm p-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded bg-[#162232] border border-[#2b3d56] flex items-center justify-center font-mono font-bold text-base text-[#00bcd4] shrink-0">
            FR
          </div>
          <div>
            <h2 className="text-base font-mono font-bold text-white">Faizal Rahmawan</h2>
            <div className="text-xs font-mono text-[#00bcd4] font-semibold mt-0.5">
              NIM: 21120124130063
            </div>
            <p className="text-[11px] font-mono text-slate-400">
              Teknik Komputer • Universitas Diponegoro
            </p>
          </div>
        </div>
      </div>

      {/* System Specifications (LoLScout Pro) */}
      <div className="bg-[#0e151e] border border-[#1b2533] rounded-sm p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-[#17212f] pb-2">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            System Architecture
          </span>
          <span className="text-[10px] font-mono text-slate-400">v2.0 • Fearless Draft Engine</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
          <div className="p-2.5 rounded bg-[#0b1017] border border-[#1b2533] space-y-1">
            <div className="flex items-center gap-1.5 text-[#00bcd4] font-bold">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Frontend Client</span>
            </div>
            <p className="text-[11px] text-slate-400">
              React 19, Vite, Tailwind CSS, Service Worker Offline Cache, Standalone PWA Manifest.
            </p>
          </div>

          <div className="p-2.5 rounded bg-[#0b1017] border border-[#1b2533] space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Database className="w-3.5 h-3.5" />
              <span>Database & API</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Express.js RESTful API, PostgreSQL Supabase BaaS, Data Dragon 16.22.1 Assets CDN.
            </p>
          </div>
        </div>

        {/* PWA Standalone Status & Install Action */}
        <div className="pt-2 border-t border-[#17212f] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-white font-bold text-xs">
                {isInstalled ? 'Running as Installed Native App' : 'PWA Standalone Engine Ready'}
              </div>
              <div className="text-[10px] text-slate-400">
                Install to home screen for full standalone esports tracking experience.
              </div>
            </div>
          </div>

          {!isInstalled && (
            <button
              onClick={handleInstall}
              className="px-3 py-1.5 rounded bg-[#162232] hover:bg-[#1e2f46] text-[#00bcd4] border border-[#2b3d56] text-xs font-mono font-bold transition flex items-center gap-1.5 shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install LoLScout App</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
