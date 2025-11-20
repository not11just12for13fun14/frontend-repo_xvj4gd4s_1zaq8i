import React from 'react'

function EntityCard({ title, description, onClick }) {
  return (
    <button onClick={onClick} className="group text-left w-full">
      <div className="h-full bg-slate-800/60 border border-white/10 rounded-xl p-5 hover:border-blue-500/40 transition-colors">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold text-lg">{title}</h3>
          <span className="text-xs text-blue-300/70 group-hover:text-blue-300">Manage</span>
        </div>
        <p className="mt-2 text-sm text-blue-200/80">{description}</p>
      </div>
    </button>
  )
}

export default EntityCard
