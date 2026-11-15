import React from 'react'

export default function LoadingSpinner({ message = 'Loading data...' }) {
  return (
    <div className="py-20 flex flex-col items-center justify-center space-y-4">
      {/* Sleek Modern Animated Esports Loader */}
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Outer glowing pulsing halo */}
        <div className="absolute inset-0 rounded-full border border-blue-500/30 animate-ping"></div>
        {/* Outer spinning ring */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 border-r-blue-400/60 animate-spin"></div>
        {/* Middle counter-spinning ring */}
        <div className="absolute inset-1.5 rounded-full border-2 border-transparent border-b-cyan-400 border-l-cyan-300/60 animate-[spin_1.5s_linear_infinite_reverse]"></div>
        {/* Inner pulsing core */}
        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.9)] animate-pulse"></div>
      </div>
      
      {/* Label text */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400 font-medium tracking-wide">
          {message}
        </span>
      </div>
    </div>
  )
}
