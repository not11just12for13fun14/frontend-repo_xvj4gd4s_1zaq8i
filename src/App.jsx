import React from 'react'
import Topbar from './components/Topbar'
import EntityCard from './components/EntityCard'
import CrudPanel from './components/CrudPanel'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-blue-100">
      <Topbar />

      <main className="mx-auto max-w-7xl px-4 py-10">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <EntityCard title="Reception" description="Manage receptionists and front-desk access" onClick={() => window.scrollTo({ top: 9999, behavior: 'smooth' })} />
          <EntityCard title="Doctors" description="Add doctors and specialties" onClick={() => window.scrollTo({ top: 9999, behavior: 'smooth' })} />
          <EntityCard title="Patients" description="Register patients, history and contacts" onClick={() => window.scrollTo({ top: 9999, behavior: 'smooth' })} />
          <EntityCard title="Procedures" description="Define procedures, durations and fees" onClick={() => window.scrollTo({ top: 9999, behavior: 'smooth' })} />
          <EntityCard title="Appointments" description="Schedule visits and track status" onClick={() => window.scrollTo({ top: 9999, behavior: 'smooth' })} />
          <EntityCard title="Payments" description="Capture payments and references" onClick={() => window.scrollTo({ top: 9999, behavior: 'smooth' })} />
          <EntityCard title="Reports" description="Generate financial and inventory reports" onClick={() => window.scrollTo({ top: 9999, behavior: 'smooth' })} />
          <EntityCard title="Consumables" description="Track stock and reorders" onClick={() => window.scrollTo({ top: 9999, behavior: 'smooth' })} />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Data Manager</h2>
          <p className="text-blue-200/80 text-sm">Use the panel below to create and manage records across the suite. All data is stored in the database.</p>
          <CrudPanel />
        </section>
      </main>
    </div>
  )
}

export default App
