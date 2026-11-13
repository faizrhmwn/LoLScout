import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import TeamLogo from '../components/TeamLogo'
import { Bookmark, Trash2, Edit3, Shield, ArrowRight, Check, X } from 'lucide-react'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editNotes, setEditNotes] = useState('')

  async function loadFavorites() {
    setLoading(true)
    try {
      const data = await api.getFavorites('guest')
      setFavorites(data || [])
    } catch (e) {
      console.error('Error fetching favorites:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFavorites()
  }, [])

  async function handleDelete(id) {
    if (!confirm('Remove team from your favorites?')) return
    try {
      await api.removeFavorite(id)
      setFavorites(favorites.filter(f => f.id !== id))
    } catch (e) {
      alert(e.message)
    }
  }

  async function handleSaveNotes(id) {
    try {
      await api.updateFavorite(id, editNotes)
      setFavorites(favorites.map(f => f.id === id ? { ...f, notes: editNotes } : f))
      setEditingId(null)
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="pb-24 pt-4 px-4 max-w-4xl mx-auto space-y-4">
      <div>
        <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-amber-400" />
          My Favorite Teams
        </h1>
        <p className="text-xs text-slate-400">Manage your personalized watchlist and personal cheering notes</p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-500 text-xs animate-pulse">
          Loading your favorites...
        </div>
      ) : favorites.length === 0 ? (
        <div className="p-8 rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 text-center space-y-3">
          <Shield className="w-10 h-10 text-slate-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-white">No teams favorited yet</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Explore the teams directory and bookmark your favorite teams to track them here!
            </p>
          </div>
          <Link
            to="/teams"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition"
          >
            Explore Teams <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {favorites.map(fav => (
            <div
              key={fav.id}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-3 shadow-md"
            >
              <div className="flex items-center justify-between">
                <Link to={`/teams/${fav.team?.id}`} className="flex items-center gap-3 group">
                  <TeamLogo
                    src={fav.team?.logo_url}
                    alt={fav.team?.name}
                    shortName={fav.team?.short_name}
                    region={fav.team?.region}
                    className="w-11 h-11 group-hover:scale-105 transition"
                  />
                  <div>
                    <h3 className="font-extrabold text-sm text-white group-hover:text-amber-400 transition">
                      {fav.team?.name}
                    </h3>
                    <span className="text-[10px] text-amber-400 font-bold">
                      {fav.team?.region} • #{fav.team?.standing_summer} Seed
                    </span>
                  </div>
                </Link>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setEditingId(fav.id)
                      setEditNotes(fav.notes || '')
                    }}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                    title="Edit Notes"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(fav.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Notes Section */}
              {editingId === fav.id ? (
                <div className="flex gap-2 pt-2 border-t border-slate-800">
                  <input
                    type="text"
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Enter notes (e.g. Hope they win Worlds 2026!)..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                  <button
                    onClick={() => handleSaveNotes(fav.id)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <span className="italic">
                    "{fav.notes || 'No custom notes added'}"
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {new Date(fav.created_at).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
