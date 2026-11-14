import LoadingSpinner from '../components/LoadingSpinner'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import TeamLogo from '../components/TeamLogo'
import { Shield, ChevronRight, Users2 } from 'lucide-react'

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
    <div className="pb-28 pt-4 px-4 sm:px-6 max-w-6xl mx-auto space-y-4">
      {/* Top Banner Filter */}
      <div className="p-5 rounded-2xl bg-[#111827] border border-[#1e293b] space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Direktori Tim Pro 2026
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Daftar roster 5 role aktif pro play di 5 region Tier-1 dan turnamen internasional.
            </p>
          </div>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 w-fit">
            {teams.length} Tim Terdata
          </span>
        </div>

        {/* Region Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-[#1e293b]">
          {REGIONS.map(reg => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer shrink-0 ${
                selectedRegion === reg
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {reg === 'ALL' ? 'Semua Region' : reg}
            </button>
          ))}
        </div>
      </div>

      {/* Teams Grid */}
      {loading ? (
        <LoadingSpinner message="Memuat direktori 53 tim dan roster 2026..." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {teams.map(t => (
            <Link
              key={t.id}
              to={`/teams/${t.id}`}
              className="p-4 rounded-2xl bg-[#111827] border border-[#1e293b] hover:border-slate-700 hover:bg-[#151e2e] transition duration-150 block group shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-blue-400">
                  {t.region}
                </span>
                {t.standing_summer === 1 ? (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
                    Seed #1
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400">
                    Seed #{t.standing_summer}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-[#0b0f17] border border-[#1e293b] p-1.5 flex items-center justify-center shrink-0 group-hover:border-blue-500/40 transition">
                  <TeamLogo
                    src={t.logo_url}
                    alt={t.name}
                    shortName={t.short_name}
                    region={t.region}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white group-hover:text-blue-400 transition">
                    {t.name}
                  </h3>
                  <span className="text-[11px] text-slate-400 ">Code: {t.short_name}</span>
                </div>
              </div>

              {/* Roster Preview */}
              {t.roster && t.roster.length > 0 && (
                <div className="pt-2.5 border-t border-[#1e293b]/70 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate">
                    Lineup: {t.roster.map(p => p.ign).join(', ')}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition shrink-0 ml-1" />
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

