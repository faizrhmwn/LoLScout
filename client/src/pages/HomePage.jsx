import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import TeamLogo from '../components/TeamLogo'
import { Calendar, ChevronRight, Swords, Shield, ExternalLink, Play } from 'lucide-react'

export default function HomePage() {
  const [matches, setMatches] = useState([])
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [mRes, tRes] = await Promise.all([
          api.getMatches(),
          api.getTeams()
        ])
        setMatches(mRes || [])
        setTeams(tRes || [])
      } catch (e) {
        console.error('Home load error:', e)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const finishedMatches = matches.filter(m => m.status === 'finished').slice(0, 5)
  const upcomingMatch = matches.find(m => m.status === 'upcoming') || matches[0]
  const summerChampions = teams.filter(t => t.standing_summer === 1)

  return (
    <div className="pb-24 pt-3 px-2 sm:px-4 max-w-6xl mx-auto space-y-4 font-sans text-slate-200">
      {/* Top Breadcrumb & Live Hub Status */}
      <div className="bg-[#101722] border border-[#1b2533] p-3 rounded-sm flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="text-[11px] font-mono text-[#00bcd4] font-bold uppercase tracking-wider">
            Tier-1 Circuit 2026 Season Hub
          </div>
          <div className="text-sm font-mono font-bold text-white">
            LoLScout — Pro League Database & Fearless Draft Analytics
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/matches"
            className="px-3 py-1.5 rounded bg-[#162232] hover:bg-[#1e2f46] text-[#00bcd4] border border-[#2b3d56] text-xs font-mono font-bold transition flex items-center gap-1.5"
          >
            <span>Full Schedule & VODs</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/teams"
            className="px-3 py-1.5 rounded bg-[#101722] hover:bg-[#162232] text-slate-300 border border-[#1b2533] text-xs font-mono font-semibold transition"
          >
            All 30 Teams
          </Link>
        </div>
      </div>

      {/* Main Grid: Latest Knockout Series on Left, Standing / Seeds on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left 2 Cols: Recent Knockouts & Finals */}
        <div className="lg:col-span-2 space-y-3">
          <div className="bg-[#0e151e] border border-[#1b2533] rounded-sm overflow-hidden">
            <div className="bg-[#0b1017] px-3 py-2 border-b border-[#1b2533] flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-slate-300 uppercase tracking-wider">Recent Series & Finals Scoreboards</span>
              <Link to="/matches" className="text-[#00bcd4] hover:underline text-[11px]">View All 54 Matches →</Link>
            </div>

            <div className="divide-y divide-[#17212f]">
              {finishedMatches.map(m => {
                const dateStr = m.match_date ? new Date(m.match_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '2026'
                return (
                  <Link
                    key={m.id}
                    to={`/matches/${m.id}`}
                    className="p-3 block hover:bg-[#121c2a] transition group"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                      <span className="font-bold text-[#00bcd4] uppercase">
                        {m.league} • {m.format || 'BO5'}
                      </span>
                      <span>{dateStr}</span>
                    </div>

                    <div className="grid grid-cols-7 items-center gap-2">
                      {/* Team 1 */}
                      <div className="col-span-3 flex items-center gap-2 justify-end text-right">
                        <div>
                          <div className="font-bold text-sm text-white group-hover:text-[#00bcd4] transition">
                            {m.team1?.name}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400">{m.team1?.region}</div>
                        </div>
                        <TeamLogo
                          src={m.team1?.logo_url}
                          alt={m.team1?.name}
                          shortName={m.team1?.short_name}
                          region={m.team1?.region}
                          className="w-8 h-8 rounded border border-slate-800 bg-[#0b1118] p-0.5 flex-shrink-0"
                        />
                      </div>

                      {/* Score */}
                      <div className="col-span-1 flex flex-col items-center justify-center font-mono">
                        <div className="text-base font-extrabold text-white bg-[#0b1017] px-2 py-0.5 rounded border border-[#1b2533]">
                          <span className={m.team1_score > m.team2_score ? 'text-amber-400' : 'text-slate-300'}>{m.team1_score}</span>
                          <span className="text-slate-600 mx-1">:</span>
                          <span className={m.team2_score > m.team1_score ? 'text-amber-400' : 'text-slate-300'}>{m.team2_score}</span>
                        </div>
                      </div>

                      {/* Team 2 */}
                      <div className="col-span-3 flex items-center gap-2 justify-start text-left">
                        <TeamLogo
                          src={m.team2?.logo_url}
                          alt={m.team2?.name}
                          shortName={m.team2?.short_name}
                          region={m.team2?.region}
                          className="w-8 h-8 rounded border border-slate-800 bg-[#0b1118] p-0.5 flex-shrink-0"
                        />
                        <div>
                          <div className="font-bold text-sm text-white group-hover:text-[#00bcd4] transition">
                            {m.team2?.name}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400">{m.team2?.region}</div>
                        </div>
                      </div>
                    </div>

                    {m.mvp && (
                      <div className="mt-2 text-right text-[10px] font-mono text-slate-400">
                        Series MVP: <span className="text-amber-300 font-semibold">{m.mvp}</span>
                      </div>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Regional #1 Champions & Next Upcoming Match */}
        <div className="space-y-3">
          {/* Upcoming Match Card */}
          {upcomingMatch && (
            <div className="bg-[#0e151e] border border-[#1b2533] rounded-sm overflow-hidden">
              <div className="bg-[#0b1017] px-3 py-2 border-b border-[#1b2533] flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-amber-400 uppercase">Upcoming Highlight</span>
                <span className="text-[10px] text-slate-400">Scheduled</span>
              </div>
              <div className="p-3 space-y-2">
                <div className="text-[10px] font-mono text-slate-400 uppercase">
                  {upcomingMatch.league} • {upcomingMatch.format || 'BO5'}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TeamLogo src={upcomingMatch.team1?.logo_url} shortName={upcomingMatch.team1?.short_name} className="w-8 h-8 rounded border border-slate-800 p-0.5" />
                    <span className="font-bold text-sm text-white">{upcomingMatch.team1?.short_name}</span>
                  </div>
                  <span className="font-mono text-xs font-extrabold text-slate-500 uppercase px-2 py-0.5 bg-[#0b1017] border border-[#1b2533] rounded">VS</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{upcomingMatch.team2?.short_name}</span>
                    <TeamLogo src={upcomingMatch.team2?.logo_url} shortName={upcomingMatch.team2?.short_name} className="w-8 h-8 rounded border border-slate-800 p-0.5" />
                  </div>
                </div>
                <Link
                  to={`/matches/${upcomingMatch.id}`}
                  className="block text-center w-full py-1.5 rounded bg-[#162232] hover:bg-[#1e2f46] text-[#00bcd4] border border-[#2b3d56] text-xs font-mono font-bold transition mt-2"
                >
                  Inspect Match Preview
                </Link>
              </div>
            </div>
          )}

          {/* Regional Summer Champions (#1 Seeds) */}
          <div className="bg-[#0e151e] border border-[#1b2533] rounded-sm overflow-hidden">
            <div className="bg-[#0b1017] px-3 py-2 border-b border-[#1b2533] flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-slate-300 uppercase">2026 Regional Champions</span>
              <span className="text-[10px] text-amber-400">#1 Seeds</span>
            </div>
            <div className="divide-y divide-[#17212f]">
              {summerChampions.map(t => (
                <Link
                  key={t.id}
                  to={`/teams/${t.id}`}
                  className="px-3 py-2 flex items-center justify-between hover:bg-[#121c2a] transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <TeamLogo src={t.logo_url} alt={t.name} shortName={t.short_name} region={t.region} className="w-7 h-7 rounded border border-slate-800 p-0.5" />
                    <div>
                      <div className="font-bold text-xs text-white group-hover:text-[#00bcd4] transition">{t.name}</div>
                      <div className="text-[10px] font-mono text-slate-400">{t.short_name}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {t.region} #1
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
