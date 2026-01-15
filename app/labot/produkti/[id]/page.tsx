'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

interface Product {
    id: number
    name: string
    description: string
    price: number
    category: string
    image: string
    featured: boolean
}

export default function EditProductPage() {
    const router = useRouter()
    const params = useParams()
    const productId = params?.id as string

    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (productId) {
            fetchProduct()
        }
    }, [productId])

    const fetchProduct = async () => {
        try {
            const response = await fetch(`/api/products/${productId}`)
            if (response.ok) {
                const data = await response.json()
                setProduct(data)
            } else {
                setError('Produkts nav atrasts')
            }
        } catch (err) {
            setError('Kļūda ielādējot produktu')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!product) return

        setSaving(true)
        setError('')

        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            })

            if (response.ok) {
                router.push('/labot/produkti')
            } else {
                setError('Neizdevās saglabāt izmaiņas')
            }
        } catch (err) {
            setError('Radās kļūda saglabājot')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm('Vai tiešām vēlies dzēst šo produktu?')) return

        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                router.push('/labot/produkti')
            } else {
                setError('Neizdevās dzēst produktu')
            }
        } catch (err) {
            setError('Radās kļūda dzēšot')
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Ielādē produktu...</p>
                </div>
            </div>
        )
    }

    if (error && !product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Card className="max-w-md w-full text-center p-8">
                    <p className="text-red-600 mb-4">{error}</p>
                    <Button onClick={() => router.push('/labot/produkti')}>
                        Atpakaļ uz produktiem
                    </Button>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container-custom max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => router.push('/labot/produkti')}
                        className="flex items-center text-gray-600 hover:text-primary-600 mb-4 transition-colors"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2" />
                        Atpakaļ uz produktiem
                    </button>
                    <h1 className="text-3xl font-display font-bold text-primary-500">
                        Rediģēt produktu
                    </h1>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <Card className="p-6 mb-6">
                        <div className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nosaukums *
                                </label>
                                <input
                                    type="text"
                                    value={product?.name || ''}
                                    onChange={(e) => setProduct(prev => prev ? { ...prev, name: e.target.value } : null)}
                                    className="input-field"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Apraksts *
                                </label>
                                <textarea
                                    value={product?.description || ''}
                                    onChange={(e) => setProduct(prev => prev ? { ...prev, description: e.target.value } : null)}
                                    className="textarea-field"
                                    rows={4}
                                    required
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cena (€) *
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={product?.price || 0}
                                    onChange={(e) => setProduct(prev => prev ? { ...prev, price: parseFloat(e.target.value) } : null)}
                                    className="input-field"
                                    required
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Kategorija *
                                </label>
                                <select
                                    value={product?.category || ''}
                                    onChange={(e) => setProduct(prev => prev ? { ...prev, category: e.target.value } : null)}
                                    className="input-field"
                                    required
                                >
                                    <option value="">Izvēlies kategoriju</option>
                                    <option value="Grāmata">Grāmata</option>
                                    <option value="Konsultācija">Konsultācija</option>
                                    <option value="Programma">Programma</option>
                                </select>
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Attēla URL
                                </label>
                                <input
                                    type="text"
                                    value={product?.image || ''}
                                    onChange={(e) => setProduct(prev => prev ? { ...prev, image: e.target.value } : null)}
                                    className="input-field"
                                    placeholder="/images/demo/product.png"
                                />
                            </div>

                            {/* Featured */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    checked={product?.featured || false}
                                    onChange={(e) => setProduct(prev => prev ? { ...prev, featured: e.target.checked } : null)}
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                                    Izcelta (Featured)
                                </label>
                            </div>
                        </div>
                    </Card>

                    {/* Actions */}
                    <div className="flex justify-between items-center">
                        <Button
                            type="button"
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Dzēst produktu
                        </Button>

                        <div className="flex gap-3">
                            <Button
                                type="button"
                                onClick={() => router.push('/labot/produkti')}
                                variant="secondary"
                            >
                                Atcelt
                            </Button>
                            <Button
                                type="submit"
                                disabled={saving}
                            >
                                {saving ? 'Saglabā...' : 'Saglabāt izmaiņas'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
