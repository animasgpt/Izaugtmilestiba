'use client'

import { useState } from 'react'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import SiteText from '@/components/SiteText'
import { ClockIcon, TagIcon } from '@heroicons/react/24/outline'

const categories = [
    { id: 'visi', name: 'Visi raksti', slug: '' },
    { id: 'gaidibas', name: 'Gaidības', slug: 'gaidibas' },
    { id: 'dzives-gads', name: 'Dzīves gads', slug: 'dzives-gads' },
    { id: '2-3-gadi', name: '2.-3. gadi', slug: '2-3-gadi' },
    { id: 'bernudarzs', name: 'Bērnudārzs', slug: 'bernudarzs' },
    { id: 'sarunas', name: 'Sarunas', slug: 'sarunas' },
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
    },
    {
        id: 2,
        title: 'Miega rutīnas nozīme mazuļiem',
        excerpt: 'Kvalitatīvs miegs ir būtisks bērna attīstībai. Uzzini, kā izveidot veselīgu miega rutīnu.',
        category: 'dzives-gads',
        categoryName: 'Dzīves gads',
        readTime: '7 min',
        date: '2026-01-08',
    },
    {
        id: 3,
        title: 'Gaidību laiks: Kā sagatavoties bērna ierašanai',
        excerpt: 'Praktiski padomi topošajiem vecākiem par emocionālo un praktisko sagatavošanos.',
        category: 'gaidibas',
        categoryName: 'Gaidības',
        readTime: '10 min',
        date: '2026-01-05',
    },
    {
        id: 4,
        title: 'Rotaļas nozīme 2-3 gadus vecam bērnam',
        excerpt: 'Rotaļas ir galvenais veids, kā bērni mācās un attīstās. Uzzini, kādas rotaļas ir piemērotas šajā vecumā.',
        category: '2-3-gadi',
        categoryName: '2.-3. gadi',
        readTime: '6 min',
        date: '2026-01-03',
    },
]

export default function ArticlesPreview() {
    const [activeCategory, setActiveCategory] = useState('visi')

    const filteredArticles = activeCategory === 'visi'
        ? demoArticles
        : demoArticles.filter(article => article.category === activeCategory)

    return (
        <section className="section-padding bg-gradient-to-br from-gray-50 to-primary-50">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                        <SiteText textKey="articles.title" fallback="Lasi un Mācies" as="span" className="text-gradient" />
                    </h2>
                    <SiteText
                        textKey="articles.subtitle"
                        fallback="Raksti un padomi dažādām vecāku ceļa situācijām"
                        as="p"
                        className="text-xl text-gray-600 max-w-2xl mx-auto"
                    />
                </div>

                {/* Category tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${activeCategory === category.id
                                ? 'bg-primary-500 text-white shadow-lg'
                                : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Articles grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {filteredArticles.map((article) => (
                        <Link key={article.id} href={`/lasi/${article.id}`}>
                            <Card className="h-full">
                                <div className="flex items-center space-x-2 mb-3">
                                    <TagIcon className="h-4 w-4 text-primary-500" />
                                    <span className="text-sm font-medium text-primary-600">
                                        {article.categoryName}
                                    </span>
                                </div>

                                <h3 className="text-lg font-display font-semibold mb-2 line-clamp-2">
                                    {article.title}
                                </h3>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {article.excerpt}
                                </p>

                                <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
                                    <div className="flex items-center space-x-1">
                                        <ClockIcon className="h-4 w-4" />
                                        <span>{article.readTime}</span>
                                    </div>
                                    <span>{new Date(article.date).toLocaleDateString('lv-LV')}</span>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>

                <div className="text-center">
                    <Button href="/lasi" variant="primary" size="lg">
                        Skatīt visus rakstus
                    </Button>
                </div>
            </div>
        </section>
    )
}
