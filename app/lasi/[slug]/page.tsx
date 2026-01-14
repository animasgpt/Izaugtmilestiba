import { notFound } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { ClockIcon, TagIcon, CalendarIcon, ShareIcon } from '@heroicons/react/24/outline'

// This would come from a database
const articles: Record<string, any> = {
    '1': {
        id: 1,
        title: 'Kā palīdzēt bērnam tikt galā ar emocijām',
        content: `Emociju regulācija ir viena no svarīgākajām prasmēm, ko bērns apgūst dzīves laikā. Tas ir process, kas sākas jau agrā bērnībā un turpinās visu dzīvi.

## Kāpēc emociju regulācija ir svarīga?

Bērni, kas prot regulēt savas emocijas:
- Labāk tiek galā ar stresu
- Veiksmīgāk veido attiecības
- Labāk mācās skolā
- Ir laimīgāki un apmierinātāki

## Kā vecāki var palīdzēt?

### 1. Nosauciet emocijas
Kad bērns piedzīvo spēcīgas emocijas, palīdziet viņam tās nosaukt: "Es redzu, ka tu esi dusmīgs" vai "Šķiet, ka tu jūties bēdīgs". Tas palīdz bērnam apzināties un saprast savas jūtas.

### 2. Atzīstiet bērna jūtas
Nekad neatspēkojiet bērna emocijas ar frāzēm kā "Nav par ko raudāt" vai "Tas nav tik slikti". Tā vietā sakiet: "Tas ir saprotami, ka tu jūties tā" vai "Es redzu, ka tas tev ir grūti".

### 3. Palīdziet atrast risinājumu
Kad bērns ir nomierinājies, kopā meklējiet veidus, kā tikt galā ar situāciju: "Ko mēs varētu darīt, lai justos labāk?" vai "Kā mēs varētu atrisināt šo problēmu?"

### 4. Būt pacietīgam
Emociju regulācija ir prasme, kas attīstās pakāpeniski. Bērnam vajag laiku un daudz prakses, lai to apgūtu.

## Praktiskas stratēģijas

**Dziļa elpošana:** Māciet bērnam dziļi ieelpot un izelpot, kad viņš jūtas pārņemts.

**Laika pauze:** Izveidojiet "mierīgo stūrīti", kur bērns var doties, lai nomierinātos.

**Fiziskās aktivitātes:** Skriešana, lēkāšana vai citas kustības palīdz izlaist uzkrāto enerģiju.

**Māksla un radošums:** Zīmēšana, modelēšana vai citas radošas aktivitātes var palīdzēt izteikt emocijas.

## Atceries

Visas emocijas ir pieļaujamas un normālas. Tas, kas nav pieļaujams, ir destruktīva uzvedība. Māciet bērnam, ka viņš drīkst būt dusmīgs, bet nedrīkst sist vai lauzt lietas.

Jūsu mierīgā un atbalstoša klātbūtne ir labākais veids, kā palīdzēt bērnam iemācīties tikt galā ar emocijām.`,
        category: 'sarunas',
        categoryName: 'Sarunas',
        readTime: '5 min',
        date: '2026-01-10',
        author: 'Laura Bērziņa',
        image: '/images/demo/hero.png',
    },
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
    const article = articles[params.slug]

    if (!article) {
        notFound()
    }

    const relatedArticles = [
        { id: 2, title: 'Pozitīva komunikācija ar bērnu', category: 'Sarunas' },
        { id: 4, title: 'Rotaļas nozīme 2-3 gadus vecam bērnam', category: '2.-3. gadi' },
    ]

    const recommendedProducts = [
        { id: 1, name: 'Grāmata "Izaugt Mīlestībā"', price: '24.99€' },
        { id: 2, name: 'Konsultācija', price: 'No 45€' },
    ]

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <div className="relative h-96 bg-gradient-to-br from-primary-500 to-secondary-500">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="container-custom h-full flex items-center relative z-10">
                    <div className="max-w-3xl text-white">
                        <div className="flex items-center space-x-4 mb-4">
                            <span className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                                {article.categoryName}
                            </span>
                            <div className="flex items-center space-x-2 text-sm">
                                <ClockIcon className="h-4 w-4" />
                                <span>{article.readTime}</span>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            {article.title}
                        </h1>
                        <div className="flex items-center space-x-6 text-sm">
                            <div className="flex items-center space-x-2">
                                <CalendarIcon className="h-4 w-4" />
                                <span>{new Date(article.date).toLocaleDateString('lv-LV', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                            </div>
                            <span>•</span>
                            <span>Autore: {article.author}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container-custom py-16">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main content */}
                    <div className="lg:col-span-2">
                        <div className="prose prose-lg max-w-none">
                            {article.content.split('\n\n').map((paragraph: string, index: number) => {
                                if (paragraph.startsWith('##')) {
                                    return <h2 key={index} className="text-3xl font-display font-bold mt-8 mb-4">{paragraph.replace('##', '').trim()}</h2>
                                } else if (paragraph.startsWith('###')) {
                                    return <h3 key={index} className="text-2xl font-display font-semibold mt-6 mb-3">{paragraph.replace('###', '').trim()}</h3>
                                } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                                    return <p key={index} className="font-semibold text-lg mt-4">{paragraph.replace(/\*\*/g, '')}</p>
                                } else if (paragraph.startsWith('-')) {
                                    const items = paragraph.split('\n').filter(item => item.startsWith('-'))
                                    return (
                                        <ul key={index} className="list-disc list-inside space-y-2 my-4">
                                            {items.map((item, i) => (
                                                <li key={i} className="text-gray-700">{item.replace('-', '').trim()}</li>
                                            ))}
                                        </ul>
                                    )
                                } else {
                                    return <p key={index} className="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
                                }
                            })}
                        </div>

                        {/* Share */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold">Dalīties:</span>
                                <button className="flex items-center space-x-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors">
                                    <ShareIcon className="h-5 w-5" />
                                    <span>Kopēt saiti</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Related articles */}
                        <Card>
                            <h3 className="font-display font-bold text-xl mb-4">Saistītie raksti</h3>
                            <div className="space-y-4">
                                {relatedArticles.map((related) => (
                                    <Link key={related.id} href={`/lasi/${related.id}`}>
                                        <div className="group">
                                            <span className="text-xs text-primary-600 font-medium">{related.category}</span>
                                            <h4 className="font-semibold group-hover:text-primary-600 transition-colors">
                                                {related.title}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </Card>

                        {/* Recommended products */}
                        <Card className="bg-gradient-to-br from-primary-50 to-secondary-50">
                            <h3 className="font-display font-bold text-xl mb-4">Ieteiktie produkti</h3>
                            <div className="space-y-4">
                                {recommendedProducts.map((product) => (
                                    <div key={product.id} className="bg-white rounded-lg p-4">
                                        <h4 className="font-semibold mb-2">{product.name}</h4>
                                        <div className="flex items-center justify-between">
                                            <span className="text-primary-600 font-bold">{product.price}</span>
                                            <Button size="sm" variant="outline">Skatīt</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* CTA */}
                        <Card className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
                            <h3 className="font-display font-bold text-xl mb-2">Vajag personīgu atbalstu?</h3>
                            <p className="text-sm opacity-90 mb-4">
                                Rezervē konsultāciju un saņem individuālu padomu savai situācijai.
                            </p>
                            <Button href="/pakalpojumi/konsultacijas" variant="outline" className="w-full bg-white text-primary-600 hover:bg-gray-50">
                                Rezervēt konsultāciju
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
