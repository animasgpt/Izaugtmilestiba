import Image from 'next/image'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { ChatBubbleLeftRightIcon, BookOpenIcon, AcademicCapIcon } from '@heroicons/react/24/outline'

const services = [
    {
        id: 1,
        title: 'Konsultācijas',
        description: 'Individuālas konsultācijas ar PEP mammas metodoloģiju. Atbalsts konkrētām situācijām un izaicinājumiem.',
        icon: ChatBubbleLeftRightIcon,
        image: '/images/demo/consultation.png',
        price: 'No 45€',
        href: '/pakalpojumi/konsultacijas',
    },
    {
        id: 2,
        title: 'Grāmata',
        description: 'Rokasgrāmata mīlošai audzināšanai. Praktiskas metodes un padomiem katrai dienai.',
        icon: BookOpenIcon,
        image: '/images/demo/book.png',
        price: '24.99€',
        href: '/pakalpojumi/gramata',
    },
    {
        id: 3,
        title: 'Izaicinājumu programma',
        description: '30 dienu izaicinājums vecākiem. Praktiski uzdevumi un atbalsts katru dienu.',
        icon: AcademicCapIcon,
        image: '/images/demo/challenge.png',
        price: '39€',
        href: '/pakalpojumi/izaicinajums',
    },
]

export default function ServicesPreview() {
    return (
        <section className="py-16 md:py-24 bg-light">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-primary-500">
                        Mūsu <span className="text-accent-500">Pakalpojumi</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        Izvēlies sev piemērotāko atbalsta veidu
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className={`service-card animate-slide-up animation-delay-${index * 200}`}
                        >
                            <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            <div className="flex items-center justify-center space-x-3 mb-4">
                                <service.icon className="h-8 w-8 text-primary-500" />
                            </div>

                            <h3 className="text-xl md:text-2xl font-display font-bold mb-3 text-center text-primary-500">
                                {service.title}
                            </h3>

                            <p className="text-gray-700 mb-6 text-center leading-relaxed">
                                {service.description}
                            </p>

                            <div className="text-center mb-6">
                                <span className="text-2xl font-bold text-primary-500">{service.price}</span>
                            </div>

                            <Button href={service.href} variant="secondary" size="md" className="w-full">
                                Uzzināt vairāk
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button href="/pakalpojumi" variant="primary" size="lg">
                        Skatīt visus pakalpojumus
                    </Button>
                </div>
            </div>
        </section>
    )
}
