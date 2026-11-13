import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import TeamLogo from '../components/TeamLogo'
import LoadingSpinner from '../components/LoadingSpinner'
import { Calendar, Play, ChevronRight } from 'lucide-react'

const leagues = ['ALL', 'LCK', 'LPL', 'LEC', 'LCS', 'CBLOL', 'FIRST STAND', 'MSI', 'WORLDS']
const statuses = ['ALL', 'LIVE', 'UPCOMING', 'FINISHED']

export default function MatchesPage() {
  const [matches, setMatches] = useState([])
  const [selectedLeague, setSelectedLeague] = useState('ALL')
  const [selectedStatus, setSelectedStatus] = useState('ALL')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMatches() {
      setLoading(true)
      try {
        const queryLeague = selectedLeague === 'ALL' ? 'All' : selectedLeague
        const queryStatus = selectedStatus === 'ALL' ? 'All' : selectedStatus.toLowerCase()
        const data = await api.getMatches(queryStatus, queryLeague)
        setMatches(data || [])
      } catch (err) {
        console.error('Fetch matches error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchMatches()
  }, [selectedStatus, selectedLeague])

  return (
    <div className="pb-24 pt-3 px-2 sm:px-4 max-w-6xl mx-auto space-y-3 font-sans text-slate-200">
      {/* Page Title & Filter Bar */}
      <div className="bg-[#101722] border border-[#1b2533] p-3 rounded-sm space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1b2533] pb-2">
          <div>
            <h1 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              LoLScout Match Archive & Schedule
            </h1>
            <p className="text-[11px] font-mono text-slate-400">
              Tier-1 competitive match results, Fearless champion drafts, and VOD links
            </p>
          </div>
          <div className="text-[11px] font-mono text-[#00bcd4] font-bold">
            Showing {matches.length} Series
          </div>
        </div>

        {/* Filter Row 1: Status */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono font-bold">
          <span className="text-slate-500 uppercase text-[10px] mr-1">Status:</span>
          {statuses.map(st => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-2.5 py-1 rounded transition ${
                selectedStatus === st
                  ? 'bg-[#00bcd4] text-slate-950 shadow-sm'
                  : 'bg-[#162232] text-slate-400 hover:text-white border border-[#233348]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Filter Row 2: League Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono font-bold pt-1">
          <span className="text-slate-500 uppercase text-[10px] mr-1">League:</span>
          {leagues.map(lg => (
            <button
              key={lg}
              onClick={() => setSelectedLeague(lg)}
              className={`px-2.5 py-0.5 rounded transition uppercase ${
                selectedLeague === lg
                  ? 'bg-[#1b2f4a] text-[#00bcd4] border border-[#00bcd4]/50'
                  : 'bg-[#0b1017] text-slate-400 hover:text-slate-200 border border-[#1b2533]'
              }`}
            >
              {lg}
            </button>
          ))}
        </div>
      </div>

      {/* Match Table / Rows */}
      {loading ? (
        <LoadingSpinner message="Syncing Match Database & VODs..." />
      ) : matches.length === 0 ? (
        <div className="py-20 text-center text-slate-500 text-xs font-mono bg-[#101722] border border-[#1b2533] rounded-sm">
          No matches found matching the selected league/status filters.
        </div>
      ) : (
        <div className="bg-[#0e151e] border border-[#1b2533] rounded-sm overflow-hidden divide-y divide-[#17212f]">
          {matches.map(m => {
            const dateStr = m.match_date
              ? new Date(m.match_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              : '2026'
            const isFinished = m.status === 'finished'

            return (
              <Link
                key={m.id}
                to={`/matches/${m.id}`}
                className="p-3 block hover:bg-[#121c2a] transition group"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#00bcd4] uppercase">
                      {m.league} • {m.format || 'BO5'}
                    </span>
                    <span className="text-slate-600">|</span>
                    <span className="text-slate-400">{dateStr}</span>
                  </div>
                  <span className={`text-[10px] font-mono uppercase px-1.5 py-0.2 rounded font-bold ${
                    isFinished ? 'text-slate-400 bg-slate-900 border border-slate-800' : 'text-amber-400 bg-amber-950/60 border border-amber-800'
                  }`}>
                    {m.status}
                  </span>
                </div>

                <div className="grid grid-cols-7 items-center gap-2">
                  {/* Team 1 */}
                  <div className="col-span-3 flex items-center gap-2.5 justify-end text-right">
                    <div>
                      <div className="font-bold text-sm text-white group-hover:text-[#00bcd4] transition">
                        {m.team1?.name}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">{m.team1?.region} • {m.team1?.short_name}</div>
                    </div>
                    <TeamLogo
                      src={m.team1?.logo_url}
                      alt={m.team1?.name}
                      shortName={m.team1?.short_name}
                      region={m.team1?.region}
                      className="w-9 h-9 rounded border border-slate-800 bg-[#0b1118] p-0.5 flex-shrink-0"
                    />
                  </div>

                  {/* Score */}
                  <div className="col-span-1 flex flex-col items-center justify-center font-mono">
                    {m.status === 'upcoming' ? (
                      <span className="text-xs font-bold text-slate-500 uppercase px-2 py-0.5 bg-[#0b1017] border border-[#1b2533] rounded">
                        VS
                      </span>
                    ) : (
                      <div className="text-base font-extrabold text-white bg-[#0b1017] px-2.5 py-0.5 rounded border border-[#1b2533]">
                        <span className={m.team1_score > m.team2_score ? 'text-amber-400' : 'text-slate-300'}>
                          {m.team1_score}
                        </span>
                        <span className="text-slate-600 mx-1">:</span>
                        <span className={m.team2_score > m.team1_score ? 'text-amber-400' : 'text-slate-300'}>
                          {m.team2_score}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Team 2 */}
                  <div className="col-span-3 flex items-center gap-2.5 justify-start text-left">
                    <TeamLogo
                      src={m.team2?.logo_url}
                      alt={m.team2?.name}
                      shortName={m.team2?.short_name}
                      region={m.team2?.region}
                      className="w-9 h-9 rounded border border-slate-800 bg-[#0b1118] p-0.5 flex-shrink-0"
                    />
                    <div>
                      <div className="font-bold text-sm text-white group-hover:text-[#00bcd4] transition">
                        {m.team2?.name}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">{m.team2?.region} • {m.team2?.short_name}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-[#17212f] flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>
                    {m.mvp ? (
                      <>MVP: <strong className="text-amber-300 font-semibold">{m.mvp}</strong></>
                    ) : (
                      <span className="text-slate-500">Draft data verified</span>
                    )}
                  </span>
                  <span className="text-[#00bcd4] group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-bold">
                    Inspect Draft & VOD →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
