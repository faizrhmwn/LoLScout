import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import TeamLogo from '../components/TeamLogo'
import { 
  Bookmark, Trash2, Edit3, Shield, ArrowRight, Check, X, 
  Tv, TrendingUp, Award, Download, Smartphone, BellRing, ExternalLink
} from 'lucide-react'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editNotes, setEditNotes] = useState('')
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

  async function handleInstallPWA() {
    if (!deferredPrompt) {
      alert('Aplikasi sudah terpasang atau browser Anda tidak mendukung prompt otomatis. Anda bisa menginstalnya via menu browser (Add to Home screen).')
      return
    }
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setIsInstalled(true)
    }
    setDeferredPrompt(null)
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
    <div className="pb-24 pt-4 px-3 sm:px-4 max-w-4xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400" />
            Watchlist & Favorit Tim
          </h1>
          <p className="text-xs text-slate-400">Pantau performa, hasil match terbaru, VOD, dan catatan personal tim favorit Anda</p>
        </div>
        <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-amber-400/10 text-amber-400 border border-amber-400/30 w-fit">
          {favorites.length} Tim Terpantau
        </span>
      </div>

      {/* PWA Install Notification Banner */}
      {!isInstalled && (
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/60 via-slate-900/80 to-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                Install LoLScout di Layar Utama (PWA)
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono">Mobile App</span>
              </h4>
              <p className="text-[11px] text-slate-300">
                Akses instan dari HP Anda, buka tanpa internet (offline support), dan pantau tim favorit lebih cepat.
              </p>
            </div>
          </div>
          <button
            onClick={handleInstallPWA}
            className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition shrink-0 shadow"
          >
            <Download className="w-3.5 h-3.5" /> Pasang Aplikasi
          </button>
        </div>
      )}

      {/* Main Content */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 text-xs animate-pulse">
          Memuat data tim favorit & statistik...
        </div>
      ) : favorites.length === 0 ? (
        <div className="p-8 rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 text-center space-y-3">
          <Shield className="w-10 h-10 text-slate-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-white">Belum Ada Tim Favorit</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Jelajahi halaman tim dan klik tombol bookmark untuk memantau match dan VOD tim favoritmu di sini!
            </p>
          </div>
          <Link
            to="/teams"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition"
          >
            Jelajahi Tim <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {favorites.map(fav => (
            <div
              key={fav.id}
              className="p-4 rounded-xl bg-[#0c121d] border border-slate-800/90 space-y-3 shadow-md hover:border-slate-700 transition"
            >
              {/* Team Info Header */}
              <div className="flex items-center justify-between">
                <Link to={`/teams/${fav.team?.id}`} className="flex items-center gap-3 group">
                  <TeamLogo
                    src={fav.team?.logo_url}
                    alt={fav.team?.name}
                    shortName={fav.team?.short_name}
                    region={fav.team?.region}
                    className="w-12 h-12 group-hover:scale-105 transition"
                  />
                  <div>
                    <h3 className="font-extrabold text-base text-white group-hover:text-amber-400 transition flex items-center gap-2">
                      {fav.team?.name}
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {fav.team?.short_name}
                      </span>
                    </h3>
                    <span className="text-[11px] text-amber-400 font-bold">
                      {fav.team?.region} • #{fav.team?.standing_summer} Seed Circuit 2026
                    </span>
                  </div>
                </Link>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setEditingId(fav.id)
                      setEditNotes(fav.notes || '')
                    }}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                    title="Edit Catatan"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(fav.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stats Bar (Winrate & 5 Recent Games Form) */}
              {fav.stats && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/60 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">RECORD 2026</span>
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
                    <div className="flex items-center gap-1 mt-0.5">
                      {fav.stats.form?.map((res, i) => (
                        <span
                          key={i}
                          className={`w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center ${
                            res === 'W' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'
                          }`}
                        >
                          {res}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Latest Match & Direct VOD Button */}
              {fav.latestMatch && (
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg text-xs font-bold font-mono ${
                      fav.latestMatch.won ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {fav.latestMatch.won ? 'VICTORY' : 'DEFEAT'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>vs {fav.latestMatch.opponent}</span>
                        <span className="text-slate-400 font-mono">({fav.latestMatch.score})</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                          {fav.latestMatch.league}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        Pertandingan Terakhir: {new Date(fav.latestMatch.match_date).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {fav.latestMatch.vod_url && (
                      <a
                        href={fav.latestMatch.vod_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition shadow-sm"
                      >
                        <Tv className="w-3.5 h-3.5" /> Watch VOD
                      </a>
                    )}
                    <Link
                      to={`/matches/${fav.latestMatch.id}`}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition"
                    >
                      Draft <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Notes Section (CRUD Update) */}
              {editingId === fav.id ? (
                <div className="flex gap-2 pt-2 border-t border-slate-800">
                  <input
                    type="text"
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Tulis catatan (misal: Jangan lupa tonton final Worlds 2026!)..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                  <button
                    onClick={() => handleSaveNotes(fav.id)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Simpan
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <span className="italic flex items-center gap-1 text-slate-300">
                    <span className="text-amber-400">“</span>
                    {fav.notes || 'Belum ada catatan khusus'}
                    <span className="text-amber-400">”</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Ditambahkan: {new Date(fav.created_at).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
