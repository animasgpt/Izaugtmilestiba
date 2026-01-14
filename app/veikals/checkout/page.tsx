'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart/cartContext'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

const dpdLocations = [
    { id: '1', name: 'DPD Pakomāts - Rīga, Brīvības iela 123', address: 'Brīvības iela 123, Rīga' },
    { id: '2', name: 'DPD Pakomāts - Rīga, Miera iela 45', address: 'Miera iela 45, Rīga' },
    { id: '3', name: 'DPD Pakomāts - Jelgava, Lielā iela 12', address: 'Lielā iela 12, Jelgava' },
]

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCart()
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        dpdLocation: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 1500))

        clearCart()
        router.push('/veikals/pateicibas')
    }

    if (items.length === 0) {
        router.push('/veikals/grozs')
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container-custom py-16">
                <h1 className="text-4xl font-display font-bold mb-8">Noformēt pasūtījumu</h1>

                {/* Progress */}
                <div className="flex items-center justify-center mb-12">
                    <div className="flex items-center space-x-4">
                        <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-300'}`}>
                                {step > 1 ? <CheckCircleIcon className="h-6 w-6" /> : '1'}
                            </div>
                            <span className="font-medium">Dati</span>
                        </div>
                        <div className="w-16 h-0.5 bg-gray-300"></div>
                        <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-300'}`}>
                                {step > 2 ? <CheckCircleIcon className="h-6 w-6" /> : '2'}
                            </div>
                            <span className="font-medium">Piegāde</span>
                        </div>
                        <div className="w-16 h-0.5 bg-gray-300"></div>
                        <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary-500 text-white' : 'bg-gray-300'}`}>
                                3
                            </div>
                            <span className="font-medium">Apmaksa</span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Step 1: Personal info */}
                            {step === 1 && (
                                <Card>
                                    <h2 className="text-2xl font-display font-bold mb-6">Tavi dati</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Vārds, Uzvārds *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="input-field"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">E-pasts *</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="input-field"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Telefons *</label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="input-field"
                                            />
                                        </div>
                                    </div>
                                    <Button type="button" onClick={() => setStep(2)} className="w-full mt-6">
                                        Turpināt
                                    </Button>
                                </Card>
                            )}

                            {/* Step 2: Delivery */}
                            {step === 2 && (
                                <Card>
                                    <h2 className="text-2xl font-display font-bold mb-6">Izvēlies DPD pakomātu</h2>
                                    <div className="space-y-3">
                                        {dpdLocations.map((location) => (
                                            <label
                                                key={location.id}
                                                className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${formData.dpdLocation === location.id
                                                        ? 'border-primary-500 bg-primary-50'
                                                        : 'border-gray-200 hover:border-primary-300'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="dpd"
                                                    value={location.id}
                                                    checked={formData.dpdLocation === location.id}
                                                    onChange={(e) => setFormData({ ...formData, dpdLocation: e.target.value })}
                                                    className="sr-only"
                                                />
                                                <div className="font-semibold">{location.name}</div>
                                                <div className="text-sm text-gray-600">{location.address}</div>
                                            </label>
                                        ))}
                                    </div>
                                    <div className="flex space-x-4 mt-6">
                                        <Button type="button" onClick={() => setStep(1)} variant="outline" className="flex-1">
                                            Atpakaļ
                                        </Button>
                                        <Button type="button" onClick={() => setStep(3)} className="flex-1" disabled={!formData.dpdLocation}>
                                            Turpināt
                                        </Button>
                                    </div>
                                </Card>
                            )}

                            {/* Step 3: Payment */}
                            {step === 3 && (
                                <Card>
                                    <h2 className="text-2xl font-display font-bold mb-6">Apmaksa</h2>
                                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                        <p className="text-center text-gray-600">
                                            💳 Demo režīms - spied "Apmaksāt" lai simulētu maksājumu
                                        </p>
                                    </div>
                                    <div className="flex space-x-4">
                                        <Button type="button" onClick={() => setStep(2)} variant="outline" className="flex-1">
                                            Atpakaļ
                                        </Button>
                                        <Button type="submit" className="flex-1">
                                            Apmaksāt {totalPrice.toFixed(2)}€
                                        </Button>
                                    </div>
                                </Card>
                            )}
                        </form>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <h2 className="text-xl font-display font-bold mb-4">Tavs pasūtījums</h2>
                            <div className="space-y-3 mb-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span>{item.name} x{item.quantity}</span>
                                        <span className="font-semibold">{(item.price * item.quantity).toFixed(2)}€</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t pt-4">
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Kopā:</span>
                                    <span className="text-primary-600">{totalPrice.toFixed(2)}€</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
