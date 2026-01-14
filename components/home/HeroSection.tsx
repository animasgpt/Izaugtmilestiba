'use client'

import Image from 'next/image'
import Button from '@/components/ui/Button'
import { SparklesIcon } from '@heroicons/react/24/outline'

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-r from-cream-500 to-light py-16 md:py-24">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="space-y-6 animate-fade-in">
                        <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold">
                            <SparklesIcon className="h-5 w-5" />
                            <span>Tavs atbalsts vecāku ceļā</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-primary-500">
                            Atbalsts vecākiem ceļā uz{' '}
                            <span className="text-accent-500 block mt-2">mīlošu un saprotošu ģimeni.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-xl">
                            Konsultācijas, raksti, podkāsti un AI asistents - viss vienuviet, lai palīdzētu Jums augt kopā ar bērnu.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button href="/runa" variant="primary" size="lg">
                                Izmēģini AI PEP Mammu
                            </Button>
                            <Button href="/pakalpojumi" variant="secondary" size="lg">
                                Apskatīt pakalpojumus
                            </Button>
                        </div>

                        <div className="flex items-center gap-8 pt-6">
                            <div>
                                <div className="text-2xl md:text-3xl font-bold text-primary-500">500+</div>
                                <div className="text-sm text-gray-600">Apmierināti vecāki</div>
                            </div>
                            <div>
                                <div className="text-2xl md:text-3xl font-bold text-primary-500">100+</div>
                                <div className="text-sm text-gray-600">Raksti un resursi</div>
                            </div>
                            <div>
                                <div className="text-2xl md:text-3xl font-bold text-primary-500">24/7</div>
                                <div className="text-sm text-gray-600">AI atbalsts</div>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative animate-slide-up animation-delay-200">
                        <div className="relative rounded-3xl overflow-hidden shadow-medium">
                            <Image
                                src="/images/demo/hero.png"
                                alt="Māte un bērns kopā"
                                width={600}
                                height={600}
                                className="w-full h-auto"
                                priority
                            />
                        </div>

                        {/* Floating elements */}
                        <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 animate-scale-in animation-delay-400">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-secondary-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-gray-700">AI Chatbot aktīvs</span>
                            </div>
                        </div>

                        {/* Decorative circles */}
                        <div className="absolute -top-8 -left-8 w-32 h-32 bg-secondary-500 rounded-full opacity-30 -z-10"></div>
                        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-accent-500 rounded-full opacity-30 -z-10"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
