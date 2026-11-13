import React from 'react'
import { NavLink } from 'react-router-dom'
import { Calendar, Shield, Bookmark, User, Trophy } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Overview', icon: Trophy },
  { to: '/matches', label: 'Schedule', icon: Calendar },
  { to: '/teams', label: 'Teams', icon: Shield },
  { to: '/favorites', label: 'Watchlist', icon: Bookmark },
  { to: '/profile', label: 'Config', icon: User },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0b1017] border-t border-[#1b2533] px-2 py-1 shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `
              flex flex-col items-center justify-center py-1 px-3 rounded transition font-mono text-[10px]
              ${isActive 
                ? 'text-[#00bcd4] font-bold' 
                : 'text-slate-400 hover:text-slate-200 font-medium'}
            `}
          >
            <Icon className="w-4 h-4 mb-0.5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
