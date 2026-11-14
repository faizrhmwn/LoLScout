import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../services/api'
import TeamLogo from '../components/TeamLogo'
import LoadingSpinner from '../components/LoadingSpinner'
import { getChampIconUrl } from '../utils/championIcon'
import {
  ArrowLeft,
  Trophy,
  Calendar,
  Clock,
  Swords,
  Play,
  ExternalLink,
  ChevronRight,
  Tv,
  Coins,
  ShieldAlert,
  Castle,
  Flame,
  Crown
} from 'lucide-react'

const ROLES = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT']

export default function MatchDetailPage() {
  const { id } = useParams()
  const [match, setMatch] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeGameIndex, setActiveGameIndex] = useState(0)

  useEffect(() => {
    async function fetchDetail() {
      try {
        const data = await api.getMatchDetail(id)
        if (data && !data.error && data.id) {
          setMatch(data)
        } else {
          setMatch(null)
        }
      } catch (e) {
        console.error('Match detail error:', e)
        setMatch(null)
      } finally {
        setLoading(false)
      }
    }
    fetchDetail()
  }, [id])

  if (loading) {
    return <LoadingSpinner message="Fetching Gol.gg Series Scoreboard & Drafts..." />
  }

  if (!match || !match.team1 || !match.team2) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4 space-y-4">
        <h2 className="text-base font-bold text-white uppercase tracking-wide">Match Not Found</h2>
        <Link
          to="/matches"
          className="inline-flex items-center gap-2 px-4 py-2 rounded bg-slate-800 text-white text-xs border border-slate-700 hover:bg-slate-700 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Schedule
        </Link>
      </div>
    )
  }

  const formattedDate = match.match_date
    ? (() => {
        try {
          return new Date(match.match_date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })
        } catch {
          return match.match_date
        }
      })()
    : '2026 Season'

  const draft = match.draft || {}
  const isUpcoming = match.status === 'upcoming'
  const games = Array.isArray(draft.games) && draft.games.length > 0 ? draft.games : []

  const currentGame = games[activeGameIndex] || null
  const t1Picks = currentGame?.team1_picks || []
  const t1Bans = currentGame?.team1_bans || []
  const t2Picks = currentGame?.team2_picks || []
  const t2Bans = currentGame?.team2_bans || []

  const t1Stats = currentGame?.team1_stats || []
  const t2Stats = currentGame?.team2_stats || []

  const activeVodUrl = currentGame?.vod_url || 'https://www.youtube.com'

  return (
    <div className="min-h-screen bg-[#0b1118] text-[#c8d4e0] font-sans pb-24 pt-3 px-2 sm:px-4 max-w-6xl mx-auto space-y-3">
      {/* Top Breadcrumb & Metadata Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2 px-1">
        <div className="flex items-center gap-1.5  text-[11px]">
          <Link to="/matches" className="hover:text-amber-400 transition text-slate-400">Schedule</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-slate-300 font-bold uppercase">{match.league}</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-amber-400 font-semibold">{match.team1?.short_name} vs {match.team2?.short_name}</span>
        </div>
        <div className="flex items-center gap-1 text-[11px]  text-slate-400">
          <Calendar className="w-3 h-3 text-slate-500" />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Series Header Banner */}
      <div className="bg-[#121922] border border-[#1e293b] rounded-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TeamLogo
            src={match.team1?.logo_url}
            alt={match.team1?.name}
            shortName={match.team1?.short_name}
            region={match.team1?.region}
            className="w-10 h-10 border border-[#2a3b52] bg-[#182232] p-0.5 rounded"
          />
          <div>
            <div className="font-bold text-base text-white">{match.team1?.name}</div>
            <div className="text-[11px]  text-slate-400">{match.team1?.region} &bull; {match.team1?.short_name}</div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-[10px]  uppercase tracking-widest text-slate-400">
            {match.league} &bull; {match.format || 'BO5'}
          </div>
          <div className="text-2xl  font-extrabold text-white tracking-wider my-0.5">
            <span className={match.team1_score > match.team2_score ? 'text-amber-400' : 'text-slate-300'}>
              {match.team1_score}
            </span>
            <span className="text-slate-600 mx-2">:</span>
            <span className={match.team2_score > match.team1_score ? 'text-amber-400' : 'text-slate-300'}>
              {match.team2_score}
            </span>
          </div>
          <div className="text-[10px]  uppercase text-slate-500">
            {match.status === 'finished' ? 'FINAL' : match.status}
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end text-right">
          <div>
            <div className="font-bold text-base text-white">{match.team2?.name}</div>
            <div className="text-[11px]  text-slate-400">{match.team2?.region} &bull; {match.team2?.short_name}</div>
          </div>
          <TeamLogo
            src={match.team2?.logo_url}
            alt={match.team2?.name}
            shortName={match.team2?.short_name}
            region={match.team2?.region}
            className="w-10 h-10 border border-[#2a3b52] bg-[#182232] p-0.5 rounded"
          />
        </div>
      </div>

      {isUpcoming || games.length === 0 ? (
        <div className="bg-[#121922] border border-[#1e293b] rounded-sm p-12 text-center space-y-3 ">
          <Clock className="w-8 h-8 text-amber-500 mx-auto animate-pulse" />
          <div className="text-sm font-bold text-white uppercase tracking-wider">
            Match Scheduled &bull; Upcoming
          </div>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Full gol.gg scoreboard, bans, player KDAs, and YouTube VODs will update live once this match commences on {formattedDate}.
          </p>
        </div>
      ) : (
        /* GOL.GG STYLE SCOREBOARD CARD */
        <div className="bg-[#101722] border border-[#1b2533] rounded-sm overflow-hidden shadow-2xl">
          {/* Subheader Navigation Bar (PREVIEW / GAME 1 / GAME 2 / etc.) */}
          <div className="bg-[#0b1017] border-b border-[#1b2533] px-3 py-1.5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1 overflow-x-auto text-xs  font-bold">
              <span className="px-2.5 py-1 text-slate-500 uppercase tracking-wider text-[11px]">GAMES:</span>
              {games.map((g, idx) => {
                const active = activeGameIndex === idx
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveGameIndex(idx)}
                    className={`px-3 py-1 uppercase transition border-b-2 text-[11px] ${
                      active
                        ? 'border-[#00bcd4] text-[#00bcd4] bg-[#121c29]'
                        : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    GAME {g.game_num || idx + 1}
                  </button>
                )
              })}
            </div>

            {/* Direct YouTube VOD Button */}
            <a
              href={activeVodUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#b91c1c]/20 hover:bg-[#b91c1c]/30 text-red-400 border border-red-700/50 text-[11px]  font-bold transition group"
            >
              <div className="w-3.5 h-3.5 rounded-full bg-red-600 flex items-center justify-center text-white">
                <Play className="w-2 h-2 fill-white ml-0.5" />
              </div>
              <span>WATCH GAME {currentGame?.game_num || activeGameIndex + 1} VOD</span>
              <ExternalLink className="w-3 h-3 text-red-400 opacity-70 group-hover:opacity-100" />
            </a>
          </div>

          {/* Game Header (Game Time & Patch on Top) */}
          <div className="bg-[#121a24] px-4 py-2 border-b border-[#1b2533] flex items-center justify-between  text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px]">Game Time</span>
              <span className="text-white font-bold text-sm">{currentGame?.duration || '30:25'}</span>
            </div>
            <div className="text-slate-500 text-[11px]">
              Patch {currentGame?.patch || 'v16.20'}
            </div>
          </div>

          {/* Teams Comparison Bar (Blue WIN vs Red LOSS Banner) */}
          <div className="grid grid-cols-2 divide-x divide-[#1b2533] border-b border-[#1b2533] bg-[#0e151e]">
            {/* Team 1 Side Banner */}
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#4da8da]">
                  {match.team1?.name} - {currentGame?.winner === 'team1' ? 'WIN' : 'LOSS'}
                </span>
                <span className="text-[10px]  uppercase px-1.5 py-0.5 rounded bg-blue-950/60 text-blue-400 border border-blue-900/50">
                  Blue Side
                </span>
              </div>

              
                                                        {/* Objective Stats: Kills, Turrets, Dragons, Barons, Gold */}
              <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                <div className="bg-[#141e2b] px-2 py-0.5 rounded border border-[#202e42] flex items-center gap-1.5" title="Kills">
                  <span className="text-xs">⚔️</span>
                  <span className="font-bold text-white">{currentGame?.team1_kills || 18}</span>
                </div>
                <div className="bg-[#141e2b] px-2 py-0.5 rounded border border-[#202e42] flex items-center gap-1.5" title="Turrets Destroyed">
                  <span className="text-xs">🏰</span>
                  <span className="font-bold text-slate-200">{currentGame?.team1_towers || 10}</span>
                </div>
                <div className="bg-[#141e2b] px-2 py-0.5 rounded border border-[#202e42] flex items-center gap-1.5" title="Dragons Slain">
                  <span className="text-xs">🐉</span>
                  <span className="font-bold text-orange-400">{currentGame?.team1_dragons || 3}</span>
                </div>
                <div className="bg-[#141e2b] px-2 py-0.5 rounded border border-[#202e42] flex items-center gap-1.5" title="Barons Slain">
                  <span className="text-xs">👾</span>
                  <span className="font-bold text-purple-400">{currentGame?.team1_barons || 1}</span>
                </div>
                <div className="bg-[#141e2b] px-2 py-0.5 rounded border border-[#202e42] flex items-center gap-1.5 ml-auto" title="Total Gold">
                  <span className="text-xs">💰</span>
                  <span className="font-bold text-amber-300">{currentGame?.team1_gold || '62.0k'}</span>
                </div>
              </div>

              {/* Bans Row */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px]  text-slate-400 uppercase">Bans:</span>
                <div className="flex items-center gap-1">
                  {t1Bans.map((champ, idx) => (
                    <div key={idx} className="relative group" title={`Banned: ${champ}`}>
                      <img
                        src={getChampIconUrl(champ)}
                        alt={champ}
                        className="w-5 h-5 rounded-full border border-slate-700 grayscale hover:grayscale-0 transition object-cover bg-slate-900"
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-full h-0.5 bg-red-600 rotate-45"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Picks Row Icon Strip */}
              <div className="flex items-center gap-2">
                <span className="text-[10px]  text-slate-400 uppercase">Picks:</span>
                <div className="flex items-center gap-1">
                  {t1Picks.map((champ, idx) => (
                    <img
                      key={idx}
                      src={getChampIconUrl(champ)}
                      alt={champ}
                      title={`Picked: ${champ}`}
                      className="w-6 h-6 rounded border border-blue-500/50 object-cover bg-slate-900"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Team 2 Side Banner */}
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#e06c75]">
                  {match.team2?.name} - {currentGame?.winner === 'team2' ? 'WIN' : 'LOSS'}
                </span>
                <span className="text-[10px]  uppercase px-1.5 py-0.5 rounded bg-red-950/60 text-red-400 border border-red-900/50">
                  Red Side
                </span>
              </div>

              
                            {/* Objective Stats: Kills, Turrets, Dragons, Barons, Gold */}
              <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                <div className="bg-[#141e2b] px-2 py-0.5 rounded border border-[#202e42] flex items-center gap-1.5" title="Kills">
                  <span className="text-xs">⚔️</span>
                  <span className="font-bold text-white">{currentGame?.team2_kills || 6}</span>
                </div>
                <div className="bg-[#141e2b] px-2 py-0.5 rounded border border-[#202e42] flex items-center gap-1.5" title="Turrets Destroyed">
                  <span className="text-xs">🏰</span>
                  <span className="font-bold text-slate-200">{currentGame?.team2_towers || 3}</span>
                </div>
                <div className="bg-[#141e2b] px-2 py-0.5 rounded border border-[#202e42] flex items-center gap-1.5" title="Dragons Slain">
                  <span className="text-xs">🐉</span>
                  <span className="font-bold text-orange-400">{currentGame?.team2_dragons || 1}</span>
                </div>
                <div className="bg-[#141e2b] px-2 py-0.5 rounded border border-[#202e42] flex items-center gap-1.5" title="Barons Slain">
                  <span className="text-xs">👾</span>
                  <span className="font-bold text-purple-400">{currentGame?.team2_barons || 0}</span>
                </div>
                <div className="bg-[#141e2b] px-2 py-0.5 rounded border border-[#202e42] flex items-center gap-1.5 ml-auto" title="Total Gold">
                  <span className="text-xs">💰</span>
                  <span className="font-bold text-amber-300">{currentGame?.team2_gold || '54.2k'}</span>
                </div>
              </div>

              {/* Bans Row */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px]  text-slate-400 uppercase">Bans:</span>
                <div className="flex items-center gap-1">
                  {t2Bans.map((champ, idx) => (
                    <div key={idx} className="relative group" title={`Banned: ${champ}`}>
                      <img
                        src={getChampIconUrl(champ)}
                        alt={champ}
                        className="w-5 h-5 rounded-full border border-slate-700 grayscale hover:grayscale-0 transition object-cover bg-slate-900"
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-full h-0.5 bg-red-600 rotate-45"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Picks Row Icon Strip */}
              <div className="flex items-center gap-2">
                <span className="text-[10px]  text-slate-400 uppercase">Picks:</span>
                <div className="flex items-center gap-1">
                  {t2Picks.map((champ, idx) => (
                    <img
                      key={idx}
                      src={getChampIconUrl(champ)}
                      alt={champ}
                      title={`Picked: ${champ}`}
                      className="w-6 h-6 rounded border border-red-500/50 object-cover bg-slate-900"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* GOL.GG EXACT SCOREBOARD TABLE (Side-by-Side: Player | KDA | CS) */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#1b2533] bg-[#0c1219]">
            {/* Team 1 Players Table */}
            <div>
              <div className="bg-[#111923] px-3 py-1.5 border-b border-[#1b2533] flex items-center justify-between text-[11px]  font-bold text-slate-400">
                <span>Player</span>
                <div className="flex items-center gap-8">
                  <span>KDA</span>
                  <span className="w-8 text-right">CS</span>
                </div>
              </div>
              <div className="divide-y divide-[#17212f]">
                {t1Picks.map((champ, idx) => {
                  const stat = t1Stats[idx] || {}
                  const playerName = stat.player || (match.team1?.roster && match.team1.roster[idx]?.ign) || 'Player'
                  const kda = stat.kda || '2/1/8'
                  const cs = stat.cs || 230
                  return (
                    <div key={idx} className="px-3 py-2 flex items-center justify-between text-xs  hover:bg-[#121c2a] transition">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={getChampIconUrl(champ)}
                          alt={champ}
                          className="w-8 h-8 rounded border border-blue-500/40 object-cover bg-slate-900"
                        />
                        <div>
                          <div className="font-bold text-white text-xs">{playerName}</div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1">
                            <span className="text-blue-400 font-bold">{ROLES[idx]}</span>
                            <span>&bull; {champ}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-8 text-xs">
                        <span className="font-bold text-slate-200">{kda}</span>
                        <span className="w-8 text-right text-slate-400 font-semibold">{cs}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Team 2 Players Table */}
            <div>
              <div className="bg-[#111923] px-3 py-1.5 border-b border-[#1b2533] flex items-center justify-between text-[11px]  font-bold text-slate-400">
                <span>Player</span>
                <div className="flex items-center gap-8">
                  <span>KDA</span>
                  <span className="w-8 text-right">CS</span>
                </div>
              </div>
              <div className="divide-y divide-[#17212f]">
                {t2Picks.map((champ, idx) => {
                  const stat = t2Stats[idx] || {}
                  const playerName = stat.player || (match.team2?.roster && match.team2.roster[idx]?.ign) || 'Player'
                  const kda = stat.kda || '1/3/4'
                  const cs = stat.cs || 210
                  return (
                    <div key={idx} className="px-3 py-2 flex items-center justify-between text-xs  hover:bg-[#121c2a] transition">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={getChampIconUrl(champ)}
                          alt={champ}
                          className="w-8 h-8 rounded border border-red-500/40 object-cover bg-slate-900"
                        />
                        <div>
                          <div className="font-bold text-white text-xs">{playerName}</div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1">
                            <span className="text-red-400 font-bold">{ROLES[idx]}</span>
                            <span>&bull; {champ}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-8 text-xs">
                        <span className="font-bold text-slate-200">{kda}</span>
                        <span className="w-8 text-right text-slate-400 font-semibold">{cs}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


