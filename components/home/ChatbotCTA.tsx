import Button from '@/components/ui/Button'
import { ChatBubbleLeftEllipsisIcon, SparklesIcon, HeartIcon, LightBulbIcon } from '@heroicons/react/24/outline'

export default function ChatbotCTA() {
    return (
        <section className="py-20 md:py-32 bg-primary-500 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-400 rounded-full blur-3xl"></div>
            </div>

            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                        <SparklesIcon className="h-5 w-5" />
                        <span className="font-semibold">Ai tehnoloģija</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-white">
                        Parunā ar <span className="text-accent-400">digitālo</span><br />
                        <span className="text-accent-400">pep mammu</span>
                    </h2>

                    <p className="text-lg md:text-xl text-cream-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Saņem atbalstu un atbildes uz saviem jautājumiem jebkurā diennakts laikā. Mūsu AI chatbots ir apmācīts ar PEP mammas metodoloģiju.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all">
                            <ChatBubbleLeftEllipsisIcon className="h-12 w-12 mx-auto mb-4 text-accent-400" />
                            <h3 className="font-bold text-lg mb-2 text-white">24/7 pieejams</h3>
                            <p className="text-sm text-cream-100">Atbalsts jebkurā laikā, kad tas nepieciešams</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all">
                            <HeartIcon className="h-12 w-12 mx-auto mb-4 text-accent-400" />
                            <h3 className="font-bold text-lg mb-2 text-white">Empātisks</h3>
                            <p className="text-sm text-cream-100">Saprotošs un atbalstošs, bez spriedumiem</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all">
                            <LightBulbIcon className="h-12 w-12 mx-auto mb-4 text-accent-400" />
                            <h3 className="font-bold text-lg mb-2 text-white">Pārbaudīta info</h3>
                            <p className="text-sm text-cream-100">Balstīts uz verificētu saturu un metodoloģiju</p>
                        </div>
                    </div>

                    <Button
                        href="/runa"
                        variant="primary"
                        size="lg"
                        className="bg-accent-500 text-white hover:bg-accent-600 border-accent-500 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                    >
                        Sākt sarunu tagad
                    </Button>

                    <p className="text-sm text-cream-200 mt-6">
                        Bezmaksas izmēģinājums • Nav nepieciešama reģistrācija
                    </p>
                </div>
            </div>
        </section>
    )
}
