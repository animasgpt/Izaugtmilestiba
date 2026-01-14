import type { Metadata } from 'next'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
    title: 'Izaicinājumu Programma | Izaugt Mīlestībā',
    description: '30 dienu izaicinājums vecākiem - praktiski uzdevumi un atbalsts katru dienu',
}

const programFeatures = [
    '30 dienu strukturēta programma',
    'Ikdienas uzdevumi un vingrinājumi',
    'Darba burtnīca PDF formātā',
    'Video pamācības',
    'Privāta Facebook grupa atbalstam',
    'Iknedēļas live Q&A sesijas',
    'Sertifikāts pēc pabeigšanas',
    'Mūža piekļuve materiāliem',
]

const weeklyThemes = [
    {
        week: 1,
        title: 'Pašizpratne',
        description: 'Sāc ar sevi - apzinies savas emocijas, vajadzības un vecāku stilu.',
    },
    {
        week: 2,
        title: 'Komunikācija',
        description: 'Iemācies efektīvi komunicēt ar bērnu, klausīties un saprast.',
    },
    {
        week: 3,
        title: 'Robežas un Rutīnas',
        description: 'Izveido veselīgas robežas un konsekventas rutīnas ģimenē.',
    },
    {
        week: 4,
        title: 'Integrācija',
        description: 'Apvieno visu apgūto un izveido ilgtermiņa plānu.',
    },
]

export default function IzaicinajumsPage() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="bg-gradient-to-br from-warm-500 to-primary-500 text-white section-padding">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                                30 Dienu Izaicinājums Vecākiem
                            </h1>
                            <p className="text-xl opacity-90 mb-8">
                                Transformē savu vecāku ceļu ar strukturētu programmu, kas palīdzēs tev kļūt par pārliecinātāku un mierīgāku vecāku.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button href="#pievienoties" size="lg" className="bg-white text-warm-600 hover:bg-gray-50">
                                    Sākt Tagad - 39€
                                </Button>
                                <Button href="#programma" variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                                    Uzzināt vairāk
                                </Button>
                            </div>
                        </div>

                        <div className="relative">
                            <Image
                                src="/images/demo/challenge.png"
                                alt="Izaicinājumu programma"
                                width={600}
                                height={600}
                                className="rounded-2xl shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* What's Included */}
            <section id="programma" className="section-padding bg-white">
                <div className="container-custom">
                    <h2 className="text-4xl font-display font-bold text-center mb-12">
                        Ko <span className="text-gradient">Iegūsi?</span>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {programFeatures.map((feature, index) => (
                            <div key={index} className="flex items-start space-x-3">
                                <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                                <span className="text-lg">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Weekly Breakdown */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <h2 className="text-4xl font-display font-bold text-center mb-12">
                        Programmas <span className="text-gradient">Struktūra</span>
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {weeklyThemes.map((week) => (
                            <Card key={week.week} className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-warm-400 to-primary-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white font-bold text-2xl">{week.week}</span>
                                </div>
                                <h3 className="text-xl font-display font-semibold mb-2">{week.title}</h3>
                                <p className="text-gray-600">{week.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <Card className="max-w-3xl mx-auto bg-gradient-to-br from-primary-50 to-warm-50">
                        <div className="text-center">
                            <div className="text-5xl mb-4">⭐⭐⭐⭐⭐</div>
                            <p className="text-xl italic text-gray-700 mb-6">
                                "Šī programma mainīja manu dzīvi! 30 dienu laikā es jutos daudz pārliecinātāka un mierīgāka. Uzdevumi bija praktiski un viegli pielietojami ikdienā. Ieteicu visiem vecākiem!"
                            </p>
                            <div className="font-semibold">Ieva Ozola</div>
                            <div className="text-sm text-gray-600">Māmiņa dvīņiem</div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* CTA */}
            <section id="pievienoties" className="section-padding bg-gradient-to-r from-warm-500 to-primary-500 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                        Gatavs Sākt Transformāciju?
                    </h2>
                    <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                        Pievienojies simtiem vecāku, kas jau ir pabeiguši šo programmu
                    </p>

                    <div className="bg-white rounded-2xl p-8 max-w-md mx-auto text-gray-900 mb-8">
                        <div className="text-5xl font-bold text-warm-600 mb-2">39€</div>
                        <div className="text-gray-600 mb-6">Vienreizējs maksājums</div>
                        <Button className="w-full mb-4 bg-warm-500 hover:bg-warm-600">
                            Pievienoties Tagad
                        </Button>
                        <p className="text-sm text-gray-600">
                            30 dienu naudas atgriešanas garantija
                        </p>
                    </div>

                    <p className="text-sm opacity-75">
                        Programma sākas katru mēneša 1. datumu
                    </p>
                </div>
            </section>
        </div>
    )
}
