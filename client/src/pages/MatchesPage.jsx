import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import TeamLogo from '../components/TeamLogo'
import { Calendar, Play, ChevronRight, Filter } from 'lucide-react'

const leagues = ['ALL', 'LCK', 'LPL', 'LEC', 'LCS', 'CBLOL', 'MSI', 'WORLDS']
const statuses = ['ALL', 'FINISHED', 'UPCOMING', 'LIVE']

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
    <div className="pb-28 pt-4 px-4 sm:px-6 max-w-6xl mx-auto space-y-4">
      {/* Top Banner Filter */}
      <div className="p-5 rounded-2xl bg-[#111827] border border-[#1e293b] space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Jadwal & Hasil Pertandingan
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Arsip kompetitif tier-1, data Fearless Draft picks & bans, dan tautan YouTube VOD.
            </p>
          </div>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 w-fit">
            {matches.length} Pertandingan
          </span>
        </div>

        {/* Filter Row: Region Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-[#1e293b]">
          {leagues.map(lg => (
            <button
              key={lg}
              onClick={() => setSelectedLeague(lg)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer shrink-0 ${
                selectedLeague === lg
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {lg === 'ALL' ? 'Semua Liga' : lg}
            </button>
          ))}
        </div>
      </div>

      {/* Match Table List */}
      <div className="rounded-2xl bg-[#111827] border border-[#1e293b] overflow-hidden shadow-sm divide-y divide-[#1e293b]">
        {loading ? (
          <div className="py-24 text-center text-slate-500 text-xs animate-pulse">
            Memuat arsip pertandingan...
          </div>
        ) : matches.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            Tidak ada pertandingan yang cocok dengan filter yang dipilih.
          </div>
        ) : (
          matches.map(m => {
            const dateStr = m.match_date ? new Date(m.match_date).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' }) : '2026'
            return (
              <Link
                key={m.id}
                to={`/matches/${m.id}`}
                className="p-4 block hover:bg-[#151e2e] transition duration-150 group"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-blue-400 text-[11px]">
                      {m.league}
                    </span>
                    <span>â€¢</span>
                    <span className="text-slate-400 text-[11px] ">{m.format || 'BO3'}</span>
                  </div>
                  <span className="text-[11px]">{dateStr}</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  {/* Team 1 */}
                  <div className="flex items-center gap-3 flex-1 justify-end text-right">
                    <div>
                      <span className="font-semibold text-sm text-white group-hover:text-blue-400 transition block">
                        {m.team1?.name}
                      </span>
                      <span className="text-[10px] text-slate-400">{m.team1?.region}</span>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-[#0b0f17] border border-[#1e293b] p-1.5 flex items-center justify-center shrink-0">
                      <TeamLogo
                        src={m.team1?.logo_url}
                        alt={m.team1?.name}
                        shortName={m.team1?.short_name}
                        region={m.team1?.region}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Score & Status */}
                  <div className="flex flex-col items-center gap-1 shrink-0 px-2">
                    <div className="px-3 py-1 rounded-xl bg-[#0b0f17] border border-[#1e293b]  font-bold text-sm text-white">
                      {m.team1_score} : {m.team2_score}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">
                      {m.status}
                    </span>
                  </div>

                  {/* Team 2 */}
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-9 h-9 rounded-xl bg-[#0b0f17] border border-[#1e293b] p-1.5 flex items-center justify-center shrink-0">
                      <TeamLogo
                        src={m.team2?.logo_url}
                        alt={m.team2?.name}
                        shortName={m.team2?.short_name}
                        region={m.team2?.region}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-sm text-white group-hover:text-blue-400 transition block">
                        {m.team2?.name}
                      </span>
                      <span className="text-[10px] text-slate-400">{m.team2?.region}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}

