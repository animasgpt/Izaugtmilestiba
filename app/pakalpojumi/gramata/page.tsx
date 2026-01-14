'use client'

import { useCart } from '@/lib/cart/cartContext'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { StarIcon } from '@heroicons/react/24/solid'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export default function GramataPage() {
    const { addItem } = useCart()

    const handleAddToCart = () => {
        addItem({
            id: 'book-1',
            name: 'Grāmata "Izaugt Mīlestībā"',
            price: 24.99,
            image: '/images/demo/book.png',
        })
    }

    return (
        <div className="min-h-screen">
            <section className="section-padding bg-gradient-to-br from-warm-50 to-primary-50">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="relative">
                            <Image
                                src="/images/demo/book.png"
                                alt="Grāmata Izaugt Mīlestībā"
                                width={500}
                                height={500}
                                className="rounded-2xl shadow-2xl mx-auto"
                            />
                            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl p-4">
                                <div className="flex items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">500+ pozitīvas atsauksmes</p>
                            </div>
                        </div>

                        <div>
                            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                                Rokasgrāmata <span className="text-gradient">Mīlošai Audzināšanai</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-6">
                                Praktiska grāmata vecākiem, kas vēlas audzināt bērnus ar mīlestību, cieņu un sapratni.
                            </p>

                            <div className="bg-white rounded-xl p-6 shadow-md mb-6">
                                <div className="flex items-baseline space-x-2 mb-4">
                                    <span className="text-4xl font-bold text-primary-600">24.99€</span>
                                    <span className="text-gray-500 line-through">29.99€</span>
                                </div>
                                <Button onClick={handleAddToCart} size="lg" className="w-full mb-3">
                                    Pievienot grozam
                                </Button>
                                <p className="text-sm text-gray-600 text-center">
                                    Bezmaksas piegāde visā Latvijā
                                </p>
                            </div>

                            <ul className="space-y-3">
                                {[
                                    '250+ lappuses praktisku padomu',
                                    'PEP mammas metodoloģija',
                                    'Reāli piemēri un situācijas',
                                    'Vingrinājumi un pašpārbaudes',
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center space-x-2">
                                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
