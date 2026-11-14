import React, { useState, useEffect } from 'react'
import { Download, Database, Server, Smartphone, User, Cpu } from 'lucide-react'
import PwaInstallModal from '../components/PwaInstallModal'

export default function ProfilePage() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)

    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
    }
  }, [])

  function handleInstallClick() {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') {
          setIsInstalled(true)
        }
        setDeferredPrompt(null)
      })
    } else {
      setShowModal(true)
    }
  }

  return (
    <div className="pb-28 pt-4 px-4 sm:px-6 max-w-6xl mx-auto space-y-5">
      {/* Top Banner Header */}
      <div className="p-5 rounded-2xl bg-[#111827] border border-[#1e293b] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Identitas Mahasiswa & Sistem
          </span>
          <h1 className="text-xl font-bold text-white mt-1">
            Profil Praktikan PPB 2026
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Informasi pengembang aplikasi tugas akhir dan status lingkungan PWA
          </p>
        </div>
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
          Terverifikasi
        </span>
      </div>

      {/* Developer Card */}
      <div className="p-5 rounded-2xl bg-[#111827] border border-[#1e293b] shadow-sm flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center font-bold text-lg text-blue-400 shrink-0">
            FAR
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Faiz Alif Rahmawan</h2>
            <div className="text-xs font-semibold text-blue-400 mt-0.5">
              NIM: 21120124130063
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Teknik Komputer &bull; Universitas Diponegoro
            </p>
          </div>
        </div>

        <button
          onClick={handleInstallClick}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center gap-2 transition cursor-pointer shadow-sm"
        >
          <Smartphone className="w-4 h-4" />
          <span>{isInstalled ? 'Aplikasi Terpasang' : 'Install PWA'}</span>
        </button>
      </div>

      {/* System Architecture */}
      <div className="p-5 rounded-2xl bg-[#111827] border border-[#1e293b] space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-400" />
            Spesifikasi Arsitektur Sistem
          </h3>
          <span className="text-[11px] text-slate-400">PWA &bull; Web Service</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[#0b0f17] border border-[#1e293b] space-y-1">
            <div className="flex items-center gap-2 font-semibold text-white">
              <Smartphone className="w-4 h-4 text-blue-400" />
              <span>Frontend Platform</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              React 19 + Vite + Tailwind CSS + PWA Service Worker (Offline Support).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0b0f17] border border-[#1e293b] space-y-1">
            <div className="flex items-center gap-2 font-semibold text-white">
              <Server className="w-4 h-4 text-emerald-400" />
              <span>Backend Web Service</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Node.js + Express REST API melayani modul endpoint kustom.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0b0f17] border border-[#1e293b] space-y-1">
            <div className="flex items-center gap-2 font-semibold text-white">
              <Database className="w-4 h-4 text-amber-400" />
              <span>Database Engine</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Supabase PostgreSQL (861 match pro real, 53 tim resmi).
            </p>
          </div>
        </div>
      </div>

      <PwaInstallModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onInstall={handleInstallClick}
        hasPrompt={Boolean(deferredPrompt)}
      />
    </div>
  )
}
