import Button from '@/components/ui/Button'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

export default function PateicibasPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
            <div className="text-center max-w-2xl mx-auto px-4">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircleIcon className="h-16 w-16 text-green-600" />
                </div>

                <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                    Paldies par pasūtījumu!
                </h1>

                <p className="text-xl text-gray-600 mb-8">
                    Tavs pasūtījums ir veiksmīgi noformēts. Drīzumā saņemsi apstiprinājumu e-pastā.
                </p>

                <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                    <h2 className="font-semibold mb-2">Kas notiks tālāk?</h2>
                    <ul className="text-left space-y-2 text-gray-600">
                        <li>✅ Saņemsi pasūtījuma apstiprinājumu e-pastā</li>
                        <li>📦 Tavs pasūtījums tiks nosūtīts 1-2 darba dienu laikā</li>
                        <li>📱 Saņemsi SMS, kad sūtījums būs gatavs izņemšanai</li>
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button href="/">
                        Atpakaļ uz sākumlapu
                    </Button>
                    <Button href="/lasi" variant="outline">
                        Lasīt rakstus
                    </Button>
                </div>
            </div>
        </div>
    )
}
