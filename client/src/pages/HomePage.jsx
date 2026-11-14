import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import TeamLogo from '../components/TeamLogo'
import { Calendar, ChevronRight, Trophy, Users, Play, Activity } from 'lucide-react'

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
  const summerChampions = teams.filter(t => t.standing_summer === 1).slice(0, 5)

  return (
    <div className="pb-28 pt-4 px-4 sm:px-6 max-w-6xl mx-auto space-y-5">
      {/* Overview Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="p-5 rounded-2xl bg-[#111827] border border-[#1e293b] md:col-span-2 flex flex-col justify-between shadow-sm">
          <div>
            <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Season 2026 Overview
            </span>
            <h1 className="text-xl font-bold text-white mt-1">
              LoLScout Competitive Hub
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Platform analitik resmi Fearless Draft, rekaman VOD pertandingan, dan direktori tim Tier-1.
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <Link
              to="/matches"
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              <span>Jadwal & Hasil</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/teams"
              className="px-3.5 py-2 rounded-xl bg-[#0b0f17] hover:bg-slate-800 text-slate-300 border border-[#1e293b] text-xs font-medium transition"
            >
              Semua {teams.length > 0 ? teams.length : 53} Tim
            </Link>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111827] border border-[#1e293b] flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Database Match</span>
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-bold text-white">{matches.length}</span>
            <span className="text-xs text-slate-400 block mt-0.5">Pertandingan Real Pro</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111827] border border-[#1e293b] flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Tim Terdaftar</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-bold text-emerald-400">{teams.length}</span>
            <span className="text-xs text-slate-400 block mt-0.5">5 Region Tier-1</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Recent Matches & Regional Champions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Matches */}
        <div className="lg:col-span-2 rounded-2xl bg-[#111827] border border-[#1e293b] overflow-hidden shadow-sm">
          <div className="p-4 border-b border-[#1e293b] flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              Pertandingan Terbaru & Skor
            </h2>
            <Link to="/matches" className="text-xs text-blue-400 hover:text-blue-300 font-medium">
              Lihat Semua â†’
            </Link>
          </div>

          <div className="divide-y divide-[#1e293b]">
            {loading ? (
              <div className="py-16 text-center text-slate-500 text-xs animate-pulse">
                Memuat pertandingan...
              </div>
            ) : finishedMatches.map(m => {
              const dateStr = m.match_date ? new Date(m.match_date).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' }) : '2026'
              return (
                <Link
                  key={m.id}
                  to={`/matches/${m.id}`}
                  className="p-4 block hover:bg-[#151e2e] transition group"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-blue-400 text-[11px]">
                      {m.league} â€¢ {m.format || 'BO3'}
                    </span>
                    <span className="text-[11px]">{dateStr}</span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    {/* Team 1 */}
                    <div className="flex items-center gap-2.5 flex-1 justify-end text-right">
                      <span className="font-semibold text-sm text-white group-hover:text-blue-400 transition">
                        {m.team1?.name}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-[#0b0f17] border border-[#1e293b] p-1 flex items-center justify-center shrink-0">
                        <TeamLogo
                          src={m.team1?.logo_url}
                          alt={m.team1?.name}
                          shortName={m.team1?.short_name}
                          region={m.team1?.region}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Score */}
                    <div className="px-3 py-1 rounded-lg bg-[#0b0f17] border border-[#1e293b]  font-bold text-sm text-white shrink-0">
                      {m.team1_score} : {m.team2_score}
                    </div>

                    {/* Team 2 */}
                    <div className="flex items-center gap-2.5 flex-1">
                      <div className="w-8 h-8 rounded-lg bg-[#0b0f17] border border-[#1e293b] p-1 flex items-center justify-center shrink-0">
                        <TeamLogo
                          src={m.team2?.logo_url}
                          alt={m.team2?.name}
                          shortName={m.team2?.short_name}
                          region={m.team2?.region}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="font-semibold text-sm text-white group-hover:text-blue-400 transition">
                        {m.team2?.name}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Top Regional Seeds / Champions */}
        <div className="rounded-2xl bg-[#111827] border border-[#1e293b] overflow-hidden shadow-sm">
          <div className="p-4 border-b border-[#1e293b] flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              Unggulan #1 Regional
            </h2>
            <Link to="/teams" className="text-xs text-blue-400 hover:text-blue-300 font-medium">
              Semua Tim â†’
            </Link>
          </div>

          <div className="divide-y divide-[#1e293b]">
            {summerChampions.map(t => (
              <Link
                key={t.id}
                to={`/teams/${t.id}`}
                className="p-3.5 flex items-center justify-between hover:bg-[#151e2e] transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0b0f17] border border-[#1e293b] p-1 flex items-center justify-center shrink-0 group-hover:border-blue-500/50 transition">
                    <TeamLogo
                      src={t.logo_url}
                      alt={t.name}
                      shortName={t.short_name}
                      region={t.region}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs text-white group-hover:text-blue-400 transition">
                      {t.name}
                    </h3>
                    <span className="text-[10px] text-slate-400">{t.region} Circuit 2026</span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  Seed #1
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

