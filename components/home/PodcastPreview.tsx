import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import SiteText from '@/components/SiteText'
import { PlayIcon, MusicalNoteIcon } from '@heroicons/react/24/solid'

const latestPodcast = {
    title: 'Kā runāt ar bērnu par grūtām tēmām',
    description: 'Šajā epizodē runājam par to, kā vecāki var pieskarties sarežģītām tēmām sarunās ar bērniem - no nāves līdz šķiršanās.',
    duration: '32 min',
    date: '2026-01-12',
    spotifyUrl: 'https://open.spotify.com/show/example',
}

export default function PodcastPreview() {
    return (
        <section className="section-padding bg-white">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Podcast player visual */}
                    <div className="relative">
                        <Card className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white" padding="lg">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                                    <MusicalNoteIcon className="h-8 w-8" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium opacity-90">Jaunākā epizode</div>
                                    <div className="text-xs opacity-75">{latestPodcast.date}</div>
                                </div>
                            </div>

                            <h3 className="text-2xl font-display font-bold mb-4">
                                {latestPodcast.title}
                            </h3>

                            <p className="opacity-90 mb-6">
                                {latestPodcast.description}
                            </p>

                            {/* Fake player controls */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <button className="p-4 bg-white rounded-full shadow-lg hover:scale-110 transition-transform">
                                        <PlayIcon className="h-6 w-6 text-primary-500" />
                                    </button>
                                    <div className="flex-1">
                                        <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                                            <div className="h-full w-1/3 bg-white rounded-full"></div>
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium">{latestPodcast.duration}</span>
                                </div>
                            </div>
                        </Card>

                        {/* Decorative elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-warm-400 rounded-full opacity-20 blur-2xl"></div>
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary-400 rounded-full opacity-20 blur-2xl"></div>
                    </div>

                    {/* Text content */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                                <SiteText textKey="podcast.title" fallback="Klausies un Iedvesmojies" as="span" className="text-gradient" />
                            </h2>
                            <SiteText
                                textKey="podcast.subtitle"
                                fallback="Podkāsti par vecāku ceļu un bērnu audzināšanu"
                                as="p"
                                className="text-xl text-gray-600"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                                <div>
                                    <h4 className="font-semibold mb-1">Ekspertu viedokļi</h4>
                                    <p className="text-gray-600">Sarunas ar bērnu psiholoģijas speciālistiem</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                                <div>
                                    <h4 className="font-semibold mb-1">Praktiski padomi</h4>
                                    <p className="text-gray-600">Risinājumi ikdienas situācijām</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                                <div>
                                    <h4 className="font-semibold mb-1">Vecāku stāsti</h4>
                                    <p className="text-gray-600">Reālas pieredzes un iedvesma</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button href="/klausies" size="lg">
                                Visas epizodes
                            </Button>
                            <Button href={latestPodcast.spotifyUrl} variant="outline" size="lg">
                                Klausīties Spotify
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
