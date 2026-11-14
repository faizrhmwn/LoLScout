import React from 'react'
import { Smartphone, Monitor, CheckCircle2, X } from 'lucide-react'

export default function PwaInstallModal({ isOpen, onClose, onInstall, hasPrompt }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-sm rounded-2xl bg-[#0e1622] border border-[#1e2c3f] p-5 shadow-2xl space-y-4 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                Install LoLScout
              </h3>
              <p className="text-[11px] text-slate-400">Progressive Web App (PWA)</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {hasPrompt ? (
          <div className="space-y-3">
            <p className="text-xs text-slate-300 leading-relaxed">
              Pasang LoLScout langsung di layar utama smartphone atau desktop Anda untuk akses instan dan dukungan offline.
            </p>
            <button
              onClick={() => {
                onInstall()
                onClose()
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-cyan-500/20"
            >
              <Smartphone className="w-4 h-4" /> Pasang Sekarang
            </button>
          </div>
        ) : (
          <div className="space-y-3 text-xs text-slate-300">
            <p className="leading-relaxed">
              Browser Anda saat ini membutuhkan instalasi manual via menu navigasi browser:
            </p>
            
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-[11px]">
              <div className="flex items-start gap-2">
                <span className="font-bold text-cyan-400 shrink-0">Android / Chrome:</span>
                <span className="text-slate-300">Ketuk ikon titik tiga (⋮) di pojok kanan atas, lalu pilih <b>"Install app"</b> atau <b>"Add to Home screen"</b>.</span>
              </div>
              <div className="flex items-start gap-2 pt-1.5 border-t border-slate-800/80">
                <span className="font-bold text-amber-400 shrink-0">iOS / Safari:</span>
                <span className="text-slate-300">Ketuk ikon Share (kotak panah atas), lalu pilih <b>"Add to Home Screen"</b>.</span>
              </div>
              <div className="flex items-start gap-2 pt-1.5 border-t border-slate-800/80">
                <span className="font-bold text-emerald-400 shrink-0">Desktop (Chrome/Edge):</span>
                <span className="text-slate-300">Klik ikon install (layar komputer + panah) di sebelah kanan address bar.</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition"
            >
              Mengerti
            </button>
          </div>
        )}

        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Offline Ready
          </span>
          <span>Fast Lightweight Client</span>
        </div>
      </div>
    </div>
  )
}
