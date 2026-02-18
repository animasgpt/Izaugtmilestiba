'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { TrashIcon, ArrowUpTrayIcon, PhotoIcon } from '@heroicons/react/24/outline'

interface Atsauksme {
    id: string
    url: string
    caption?: string
    filename: string
    createdAt: string
}

export default function AtsauksmesAdminPage() {
    const [items, setItems] = useState<Atsauksme[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [caption, setCaption] = useState('')
    const [dragOver, setDragOver] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const fetchItems = async () => {
        const r = await fetch('/api/atsauksmes')
        const d = await r.json()
        setItems(d.atsauksmes || [])
        setLoading(false)
    }

    useEffect(() => { fetchItems() }, [])

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text })
        setTimeout(() => setMessage(null), 3500)
    }

    const uploadFile = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            showMessage('error', 'Lūdzu augšupielādē attēlu failu!')
            return
        }
        setUploading(true)
        const fd = new FormData()
        fd.append('file', file)
        fd.append('caption', caption)
        try {
            const r = await fetch('/api/atsauksmes', { method: 'POST', body: fd })
            const d = await r.json()
            if (d.success) {
                showMessage('success', 'Atsauksme augšupielādēta!')
                setCaption('')
                await fetchItems()
            } else {
                showMessage('error', d.error || 'Kļūda augšupielādē')
            }
        } catch {
            showMessage('error', 'Savienojuma kļūda')
        } finally {
            setUploading(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) uploadFile(file)
        e.target.value = ''
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setDragOver(false)
        const file = e.dataTransfer.files?.[0]
        if (file) uploadFile(file)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Dzēst šo atsauksmi?')) return
        const r = await fetch('/api/atsauksmes', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        })
        const d = await r.json()
        if (d.success) {
            showMessage('success', 'Atsauksme dzēsta')
            await fetchItems()
        } else {
            showMessage('error', 'Kļūda dzēšot')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-display font-bold text-gray-900">Atsauksmes no mammām</h1>
                    <p className="text-gray-600 mt-1">Augšupielādē Instagram un WhatsApp ekrānšāviņus</p>
                </div>

                {/* Message */}
                {message && (
                    <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${message.type === 'success'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                        {message.text}
                    </div>
                )}

                {/* Upload area */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Pievienot jaunu atsauksmi</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Paraksts (neobligāts)
                        </label>
                        <input
                            type="text"
                            value={caption}
                            onChange={e => setCaption(e.target.value)}
                            placeholder="piem. Instagram atsauksme no mammas..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 text-sm"
                        />
                    </div>

                    {/* Drop zone */}
                    <div
                        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200
                            ${dragOver
                                ? 'border-primary-400 bg-primary-50'
                                : 'border-gray-300 hover:border-primary-300 hover:bg-gray-50'
                            }`}
                    >
                        {uploading ? (
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-10 h-10 border-4 border-primary-300 border-t-primary-600 rounded-full animate-spin" />
                                <p className="text-gray-600">Augšupielādē...</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-3">
                                <ArrowUpTrayIcon className="h-10 w-10 text-gray-400" />
                                <p className="text-gray-600 font-medium">Velc šurp ekrānšāviņu vai klikšķini</p>
                                <p className="text-gray-400 text-sm">PNG, JPG, WEBP — Instagram vai WhatsApp</p>
                            </div>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                {/* Gallery */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Augšupielādētās atsauksmes
                            <span className="ml-2 text-sm font-normal text-gray-500">({items.length})</span>
                        </h2>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="w-8 h-8 border-4 border-primary-300 border-t-primary-600 rounded-full animate-spin" />
                        </div>
                    ) : items.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                            <PhotoIcon className="h-12 w-12 mx-auto mb-3 opacity-40" />
                            <p>Vēl nav augšupielādētu atsauksmju</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {items.map(item => (
                                <div key={item.id} className="group relative rounded-xl overflow-hidden bg-gray-100 aspect-[9/16] shadow-sm">
                                    <Image
                                        src={item.url}
                                        alt={item.caption || 'Atsauksme'}
                                        fill
                                        className="object-cover"
                                        sizes="200px"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
                                            title="Dzēst"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                    {item.caption && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1">
                                            <p className="text-white text-xs truncate">{item.caption}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
