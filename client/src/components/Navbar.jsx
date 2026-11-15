import React from 'react'
import { Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-[#0b0f17]/95 backdrop-blur-md border-b border-[#1e293b] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#1e293b] flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/10 transition">
            <Shield className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-bold text-sm tracking-tight text-white">
                LoL<span className="text-cyan-400">Scout</span>
              </span>
              <span className="text-[10px] font-medium text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded">
                2026
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">Competitive Esports Hub</p>
          </div>
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden sm:flex items-center gap-5 text-xs text-slate-400">
            <Link to="/matches" className="hover:text-white transition">Schedule</Link>
            <Link to="/teams" className="hover:text-white transition">Teams</Link>
            <Link to="/favorites" className="hover:text-white transition">Watchlist</Link>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
