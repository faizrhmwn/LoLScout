import React from 'react'

export default function LoadingSpinner({ message = 'Loading match intelligence...' }) {
  return (
    <div className="py-24 flex flex-col items-center justify-center space-y-3 font-mono">
      {/* Hextech / Esports Ring Spinner */}
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-[#162232]"></div>
        <div className="absolute inset-0 rounded-full border-2 border-t-[#00bcd4] border-r-[#00bcd4] border-b-transparent border-l-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full border border-dashed border-[#4da8da]/40 animate-[spin_3s_linear_infinite_reverse]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#00bcd4] animate-ping"></div>
        </div>
      </div>
      <span className="text-xs text-slate-400 tracking-wider uppercase font-semibold">
        {message}
      </span>
    </div>
  )
}
