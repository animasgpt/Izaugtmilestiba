'use client'

import { useState, useEffect } from 'react'
import { EnvelopeIcon, ArrowDownTrayIcon, TrashIcon } from '@heroicons/react/24/outline'

interface Lead {
    id: string
    email: string
    name: string
    source: string
    createdAt: string
}

export default function LeadsAdminPage() {
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)

    const fetchLeads = async () => {
        const r = await fetch('/api/leads')
        const d = await r.json()
        setLeads(d.leads || [])
        setLoading(false)
    }

    useEffect(() => { fetchLeads() }, [])

    const exportCSV = () => {
        const header = 'E-pasts,Vārds,Avots,Datums\n'
        const rows = leads.map(l =>
            `"${l.email}","${l.name}","${l.source}","${new Date(l.createdAt).toLocaleString('lv-LV')}"`
        ).join('\n')
        const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-gray-900">E-pasta saraksts</h1>
                        <p className="text-gray-600 mt-1">
                            Bezmaksas lejupielādes reģistrācijas —{' '}
                            <span className="font-semibold text-primary-600">{leads.length} kontakti</span>
                        </p>
                    </div>
                    <button
                        onClick={exportCSV}
                        disabled={leads.length === 0}
                        className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-5 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-40"
                    >
                        <ArrowDownTrayIcon className="h-5 w-5" />
                        Eksportēt CSV
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {loading ? (
                        <div className="flex justify-center py-16">
                            <div className="w-8 h-8 border-4 border-primary-300 border-t-primary-600 rounded-full animate-spin" />
                        </div>
                    ) : leads.length === 0 ? (
                        <div className="text-center py-16 text-gray-400">
                            <EnvelopeIcon className="h-12 w-12 mx-auto mb-3 opacity-40" />
                            <p>Vēl nav reģistrāciju</p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">E-pasts</th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Vārds</th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Datums</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {leads.slice().reverse().map(lead => (
                                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <EnvelopeIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                                <span className="text-gray-900 text-sm">{lead.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{lead.name || '—'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(lead.createdAt).toLocaleString('lv-LV', {
                                                day: '2-digit', month: '2-digit', year: 'numeric',
                                                hour: '2-digit', minute: '2-digit'
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    )
}
