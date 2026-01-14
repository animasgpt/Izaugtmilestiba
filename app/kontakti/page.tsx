import type { Metadata } from 'next'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
    title: 'Kontakti un FAQ | Izaugt Mīlestībā',
    description: 'Sazinies ar mums un atrodi atbildes uz biežāk uzdotajiem jautājumiem',
}

const faqs = [
    {
        question: 'Kā es varu rezervēt konsultāciju?',
        answer: 'Vari rezervēt konsultāciju, aizpildot formu konsultāciju lapā vai sūtot e-pastu uz info@izaugtmilestiba.lv. Mēs sazināsimies ar tevi 24 stundu laikā, lai vienotos par piemērotu laiku.',
    },
    {
        question: 'Vai konsultācijas notiek tikai online?',
        answer: 'Piedāvājam gan online, gan klātienes konsultācijas Rīgā. Online konsultācijas notiek caur Zoom vai Google Meet - kā tev ērtāk.',
    },
    {
        question: 'Cik ilgi ilgst viena konsultācija?',
        answer: 'Standarta konsultācija ilgst 60 minūtes. Ģimenes konsultācijām paredzētas 90 minūtes. Ja nepieciešams ilgāks laiks, to var vienoties individuāli.',
    },
    {
        question: 'Vai AI chatbot ir bezmaksas?',
        answer: 'Jā, Digitālā PEP mamma (AI chatbot) ir pilnībā bezmaksas un pieejams 24/7. Nav nepieciešama reģistrācija.',
    },
    {
        question: 'Kā es varu saņemt grāmatu?',
        answer: 'Grāmatu var pasūtīt caur mūsu e-veikalu. Piegāde notiek ar DPD pakomātiem visā Latvijā. Piegāde ir bezmaksas!',
    },
    {
        question: 'Vai piedāvājat atlaides?',
        answer: 'Jā! Konsultāciju paketēm (3 konsultācijas) ir atlaide. Sekojiet mūsu sociālajiem medijiem, lai uzzinātu par īpašajiem piedāvājumiem.',
    },
    {
        question: 'Kāda ir jūsu atgriešanās politika?',
        answer: 'Ja grāmata ir nesabojāta, to var atgriezt 14 dienu laikā. Konsultāciju maksa netiek atmaksāta, bet to var pārcelt uz citu laiku.',
    },
    {
        question: 'Vai varu uzdot jautājumu pirms konsultācijas?',
        answer: 'Protams! Vari rakstīt uz info@izaugtmilestiba.lv vai izmantot AI chatbot ātrām atbildēm. Ja jautājums ir sarežģīts, iesakām rezervēt konsultāciju.',
    },
]

export default function KontaktiPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white section-padding">
                <div className="container-custom text-center">
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                        Sazinies ar Mums
                    </h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Mēs esam šeit, lai atbildētu uz taviem jautājumiem
                    </p>
                </div>
            </section>

            <div className="container-custom py-16">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div>
                        <h2 className="text-3xl font-display font-bold mb-6">Uzdod Savu Jautājumu</h2>
                        <Card>
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Vārds *</label>
                                    <input
                                        type="text"
                                        required
                                        className="input-field"
                                        placeholder="Tavs vārds"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">E-pasts *</label>
                                    <input
                                        type="email"
                                        required
                                        className="input-field"
                                        placeholder="tava.epasts@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Tālrunis</label>
                                    <input
                                        type="tel"
                                        className="input-field"
                                        placeholder="+371 20000000"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Ziņojums *</label>
                                    <textarea
                                        required
                                        rows={5}
                                        className="input-field"
                                        placeholder="Tavs jautājums vai ziņojums..."
                                    />
                                </div>

                                <Button type="submit" className="w-full">
                                    Nosūtīt Ziņojumu
                                </Button>
                            </form>
                        </Card>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h2 className="text-3xl font-display font-bold mb-6">Kontaktinformācija</h2>

                        <div className="space-y-6 mb-8">
                            <Card>
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-primary-100 rounded-lg">
                                        <EnvelopeIcon className="h-6 w-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">E-pasts</h3>
                                        <a href="mailto:info@izaugtmilestiba.lv" className="text-primary-600 hover:underline">
                                            info@izaugtmilestiba.lv
                                        </a>
                                        <p className="text-sm text-gray-600 mt-1">Atbildam 24 stundu laikā</p>
                                    </div>
                                </div>
                            </Card>

                            <Card>
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-primary-100 rounded-lg">
                                        <PhoneIcon className="h-6 w-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Tālrunis</h3>
                                        <a href="tel:+37120000000" className="text-primary-600 hover:underline">
                                            +371 20 000 000
                                        </a>
                                        <p className="text-sm text-gray-600 mt-1">P-Pk: 9:00 - 18:00</p>
                                    </div>
                                </div>
                            </Card>

                            <Card>
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-primary-100 rounded-lg">
                                        <MapPinIcon className="h-6 w-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Adrese</h3>
                                        <p className="text-gray-700">Brīvības iela 123</p>
                                        <p className="text-gray-700">Rīga, LV-1001</p>
                                        <p className="text-sm text-gray-600 mt-1">Klātienes konsultācijām</p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div className="bg-primary-50 rounded-xl p-6">
                            <h3 className="font-semibold mb-2">💡 Ātrs padoms</h3>
                            <p className="text-sm text-gray-700">
                                Ja tev ir steidzīgs jautājums, izmanto mūsu{' '}
                                <a href="/runa" className="text-primary-600 hover:underline font-medium">
                                    AI chatbot
                                </a>
                                {' '}24/7 atbalstam!
                            </p>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="mt-20">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
                        Biežāk Uzdotie <span className="text-gradient">Jautājumi</span>
                    </h2>

                    <div className="max-w-4xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <Card key={index} hover={false}>
                                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
