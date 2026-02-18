import Image from 'next/image'
import Button from '@/components/ui/Button'
import { ChatBubbleLeftRightIcon, BookOpenIcon } from '@heroicons/react/24/outline'

const services = [
    {
        id: 1,
        title: 'Konsultācija klātienē',
        description: 'Individuāla saruna mājīgā vidē, veltot pilnu uzmanību Tev un Tavām sajūtām.',
        icon: ChatBubbleLeftRightIcon,
        image: '/images/demo/consultation.png',
        price: '50€',
        href: '/pakalpojumi/konsultacijas-klatiene',
    },
    {
        id: 2,
        title: 'Konsultācija online',
        description: 'Ērts un pieejams atbalsts no jebkuras vietas, kur jūties vislabāk.',
        icon: ChatBubbleLeftRightIcon,
        image: '/images/demo/online-consultation.png',
        price: '35€',
        href: '/pakalpojumi/konsultacijas-online',
    },
    {
        id: 3,
        title: 'Grāmata',
        description: '“Mammas sajūtu dienasgrāmata” – Tavs ceļvedis un atbalsts ikdienas gaitās.',
        icon: BookOpenIcon,
        image: '/images/demo/book.png',
        price: '19.99€',
        href: '/pakalpojumi/gramata',
    },
]

export default function ServicesPreview() {
    return (
        <section className="pt-8 pb-16 md:pt-12 md:pb-24 bg-light">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-primary-500">
                        Tavam <span className="text-accent-500">atbalstam</span>
                    </h2>
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
            </div>
        </section>
    )
}
