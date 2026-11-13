import React from 'react'
import { Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-[#0c1219] border-b border-[#1b2533] px-3 sm:px-4 py-2.5 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded bg-[#162232] border border-[#2b3d56] flex items-center justify-center text-[#4da8da]">
            <Shield className="w-4 h-4 fill-[#4da8da]/20 text-[#4da8da]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-mono font-bold text-base tracking-wider text-white">
                LoL<span className="text-[#00bcd4]">Scout</span>
              </span>
              <span className="text-[10px] font-mono text-[#00bcd4] bg-[#00bcd4]/10 border border-[#00bcd4]/30 px-1 py-0.2 rounded font-semibold">
                PRO 2026
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 tracking-tight mt-0.5">Competitive Draft & Match Intelligence</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-slate-300">
            <Link to="/matches" className="hover:text-[#00bcd4] transition">Schedule</Link>
            <Link to="/teams" className="hover:text-[#00bcd4] transition">Teams</Link>
            <Link to="/favorites" className="hover:text-[#00bcd4] transition">Watchlist</Link>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            SYNCED
          </span>
        </div>
      </div>
    </header>
  )
}
