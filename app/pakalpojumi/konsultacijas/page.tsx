import Image from 'next/image'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { CheckCircleIcon, ClockIcon, VideoCameraIcon } from '@heroicons/react/24/outline'

const services = [
    {
        title: 'Individuālā konsultācija',
        duration: '60 min',
        price: '45€',
        description: 'Personīga tikšanās online vai klātienē',
        features: [
            'Individuāla pieeja tavai situācijai',
            'Praktiski risinājumi',
            'Atbalsts un iedrošinājums',
            'Sekojošs atbalsts e-pastā',
        ],
    },
    {
        title: 'Konsultāciju pakete',
        duration: '3 x 60 min',
        price: '120€',
        description: 'Trīs konsultācijas ar atlaidi',
        features: [
            'Ilgtermiņa atbalsts',
            'Progresa izsekošana',
            'Prioritārs atbalsts',
            'Materiāli starp sesijām',
        ],
        popular: true,
    },
    {
        title: 'Ģimenes konsultācija',
        duration: '90 min',
        price: '65€',
        description: 'Konsultācija abiem vecākiem kopā',
        features: [
            'Abi vecāki piedalās',
            'Kopīga izpratne',
            'Vienota pieeja',
            'Praktisks rīcības plāns',
        ],
    },
]

export default function KonsultacijasPage() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white py-20">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">
                                Konsultācijas Vecākiem
                            </h1>
                            <p className="text-xl opacity-90 mb-8">
                                Personīgs atbalsts un praktiski risinājumi tavai ģimenei. Konsultācijas balstītas uz PEP mammas metodoloģiju.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button href="#paketes" variant="outline" size="lg" className="bg-white text-primary-600 hover:bg-gray-50">
                                    Izvēlēties paketi
                                </Button>
                                <Button href="/runa" variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                                    Vai sāc ar AI chatbot
                                </Button>
                            </div>
                        </div>
                        <div className="relative">
                            <Image
                                src="/images/demo/consultation.png"
                                alt="Konsultācija"
                                width={600}
                                height={600}
                                className="rounded-2xl shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <h2 className="text-4xl font-display font-bold text-center mb-12">
                        Kā tas <span className="text-gradient">notiek?</span>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-primary-600">1</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Rezervē laiku</h3>
                            <p className="text-gray-600">Izvēlies sev ērtu laiku un aizpildi īsu anketu</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-primary-600">2</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Tikšanās</h3>
                            <p className="text-gray-600">Online vai klātienē - kā tev ērtāk</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-primary-600">3</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Rīcības plāns</h3>
                            <p className="text-gray-600">Saņem praktisku plānu un turpmāku atbalstu</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Packages */}
            <section id="paketes" className="py-20 bg-gray-50">
                <div className="container-custom">
                    <h2 className="text-4xl font-display font-bold text-center mb-12">
                        Izvēlies <span className="text-gradient">Sev Piemēroto</span>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <Card
                                key={index}
                                className={`relative ${service.popular ? 'ring-2 ring-primary-500 pt-6 !overflow-visible' : ''}`}
                            >
                                {service.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                            Populārākais
                                        </span>
                                    </div>
                                )}
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-display font-bold mb-2">{service.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-4">
                                        <ClockIcon className="h-4 w-4" />
                                        <span>{service.duration}</span>
                                    </div>
                                    <div className="text-4xl font-bold text-primary-600">{service.price}</div>
                                </div>
                                <ul className="space-y-3 mb-6">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-start space-x-2">
                                            <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    href="#rezervet"
                                    variant={service.popular ? 'primary' : 'outline'}
                                    className="w-full"
                                >
                                    Rezervēt
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl font-display font-bold mb-4 text-white">
                        Gatavs sākt?
                    </h2>
                    <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                        Rezervē savu pirmo konsultāciju un saņem atbalstu, kas tev nepieciešams
                    </p>
                    <Button href="#rezervet" variant="outline" size="lg" className="bg-white text-primary-600 hover:bg-gray-50">
                        Rezervēt konsultāciju
                    </Button>
                </div>
            </section>
        </div>
    )
}
