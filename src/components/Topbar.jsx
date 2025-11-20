import React from 'react'

function Topbar() {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/flame-icon.svg" alt="logo" className="w-8 h-8" />
          <div>
            <h1 className="text-white font-semibold leading-tight">Dental Clinic Suite</h1>
            <p className="text-xs text-blue-200/70">Reception • Doctors • Patients • Procedures • Payments • Reports • Consumables</p>
          </div>
        </div>
        <div className="text-blue-200/80 text-sm">
          Built with Flames Blue
        </div>
      </div>
    </header>
  )
}

export default Topbar
