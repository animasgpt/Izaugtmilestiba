import type { Metadata } from 'next'
import Link from 'next/link'
import { DocumentTextIcon, ExclamationTriangleIcon, ShieldCheckIcon, CreditCardIcon, ScaleIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
    title: 'Lietošanas Noteikumi | Izaugt Mīlestībā',
    description: 'Platformas Izaugt Mīlestībā lietošanas noteikumi un nosacījumi. Uzzini par pakalpojumu izmantošanas kārtību, MI satura atbildību un lietotāju tiesībām.',
}

const sections = [
    {
        id: 'vispareji',
        icon: DocumentTextIcon,
        title: '1. Vispārīgie Noteikumi',
        content: [
            'Šie lietošanas noteikumi regulē tīmekļa vietnes izaugtmilestiba.lv (turpmāk – "Platforma") izmantošanu. Izmantojot Platformu, tu piekrīti šiem noteikumiem.',
            'Platformu uztur SIA Anima (turpmāk – "mēs"). Ja nepiekrīti šiem noteikumiem, lūdzu, nepārlūko un neizmanto Platformu.',
            'Mēs paturam tiesības jebkurā laikā mainīt šos noteikumus. Izmaiņas stājas spēkā no to publicēšanas brīža. Turpinot izmantot Platformu, tu apliecini piekrišanu aktuālajiem noteikumiem.',
        ],
    },
    {
        id: 'pakalpojumi',
        icon: ChatBubbleLeftRightIcon,
        title: '2. Pakalpojumu Apraksts',
        content: [
            'Platforma "Izaugt Mīlestībā" piedāvā:',
            '• Informatīvus rakstus un podkāstus par bērnu audzināšanu un ģimenes attiecībām.',
            '• AI chatbot "Digitālā PEP mamma" – mākslīgā intelekta asistents informatīvam atbalstam vecākiem.',
            '• E-veikalu ar grāmatām un digitālajiem produktiem.',
            '• Profesionālu konsultāciju rezervēšanu.',
            'Platforma ir paredzēta personiskai, nekomerciālai izmantošanai. Jebkāda komerciāla vai sistemātiska satura kopēšana bez rakstiskas atļaujas ir aizliegta.',
        ],
    },
    {
        id: 'mi-atruna',
        icon: ExclamationTriangleIcon,
        title: '3. Mākslīgā Intelekta Satura Atbildības Atruna',
        content: [
            'SVARĪGI – LŪDZU IZLASI UZMANĪGI:',
            'Platformā pieejamais AI chatbot "Digitālā PEP mamma" izmanto mākslīgā intelekta tehnoloģijas, lai sniegtu informatīvas atbildes par bērnu audzināšanu un vecāku atbalstu.',
            'Mēs NEUZŅEMAMIES atbildību par:',
            '• MI ģenerētu tekstu precizitāti, pilnīgumu vai aktualitāti.',
            '• Jebkādiem lēmumiem, ko tu pieņem, pamatojoties uz MI sniegtajām atbildēm.',
            '• MI satura interpretāciju vai piemērošanu konkrētā situācijā.',
            '• Iespējamu kaitējumu, kas var rasties no MI ieteikumu ievērošanas bez profesionāla speciālista konsultācijas.',
            '• MI atbildēm, kas var neatbilst tavai vai tava bērna individuālajai situācijai, veselības stāvoklim vai vajadzībām.',
            'AI chatbot NEAIZSTĀJ profesionālu psihologa, ārsta, logopēda vai cita speciālista konsultāciju. Ja tev ir nopietnas bažas par bērna attīstību, uzvedību vai veselību, vienmēr vērsies pie kvalificēta speciālista.',
            'MI satura izmantošana ir tikai uz tava paša atbildību.',
        ],
        highlight: true,
        isWarning: true,
    },
    {
        id: 'intelektuala-ipasums',
        icon: ShieldCheckIcon,
        title: '4. Intelektuālais Īpašums',
        content: [
            'Visi Platformā publicētie materiāli – raksti, attēli, audio ieraksti, video, dizains un cits saturs – ir SIA Anima vai tās licenciāru intelektuālais īpašums un ir aizsargāts ar autortiesībām.',
            'Tev ir atļauts:',
            '• Lasīt un klausīties saturu personiskai izmantošanai.',
            '• Kopīgot saites uz Platformas lapām sociālajos medijos.',
            'Tev NAV atļauts:',
            '• Kopēt, reproducēt vai izplatīt saturu bez rakstiskas atļaujas.',
            '• Izmantot saturu komerciāliem mērķiem.',
            '• Noņemt autortiesību atzīmes vai citus īpašumtiesību paziņojumus.',
        ],
    },
    {
        id: 'maksajumi',
        icon: CreditCardIcon,
        title: '5. Maksājumi un Atgriešana',
        content: [
            'Visi maksājumi Platformā tiek apstrādāti caur drošiem maksājumu pakalpojumu sniedzējiem. Mēs nesaglabājam maksājumu karšu datus.',
            'Fiziskās preces (grāmatas): Atgriešana iespējama 14 dienu laikā no saņemšanas, ja prece ir nesabojātā un oriģinālajā iepakojumā. Atgriešanas izmaksas sedz pircējs, izņemot gadījumus, kad prece ir bojāta vai neatbilst pasūtījumam.',
            'Digitālie produkti: Ņemot vērā digitālo produktu raksturu, atgriešana nav iespējama pēc lejupielādes vai piekļuves nodrošināšanas, izņemot gadījumus, kas paredzēti Patērētāju tiesību aizsardzības likumā.',
            'Konsultācijas: Konsultāciju maksa netiek atmaksāta, taču to var pārcelt uz citu laiku, paziņojot vismaz 24 stundas iepriekš.',
            'Jautājumu gadījumā par maksājumiem sazinies: info@izaugtmilestiba.lv',
        ],
    },
    {
        id: 'atbildibas-ierobezojumi',
        icon: ScaleIcon,
        title: '6. Atbildības Ierobežojumi',
        content: [
            'Platforma tiek nodrošināta "kāda tā ir" (as-is) bez jebkādām garantijām par nepārtrauktu darbību vai kļūdu neesamību.',
            'Mēs neuzņemamies atbildību par:',
            '• Tiešiem vai netiešiem zaudējumiem, kas radušies Platformas izmantošanas vai nespējas to izmantot rezultātā.',
            '• Trešo pušu tīmekļa vietņu saturu, uz kurām norāda saites Platformā.',
            '• Tehniskiem traucējumiem, datu zudumu vai drošības pārkāpumiem, kas radušies ārēju faktoru dēļ.',
            '• Jebkādiem zaudējumiem, kas pārsniedz summu, ko tu esi samaksājis par konkrēto pakalpojumu.',
            'Šie ierobežojumi neattiecas uz gadījumiem, kad zaudējumi radušies mūsu rupjas neuzmanības vai tīša nodarījuma rezultātā.',
        ],
    },
]

export default function LietosanasNoteikumiPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white py-16 md:py-24">
                <div className="container-custom text-center">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                            <DocumentTextIcon className="h-12 w-12 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                        Lietošanas Noteikumi
                    </h1>
                    <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
                        Platformas izmantošanas nosacījumi un lietotāju tiesības
                    </p>
                    <p className="text-sm opacity-75 mt-4">
                        Pēdējo reizi atjaunināts: 2026. gada februārī
                    </p>
                </div>
            </section>

            {/* Table of Contents */}
            <section className="container-custom py-10">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-50 rounded-2xl p-6 mb-12">
                        <h2 className="font-semibold text-gray-900 mb-4 text-lg">Saturs</h2>
                        <ul className="space-y-2">
                            {sections.map((section) => (
                                <li key={section.id}>
                                    <a
                                        href={`#${section.id}`}
                                        className="text-primary-600 hover:text-primary-800 hover:underline text-sm transition-colors"
                                    >
                                        {section.title}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a href="#piemerojamie-likumi" className="text-primary-600 hover:text-primary-800 hover:underline text-sm transition-colors">
                                    7. Piemērojamie Likumi un Strīdu Risināšana
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Sections */}
                    <div className="space-y-12">
                        {sections.map((section) => {
                            const Icon = section.icon
                            return (
                                <div
                                    key={section.id}
                                    id={section.id}
                                    className={`rounded-2xl p-8 scroll-mt-8 ${section.isWarning
                                            ? 'bg-amber-50 border-2 border-amber-200'
                                            : section.highlight
                                                ? 'bg-primary-50 border-2 border-primary-200'
                                                : 'bg-white border border-gray-100 shadow-soft'
                                        }`}
                                >
                                    <div className="flex items-start space-x-4 mb-6">
                                        <div className={`p-3 rounded-xl flex-shrink-0 ${section.isWarning ? 'bg-amber-100' : 'bg-primary-100'
                                            }`}>
                                            <Icon className={`h-6 w-6 ${section.isWarning ? 'text-amber-600' : 'text-primary-600'
                                                }`} />
                                        </div>
                                        <h2 className={`text-2xl font-display font-bold ${section.isWarning ? 'text-amber-800' : 'text-primary-700'
                                            }`}>
                                            {section.title}
                                        </h2>
                                    </div>
                                    <div className="space-y-3 ml-0 md:ml-16">
                                        {section.content.map((paragraph, idx) => (
                                            <p
                                                key={idx}
                                                className={`leading-relaxed ${paragraph.startsWith('•')
                                                        ? 'pl-4 text-gray-700'
                                                        : paragraph.startsWith('Mēs NEUZŅEMAMIES') ||
                                                            paragraph.startsWith('Tev NAV') ||
                                                            paragraph.startsWith('SVARĪGI')
                                                            ? 'font-semibold text-gray-900'
                                                            : 'text-gray-700'
                                                    }`}
                                            >
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}

                        {/* Applicable Laws */}
                        <div id="piemerojamie-likumi" className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-8 text-white scroll-mt-8">
                            <div className="flex items-start space-x-4 mb-6">
                                <div className="p-3 bg-white/20 rounded-xl flex-shrink-0">
                                    <ScaleIcon className="h-6 w-6 text-white" />
                                </div>
                                <h2 className="text-2xl font-display font-bold">
                                    7. Piemērojamie Likumi un Strīdu Risināšana
                                </h2>
                            </div>
                            <div className="space-y-3 ml-0 md:ml-16">
                                <p className="leading-relaxed opacity-90">
                                    Šie noteikumi tiek regulēti un interpretēti saskaņā ar Latvijas Republikas likumiem, ievērojot piemērojamos Eiropas Savienības tiesību aktus, tostarp GDPR un Patērētāju tiesību aizsardzības direktīvu.
                                </p>
                                <p className="leading-relaxed opacity-90">
                                    Jebkuri strīdi, kas izriet no šiem noteikumiem vai saistīti ar Platformas izmantošanu, tiks risināti sarunu ceļā. Ja vienošanās netiek panākta, strīdi tiks izskatīti Latvijas Republikas tiesās.
                                </p>
                                <p className="leading-relaxed opacity-90">
                                    Patērētāji var arī vērsties Patērētāju tiesību aizsardzības centrā (www.ptac.gov.lv) vai izmantot ES tiešsaistes strīdu izšķiršanas platformu (https://ec.europa.eu/consumers/odr).
                                </p>
                                <p className="font-semibold mt-4">
                                    📧 Kontakts: <a href="mailto:info@izaugtmilestiba.lv" className="underline hover:opacity-80">info@izaugtmilestiba.lv</a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="/privatuma-politika"
                            className="text-primary-600 hover:text-primary-800 font-medium transition-colors underline"
                        >
                            Privātuma politika →
                        </Link>
                        <Link
                            href="/"
                            className="text-primary-600 hover:text-primary-800 font-medium transition-colors"
                        >
                            ← Atgriezties uz sākumlapu
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
