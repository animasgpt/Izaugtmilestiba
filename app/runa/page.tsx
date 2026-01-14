import type { Metadata } from 'next'
import ChatInterface from '@/components/chatbot/ChatInterface'
import { SparklesIcon, HeartIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
    title: 'Runā ar AI PEP Mammu | Izaugt Mīlestībā',
    description: '24/7 AI chatbot atbalsts vecākiem. Saņem atbildes uz saviem jautājumiem par bērnu audzināšanu jebkurā laikā.',
}

export default function RunaPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
            <div className="container-custom py-16">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <SparklesIcon className="h-5 w-5" />
                        <span>AI Tehnoloģija</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
                        Parunā ar <span className="text-gradient">Digitālo PEP Mammu</span>
                    </h1>

                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Saņem atbalstu un atbildes uz saviem jautājumiem jebkurā diennakts laikā
                    </p>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white rounded-xl p-6 shadow-md text-center">
                        <ClockIcon className="h-10 w-10 text-primary-500 mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">24/7 Pieejams</h3>
                        <p className="text-sm text-gray-600">Atbalsts jebkurā laikā</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md text-center">
                        <HeartIcon className="h-10 w-10 text-primary-500 mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">Empātisks</h3>
                        <p className="text-sm text-gray-600">Saprotošs un atbalstošs</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md text-center">
                        <ShieldCheckIcon className="h-10 w-10 text-primary-500 mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">Pārbaudīta info</h3>
                        <p className="text-sm text-gray-600">Balstīts uz PEP metodi</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md text-center">
                        <SparklesIcon className="h-10 w-10 text-primary-500 mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">Bezmaksas</h3>
                        <p className="text-sm text-gray-600">Nav nepieciešama reģistrācija</p>
                    </div>
                </div>

                {/* Chat Interface */}
                <div className="max-w-4xl mx-auto">
                    <ChatInterface />

                    <div className="mt-8 bg-warm-50 border border-warm-200 rounded-xl p-6">
                        <h3 className="font-semibold text-warm-900 mb-2">💡 Padoms</h3>
                        <p className="text-sm text-warm-800">
                            Digitālā PEP mamma ir AI asistents, kas var palīdzēt ar vispārīgiem jautājumiem.
                            Sarežģītākām situācijām iesaku{' '}
                            <a href="/pakalpojumi/konsultacijas" className="text-primary-600 hover:underline font-medium">
                                personīgu konsultāciju
                            </a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
