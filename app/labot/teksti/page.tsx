'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import {
    ArrowLeftIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    CheckIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'

interface SiteText {
    id: string
    key: string
    value: string
    description?: string
    section: string
    createdAt: Date
    updatedAt: Date
}

const sections = [
    { value: 'all', label: 'Visas sadaļas' },
    { value: 'home', label: 'Sākumlapa' },
    { value: 'about', label: 'Par mani' },
    { value: 'services', label: 'Pakalpojumi' },
    { value: 'shop', label: 'Veikals' },
    { value: 'articles', label: 'Raksti' },
    { value: 'contact', label: 'Kontakti' },
    { value: 'other', label: 'Citi' },
]

export default function SiteTextsPage() {
    const router = useRouter()
    const [texts, setTexts] = useState<SiteText[]>([])
    const [filteredTexts, setFilteredTexts] = useState<SiteText[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedSection, setSelectedSection] = useState('all')
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editValue, setEditValue] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [showAddForm, setShowAddForm] = useState(false)
    const [newText, setNewText] = useState({
        key: '',
        value: '',
        description: '',
        section: 'home'
    })

    useEffect(() => {
        fetchTexts()
    }, [])

    useEffect(() => {
        filterTexts()
    }, [texts, searchTerm, selectedSection])

    const fetchTexts = async () => {
        try {
            const response = await fetch('/api/site-texts')
            if (response.ok) {
                const data = await response.json()
                setTexts(data)
            }
        } catch (error) {
            console.error('Error fetching texts:', error)
        } finally {
            setLoading(false)
        }
    }

    const filterTexts = () => {
        let filtered = texts

        if (selectedSection !== 'all') {
            filtered = filtered.filter(text => text.section === selectedSection)
        }

        if (searchTerm) {
            filtered = filtered.filter(text =>
                text.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
                text.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
                text.description?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        setFilteredTexts(filtered)
    }

    const startEdit = (text: SiteText) => {
        setEditingId(text.id)
        setEditValue(text.value)
        setEditDescription(text.description || '')
    }

    const cancelEdit = () => {
        setEditingId(null)
        setEditValue('')
        setEditDescription('')
    }

    const saveEdit = async (id: string) => {
        setSaving(true)
        try {
            const response = await fetch(`/api/site-texts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    value: editValue,
                    description: editDescription
                })
            })

            if (response.ok) {
                await fetchTexts()
                setEditingId(null)
            }
        } catch (error) {
            console.error('Error saving text:', error)
            alert('Kļūda saglabājot tekstu')
        } finally {
            setSaving(false)
        }
    }

    const deleteText = async (id: string) => {
        if (!confirm('Vai tiešām vēlies dzēst šo tekstu?')) return

        try {
            const response = await fetch(`/api/site-texts/${id}`, {
                method: 'DELETE'
            })

            if (response.ok) {
                await fetchTexts()
            }
        } catch (error) {
            console.error('Error deleting text:', error)
            alert('Kļūda dzēšot tekstu')
        }
    }

    const addNewText = async () => {
        if (!newText.key || !newText.value) {
            alert('Lūdzu aizpildi visus obligātos laukus')
            return
        }

        setSaving(true)
        try {
            const response = await fetch('/api/site-texts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newText)
            })

            if (response.ok) {
                await fetchTexts()
                setShowAddForm(false)
                setNewText({ key: '', value: '', description: '', section: 'home' })
            } else {
                const data = await response.json()
                alert(data.error || 'Kļūda pievienojot tekstu')
            }
        } catch (error) {
            console.error('Error adding text:', error)
            alert('Kļūda pievienojot tekstu')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Ielādē tekstus...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container-custom py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/labot/dashboard">
                                <Button variant="secondary" size="sm">
                                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                                    Atpakaļ
                                </Button>
                            </Link>
                            <h1 className="text-2xl font-display font-bold">Vietnes Tekstu Pārvaldība</h1>
                        </div>
                        <div className="flex gap-3">
                            <Link href="/labot/teksti/vizualais">
                                <Button variant="secondary">
                                    <PencilIcon className="h-5 w-5 mr-2" />
                                    Vizuālais Redaktors
                                </Button>
                            </Link>
                            <Button onClick={() => setShowAddForm(true)}>
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Pievienot Tekstu
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container-custom py-8">
                {/* Filters */}
                <Card className="mb-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Search */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Meklēt
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="input-field pl-10"
                                    placeholder="Meklēt pēc atslēgas, vērtības vai apraksta..."
                                />
                            </div>
                        </div>

                        {/* Section Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sadaļa
                            </label>
                            <select
                                value={selectedSection}
                                onChange={(e) => setSelectedSection(e.target.value)}
                                className="input-field"
                            >
                                {sections.map(section => (
                                    <option key={section.value} value={section.value}>
                                        {section.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </Card>

                {/* Add Form */}
                {showAddForm && (
                    <Card className="mb-6 border-2 border-primary-500">
                        <h3 className="text-lg font-bold mb-4">Pievienot Jaunu Tekstu</h3>
                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Atslēga (Key) *
                                    </label>
                                    <input
                                        type="text"
                                        value={newText.key}
                                        onChange={(e) => setNewText({ ...newText, key: e.target.value })}
                                        className="input-field"
                                        placeholder="piemēram: home.hero.title"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Izmanto punktus sadaļu atdalīšanai (section.subsection.name)
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Sadaļa *
                                    </label>
                                    <select
                                        value={newText.section}
                                        onChange={(e) => setNewText({ ...newText, section: e.target.value })}
                                        className="input-field"
                                    >
                                        {sections.filter(s => s.value !== 'all').map(section => (
                                            <option key={section.value} value={section.value}>
                                                {section.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Vērtība (Teksts) *
                                </label>
                                <textarea
                                    value={newText.value}
                                    onChange={(e) => setNewText({ ...newText, value: e.target.value })}
                                    className="input-field"
                                    rows={3}
                                    placeholder="Ievadi tekstu..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Apraksts (kur tiek izmantots)
                                </label>
                                <input
                                    type="text"
                                    value={newText.description}
                                    onChange={(e) => setNewText({ ...newText, description: e.target.value })}
                                    className="input-field"
                                    placeholder="piemēram: Sākumlapas galvenais virsraksts"
                                />
                            </div>

                            <div className="flex space-x-3">
                                <Button onClick={addNewText} disabled={saving}>
                                    {saving ? 'Saglabā...' : 'Pievienot'}
                                </Button>
                                <Button variant="secondary" onClick={() => setShowAddForm(false)}>
                                    Atcelt
                                </Button>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Texts List */}
                <div className="space-y-4">
                    {filteredTexts.length === 0 ? (
                        <Card className="text-center py-12">
                            <p className="text-gray-500">Nav atrasti teksti</p>
                        </Card>
                    ) : (
                        filteredTexts.map(text => (
                            <Card key={text.id} className="hover:shadow-lg transition-shadow">
                                {editingId === text.id ? (
                                    // Edit Mode
                                    <div className="space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="text-sm font-mono text-gray-500 mb-1">
                                                    {text.key}
                                                </div>
                                                <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-primary-100 text-primary-700">
                                                    {sections.find(s => s.value === text.section)?.label}
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Teksts
                                            </label>
                                            <textarea
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className="input-field"
                                                rows={4}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Apraksts
                                            </label>
                                            <input
                                                type="text"
                                                value={editDescription}
                                                onChange={(e) => setEditDescription(e.target.value)}
                                                className="input-field"
                                            />
                                        </div>

                                        <div className="flex space-x-3">
                                            <Button
                                                size="sm"
                                                onClick={() => saveEdit(text.id)}
                                                disabled={saving}
                                            >
                                                <CheckIcon className="h-4 w-4 mr-1" />
                                                {saving ? 'Saglabā...' : 'Saglabāt'}
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={cancelEdit}
                                            >
                                                <XMarkIcon className="h-4 w-4 mr-1" />
                                                Atcelt
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    // View Mode
                                    <div>
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <div className="text-sm font-mono text-gray-500 mb-1">
                                                    {text.key}
                                                </div>
                                                <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-primary-100 text-primary-700">
                                                    {sections.find(s => s.value === text.section)?.label}
                                                </span>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => startEdit(text)}
                                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                    title="Rediģēt"
                                                >
                                                    <PencilIcon className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => deleteText(text.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Dzēst"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-4 mb-2">
                                            <p className="text-gray-900 whitespace-pre-wrap">{text.value}</p>
                                        </div>

                                        {text.description && (
                                            <p className="text-sm text-gray-600 italic">
                                                📍 {text.description}
                                            </p>
                                        )}

                                        <div className="text-xs text-gray-400 mt-2">
                                            Atjaunots: {new Date(text.updatedAt).toLocaleString('lv-LV')}
                                        </div>
                                    </div>
                                )}
                            </Card>
                        ))
                    )}
                </div>

                {/* Summary */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    Rāda {filteredTexts.length} no {texts.length} tekstiem
                </div>
            </div>
        </div>
    )
}
