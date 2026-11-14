import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Calendar, Users2, Bookmark, User } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/matches', label: 'Schedule', icon: Calendar },
  { to: '/teams', label: 'Teams', icon: Users2 },
  { to: '/favorites', label: 'Watchlist', icon: Bookmark },
  { to: '/profile', label: 'Profile', icon: User },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0b0f17]/90 backdrop-blur-lg border-t border-[#1e293b] px-3 py-1.5 shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `
              flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition duration-150 text-[11px]
              ${isActive 
                ? 'text-cyan-400 font-semibold bg-cyan-500/10' 
                : 'text-slate-400 hover:text-slate-200 font-medium'}
            `}
          >
            <Icon className="w-4 h-4 mb-1" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
