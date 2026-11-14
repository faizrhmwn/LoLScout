import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import TeamLogo from '../components/TeamLogo'
import PwaInstallModal from '../components/PwaInstallModal'
import { 
  Bookmark, Trash2, Edit3, Shield, ArrowRight, Check, X, 
  Tv, Smartphone, ExternalLink, Calendar, Flame
} from 'lucide-react'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editNotes, setEditNotes] = useState('')
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showInstallModal, setShowInstallModal] = useState(false)

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

  function handleInstallTrigger() {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          setIsInstalled(true)
        }
        setDeferredPrompt(null)
      })
    } else {
      setShowInstallModal(true)
    }
  }

  async function loadFavorites() {
    setLoading(true)
    try {
      const data = await api.getFavorites('guest')
      setFavorites(data || [])
    } catch (e) {
      console.error('Error fetching favorites:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFavorites()
  }, [])

  async function handleDelete(id) {
    if (!confirm('Hapus tim dari daftar favorit Anda?')) return
    try {
      await api.removeFavorite(id)
      setFavorites(favorites.filter(f => f.id !== id))
    } catch (e) {
      alert(e.message)
    }
  }

  async function handleSaveNotes(id) {
    try {
      await api.updateFavorite(id, editNotes)
      setFavorites(favorites.map(f => f.id === id ? { ...f, notes: editNotes } : f))
      setEditingId(null)
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="pb-24 pt-3 px-3 sm:px-4 max-w-5xl mx-auto space-y-4">
      {/* Top Banner / Breadcrumb Header */}
      <div className="bg-[#0e1622] border border-[#1b2533] p-3 sm:p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <Bookmark className="w-4 h-4" />
            </span>
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Watchlist & Tim Favorit
            </h1>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Tracking rekor 2026, hasil pertandingan terakhir, VOD YouTube resmi, dan catatan pribadi
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#141e2c] text-amber-400 border border-amber-400/30 font-semibold">
            {favorites.length} Tim Tersimpan
          </span>

          {!isInstalled && (
            <button
              onClick={handleInstallTrigger}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#142334] hover:bg-[#1a2f46] text-[#4da8da] border border-[#2b4462] text-xs font-medium transition cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 text-xs animate-pulse font-mono">
          MEMUAT DATA FAVORIT & STATISTIK 2026...
        </div>
      ) : favorites.length === 0 ? (
        <div className="p-10 rounded-2xl bg-[#0c1219] border border-dashed border-[#1b2533] text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#141e2b] flex items-center justify-center mx-auto text-slate-600">
            <Shield className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-white">Belum Ada Tim di Watchlist</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Buka menu Teams dan tandai tim favoritmu untuk memantau performa serta VOD pertandingannya secara praktis di sini.
            </p>
          </div>
          <Link
            to="/teams"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00bcd4] hover:bg-[#00acc1] text-slate-950 font-bold text-xs transition shadow-sm"
          >
            Lihat Daftar Tim <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {favorites.map(fav => (
            <div
              key={fav.id}
              className="p-4 rounded-xl bg-[#0b1118] border border-[#1b2533] hover:border-[#28384d] space-y-3 transition shadow-sm"
            >
              {/* Header: Team Identity & Actions */}
              <div className="flex items-center justify-between">
                <Link to={`/teams/${fav.team?.id}`} className="flex items-center gap-3 group">
                  <div className="w-11 h-11 rounded-lg bg-[#111923] border border-[#202d3d] flex items-center justify-center p-1.5 shrink-0 group-hover:border-[#00bcd4]/50 transition">
                    <TeamLogo
                      src={fav.team?.logo_url}
                      alt={fav.team?.name}
                      shortName={fav.team?.short_name}
                      region={fav.team?.region}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-[#00bcd4] transition flex items-center gap-2">
                      {fav.team?.name}
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#16202c] text-slate-300 border border-[#223143]">
                        {fav.team?.short_name}
                      </span>
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span className="text-amber-400 font-semibold">{fav.team?.region}</span>
                      <span>•</span>
                      <span>Seed #{fav.team?.standing_summer}</span>
                    </div>
                  </div>
                </Link>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setEditingId(fav.id)
                      setEditNotes(fav.notes || '')
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#16212d] transition"
                    title="Edit Catatan"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(fav.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stats Bar */}
              {fav.stats && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2.5 rounded-lg bg-[#080d14] border border-[#16212e] text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">SEASON 2026</span>
                    <span className="font-bold text-white">
                      {fav.stats.wins}W - {fav.stats.losses}L
                    </span>
                    <span className="text-[10px] text-slate-400 ml-1">({fav.stats.total} Series)</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">WIN RATE</span>
                    <span className={`font-bold ${fav.stats.winRate >= 50 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {fav.stats.winRate}%
                    </span>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-400 block font-mono">RECENT FORM (5 G)</span>
                    <div className="flex items-center gap-1 mt-1">
                      {fav.stats.form?.map((res, i) => (
                        <span
                          key={i}
                          className={`w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center ${
                            res === 'W' 
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                              : 'bg-red-500/15 text-red-400 border border-red-500/30'
                          }`}
                        >
                          {res}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Latest Match Bar */}
              {fav.latestMatch && (
                <div className="p-3 rounded-lg bg-[#0e1622] border border-[#1b2533] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold font-mono ${
                      fav.latestMatch.won 
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-red-500/15 text-red-400 border border-red-500/30'
                    }`}>
                      {fav.latestMatch.won ? 'VICTORY' : 'DEFEAT'}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>vs {fav.latestMatch.opponent}</span>
                        <span className="text-slate-400 font-mono">({fav.latestMatch.score})</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#16202c] text-slate-400 border border-[#223143]">
                          {fav.latestMatch.league}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {new Date(fav.latestMatch.match_date).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {fav.latestMatch.vod_url && (
                      <a
                        href={fav.latestMatch.vod_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition"
                      >
                        <Tv className="w-3.5 h-3.5" /> Watch VOD
                      </a>
                    )}
                    <Link
                      to={`/matches/${fav.latestMatch.id}`}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-[#162231] hover:bg-[#1e2f44] text-slate-200 text-xs border border-[#25364b] transition"
                    >
                      Draft <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Notes Section (CRUD) */}
              {editingId === fav.id ? (
                <div className="flex gap-2 pt-2 border-t border-[#182330]">
                  <input
                    type="text"
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Tulis catatan (misal: Jangan lupa tonton final Worlds 2026!)..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-[#080d14] border border-[#233144] text-xs text-white focus:outline-none focus:border-[#00bcd4]"
                  />
                  <button
                    onClick={() => handleSaveNotes(fav.id)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition"
                  >
                    <Check className="w-3.5 h-3.5" /> Simpan
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-2.5 py-1.5 rounded-lg bg-[#162231] hover:bg-[#1e2f44] text-slate-300 text-xs"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="pt-2 border-t border-[#182330] flex items-center justify-between text-xs text-slate-400">
                  <span className="italic flex items-center gap-1 text-slate-300">
                    <span className="text-amber-400">“</span>
                    {fav.notes || 'Belum ada catatan khusus'}
                    <span className="text-amber-400">”</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(fav.created_at).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Clean PWA Install Modal */}
      <PwaInstallModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        onInstall={handleInstallTrigger}
        hasPrompt={Boolean(deferredPrompt)}
      />
    </div>
  )
}
