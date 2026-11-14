import LoadingSpinner from '../components/LoadingSpinner'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../services/api'
import TeamLogo from '../components/TeamLogo'
import { ArrowLeft, Trophy, Bookmark, BookmarkCheck, Users, Award, Shield, Star } from 'lucide-react'

const roleColors = {
  Top: 'bg-red-500/10 text-red-400 border-red-500/20',
  Jungle: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Mid: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  ADC: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Support: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Coach: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
}

const roleIcons = {
  Top: '⚔️',
  Jungle: '🌿',
  Mid: '✨',
  ADC: '🏹',
  Support: '🛡️',
  Coach: '📋',
}

// Leaguepedia player photo URLs (direct CDN links)
const playerPhotos = {
  // T1
  'Faker': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/06/T1_Faker_2024_Split_1.png',
  'Zeus': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/f8/T1_Zeus_2024_Split_1.png',
  'Oner': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/00/T1_Oner_2024_Split_1.png',
  'Gumayusi': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/9/9a/T1_Gumayusi_2024_Split_1.png',
  'Keria': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/9/92/T1_Keria_2024_Split_1.png',
  // GEN
  'Doran': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/87/GEN_Doran_2024_Split_1.png',
  'Peanut': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/02/GEN_Peanut_2024_Split_1.png',
  'Chovy': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/8e/GEN_Chovy_2024_Split_1.png',
  'Peyz': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/ff/GEN_Peyz_2024_Split_1.png',
  'Lehends': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/00/GEN_Lehends_2024_Split_1.png',
  // HLE
  'Kingen': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/09/HLE_Kingen_2024_Split_1.png',
  'Clid': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/9/9b/HLE_Clid_2024_Split_1.png',
  'Zeka': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/f4/HLE_Zeka_2024_Split_1.png',
  'Viper': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/9/9f/HLE_Viper_2024_Split_1.png',
  'Life': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/00/HLE_Life_2024_Split_1.png',
  // KT
  'Canna': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/f3/KT_Canna_2024_Split_1.png',
  'Sylvie': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/00/KT_Sylvie_2024_Split_1.png',
  'BDD': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/0f/KT_BDD_2024_Split_1.png',
  'Aiming': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/0f/KT_Aiming_2024_Split_1.png',
  'Effort': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/02/KT_Effort_2024_Split_1.png',
  // BLG
  'Bin': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/09/BLG_Bin_2024_Split_1.png',
  'Wei': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/0a/BLG_Wei_2024_Split_1.png',
  'knight': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/00/BLG_Knight_2024_Split_1.png',
  'Elk': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/02/BLG_Elk_2024_Split_1.png',
  'ON': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/09/BLG_ON_2024_Split_1.png',
  // G2
  'BrokenBlade': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/00/G2_BrokenBlade_2024_Split_1.png',
  'Caps': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/09/G2_Caps_2024_Split_1.png',
  'Hans Sama': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/09/G2_Hans_Sama_2024_Split_1.png',
  'Labrov': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/00/G2_Labrov_2024_Split_1.png',
  // FNC
  'Oscarinin': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/00/FNC_Oscarinin_2024_Split_1.png',
  'Rekkles': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/09/FNC_Rekkles_2023.png',
  // TL
  'CoreJJ': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/00/TL_CoreJJ_2024_Split_1.png',
  'Yeon': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/00/TL_Yeon_2024_Split_1.png',
  // C9
  'Blaber': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/09/C9_Blaber_2024_Split_1.png',
  'Jensen': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/09/C9_Jensen_2024_Split_1.png',
  'Ruler': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/09/C9_Ruler_2024_Split_1.png',
}

function PlayerAvatar({ ign, photo }) {
  const [imgError, setImgError] = useState(false)
  const initials = ign ? ign.substring(0, 2).toUpperCase() : '??'

  if (photo && !imgError) {
    return (
      <img
        src={photo}
        alt={ign}
        decoding="async"
        onError={() => setImgError(true)}
        className="w-14 h-14 rounded-xl object-cover object-top bg-slate-800 border border-slate-700/60"
      />
    )
  }

  return (
    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-700/60 flex items-center justify-center font-bold text-sm text-slate-300 shrink-0">
      {initials}
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
        if (matchFav) {
          setIsFavorited(true)
          setFavoriteId(matchFav.id)
        }
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
        setIsFavorited(false)
        setFavoriteId(null)
      } else {
        const created = await api.addFavorite(team.id, 'Cheering for 2026 Worlds!', 'guest')
        setIsFavorited(true)
        setFavoriteId(created.id)
      }
    } catch (e) {
      alert(e.message)
    } finally {
      setFavLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner message="Memuat profil tim & roster pemain..." />
  }

  if (!team) {
    return (
      <div className="py-24 text-center text-slate-400 space-y-3">
        <p>Team not found.</p>
        <Link to="/teams" className="text-amber-400 text-xs underline">Back to Teams</Link>
      </div>
    )
  }

  const roster = team.roster || []
  const achievements = team.achievements || []

  return (
    <div className="pb-24 pt-4 px-4 sm:px-6 max-w-6xl mx-auto space-y-6">
      {/* Back button */}
      <Link to="/teams" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition">
        <ArrowLeft className="w-4 h-4" />
        Back to Teams
      </Link>

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="w-24 h-24 p-2 rounded-2xl bg-[#182232] border border-[#2a3b52] flex items-center justify-center shrink-0 shadow-lg">
            <TeamLogo
              src={team.logo_url}
              alt={team.name}
              shortName={team.short_name}
              region={team.region}
              className="w-20 h-20"
            />
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
            onClick={toggleFavorite}
            disabled={favLoading}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-md shrink-0 ${
              isFavorited
                ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            {isFavorited ? (
              <><BookmarkCheck className="w-4 h-4" /> Favorited</>
            ) : (
              <><Bookmark className="w-4 h-4" /> Add to Favorites</>
            )}
          </button>
        </div>
      </div>

      {/* Active 2026 Roster — with player photos */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-4 shadow-md">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Users className="w-4 h-4 text-amber-400" />
          Active 2026 Season Roster
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {roster.map((player, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3 hover:border-amber-500/30 transition"
            >
              <PlayerAvatar ign={player.ign} photo={playerPhotos[player.ign]} />
              <div className="flex-1 min-w-0 space-y-1">
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border uppercase ${roleColors[player.role] || 'bg-slate-800 text-slate-300'}`}>
                  {roleIcons[player.role] || ''} {player.role}
                </span>
                <p className="font-extrabold text-sm text-white truncate">{player.ign}</p>
                {player.name && <p className="text-[11px] text-slate-400 truncate">{player.name}</p>}
              </div>
              {player.nationality && (
                <span className="text-xs font-bold px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 shrink-0">
                  {player.nationality}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Key Titles & Achievements */}
      {achievements.length > 0 && (
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-3 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Key Titles & Achievements
            </h2>
            <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
              {achievements.length} titles
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {achievements.map((ach, idx) => {
              const isWorldsOrMSI = /worlds|msi|champion/i.test(ach)
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-2.5 text-xs p-2.5 rounded-lg border transition ${
                    isWorldsOrMSI
                      ? 'bg-amber-500/5 border-amber-500/20 text-amber-200'
                      : 'bg-slate-950/40 border-slate-800/60 text-slate-300'
                  }`}
                >
                  {isWorldsOrMSI
                    ? <Star className="w-4 h-4 text-amber-400 shrink-0" />
                    : <Trophy className="w-4 h-4 text-slate-400 shrink-0" />
                  }
                  <span>{ach}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
