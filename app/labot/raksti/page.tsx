'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { PencilIcon, TrashIcon, PlusIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function RakstiPage() {
    const [articles, setArticles] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        fetchArticles()
    }, [])

    const fetchArticles = async () => {
        try {
            const response = await fetch('/api/articles')
            const data = await response.json()
            setArticles(data.articles || [])
        } catch (error) {
            console.error('Failed to fetch articles:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleToggleVisibility = async (article: any) => {
        try {
            const response = await fetch(`/api/articles/${article.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ published: !article.published }),
            })

            if (response.ok) {
                // Update local state for immediate feedback
                setArticles(articles.map(a =>
                    a.id === article.id ? { ...a, published: !article.published } : a
                ))
            } else {
                alert('Neizdevās mainīt redzamību')
            }
        } catch (error) {
            console.error('Failed to toggle visibility:', error)
            alert('Neizdevās mainīt redzamību')
        }
    }

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`UZMANĪBU! Vai tiešām vēlies NEATGRIEZENISKI DZĒST rakstu: "${title}"? Šī darbība nav atsaucama.`)) return

        try {
            const response = await fetch(`/api/articles/${id}`, { method: 'DELETE' })
            if (response.ok) {
                fetchArticles()
            } else {
                alert('Neizdevās izdzēst rakstu')
            }
        } catch (error) {
            alert('Neizdevās izdzēst rakstu')
        }
    }

    const filteredArticles = filter === 'all'
        ? articles
        : articles.filter(a => a.category === filter)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container-custom py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-display font-bold">Rakstu Pārvaldība</h1>
                            <p className="text-gray-600">Pārvalda visus rakstus un saturu</p>
                        </div>
                        <div className="flex space-x-3">
                            <Button href="/labot/raksti/bulk" variant="outline">
                                Bulk Upload
                            </Button>
                            <Button href="/labot/raksti/jauns">
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Jauns Raksts
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container-custom py-8">
                {/* Filters */}
                <div className="mb-6 flex space-x-2">
                    {['all', 'gaidibas', 'dzives-gads', '2-3-gadi', 'bernudarzs', 'sarunas'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === cat
                                ? 'bg-primary-500 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {cat === 'all' ? 'Visi' : cat}
                        </button>
                    ))}
                </div>

                {/* Articles Table */}
                {loading ? (
                    <Card>
                        <p className="text-center py-8 text-gray-600">Ielādē...</p>
                    </Card>
                ) : filteredArticles.length === 0 ? (
                    <Card>
                        <p className="text-center py-8 text-gray-600">Nav atrasti raksti</p>
                    </Card>
                ) : (
                    <Card padding="sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left p-4 font-semibold">Nosaukums</th>
                                        <th className="text-left p-4 font-semibold">Kategorija</th>
                                        <th className="text-left p-4 font-semibold">Datums</th>
                                        <th className="text-left p-4 font-semibold">Status</th>
                                        <th className="text-right p-4 font-semibold">Darbības</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredArticles.map((article) => (
                                        <tr key={article.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="p-4">
                                                <div className="font-semibold">{article.title}</div>
                                                <div className="text-sm text-gray-600 line-clamp-1">{article.excerpt}</div>
                                            </td>
                                            <td className="p-4">
                                                <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm">
                                                    {article.categoryName}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-600">{article.date}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-sm ${article.published
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {article.published ? 'Publicēts' : 'Melnraksts'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <button
                                                        onClick={() => handleToggleVisibility(article)}
                                                        className={`p-2 rounded-lg transition-colors ${article.published
                                                            ? 'text-green-600 hover:bg-green-50'
                                                            : 'text-gray-400 hover:bg-gray-100'}`}
                                                        title={article.published ? 'Paslēpt no vietnes' : 'Publicēt vietnē'}
                                                    >
                                                        {article.published ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
                                                    </button>
                                                    <Link href={`/labot/raksti/${article.id}`}>
                                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Labot rakstu">
                                                            <PencilIcon className="h-5 w-5" />
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(article.id, article.title)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                        title="Dzēst rakstu"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}

                <div className="mt-6">
                    <Link href="/labot/dashboard">
                        <Button variant="outline">← Atpakaļ uz Dashboard</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
