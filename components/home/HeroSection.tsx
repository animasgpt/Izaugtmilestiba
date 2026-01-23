'use client'

import Image from 'next/image'
import Button from '@/components/ui/Button'
import SiteText from '@/components/SiteText'
import { SparklesIcon } from '@heroicons/react/24/outline'

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-r from-cream-500 to-light py-4 md:py-6">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="space-y-6 animate-fade-in">


                        <SiteText
                            textKey="home.hero.title"
                            fallback="Izaugt mīlestībā"
                            as="h1"
                            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-primary-500"
                        />

                        <div className="space-y-4 max-w-xl">
                            <p className="text-xl md:text-2xl font-bold text-primary-500 leading-snug">
                                “Bērniem nav vajadzīgi perfekti vecāki.<br />
                                Bērniem ir vajadzīgi mīloši vecāki.”
                            </p>
                            <div className="text-primary-500/80 space-y-0.5">
                                <p className="text-base">Sertificēta PEP mamma,</p>
                                <p className="text-base">“Mammas sajūtu dienasgrāmata” autore</p>
                                <p className="font-semibold text-primary-500">Madara Pauzere</p>
                            </div>
                        </div>


                    </div>

                    {/* Image */}
                    <div className="relative animate-slide-up animation-delay-200">
                        <div className="relative rounded-3xl overflow-hidden shadow-medium">
                            <Image
                                src="/personal/madara11.jpeg"
                                alt="Izaugt mīlestībā"
                                width={800}
                                height={800}
                                className="w-full h-auto object-cover aspect-[4/3] rounded-3xl"
                                priority
                            />
                        </div>

                        {/* Floating elements */}
                        <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 animate-scale-in animation-delay-400">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-secondary-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-gray-700">Ai chatbot aktīvs</span>
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
