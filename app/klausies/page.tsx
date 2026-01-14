import type { Metadata } from 'next'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { PlayIcon, MusicalNoteIcon, ClockIcon } from '@heroicons/react/24/solid'

export const metadata: Metadata = {
    title: 'Podkāsti | Izaugt Mīlestībā',
    description: 'Klausies podkāstus par vecāku ceļu, bērnu attīstību un ģimenes dinamiku',
}

const podcasts = [
    {
        id: 1,
        title: 'Kā runāt ar bērnu par grūtām tēmām',
        description: 'Šajā epizodē runājam par to, kā vecāki var pieskarties sarežģītām tēmām sarunās ar bērniem - no nāves līdz šķiršanās.',
        duration: '32 min',
        date: '2026-01-12',
        spotifyUrl: 'https://open.spotify.com/show/example',
        youtubeUrl: 'https://youtube.com/watch?v=example',
    },
    {
        id: 2,
        title: 'Miega rutīnas nozīme bērna attīstībā',
        description: 'Ekspertu saruna par to, kāpēc kvalitatīvs miegs ir tik svarīgs un kā izveidot veselīgu miega rutīnu dažādos vecumos.',
        duration: '28 min',
        date: '2026-01-05',
        spotifyUrl: 'https://open.spotify.com/show/example',
        youtubeUrl: 'https://youtube.com/watch?v=example',
    },
    {
        id: 3,
        title: 'Emociju regulācija - vecāku loma',
        description: 'Kā vecāki var palīdzēt bērniem iemācīties tikt galā ar savām emocijām. Praktiski padomi un piemēri.',
        duration: '35 min',
        date: '2025-12-29',
        spotifyUrl: 'https://open.spotify.com/show/example',
        youtubeUrl: 'https://youtube.com/watch?v=example',
    },
    {
        id: 4,
        title: 'Adaptācija bērnudārzā - kā palīdzēt bērnam',
        description: 'Psiholoģes padomu par to, kā sagatavoties bērnudārza sākumam un atbalstīt bērnu adaptācijas procesā.',
        duration: '30 min',
        date: '2025-12-22',
        spotifyUrl: 'https://open.spotify.com/show/example',
        youtubeUrl: 'https://youtube.com/watch?v=example',
    },
    {
        id: 5,
        title: 'Vecāku izdegšana - kā to atpazīt un novērst',
        description: 'Godīga saruna par vecāku izdegšanu, tās pazīmēm un veidiem, kā rūpēties par sevi, rūpējoties par bērniem.',
        duration: '40 min',
        date: '2025-12-15',
        spotifyUrl: 'https://open.spotify.com/show/example',
        youtubeUrl: 'https://youtube.com/watch?v=example',
    },
    {
        id: 6,
        title: 'Rotaļas nozīme bērna attīstībā',
        description: 'Kāpēc rotaļas ir svarīgas un kā vecāki var atbalstīt bērna attīstību caur rotaļām dažādos vecumos.',
        duration: '33 min',
        date: '2025-12-08',
        spotifyUrl: 'https://open.spotify.com/show/example',
        youtubeUrl: 'https://youtube.com/watch?v=example',
    },
]

export default function KlausiesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-secondary-50">
            {/* Hero */}
            <section className="bg-gradient-to-br from-secondary-500 to-primary-500 text-white section-padding">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                            <MusicalNoteIcon className="h-5 w-5" />
                            <span className="font-medium">Podkāsti</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                            Klausies un Mācies
                        </h1>

                        <p className="text-xl opacity-90 mb-8">
                            Dziļākas sarunas par vecāku ceļu, bērnu attīstību un ģimenes dinamiku. Klausies ceļā, mājas darbos vai atpūtas brīžos.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://open.spotify.com/show/example"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn bg-green-500 text-white hover:bg-green-600"
                            >
                                Klausīties Spotify
                            </a>
                            <a
                                href="https://youtube.com/@example"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn bg-red-500 text-white hover:bg-red-600"
                            >
                                Skatīties YouTube
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MusicalNoteIcon className="h-8 w-8 text-secondary-600" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Ekspertu Viedokļi</h3>
                            <p className="text-gray-600">Sarunas ar bērnu psiholoģijas speciālistiem</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <PlayIcon className="h-8 w-8 text-secondary-600" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Praktiski Padomi</h3>
                            <p className="text-gray-600">Risinājumi ikdienas situācijām</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ClockIcon className="h-8 w-8 text-secondary-600" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Jaunas Epizodes</h3>
                            <p className="text-gray-600">Katru otro nedēļu</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Episodes */}
            <section className="section-padding">
                <div className="container-custom">
                    <h2 className="text-3xl font-display font-bold mb-8">Jaunākās Epizodes</h2>

                    <div className="space-y-6">
                        {podcasts.map((podcast, index) => (
                            <Card key={podcast.id} className="group">
                                <div className="flex flex-col md:flex-row md:items-center gap-6">
                                    {/* Episode Number */}
                                    <div className="flex-shrink-0">
                                        <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-xl flex items-center justify-center text-white">
                                            <div className="text-center">
                                                <div className="text-xs opacity-75">EP</div>
                                                <div className="text-2xl font-bold">{podcasts.length - index}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <span className="text-sm text-gray-500">{podcast.date}</span>
                                            <span className="text-sm text-gray-500">•</span>
                                            <span className="text-sm text-gray-500 flex items-center">
                                                <ClockIcon className="h-4 w-4 mr-1" />
                                                {podcast.duration}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                                            {podcast.title}
                                        </h3>

                                        <p className="text-gray-600 mb-4">
                                            {podcast.description}
                                        </p>

                                        <div className="flex flex-wrap gap-3">
                                            <a
                                                href={podcast.spotifyUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                                            >
                                                <PlayIcon className="h-4 w-4" />
                                                <span>Spotify</span>
                                            </a>
                                            <a
                                                href={podcast.youtubeUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                                            >
                                                <PlayIcon className="h-4 w-4" />
                                                <span>YouTube</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Subscribe CTA */}
            <section className="section-padding bg-gradient-to-r from-secondary-500 to-primary-500 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                        Nepalaid Garām Jaunas Epizodes
                    </h2>
                    <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                        Abonē mūsu podkāstu Spotify vai YouTube un saņem paziņojumus par jaunām epizodēm
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://open.spotify.com/show/example"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn bg-white text-secondary-600 hover:bg-gray-50"
                        >
                            Abonēt Spotify
                        </a>
                        <a
                            href="https://youtube.com/@example"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn border-2 border-white text-white hover:bg-white/10"
                        >
                            Abonēt YouTube
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
