import type { Metadata } from 'next'
import Card from '@/components/ui/Card'
import { StarIcon } from '@heroicons/react/24/solid'
import { UserCircleIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
    title: 'Atsauksmes | Izaugt Mīlestībā',
    description: 'Lasiet, ko vecāki saka par mūsu pakalpojumiem un atbalstu',
}

const testimonials = [
    {
        id: 1,
        name: 'Anna Bērziņa',
        role: 'Māmiņa 2 bērniem',
        rating: 5,
        text: 'Konsultācija ar Lauru man palīdzēja saprast, kā labāk komunicēt ar savu 3 gadus veco dēlu. Viņas empātiskā pieeja un praktiskie padomi bija tieši tas, kas man bija vajadzīgs. Paldies!',
        date: '2026-01-10',
    },
    {
        id: 2,
        name: 'Māra Kalniņa',
        role: 'Topošā māmiņa',
        rating: 5,
        text: 'Grāmata "Izaugt Mīlestībā" ir kļuvusi par manu rokasgrāmatu. Lasīju to gaidību laikā un tagad, kad mazulis ir piedzimis, bieži atgriežos pie konkrētām nodaļām. Ļoti ieteicu!',
        date: '2026-01-08',
    },
    {
        id: 3,
        name: 'Kristīne Liepa',
        role: 'Māmiņa 4 gadus vecam bērnam',
        rating: 5,
        text: 'AI chatbot ir brīnišķīgs! Kad naktī bērns nevar aizmigt un es nezinu, ko darīt, varu uzreiz saņemt padomu. Protams, tas neaizstāj īstu konsultāciju, bet palīdz stresa brīžos.',
        date: '2026-01-05',
    },
    {
        id: 4,
        name: 'Ieva Ozola',
        role: 'Māmiņa dvīņiem',
        rating: 5,
        text: 'Izaicinājumu programma man palīdzēja izveidot rutīnu ar dvīņiem. 30 dienu laikā es jutos daudz pārliecinātāka un mierīgāka. Paldies par šo atbalstu!',
        date: '2026-01-03',
    },
    {
        id: 5,
        name: 'Laura Zariņa',
        role: 'Māmiņa 1 gadu vecam bērnam',
        rating: 5,
        text: 'Podkāsti ir lieliski! Klausos tos, braucot uz darbu. Īpaši patika epizode par miega rutīnām - pielietoju padomus un rezultāti bija jau pēc nedēļas!',
        date: '2025-12-28',
    },
    {
        id: 6,
        name: 'Sanita Krūmiņa',
        role: 'Māmiņa 5 gadus vecam bērnam',
        rating: 5,
        text: 'Raksti ir ļoti noderīgi un viegli lasāmi. Patīk, ka var filtrēt pa vecuma grupām. Atgriezos pie tiem atkal un atkal, kad rodas jautājumi.',
        date: '2025-12-25',
    },
]

export default function AtsauksmesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50">
            {/* Hero */}
            <section className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white section-padding">
                <div className="container-custom text-center">
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                        Ko Saka Mūsu Vecāki
                    </h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Reālas atsauksmes no vecākiem, kas izmantojuši mūsu pakalpojumus
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-primary-600 mb-2">500+</div>
                            <div className="text-gray-600">Apmierinātie vecāki</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-primary-600 mb-2">4.9</div>
                            <div className="text-gray-600">Vidējais vērtējums</div>
                            <div className="flex items-center justify-center mt-2">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                                ))}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-primary-600 mb-2">98%</div>
                            <div className="text-gray-600">Ieteiktu draugiem</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <Card key={testimonial.id} className="flex flex-col">
                                {/* Rating */}
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                                    ))}
                                </div>

                                {/* Text */}
                                <p className="text-gray-700 mb-6 flex-grow">
                                    "{testimonial.text}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                        <UserCircleIcon className="h-8 w-8 text-primary-600" />
                                    </div>
                                    <div>
                                        <div className="font-semibold">{testimonial.name}</div>
                                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                        Gatavs sākt savu ceļojumu?
                    </h2>
                    <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                        Pievienojies simtiem vecāku, kas jau saņem atbalstu
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/pakalpojumi/konsultacijas" className="btn-primary">
                            Rezervēt konsultāciju
                        </a>
                        <a href="/runa" className="btn bg-white text-primary-600 hover:bg-gray-50">
                            Runāt ar AI chatbot
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
