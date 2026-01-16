'use client'

import { useCart } from '@/lib/cart/cartContext'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { StarIcon } from '@heroicons/react/24/solid'
import { CheckCircleIcon, HeartIcon, BookOpenIcon, UserIcon } from '@heroicons/react/24/outline'

export default function GramataPage() {
    const { addItem } = useCart()

    const handleAddToCart = () => {
        addItem({
            id: 'book-1',
            name: 'Rokasgrāmata "Izaugt Mīlestībā"',
            price: 24.99,
            image: '/images/demo/book.png',
        })
    }

    const sections = [
        {
            title: 'Kāpēc izvēlēties šo grāmatu?',
            icon: HeartIcon,
            content: 'Ikdienas atgādinātājs, ka rūpes par bēbīti sākas ar rūpēm par sevi. Vizuāli skaista un informatīvi bagāta rokasgrāmata, kas kalpo arī kā dienasgrāmata, glabājot atmiņas par gaidību laikā piedzīvoto.'
        },
        {
            title: 'Ko tajā atradīsi?',
            icon: BookOpenIcon,
            content: 'Grāmatā apkopotas dažādu nozaru speciālistu koncentrētas atbildes uz topošo vecāku jautājumiem, ieteikumi un praktiski padomi.',
            bullets: [
                'Emocijas un sajūtas gaidību laikā',
                'Attiecības ar partneri un to stiprināšana',
                'Stress un tā ietekme uz mammu un bērnu',
                'Dūlas un PEP mammas sniegtais atbalsts',
                'Svarīgākais par zīdīšanu, miegu un raudāšanu',
                'Ķermeņa izmaiņas un hormonu loma',
                'Ierunātas meditācijas un praktiski vingrinājumi'
            ]
        }
    ]

    const testimonials = [
        {
            name: 'Diāna Zande',
            role: 'Kognitīvi biheiviorālā terapeite',
            quote: 'Madaras Pauzeres grāmata būs droša pavadone topošajām mammām (jā, arī tētiem) ikdienā – no mazuļa gaidīšanas sākuma līdz brīdim, kad viņš jau paaudzies.'
        },
        {
            name: 'Elīna Kļaviņa',
            role: 'PEP mamma',
            quote: 'Mammas sajūtu dienasgrāmata var palīdzēt mammām ne tikai mierpilni piedzīvot gaidību laiku, bet arī rūpīgi sagatavoties jūtīgajam pēcdzemdību posmam.'
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="py-12 md:py-20 bg-gradient-to-br from-cream-50 to-primary-50">
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
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 leading-tight">
                                Rokasgrāmata <span className="text-gradient">Mīlošai Audzināšanai</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Vērtīgs ceļvedis topošajai un jaunajai māmiņai. Rūpes par bēbīti sākas ar rūpēm par sevi.
                            </p>

                            <div className="bg-white rounded-2xl p-8 shadow-xl border border-primary-100 mb-8">
                                <div className="flex items-baseline space-x-3 mb-6">
                                    <span className="text-4xl font-bold text-primary-600">24.99€</span>
                                    <span className="text-xl text-gray-400 line-through">29.99€</span>
                                </div>
                                <Button onClick={handleAddToCart} size="lg" className="w-full h-14 text-lg mb-4">
                                    Pievienot grozam
                                </Button>
                                <p className="text-gray-500 text-center flex items-center justify-center space-x-2">
                                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                    <span>Bezmaksas piegāde visā Latvijā</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Content Section */}
            <section className="py-20">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-16">
                        {sections.map((section, idx) => (
                            <div key={idx} className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-primary-100 rounded-xl">
                                        <section.icon className="h-8 w-8 text-primary-600" />
                                    </div>
                                    <h2 className="text-3xl font-display font-bold text-gray-900">{section.title}</h2>
                                </div>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {section.content}
                                </p>
                                {section.bullets && (
                                    <ul className="space-y-3">
                                        {section.bullets.map((bullet, i) => (
                                            <li key={i} className="flex items-start space-x-3">
                                                <CheckCircleIcon className="h-6 w-6 text-primary-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-warm-50">
                <div className="container-custom">
                    <h2 className="text-4xl font-display font-bold text-center mb-16">Ko par grāmatu <span className="text-gradient">saka speciālisti?</span></h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {testimonials.map((t, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-primary-50 relative">
                                <svg className="absolute top-4 right-4 h-12 w-12 text-primary-100 opacity-50" fill="currentColor" viewBox="0 0 32 32">
                                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                </svg>
                                <p className="text-lg italic text-gray-700 mb-6 relative z-10">"{t.quote}"</p>
                                <div className="flex items-center space-x-4">
                                    <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{t.name}</h4>
                                        <p className="text-sm text-gray-500">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Author Section */}
            <section className="py-20">
                <div className="container-custom">
                    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl overflow-hidden text-white">
                        <div className="grid md:grid-cols-3 gap-0">
                            <div className="p-12 md:col-span-2 space-y-6">
                                <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-1 rounded-full text-sm">
                                    <UserIcon className="h-4 w-4" />
                                    <span>Par autori</span>
                                </div>
                                <h2 className="text-4xl font-display font-bold text-white">Madara Pauzere</h2>
                                <p className="text-xl opacity-90 leading-relaxed">
                                    Žurnāliste, redaktore un projekta “Izaugt Mīlestībā” radītāja. Šī grāmata tapusi, balstoties personīgajā pieredzē – tajā, ko Madarai kā topošajai un jaunajai mammai bija vissvarīgāk uzzināt un piedzīvot.
                                </p>
                                <div className="pt-4">
                                    <Button variant="secondary" size="lg" href="/iepazisimies">
                                        Uzzināt vairāk par projektu
                                    </Button>
                                </div>
                            </div>
                            <div className="bg-black/10 flex items-center justify-center p-12">
                                <div className="text-center italic">
                                    "Dalos ar to, kas ļoti noderējis man pašai."
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
