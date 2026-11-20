import React, { useState, useEffect } from 'react'
import { Download, Database, Server, Smartphone, User, Cpu, Sun, Moon, Palette, LogIn, LogOut, Mail, KeyRound } from 'lucide-react'
import PwaInstallModal from '../components/PwaInstallModal'
import AuthModal from '../components/AuthModal'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

export default function ProfilePage() {
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
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
            Student & System Identity
          </span>
          <h1 className="text-xl font-bold text-white mt-1">
            Developer Profile PPB 2026
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Final project developer information and PWA environment status
          </p>
        </div>
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
          Verified
        </span>
      </div>

      {/* Account Card */}
      <div className="p-5 rounded-2xl bg-[#111827] border border-[#1e293b] shadow-sm">
        <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-3">Account</p>
        {user ? (
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-bold text-amber-400 text-sm shrink-0">
                {user.email?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{user.email}</p>
                <p className="text-xs text-slate-400 mt-0.5">Signed in · Personal Watchlist Active</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-xs font-medium text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 px-3 py-2 rounded-xl transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-sm font-semibold text-white">Browsing as Guest</p>
              <p className="text-xs text-slate-400 mt-0.5">Sign in to unlock your personal watchlist</p>
            </div>
            <button
              onClick={() => setShowAuthModal(true)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-xl transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" /> Sign In
            </button>
          </div>
        )}
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
              Computer Engineering &bull; Diponegoro University
            </p>
          </div>
        </div>

        <button
          onClick={handleInstallClick}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center gap-2 transition cursor-pointer shadow-sm"
        >
          <Smartphone className="w-4 h-4" />
          <span>{isInstalled ? 'App Installed' : 'Install PWA'}</span>
        </button>
      </div>

      {/* Tema Tampilan */}
      <div className="p-5 rounded-2xl bg-[#111827] border border-[#1e293b] space-y-3 shadow-sm">
        <div className="flex items-center gap-2 border-b border-[#1e293b] pb-3">
          <Palette className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">Display Theme</h3>
        </div>
        <p className="text-xs text-slate-400">Choose your interface theme preference.</p>
        <div className="flex gap-3">
          <button
            onClick={() => setTheme('dark')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium border transition cursor-pointer ${
              theme === 'dark'
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400'
                : 'bg-[#0b0f17] border-[#1e293b] text-slate-400 hover:text-slate-200'
            }`}
          >
            <Moon className="w-4 h-4" />
            Dark Mode
          </button>
          <button
            onClick={() => setTheme('light')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium border transition cursor-pointer ${
              theme === 'light'
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                : 'bg-[#0b0f17] border-[#1e293b] text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sun className="w-4 h-4" />
            Light Mode
          </button>
        </div>
      </div>

      {/* System Architecture */}
      <div className="p-5 rounded-2xl bg-[#111827] border border-[#1e293b] space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-400" />
            System Architecture Specifications
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
              Node.js + Express REST API serving custom esports data endpoints.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0b0f17] border border-[#1e293b] space-y-1">
            <div className="flex items-center gap-2 font-semibold text-white">
              <Database className="w-4 h-4 text-amber-400" />
              <span>Database Engine</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Supabase PostgreSQL (861+ real pro matches, 53 official teams).
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
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  )
}
