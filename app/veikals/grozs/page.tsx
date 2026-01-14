'use client'

import { useCart } from '@/lib/cart/cartContext'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

export default function GrozsPage() {
    const { items, totalPrice, removeItem, updateQuantity } = useCart()

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-display font-bold mb-4">Tavs grozs ir tukšs</h1>
                    <p className="text-gray-600 mb-8">Pievieno produktus, lai turpinātu</p>
                    <Button href="/pakalpojumi">Skatīt pakalpojumus</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container-custom py-16">
                <h1 className="text-4xl font-display font-bold mb-8">Tavs grozs</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl p-6 shadow-md">
                                <div className="flex items-center space-x-4">
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg">{item.name}</h3>
                                        <p className="text-primary-600 font-bold">{item.price.toFixed(2)}€</p>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 rounded-lg hover:bg-gray-100"
                                        >
                                            <MinusIcon className="h-5 w-5" />
                                        </button>
                                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 rounded-lg hover:bg-gray-100"
                                        >
                                            <PlusIcon className="h-5 w-5" />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl p-6 shadow-md sticky top-24">
                            <h2 className="text-xl font-display font-bold mb-4">Kopsavilkums</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Starpsumma:</span>
                                    <span className="font-semibold">{totalPrice.toFixed(2)}€</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Piegāde:</span>
                                    <span className="font-semibold text-green-600">Bezmaksas</span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between">
                                        <span className="font-bold text-lg">Kopā:</span>
                                        <span className="font-bold text-2xl text-primary-600">{totalPrice.toFixed(2)}€</span>
                                    </div>
                                </div>
                            </div>

                            <Button href="/veikals/checkout" className="w-full mb-3">
                                Turpināt uz apmaksu
                            </Button>
                            <Link href="/pakalpojumi" className="block text-center text-sm text-gray-600 hover:text-primary-600">
                                Turpināt iepirkties
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
