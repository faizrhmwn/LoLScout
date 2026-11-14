import LoadingSpinner from '../components/LoadingSpinner'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../services/api'
import TeamLogo from '../components/TeamLogo'
import { ArrowLeft, Trophy, Bookmark, BookmarkCheck, Users, Shield } from 'lucide-react'

const roleColors = {
  Top:     'bg-red-500/10 text-red-400 border-red-500/20',
  Jungle:  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Mid:     'bg-blue-500/10 text-blue-400 border-blue-500/20',
  ADC:     'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Support: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Coach:   'bg-slate-500/10 text-slate-400 border-slate-500/20',
}

const roleIcons = { Top:'⚔️', Jungle:'🌿', Mid:'✨', ADC:'🏹', Support:'🛡️', Coach:'📋' }

function PlayerAvatar({ ign, photoUrl }) {
  const [status, setStatus] = useState('loading') // 'loading' | 'ok' | 'err'
  const initials = (ign || '??').substring(0, 2).toUpperCase()

  if (!photoUrl) {
    return (
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-slate-300 shrink-0">
        {initials}
      </div>
    )
  }

  return (
    <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-700/60 bg-slate-800 shrink-0 relative">
      {status !== 'err' && (
        <img
          src={photoUrl}
          alt={ign}
          decoding="async"
          onLoad={() => setStatus('ok')}
          onError={() => setStatus('err')}
          className="w-full h-full object-cover object-top"
        />
      )}
      {status === 'err' && (
        <div className="w-full h-full flex items-center justify-center font-bold text-sm text-slate-300 bg-gradient-to-br from-slate-700 to-slate-800">
          {initials}
        </div>
      )}
      {status === 'loading' && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse" />
      )}
    </div>
  )
}

export default function TeamDetailPage() {
  const { id } = useParams()
  const [team, setTeam] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)
  const [favoriteId, setFavoriteId] = useState(null)
  const [favLoading, setFavLoading] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        const [tData, favs] = await Promise.all([
          api.getTeamDetail(id),
          api.getFavorites('guest')
        ])
        setTeam(tData)
        const matchFav = (favs || []).find(f => f.team?.id === id)
        if (matchFav) { setIsFavorited(true); setFavoriteId(matchFav.id) }
      } catch (e) {
        console.error('Error loading team detail:', e)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [id])

  async function toggleFavorite() {
    if (favLoading) return
    setFavLoading(true)
    try {
      if (isFavorited && favoriteId) {
        await api.removeFavorite(favoriteId)
        setIsFavorited(false); setFavoriteId(null)
      } else {
        const created = await api.addFavorite(team.id, 'Cheering for 2026 Worlds!', 'guest')
        setIsFavorited(true); setFavoriteId(created.id)
      }
    } catch (e) { alert(e.message) }
    finally { setFavLoading(false) }
  }

  if (loading) return <LoadingSpinner message="Memuat profil tim & roster pemain..." />

  if (!team) return (
    <div className="py-24 text-center text-slate-400 space-y-3">
      <p>Team not found.</p>
      <Link to="/teams" className="text-amber-400 text-xs underline">Back to Teams</Link>
    </div>
  )

  const roster = team.roster || []

  return (
    <div className="pb-24 pt-4 px-4 sm:px-6 max-w-6xl mx-auto space-y-6">
      {/* Back */}
      <Link to="/teams" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition">
        <ArrowLeft className="w-4 h-4" /> Back to Teams
      </Link>

      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="w-24 h-24 p-2 rounded-2xl bg-[#182232] border border-[#2a3b52] flex items-center justify-center shrink-0 shadow-lg">
            <TeamLogo src={team.logo_url} alt={team.name} shortName={team.short_name} region={team.region} className="w-20 h-20" />
          </div>
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase">
                {team.region} League
              </span>
              {team.standing_summer && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold">
                  <Trophy className="w-3.5 h-3.5" /> Rank #{team.standing_summer}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-extrabold text-white">{team.name}</h1>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">{team.description}</p>
          </div>
          <button
            onClick={toggleFavorite} disabled={favLoading}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-md shrink-0 ${
              isFavorited ? 'bg-amber-400 text-slate-950 hover:bg-amber-300' : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            {isFavorited ? <><BookmarkCheck className="w-4 h-4" /> Favorited</> : <><Bookmark className="w-4 h-4" /> Add to Favorites</>}
          </button>
        </div>
      </div>

      {/* Active Roster with Photos */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-4 shadow-md">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Users className="w-4 h-4 text-amber-400" />
          Active 2026 Season Roster
          <span className="ml-auto text-[11px] text-slate-400 font-normal">{roster.length} players</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {roster.map((player, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3 hover:border-amber-500/30 transition group">
              <PlayerAvatar ign={player.ign} photoUrl={player.photo_url} />
              <div className="flex-1 min-w-0 space-y-1">
                <span className={`inline-block text-[10px] font-extrabold px-2 py-0.5 rounded border uppercase ${roleColors[player.role] || 'bg-slate-800 text-slate-300 border-slate-700'}`}>
                  {roleIcons[player.role] || ''} {player.role}
                </span>
                <p className="font-extrabold text-sm text-white truncate group-hover:text-amber-300 transition">{player.ign}</p>
                {player.name && <p className="text-[11px] text-slate-400 truncate">{player.name}</p>}
              </div>
              {player.nationality && (
                <span className="text-[11px] font-bold px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 shrink-0 self-start mt-1">
                  {player.nationality}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
