'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { ShoppingCartIcon, ChatBubbleLeftRightIcon, BookOpenIcon } from '@heroicons/react/24/outline'

const products = [
    {
        id: 1,
        title: 'Konsultācija klātienē',
        description: 'Individuāla saruna mājīgā vidē, veltot pilnu uzmanību Tev un Tavām sajūtām.',
        longDescription: 'Personalizēts atbalsts tavai ģimenei klātienē. Konsultācija notiek mājīgā atmosfērā, sniedzot iespēju padziļināti pārrunāt Tev svarīgos jautājumus.',
        icon: ChatBubbleLeftRightIcon,
        image: '/images/demo/consultation.png',
        price: 50,
        priceText: '50€',
        href: '/pakalpojumi/konsultacijas-klatiene',
        category: 'Pakalpojumi',
        features: [
            '60 minūšu individuāla saruna',
            'Empātiska un saprotoša vide',
            'PEP mammas metodoloģija',
            'Sekojošs atbalsts nepieciešamības gadījumā'
        ]
    },
    {
        id: 2,
        title: 'Konsultācija online',
        description: 'Ērts un pieejams atbalsts no jebkuras vietas, kur jūties vislabāk.',
        longDescription: 'Saņem atbalstu neizejot no mājām. Videozvans sniedz to pašu tuvības sajūtu un profesionālo atbalstu, pielāgojoties Tavam ritmam.',
        icon: ChatBubbleLeftRightIcon,
        image: '/images/demo/online-consultation.png',
        price: 35,
        priceText: '35€',
        href: '/pakalpojumi/konsultacijas-online',
        category: 'Pakalpojumi',
        features: [
            '60 minūšu video saruna',
            'Pieejams no jebkuras vietas pasaulē',
            'Nav jātērē laiks ceļā',
            'Konfidentiāls un ērts risinājums'
        ]
    },
    {
        id: 3,
        title: 'Grāmata "Mammas sajūtu dienasgrāmata"',
        description: 'Tavs ceļvedis un atbalsts ikdienas gaitās.',
        longDescription: 'Praktiska un iedvesmojoša rokasgrāmata, kas palīdzēs Tev sajust un izprast savas emocijas vecāku ceļā.',
        icon: BookOpenIcon,
        image: '/images/demo/book.png',
        price: 19.99,
        priceText: '19.99€',
        href: '/pakalpojumi/gramata',
        category: 'Produkti',
        features: [
            'Praktiski uzdevumi un refleksijas',
            'Iedvesmas mirkļi katrai dienai',
            'Mīļš un pārdomāts dizains',
            'Vērtīgas atziņas un padomi'
        ]
    }
]

const categories = ['Visi', 'Pakalpojumi', 'Produkti']

export default function PakalpojumiPage() {
    const [selectedCategory, setSelectedCategory] = useState('Visi')

    const filteredProducts = selectedCategory === 'Visi'
        ? products
        : products.filter(p => p.category === selectedCategory)

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-8">
                <div className="container-custom">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
                        Tavam atbalstam
                    </h1>
                </div>
            </div>

            <div className="container-custom py-6">
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
