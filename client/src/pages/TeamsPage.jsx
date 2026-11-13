import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import TeamLogo from '../components/TeamLogo'
import LoadingSpinner from '../components/LoadingSpinner'

const REGIONS = ['ALL', 'LCK', 'LPL', 'LEC', 'LCS', 'CBLOL']

export default function TeamsPage() {
  const [teams, setTeams] = useState([])
  const [selectedRegion, setSelectedRegion] = useState('ALL')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTeams() {
      setLoading(true)
      try {
        const data = await api.getTeams(selectedRegion === 'ALL' ? undefined : selectedRegion)
        setTeams(data || [])
      } catch (err) {
        console.error('Fetch teams error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchTeams()
  }, [selectedRegion])

  return (
    <div className="pb-24 pt-3 px-2 sm:px-4 max-w-6xl mx-auto space-y-3 font-sans text-slate-200">
      <div className="bg-[#101722] border border-[#1b2533] p-3 rounded-sm flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
            LoLScout Tier-1 Team Directory
          </h1>
          <p className="text-[11px] font-mono text-slate-400">
            Active 2026 pro rosters and regional seeds across 5 major leagues
          </p>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto text-[11px] font-mono font-bold">
          {REGIONS.map(reg => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-2.5 py-1 rounded transition ${
                selectedRegion === reg
                  ? 'bg-[#00bcd4] text-slate-950 shadow-sm'
                  : 'bg-[#162232] text-slate-400 hover:text-white border border-[#233348]'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading Tier-1 Pro Rosters..." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {teams.map(t => (
            <Link
              key={t.id}
              to={`/teams/${t.id}`}
              className="p-3 rounded-sm bg-[#0e151e] border border-[#1b2533] hover:border-[#00bcd4]/50 hover:bg-[#121c2a] transition block group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-900 text-[#00bcd4] border border-slate-800 uppercase">
                  {t.region}
                </span>
                {t.standing_summer === 1 && (
                  <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-800">
                    #1 SEED
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <TeamLogo
                  src={t.logo_url}
                  alt={t.name}
                  shortName={t.short_name}
                  region={t.region}
                  className="w-10 h-10 rounded border border-slate-800 bg-[#0b1118] p-0.5 flex-shrink-0"
                />
                <div>
                  <div className="font-bold text-sm text-white group-hover:text-[#00bcd4] transition leading-tight">
                    {t.name}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                    Code: <strong className="text-slate-200">{t.short_name}</strong>
                  </div>
                </div>
              </div>

              {Array.isArray(t.roster) && t.roster.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-[#17212f] text-[10px] font-mono text-slate-400 truncate">
                  Lineup: {t.roster.filter(p => p.role !== 'Coach').map(p => p.ign).join(', ')}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
