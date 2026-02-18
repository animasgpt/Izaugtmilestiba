'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Article {
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

export default function NewArticlePage() {
    const router = useRouter();
    const [article, setArticle] = useState<Article>({
        title: '',
        excerpt: '',
        content: '',
        category: 'raksti',
        categoryName: 'Raksti',
        readTime: '5 min',
        author: 'Madara Pauzere',
        image: '',
        date: new Date().toISOString().split('T')[0],
        published: true,
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('/api/articles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(article),
            });

            if (!response.ok) throw new Error('Neizdevās izveidot rakstu');

            const data = await response.json();
            setSuccess('Raksts veiksmīgi izveidots!');
            setTimeout(() => router.push('/labot/raksti'), 1500);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

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
                    <h1 className="text-3xl font-bold text-gray-900">Pievienot Jaunu Rakstu</h1>
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
                                placeholder="Raksta nosaukums"
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
                                value={article.image}
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
                                placeholder="Īss kopsavilkums par rakstu..."
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
                                placeholder="# Raksta saturs..."
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
                                <span className="ml-2 text-sm text-gray-700">Publicēt nekavējoties</span>
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end">
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
                                {saving ? 'Izveido...' : 'Izveidot Rakstu'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
