'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { ShoppingCartIcon, ChatBubbleLeftRightIcon, BookOpenIcon, AcademicCapIcon } from '@heroicons/react/24/outline'

const products = [
    {
        id: 1,
        title: 'Konsultācijas',
        description: 'Individuālas konsultācijas ar PEP mammas metodoloģiju. Atbalsts konkrētām situācijām un izaicinājumiem.',
        longDescription: 'Personalizēts atbalsts tavai ģimenei. Konsultācijas notiek online vai klātienē, pēc tavas izvēles.',
        icon: ChatBubbleLeftRightIcon,
        image: '/images/demo/consultation.png',
        price: 45,
        priceText: 'No 45€',
        href: '/pakalpojumi/konsultacijas',
        category: 'Pakalpojumi',
        features: [
            '60 minūšu individuāla konsultācija',
            'Personalizēti risinājumi',
            'Online vai klātienē',
            'Sekojošs atbalsts e-pastā'
        ]
    },
    {
        id: 2,
        title: 'Grāmata "Izaugt Mīlestībā"',
        description: 'Rokasgrāmata mīlošai audzināšanai. Praktiski padomi un metodes katrai dienai.',
        longDescription: 'Visaptveroša rokasgrāmata vecākiem, kas vēlas audzināt bērnus ar mīlestību un sapratni.',
        icon: BookOpenIcon,
        image: '/images/demo/book.png',
        price: 24.99,
        priceText: '24.99€',
        href: '/pakalpojumi/gramata',
        category: 'Produkti',
        features: [
            '250+ lappuses praktisko padomu',
            'PEP mammas metodoloģija',
            'Reāli piemēri no dzīves',
            'Digitālā un fiziskā versija'
        ]
    },
    {
        id: 3,
        title: '30 Dienu Izaicinājums',
        description: '30 dienu izaicinājums vecākiem. Praktiski uzdevumi un atbalsts katru dienu.',
        longDescription: 'Transformē savas vecāku prasmes 30 dienās ar ikdienas uzdevumiem un atbalstu.',
        icon: AcademicCapIcon,
        image: '/images/demo/challenge.png',
        price: 39,
        priceText: '39€',
        href: '/pakalpojumi/izaicinajums',
        category: 'Programmas',
        features: [
            '30 dienu strukturēta programma',
            'Ikdienas uzdevumi un refleksijas',
            'Privāta Facebook grupa',
            'Tiešsaistes atbalsts'
        ]
    }
]

const categories = ['Visi', 'Pakalpojumi', 'Produkti', 'Programmas']

export default function PakalpojumiPage() {
    const [selectedCategory, setSelectedCategory] = useState('Visi')

    const filteredProducts = selectedCategory === 'Visi'
        ? products
        : products.filter(p => p.category === selectedCategory)

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-16">
                <div className="container-custom">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
                        Mūsu Pakalpojumi
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90 max-w-3xl">
                        Izvēlies sev piemērotāko atbalsta veidu savā vecāku ceļā
                    </p>
                </div>
            </div>

            <div className="container-custom py-12">
                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${selectedCategory === category
                                    ? 'bg-primary-500 text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 shadow-md'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => (
                        <Card key={product.id} className="flex flex-col h-full group">
                            {/* Product Image */}
                            <div className="relative h-56 mb-4 rounded-xl overflow-hidden bg-gray-200">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                                    <span className="text-sm font-semibold text-primary-600">
                                        {product.category}
                                    </span>
                                </div>
                            </div>

                            {/* Icon */}
                            <div className="flex items-center justify-center mb-4">
                                <div className="bg-primary-100 p-3 rounded-full">
                                    <product.icon className="h-8 w-8 text-primary-600" />
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-display font-bold mb-3 text-center text-primary-500">
                                {product.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 mb-4 text-center leading-relaxed flex-grow">
                                {product.description}
                            </p>

                            {/* Features */}
                            <ul className="space-y-2 mb-6">
                                {product.features.map((feature, index) => (
                                    <li key={index} className="flex items-start text-sm text-gray-600">
                                        <svg className="h-5 w-5 text-secondary-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* Price */}
                            <div className="text-center mb-6">
                                <span className="text-3xl font-bold text-primary-500">
                                    {product.priceText}
                                </span>
                            </div>

                            {/* Buttons */}
                            <div className="space-y-3 mt-auto">
                                <Link href={product.href} className="block">
                                    <Button variant="primary" size="md" className="w-full">
                                        Uzzināt vairāk
                                    </Button>
                                </Link>
                                <Button variant="secondary" size="md" className="w-full">
                                    <ShoppingCartIcon className="h-5 w-5 mr-2 inline" />
                                    Pievienot grozam
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-xl text-gray-600">
                            Nav atrasti produkti šajā kategorijā.
                        </p>
                    </div>
                )}

                {/* CTA Section */}
                <div className="mt-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 md:p-12 text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                        Nevari izlemt?
                    </h2>
                    <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                        Sazinies ar mums, un mēs palīdzēsim izvēlēties piemērotāko risinājumu tieši tavai ģimenei.
                    </p>
                    <Link href="/kontakti">
                        <Button variant="secondary" size="lg">
                            Sazināties ar mums
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
