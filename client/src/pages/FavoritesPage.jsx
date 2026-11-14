import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import TeamLogo from '../components/TeamLogo'
import PwaInstallModal from '../components/PwaInstallModal'
import { 
  Bookmark, Trash2, Edit3, ArrowRight, Check, X, 
  Tv, Smartphone, ExternalLink, SlidersHorizontal, ArrowUpDown
} from 'lucide-react'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editNotes, setEditNotes] = useState('')
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showInstallModal, setShowInstallModal] = useState(false)
  
  // Clean Filter tabs like admin dashboard
  const [activeTab, setActiveTab] = useState('ALL') // 'ALL', 'LCK', 'LPL', 'LEC', 'LCS', 'CBLOL'
  const [sortBy, setSortBy] = useState('RECENT') // 'RECENT', 'WINRATE', 'NAME'

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
    if (!confirm('Hapus tim dari daftar favorit?')) return
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

  // Filter & Sort
  const filteredFavorites = favorites.filter(fav => {
    if (activeTab === 'ALL') return true
    return fav.team?.region === activeTab
  }).sort((a, b) => {
    if (sortBy === 'WINRATE') {
      return (b.stats?.winRate || 0) - (a.stats?.winRate || 0)
    }
    if (sortBy === 'NAME') {
      return (a.team?.name || '').localeCompare(b.team?.name || '')
    }
    return new Date(b.created_at) - new Date(a.created_at)
  })

  // Summary Metrics
  const totalTracked = favorites.length
  const avgWinRate = totalTracked > 0
    ? Math.round(favorites.reduce((acc, curr) => acc + (curr.stats?.winRate || 0), 0) / totalTracked)
    : 0

  return (
    <div className="pb-28 pt-4 px-4 sm:px-6 max-w-5xl mx-auto space-y-5">
      {/* Top Banner / Summary Card (Clean Dashboard Admin Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2 p-5 rounded-2xl bg-[#111827] border border-[#1e293b] flex flex-col justify-between shadow-sm">
          <div>
            <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Dashboard Favorit
            </span>
            <h1 className="text-xl font-bold text-white mt-1">
              Watchlist Tim Kompetitif
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Pantau jadwal, hasil pertandingan, VOD resmi, dan catatan performa tim pilihan Anda.
            </p>
          </div>

          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-[#1e293b]">
            <div>
              <span className="text-[11px] text-slate-400 block">Total Tim</span>
              <span className="text-lg font-bold text-white">{totalTracked} Tim</span>
            </div>
            <div className="w-px h-8 bg-[#1e293b]"></div>
            <div>
              <span className="text-[11px] text-slate-400 block">Avg. Win Rate</span>
              <span className="text-lg font-bold text-emerald-400">{avgWinRate}%</span>
            </div>
          </div>
        </div>

        {/* PWA Action Card */}
        <div className="p-5 rounded-2xl bg-[#111827] border border-[#1e293b] flex flex-col justify-between shadow-sm">
          <div>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
              <Smartphone className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-white">LoLScout Mobile PWA</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Pasang di layar utama HP untuk akses offline dan notifikasi jadwal langsung.
            </p>
          </div>

          <button
            onClick={handleInstallTrigger}
            className="mt-4 w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{isInstalled ? 'Aplikasi Terpasang' : 'Pasang Aplikasi'}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Sort Controls */}
      <div className="p-3 rounded-2xl bg-[#111827] border border-[#1e293b] flex flex-wrap items-center justify-between gap-3 shadow-sm">
        {/* Region Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {['ALL', 'LCK', 'LPL', 'LEC', 'LCS', 'CBLOL'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer shrink-0 ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {tab === 'ALL' ? 'Semua Region' : tab}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" /> Urutkan:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#0b0f17] border border-[#1e293b] text-slate-300 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="RECENT">Terbaru Ditambahkan</option>
            <option value="WINRATE">Win Rate Tertinggi</option>
            <option value="NAME">Nama Tim (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Main Table / Card List */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 text-xs animate-pulse">
          Memuat watchlist...
        </div>
      ) : filteredFavorites.length === 0 ? (
        <div className="p-10 rounded-2xl bg-[#111827] border border-dashed border-[#1e293b] text-center space-y-3">
          <Bookmark className="w-8 h-8 text-slate-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="font-semibold text-sm text-white">Tidak ada tim dalam filter ini</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {favorites.length === 0 
                ? 'Jelajahi halaman tim dan bookmark tim favoritmu untuk memantau performa dan VOD di sini.'
                : 'Coba ubah tab kategori region di atas untuk melihat tim lainnya.'}
            </p>
          </div>
          {favorites.length === 0 && (
            <Link
              to="/teams"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition"
            >
              Jelajahi Teams <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      ) : (
        <div className="rounded-2xl bg-[#111827] border border-[#1e293b] overflow-hidden shadow-sm divide-y divide-[#1e293b]">
          {filteredFavorites.map(fav => (
            <div key={fav.id} className="p-4 hover:bg-[#151e2e] transition duration-150 space-y-3">
              {/* Row Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <Link to={`/teams/${fav.team?.id}`} className="flex items-center gap-3 group">
                  <div className="w-11 h-11 rounded-xl bg-[#0b0f17] border border-[#1e293b] p-1.5 flex items-center justify-center shrink-0 group-hover:border-blue-500/50 transition">
                    <TeamLogo
                      src={fav.team?.logo_url}
                      alt={fav.team?.name}
                      shortName={fav.team?.short_name}
                      region={fav.team?.region}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-white group-hover:text-blue-400 transition flex items-center gap-2">
                      {fav.team?.name}
                      <span className="text-[10px]  px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {fav.team?.short_name}
                      </span>
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="text-blue-400 font-medium">{fav.team?.region}</span>
                      <span>â€¢</span>
                      <span>Seed #{fav.team?.standing_summer}</span>
                    </div>
                  </div>
                </Link>

                {/* Performance Chips & Action Buttons */}
                <div className="flex items-center justify-between sm:justify-end gap-3">
                  {fav.stats && (
                    <div className="flex items-center gap-2 text-xs">
                      <div className="px-2.5 py-1 rounded-lg bg-[#0b0f17] border border-[#1e293b]">
                        <span className="text-slate-400 text-[11px] mr-1.5">WR:</span>
                        <span className={`font-semibold ${fav.stats.winRate >= 50 ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {fav.stats.winRate}%
                        </span>
                        <span className="text-slate-400 text-[10px] ml-1">({fav.stats.wins}W-{fav.stats.losses}L)</span>
                      </div>

                      {/* 5 Form Dots */}
                      <div className="hidden sm:flex items-center gap-1">
                        {fav.stats.form?.map((r, i) => (
                          <span
                            key={i}
                            className={`w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center ${
                              r === 'W' 
                                ? 'bg-emerald-500/20 text-emerald-400' 
                                : 'bg-red-500/20 text-red-400'
                            }`}
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingId(fav.id)
                        setEditNotes(fav.notes || '')
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
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
              </div>

              {/* Match Detail Sub-Row */}
              {fav.latestMatch && (
                <div className="p-3 rounded-xl bg-[#0b0f17] border border-[#1e293b] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      fav.latestMatch.won 
                        ? 'bg-emerald-500/15 text-emerald-400' 
                        : 'bg-red-500/15 text-red-400'
                    }`}>
                      {fav.latestMatch.won ? 'WIN' : 'LOSS'}
                    </span>
                    <div>
                      <span className="text-white font-medium">vs {fav.latestMatch.opponent}</span>
                      <span className="text-slate-400 ml-1.5 ">({fav.latestMatch.score})</span>
                      <span className="text-slate-400 ml-2  text-[10px]">[{fav.latestMatch.league}]</span>
                      <span className="text-slate-400 text-[11px] block sm:inline sm:ml-2">
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
                        className="px-3 py-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 text-white font-medium text-xs flex items-center gap-1.5 transition"
                      >
                        <Tv className="w-3.5 h-3.5" /> Tonton VOD
                      </a>
                    )}
                    <Link
                      to={`/matches/${fav.latestMatch.id}`}
                      className="px-3 py-1.5 rounded-lg bg-[#1e293b] hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition"
                    >
                      Draft <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Notes Input / Display */}
              {editingId === fav.id ? (
                <div className="flex gap-2 pt-2 border-t border-[#1e293b]">
                  <input
                    type="text"
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Tulis catatan tim..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-[#0b0f17] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleSaveNotes(fav.id)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center gap-1 transition"
                  >
                    <Check className="w-3.5 h-3.5" /> Simpan
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="pt-2 border-t border-[#1e293b]/70 flex items-center justify-between text-xs text-slate-400">
                  <span className="italic text-slate-300">
                    â€œ{fav.notes || 'Belum ada catatan khusus'}â€
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Ditambahkan: {new Date(fav.created_at).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Clean PWA Modal */}
      <PwaInstallModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        onInstall={handleInstallTrigger}
        hasPrompt={Boolean(deferredPrompt)}
      />
    </div>
  )
}

