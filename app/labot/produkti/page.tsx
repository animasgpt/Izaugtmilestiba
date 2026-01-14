'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: 'book' | 'consultation' | 'program';
    inStock: boolean;
    featured: boolean;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Vai tiešām vēlies dzēst šo produktu?')) return;

        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setProducts(products.filter(p => p.id !== id));
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const toggleStock = async (product: Product) => {
        try {
            const response = await fetch(`/api/products/${product.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...product, inStock: !product.inStock }),
            });

            if (response.ok) {
                const updated = await response.json();
                setProducts(products.map(p => p.id === updated.id ? updated : p));
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const filteredProducts = products.filter(product => {
        if (filter === 'all') return true;
        return product.category === filter;
    });

    const getCategoryName = (category: string) => {
        const names: Record<string, string> = {
            book: 'Grāmata',
            consultation: 'Konsultācija',
            program: 'Programma',
        };
        return names[category] || category;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Ielādē produktus...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <Link
                            href="/labot/dashboard"
                            className="text-primary-600 hover:text-primary-700 font-medium mb-4 inline-block"
                        >
                            ← Atpakaļ uz Dashboard
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Produktu Pārvaldība</h1>
                        <p className="text-gray-600 mt-2">Pārvaldi e-veikala produktus</p>
                    </div>
                    <Link
                        href="/labot/produkti/jauns"
                        className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        + Jauns Produkts
                    </Link>
                </div>

                {/* Filters */}
                <div className="mb-6 flex gap-2 flex-wrap">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg transition-colors ${filter === 'all'
                                ? 'bg-primary-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                            }`}
                    >
                        Visi ({products.length})
                    </button>
                    <button
                        onClick={() => setFilter('book')}
                        className={`px-4 py-2 rounded-lg transition-colors ${filter === 'book'
                                ? 'bg-primary-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                            }`}
                    >
                        Grāmatas ({products.filter(p => p.category === 'book').length})
                    </button>
                    <button
                        onClick={() => setFilter('consultation')}
                        className={`px-4 py-2 rounded-lg transition-colors ${filter === 'consultation'
                                ? 'bg-primary-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                            }`}
                    >
                        Konsultācijas ({products.filter(p => p.category === 'consultation').length})
                    </button>
                    <button
                        onClick={() => setFilter('program')}
                        className={`px-4 py-2 rounded-lg transition-colors ${filter === 'program'
                                ? 'bg-primary-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                            }`}
                    >
                        Programmas ({products.filter(p => p.category === 'program').length})
                    </button>
                </div>

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                        <p className="text-gray-600">Nav produktu šajā kategorijā</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                                            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                                            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                                                {getCategoryName(product.category)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-2xl font-bold text-primary-600">€{product.price.toFixed(2)}</span>
                                        <button
                                            onClick={() => toggleStock(product)}
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${product.inStock
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                                }`}
                                        >
                                            {product.inStock ? 'Pieejams' : 'Nav pieejams'}
                                        </button>
                                    </div>

                                    {product.featured && (
                                        <div className="mb-4">
                                            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                                                ⭐ Izcelta
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex gap-2">
                                        <Link
                                            href={`/labot/produkti/${product.id}`}
                                            className="flex-1 px-4 py-2 bg-primary-600 text-white text-center rounded-lg hover:bg-primary-700 transition-colors"
                                        >
                                            Rediģēt
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                        >
                                            Dzēst
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
