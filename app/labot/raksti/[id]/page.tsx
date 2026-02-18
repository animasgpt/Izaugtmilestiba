'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Article {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    categoryName: string;
    readTime: string;
    author: string;
    image: string;
    date: string;
    published: boolean;
}

const categories = [
    { slug: 'gaidibas', name: 'Gaidības' },
    { slug: 'dzives-gads', name: '1. dzīves gads' },
    { slug: '2-3-gadi', name: '2.-3. gadi' },
    { slug: 'bernudarzs', name: 'Bērnudārzs' },
    { slug: 'sarunas', name: 'Sarunas' },
    { slug: 'raksti', name: 'Raksti' },
];

export default function EditArticlePage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchArticle();
    }, [params.id]);

    const fetchArticle = async () => {
        try {
            const response = await fetch(`/api/articles/${params.id}`);
            if (!response.ok) throw new Error('Raksts nav atrasts');
            const data = await response.json();
            setArticle(data.article);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!article) return;

        setSaving(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch(`/api/articles/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(article),
            });

            if (!response.ok) throw new Error('Neizdevās saglabāt izmaiņas');

            setSuccess('Raksts veiksmīgi atjaunināts!');
            setTimeout(() => router.push('/labot/raksti'), 1500);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!article) return;
        if (!confirm(`UZMANĪBU! Vai tiešām vēlies NEATGRIEZENISKI DZĒST rakstu: "${article.title}"? Šī darbība nav atsaucama.`)) return;

        try {
            const response = await fetch(`/api/articles/${params.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Neizdevās dzēst rakstu');

            router.push('/labot/raksti');
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Ielādē rakstu...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error && !article) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <p className="text-red-800">{error}</p>
                        <Link href="/labot/raksti" className="text-red-600 hover:text-red-700 mt-4 inline-block">
                            ← Atpakaļ uz rakstiem
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!article) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/labot/raksti"
                        className="text-primary-600 hover:text-primary-700 font-medium mb-4 inline-block"
                    >
                        ← Atpakaļ uz rakstiem
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Rediģēt Rakstu</h1>
                </div>

                {/* Messages */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-800">{error}</p>
                    </div>
                )}

                {success && (
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-green-800">{success}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        {/* Title */}
                        <div className="mb-6">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Virsraksts *
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={article.title}
                                onChange={(e) => setArticle({ ...article, title: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Image */}
                        <div className="mb-6">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                                Bildes URL
                            </label>
                            <input
                                type="text"
                                id="image"
                                value={article.image || ''}
                                onChange={(e) => setArticle({ ...article, image: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="/images/raksti/image.png"
                            />
                        </div>

                        {/* Excerpt */}
                        <div className="mb-6">
                            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                                Īss apraksts (150-200 rakstzīmes)
                            </label>
                            <textarea
                                id="excerpt"
                                value={article.excerpt}
                                onChange={(e) => setArticle({ ...article, excerpt: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                maxLength={200}
                            />
                            <p className="text-sm text-gray-500 mt-1">{article.excerpt.length}/200</p>
                        </div>

                        {/* Content */}
                        <div className="mb-6">
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                                Saturs (Markdown formātā) *
                            </label>
                            <textarea
                                id="content"
                                value={article.content}
                                onChange={(e) => setArticle({ ...article, content: e.target.value })}
                                rows={20}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div className="mb-6">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                Kategorija *
                            </label>
                            <select
                                id="category"
                                value={article.category}
                                onChange={(e) => {
                                    const cat = categories.find(c => c.slug === e.target.value);
                                    setArticle({
                                        ...article,
                                        category: e.target.value,
                                        categoryName: cat?.name || '',
                                    });
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                required
                            >
                                {categories.map((cat) => (
                                    <option key={cat.slug} value={cat.slug}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Metadata Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            {/* Author */}
                            <div>
                                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                                    Autors
                                </label>
                                <input
                                    type="text"
                                    id="author"
                                    value={article.author}
                                    onChange={(e) => setArticle({ ...article, author: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>

                            {/* Read Time */}
                            <div>
                                <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 mb-2">
                                    Lasīšanas laiks
                                </label>
                                <input
                                    type="text"
                                    id="readTime"
                                    value={article.readTime}
                                    onChange={(e) => setArticle({ ...article, readTime: e.target.value })}
                                    placeholder="5 min"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>

                            {/* Date */}
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                                    Datums
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    value={article.date}
                                    onChange={(e) => setArticle({ ...article, date: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Published */}
                        <div className="mb-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={article.published}
                                    onChange={(e) => setArticle({ ...article, published: e.target.checked })}
                                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Publicēts (redzams vietnē)</span>
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Dzēst Rakstu
                        </button>

                        <div className="flex gap-4">
                            <Link
                                href="/labot/raksti"
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Atcelt
                            </Link>
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {saving ? 'Saglabā...' : 'Saglabāt Izmaiņas'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
