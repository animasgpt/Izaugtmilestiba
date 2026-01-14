import Link from 'next/link'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'

const footerLinks = {
    pakalpojumi: [
        { name: 'Konsultācijas', href: '/pakalpojumi/konsultacijas' },
        { name: 'Grāmata', href: '/pakalpojumi/gramata' },
        { name: 'Izaicinājumu programma', href: '/pakalpojumi/izaicinajums' },
    ],
    saturs: [
        { name: 'Raksti', href: '/lasi' },
        { name: 'Podkāsti', href: '/klausies' },
        { name: 'AI Chatbot', href: '/runa' },
    ],
    informacija: [
        { name: 'Iepazīsimies', href: '/iepazisimies' },
        { name: 'Atsauksmes', href: '/atsauksmes' },
        { name: 'Kontakti', href: '/kontakti' },
    ],
}

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-50 to-primary-50 border-t border-gray-200">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <img
                                src="/images/IM-sirds pirms.png"
                                alt="Izaugt Mīlestībā"
                                className="h-12 w-auto"
                            />
                        </div>
                        <p className="text-sm text-gray-600">
                            Atbalsts vecākiem ceļā uz mīlošu un saprotoš u ģimeni.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="mailto:info@izaugtmilestiba.lv"
                                className="text-gray-600 hover:text-primary-600 transition-colors"
                            >
                                <EnvelopeIcon className="h-5 w-5" />
                            </a>
                            <a
                                href="tel:+37120000000"
                                className="text-gray-600 hover:text-primary-600 transition-colors"
                            >
                                <PhoneIcon className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Pakalpojumi</h3>
                        <ul className="space-y-2">
                            {footerLinks.pakalpojumi.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Saturs</h3>
                        <ul className="space-y-2">
                            {footerLinks.saturs.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Informācija</h3>
                        <ul className="space-y-2">
                            {footerLinks.informacija.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-gray-600">
                            © {new Date().getFullYear()} Izaugt Mīlestībā. Visas tiesības aizsargātas.
                        </p>
                        <div className="flex space-x-6">
                            <Link href="/privatuma-politika" className="text-sm text-gray-600 hover:text-primary-600">
                                Privātuma politika
                            </Link>
                            <Link href="/lietosanas-noteikumi" className="text-sm text-gray-600 hover:text-primary-600">
                                Lietošanas noteikumi
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
