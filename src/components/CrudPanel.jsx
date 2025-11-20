import React, { useEffect, useState } from 'react'

const COLLECTIONS = [
  { key: 'receptionist', label: 'Receptionists' },
  { key: 'doctor', label: 'Doctors' },
  { key: 'patient', label: 'Patients' },
  { key: 'procedure', label: 'Procedures' },
  { key: 'appointment', label: 'Appointments' },
  { key: 'payment', label: 'Payments' },
  { key: 'report', label: 'Reports' },
  { key: 'consumable', label: 'Consumables' },
]

function CrudPanel() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [active, setActive] = useState('patient')
  const [items, setItems] = useState([])
  const [schema, setSchema] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({})

  useEffect(() => {
    fetchSchema()
  }, [])

  useEffect(() => {
    setFormData({})
    fetchList()
  }, [active])

  const fetchSchema = async () => {
    try {
      const res = await fetch(`${baseUrl}/schema`)
      const data = await res.json()
      setSchema(data)
    } catch (e) {
      // ignore
    }
  }

  const fetchList = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/${active}`)
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch (e) {
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const createItem = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/${active}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (!res.ok) throw new Error('Invalid data')
      await fetchList()
      setFormData({})
    } catch (e) {
      setError('Create failed: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async (id) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/${active}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      await fetchList()
    } catch (e) {
      setError('Delete failed: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  const fields = schema?.[active]?.properties || {}

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-2">
        {COLLECTIONS.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${active === c.key ? 'bg-blue-600/20 border-blue-400 text-white' : 'bg-slate-800/60 border-white/10 text-blue-200'}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="bg-slate-800/60 border border-white/10 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-3">New {active}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(fields).map(([key, val]) => (
              key === '_id' ? null : (
                <div key={key}>
                  <label className="block text-xs text-blue-200/70 mb-1">{key}</label>
                  <input
                    className="w-full px-3 py-2 rounded bg-slate-900/60 border border-white/10 text-white placeholder-blue-200/40"
                    placeholder={val.type || 'value'}
                    value={formData[key] ?? ''}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  />
                </div>
              )
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <button onClick={createItem} disabled={loading} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50">Create</button>
            {error && <span className="text-red-400 text-sm">{error}</span>}
          </div>
        </div>

        <div className="bg-slate-800/60 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold">{COLLECTIONS.find(c => c.key === active)?.label}</h3>
            <button onClick={fetchList} className="px-3 py-1.5 text-sm rounded bg-slate-700 text-white hover:bg-slate-600">Refresh</button>
          </div>
          {loading ? (
            <p className="text-blue-200">Loading...</p>
          ) : (
            <div className="overflow-auto">
              <table className="min-w-full text-sm">
                <thead className="text-blue-200/70">
                  <tr>
                    <th className="text-left p-2">ID</th>
                    <th className="text-left p-2">Summary</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-blue-100/90">
                  {items.map((it) => (
                    <tr key={it._id} className="border-t border-white/10">
                      <td className="p-2 font-mono text-xs">{it._id}</td>
                      <td className="p-2">
                        <pre className="whitespace-pre-wrap break-words text-xs bg-slate-900/40 p-2 rounded">{JSON.stringify(it, null, 2)}</pre>
                      </td>
                      <td className="p-2">
                        <button onClick={() => removeItem(it._id)} className="px-3 py-1.5 text-xs rounded bg-red-600 text-white hover:bg-red-500">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={3} className="p-4 text-blue-300/70">No records yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CrudPanel
