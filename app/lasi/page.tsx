'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import TestimonialsGallery from '@/components/home/TestimonialsGallery'
import { ClockIcon, TagIcon, FunnelIcon, SpeakerWaveIcon, StopIcon } from '@heroicons/react/24/outline'

export const dynamic = 'force-dynamic'

const categories = [
    { id: 'visi', name: 'Visi raksti', slug: '' },
    { id: 'gaidibas', name: 'Gaidības', slug: 'gaidibas' },
    { id: 'dzives-gads', name: 'Dzīves gads', slug: 'dzives-gads' },
    { id: '2-3-gadi', name: '2.-3. gadi', slug: '2-3-gadi' },
    { id: 'bernudarzs', name: 'Bērnudārzs', slug: 'bernudarzs' },
    { id: 'sarunas', name: 'Sarunas', slug: 'sarunas' },
    { id: 'raksti', name: 'Raksti', slug: 'raksti' },
]

const demoArticles = [
    {
        id: 1,
        title: 'Kā palīdzēt bērnam tikt galā ar emocijām',
        excerpt: 'Emociju regulācija ir svarīga prasme, ko bērni apgūst pakāpeniski. Uzzini, kā tu vari atbalstīt savu bērnu šajā procesā.',
        category: 'sarunas',
        categoryName: 'Sarunas',
        readTime: '5 min',
        date: '2026-01-10',
        image: '/images/demo/hero.png',
    },
    {
        id: 2,
        title: 'Miega rutīnas nozīme mazuļiem',
        excerpt: 'Kvalitatīvs miegs ir būtisks bērna attīstībai. Uzzini, kā izveidot veselīgu miega rutīnu.',
        category: 'dzives-gads',
        categoryName: 'Dzīves gads',
        readTime: '7 min',
        date: '2026-01-08',
        image: '/images/demo/consultation.png',
    },
    {
        id: 3,
        title: 'Gaidību laiks: Kā sagatavoties bērna ierašanai',
        excerpt: 'Praktiski padomi topošajiem vecākiem par emocionālo un praktisko sagatavošanos.',
        category: 'gaidibas',
        categoryName: 'Gaidības',
        readTime: '10 min',
        date: '2026-01-05',
        image: '/images/demo/book.png',
    },
    {
        id: 4,
        title: 'Rotaļas nozīme 2-3 gadus vecam bērnam',
        excerpt: 'Rotaļas ir galvenais veids, kā bērni mācās un attīstās. Uzzini, kādas rotaļas ir piemērotas šajā vecumā.',
        category: '2-3-gadi',
        categoryName: '2.-3. gadi',
        readTime: '6 min',
        date: '2026-01-03',
        image: '/images/demo/challenge.png',
    },
    {
        id: 5,
        title: 'Adaptācija bērnudārzā: Pirmās nedēļas',
        excerpt: 'Bērnudārza sākums var būt izaicinošs gan bērnam, gan vecākiem. Padomi veiksmīgai adaptācijai.',
        category: 'bernudarzs',
        categoryName: 'Bērnudārzs',
        readTime: '8 min',
        date: '2026-01-01',
        image: '/images/demo/hero.png',
    },
    {
        id: 6,
        title: 'Pozitīva komunikācija ar bērnu',
        excerpt: 'PEP mammas metode uzsver pozitīvu komunikāciju. Uzzini, kā runāt ar bērnu tā, lai viņš jūtas dzirdēts.',
        category: 'sarunas',
        categoryName: 'Sarunas',
        readTime: '6 min',
        date: '2025-12-28',
        image: '/images/demo/consultation.png',
    },
]

function LasiPageContent() {
    const searchParams = useSearchParams()
    const initialCategory = searchParams?.get('kategorija') || 'visi'
    const [activeCategory, setActiveCategory] = useState(initialCategory)
    const [showFilters, setShowFilters] = useState(false)
    const [speakingId, setSpeakingId] = useState<number | null>(null)
    const [articles, setArticles] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('/api/articles?published=true')
                const data = await response.json()
                setArticles(data.articles || [])
            } catch (error) {
                console.error('Failed to fetch articles:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchArticles()
    }, [])

    const filteredArticles = activeCategory === 'visi'
        ? articles
        : articles.filter(article => article.category === activeCategory)

    const handleSpeak = (e: React.MouseEvent, article: typeof demoArticles[0]) => {
        e.preventDefault()
        e.stopPropagation()

        // Stop if already speaking this article
        if (speakingId === article.id) {
            window.speechSynthesis.cancel()
            setSpeakingId(null)
            return
        }

        // Stop any current speech
        window.speechSynthesis.cancel()

        // Create speech synthesis
        const text = `${article.title}. ${article.excerpt}`
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'lv-LV'
        utterance.rate = 0.9
        utterance.pitch = 1

        utterance.onend = () => {
            setSpeakingId(null)
        }

        utterance.onerror = () => {
            setSpeakingId(null)
        }

        setSpeakingId(article.id)
        window.speechSynthesis.speak(utterance)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50">
            <div className="container-custom py-16">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
                        <span className="text-gradient">Lasi</span> un Mācies
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Raksti un padomi dažādām vecāku ceļa situācijām
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-12">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="lg:hidden mb-4 flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-md"
                    >
                        <FunnelIcon className="h-5 w-5" />
                        <span>Filtri</span>
                    </button>

                    <div className={`${showFilters ? 'block' : 'hidden'} lg:flex flex-wrap justify-center gap-3`}>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${activeCategory === category.id
                                    ? 'bg-primary-500 text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 shadow-md'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArticles.map((article) => (
                        <Link key={article.id} href={`/lasi/${article.id}`}>
                            <Card className="h-full group">
                                <div className="relative h-48 mb-4 rounded-xl overflow-hidden bg-gray-200">
                                    <img
                                        src={article.image || '/images/demo/hero.png'}
                                        alt={article.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>

                                <div className="flex items-center space-x-2 mb-3">
                                    <TagIcon className="h-4 w-4 text-primary-500" />
                                    <span className="text-sm font-medium text-primary-600">
                                        {article.categoryName}
                                    </span>
                                </div>

                                <h2 className="text-xl font-display font-semibold mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                                    {article.title}
                                </h2>

                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {article.excerpt}
                                </p>

                                <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex items-center space-x-1">
                                            <ClockIcon className="h-4 w-4" />
                                            <span>{article.readTime}</span>
                                        </div>
                                        <button
                                            onClick={(e) => handleSpeak(e, article)}
                                            className={`p-2 rounded-full transition-all ${speakingId === article.id
                                                ? 'bg-primary-500 text-white'
                                                : 'hover:bg-gray-100 text-gray-600'
                                                }`}
                                            title={speakingId === article.id ? 'Apturēt' : 'Klausīties'}
                                        >
                                            {speakingId === article.id ? (
                                                <StopIcon className="h-5 w-5" />
                                            ) : (
                                                <SpeakerWaveIcon className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                    <span>{new Date(article.date).toLocaleDateString('lv-LV')}</span>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>

                {filteredArticles.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-xl text-gray-600">Nav atrasti raksti šajā kategorijā.</p>
                    </div>
                )}
            </div>

            {/* Testimonials section */}
            <div className="border-t border-gray-100">
                <TestimonialsGallery />
            </div>
        </div>
    )
}

export default function LasiPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50">
                <div className="container-custom py-16">
                    <div className="text-center">
                        <div className="animate-pulse">
                            <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
                            <div className="h-6 bg-gray-200 rounded w-96 mx-auto"></div>
                        </div>
                    </div>
                </div>
            </div>
        }>
            <LasiPageContent />
        </Suspense>
    )
}
