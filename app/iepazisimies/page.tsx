import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { HeartIcon, SparklesIcon, AcademicCapIcon } from '@heroicons/react/24/outline'

export default function IepazisimiesPage() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white section-padding">
                <div className="container-custom text-center">
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                        Iepazīsimies!
                    </h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Mēs esam komanda, kas tic mīlošai un saprotošai vecāku-bērnu attiecībai
                    </p>
                </div>
            </section>

            {/* Story */}
            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <h2 className="text-3xl font-display font-bold mb-6 text-center">
                        Mūsu <span className="text-gradient">Stāsts</span>
                    </h2>
                    <div className="prose prose-lg mx-auto">
                        <p>
                            "Izaugt Mīlestībā" sākās kā personīgs ceļojums - vēlme palīdzēt vecākiem atrast līdzsvaru starp mīlestību un robežām, starp brīvību un drošību.
                        </p>
                        <p>
                            PEP (Pozitīva Empātiska Pieeja) mammas metodoloģija ir balstīta uz jaunākajiem pētījumiem bērnu psiholoģijā un gadu ilgu praktisku pieredzi darbā ar ģimenēm.
                        </p>
                        <p>
                            Mūsu mērķis ir vienkāršs - palīdzēt katram vecākam justies pārliecinātam un atbalstītam savā ceļā, veidojot mīlošu un veselīgu ģimeni.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <h2 className="text-3xl font-display font-bold mb-12 text-center">
                        Mūsu <span className="text-gradient">Vērtības</span>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="text-center">
                            <HeartIcon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Mīlestība</h3>
                            <p className="text-gray-600">
                                Beznosacījuma mīlestība ir pamats veselīgām attiecībām
                            </p>
                        </Card>
                        <Card className="text-center">
                            <SparklesIcon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Empātija</h3>
                            <p className="text-gray-600">
                                Sapratne un līdzjūtība pret bērna un vecāka pieredzi
                            </p>
                        </Card>
                        <Card className="text-center">
                            <AcademicCapIcon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Izglītība</h3>
                            <p className="text-gray-600">
                                Zinātniski pamatota informācija un praktiski rīki
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-display font-bold mb-4">
                        Gatavs sākt savu ceļojumu?
                    </h2>
                    <p className="text-xl opacity-90 mb-8">
                        Pievienojies mūsu kopienai un saņem atbalstu, kas tev nepieciešams
                    </p>
                    <Button href="/pakalpojumi" variant="outline" size="lg" className="bg-white text-primary-600 hover:bg-gray-50">
                        Apskatīt pakalpojumus
                    </Button>
                </div>
            </section>
        </div>
    )
}
