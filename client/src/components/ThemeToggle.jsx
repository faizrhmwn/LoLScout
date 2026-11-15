import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle({ className = '', showLabel = false }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
      title={isDark ? 'Mode Terang' : 'Mode Gelap'}
      className={`
        relative inline-flex items-center gap-2 p-2 rounded-xl transition-all duration-200 cursor-pointer select-none shadow-sm
        ${isDark
          ? 'border border-[#1e293b] hover:border-cyan-500/40 bg-[#111827] hover:bg-[#151e2e] text-slate-300 hover:text-cyan-400'
          : 'border border-slate-200 hover:border-sky-400 bg-white hover:bg-sky-50 text-slate-600 hover:text-sky-600'
        }
        ${className}
      `}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Moon className="w-4 h-4 text-cyan-400 transition-transform duration-300 rotate-0" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500 transition-transform duration-300 rotate-0" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-medium">
          {isDark ? 'Mode Gelap' : 'Mode Terang'}
        </span>
      )}
    </button>
  )
}
