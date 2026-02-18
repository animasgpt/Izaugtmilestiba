import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheckIcon, LockClosedIcon, EyeSlashIcon, DocumentTextIcon, UserGroupIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
    title: 'Privātuma Politika | Izaugt Mīlestībā',
    description: 'Uzzini, kā mēs aizsargājam tavas personas datus un ievērojam ES GDPR prasības. Pilnīga pārredzamība par datu apstrādi platformā Izaugt Mīlestībā.',
}

const sections = [
    {
        id: 'ievads',
        icon: ShieldCheckIcon,
        title: '1. Ievads un Pārzinis',
        content: [
            'Šī privātuma politika attiecas uz tīmekļa vietni izaugtmilestiba.lv (turpmāk – "Platforma"), ko uztur SIA Anima (turpmāk – "mēs", "mūsu" vai "Pārzinis").',
            'Mēs ļoti nopietni uzturam tavas privātuma tiesības un apņemamies aizsargāt tavas personas datus saskaņā ar Eiropas Parlamenta un Padomes Regulu (ES) 2016/679 (Vispārīgā datu aizsardzības regula, GDPR) un Latvijas Fizisko personu datu apstrādes likumu.',
            'Datu pārzinis: SIA Anima | E-pasts: info@izaugtmilestiba.lv',
        ],
    },
    {
        id: 'dati-netiek-saglabati',
        icon: EyeSlashIcon,
        title: '2. Personas Dati Netiek Saglabāti',
        content: [
            'Mūsu platforma ir izstrādāta ar privātuma aizsardzību kā pamatu (Privacy by Design). Mēs NEAPKOPOJAM un NESAGLABĀJAM personas datus, kas nav nepieciešami pakalpojuma sniegšanai.',
            'AI Chatbot (Digitālā PEP mamma): Sarunas ar mūsu mākslīgā intelekta asistentu NETIEK saglabātas mūsu serveros. Katra saruna ir anonīma un tiek dzēsta pēc sesijas beigām. Mēs nevaram identificēt, kurš lietotājs ir veicis konkrētu sarunu.',
            'Pārlūkošanas dati: Mēs neizmantojam izsekošanas sīkdatnes (tracking cookies) un neveicam lietotāju profilēšanu. Tīmekļa vietnes darbībai nepieciešamās sesijas sīkdatnes tiek automātiski dzēstas pēc pārlūkprogrammas aizvēršanas.',
            'Kontaktformas: Ja sazinies ar mums caur kontaktformu, ievadītie dati (vārds, e-pasts, ziņojums) tiek izmantoti tikai atbildes sniegšanai un pēc tam dzēsti. Šie dati netiek nodoti trešajām pusēm.',
        ],
        highlight: true,
    },
    {
        id: 'gdpr',
        icon: DocumentTextIcon,
        title: '3. GDPR Atbilstība un Tavas Tiesības',
        content: [
            'Saskaņā ar GDPR tev ir šādas tiesības attiecībā uz saviem personas datiem:',
            '• Piekļuves tiesības – tiesības uzzināt, kādus datus mēs apstrādājam par tevi.',
            '• Labošanas tiesības – tiesības pieprasīt neprecīzu datu labošanu.',
            '• Dzēšanas tiesības ("tiesības tikt aizmirstam") – tiesības pieprasīt savu datu dzēšanu.',
            '• Apstrādes ierobežošanas tiesības – tiesības ierobežot savu datu apstrādi.',
            '• Datu pārnesamības tiesības – tiesības saņemt savus datus strukturētā, mašīnlasāmā formātā.',
            '• Iebildumu tiesības – tiesības iebilst pret savu datu apstrādi.',
            'Lai izmantotu jebkuru no šīm tiesībām, sazinies ar mums: info@izaugtmilestiba.lv. Mēs atbildēsim 30 dienu laikā.',
            'Ja uzskat, ka mēs esam pārkāpuši tavas datu aizsardzības tiesības, tev ir tiesības iesniegt sūdzību Datu valsts inspekcijā (www.dvi.gov.lv).',
        ],
    },
    {
        id: 'sikdatnes',
        icon: LockClosedIcon,
        title: '4. Sīkdatnes (Cookies)',
        content: [
            'Mēs izmantojam tikai tehniskās nepieciešamības sīkdatnes, kas nodrošina vietnes pareizu darbību (piemēram, iepirkumu groza saturs). Šīs sīkdatnes ir obligātas pakalpojuma sniegšanai.',
            'Mēs NEIZMANTOJAM:',
            '• Analītikas sīkdatnes (Google Analytics vai līdzīgas)',
            '• Reklāmas sīkdatnes vai atkārtotās mārketinga pikseļus',
            '• Sociālo mediju izsekošanas sīkdatnes',
            '• Trešo pušu profilēšanas rīkus',
            'Tu vari pārvaldīt sīkdatnes savā pārlūkprogrammā. Tehniskās sīkdatnes atspējošana var ietekmēt vietnes funkcionalitāti.',
        ],
    },
    {
        id: 'tresās-puses',
        icon: UserGroupIcon,
        title: '5. Trešo Pušu Pakalpojumi',
        content: [
            'Lai nodrošinātu platformas darbību, mēs sadarbojamies ar šādiem uzticamiem pakalpojumu sniedzējiem, kas atbilst GDPR prasībām:',
            '• Hosting pakalpojumi (Vercel) – vietnes mitināšanai ES datu centros.',
            '• Maksājumu apstrāde – maksājumi tiek apstrādāti caur sertificētiem maksājumu pakalpojumu sniedzējiem. Mēs NESAGLABĀJAM maksājumu karšu datus.',
            '• E-pasta pakalpojumi – saziņai ar klientiem.',
            'Visi mūsu partneri ir apņēmušies ievērot GDPR prasības un ir noslēguši ar mums datu apstrādes līgumus (DPA).',
        ],
    },
    {
        id: 'mi-atbildiba',
        icon: ExclamationTriangleIcon,
        title: '6. Mākslīgā Intelekta (MI) Saturs – Atbildības Atruna',
        content: [
            'SVARĪGI: Platforma "Izaugt Mīlestībā" izmanto mākslīgā intelekta tehnoloģijas (AI chatbot "Digitālā PEP mamma"), lai sniegtu informatīvu atbalstu vecākiem.',
            'Mēs NEUZŅEMAMIES atbildību par:',
            '• MI ģenerētu saturu, kas var saturēt neprecizitātes, kļūdas vai novecojušu informāciju.',
            '• MI sniegto ieteikumu interpretāciju vai to piemērošanu konkrētās dzīves situācijās.',
            '• Jebkādām sekām, kas izriet no MI ģenerēta satura izmantošanas bez profesionāla speciālista konsultācijas.',
            '• MI atbildēm, kas var neatbilst konkrētā bērna vai ģimenes individuālajai situācijai.',
            'MI chatbot ir paredzēts kā INFORMATĪVS palīglīdzeklis, nevis kā profesionāla psiholoģiska, medicīniska vai juridiska konsultācija. Ja tev ir nopietnas bažas par bērna attīstību vai ģimenes situāciju, lūdzam vērsties pie kvalificēta speciālista.',
            'Mūsu profesionālie konsultanti ir pieejami personalizētam atbalstam – apmeklē sadaļu "Pakalpojumi".',
        ],
        highlight: true,
        isWarning: true,
    },
]

export default function PrivatumaPolitikaPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white py-16 md:py-24">
                <div className="container-custom text-center">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                            <ShieldCheckIcon className="h-12 w-12 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                        Privātuma Politika
                    </h1>
                    <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
                        Mēs cienām tavu privātumu un ievērojam visas ES GDPR prasības
                    </p>
                    <p className="text-sm opacity-75 mt-4">
                        Pēdējo reizi atjaunināts: 2026. gada februārī
                    </p>
                </div>
            </section>

            {/* Quick Summary Banner */}
            <section className="bg-primary-50 border-b border-primary-100">
                <div className="container-custom py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="flex flex-col items-center space-y-2">
                            <EyeSlashIcon className="h-8 w-8 text-primary-600" />
                            <p className="font-semibold text-primary-800">Dati netiek saglabāti</p>
                            <p className="text-sm text-gray-600">AI sarunas ir anonīmas un netiek glabātas</p>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <ShieldCheckIcon className="h-8 w-8 text-primary-600" />
                            <p className="font-semibold text-primary-800">GDPR atbilstība</p>
                            <p className="text-sm text-gray-600">Pilnībā atbilstam ES datu aizsardzības regulai</p>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <LockClosedIcon className="h-8 w-8 text-primary-600" />
                            <p className="font-semibold text-primary-800">Nav izsekošanas</p>
                            <p className="text-sm text-gray-600">Neizmantojam reklāmas vai analītikas sīkdatnes</p>
                        </div>
                    </div>
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
                                <a href="#kontakti" className="text-primary-600 hover:text-primary-800 hover:underline text-sm transition-colors">
                                    7. Kontaktinformācija un Izmaiņas
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
                                        <div className={`p-3 rounded-xl flex-shrink-0 ${section.isWarning
                                                ? 'bg-amber-100'
                                                : 'bg-primary-100'
                                            }`}>
                                            <Icon className={`h-6 w-6 ${section.isWarning
                                                    ? 'text-amber-600'
                                                    : 'text-primary-600'
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
                                                        : paragraph.startsWith('Mēs NEIZMANTOJAM') ||
                                                            paragraph.startsWith('Mēs NEUZŅEMAMIES') ||
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

                        {/* Contact Section */}
                        <div id="kontakti" className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-8 text-white scroll-mt-8">
                            <div className="flex items-start space-x-4 mb-6">
                                <div className="p-3 bg-white/20 rounded-xl flex-shrink-0">
                                    <DocumentTextIcon className="h-6 w-6 text-white" />
                                </div>
                                <h2 className="text-2xl font-display font-bold">
                                    7. Kontaktinformācija un Izmaiņas
                                </h2>
                            </div>
                            <div className="space-y-3 ml-0 md:ml-16">
                                <p className="leading-relaxed opacity-90">
                                    Ja tev ir jautājumi par šo privātuma politiku vai vēlies izmantot savas GDPR tiesības, sazinies ar mums:
                                </p>
                                <p className="font-semibold">
                                    📧 E-pasts: <a href="mailto:info@izaugtmilestiba.lv" className="underline hover:opacity-80">info@izaugtmilestiba.lv</a>
                                </p>
                                <p className="leading-relaxed opacity-90">
                                    Mēs paturam tiesības laiku pa laikam atjaunināt šo privātuma politiku, lai atspoguļotu izmaiņas mūsu praksē vai piemērojamos tiesību aktos. Par būtiskām izmaiņām mēs paziņosim, publicējot atjauninātu versiju šajā lapā ar jaunu "atjaunināts" datumu.
                                </p>
                                <p className="leading-relaxed opacity-90">
                                    Turpinot izmantot platformu pēc izmaiņu publicēšanas, tu apliecini, ka esi iepazinies ar atjaunināto privātuma politiku.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Back link */}
                    <div className="mt-12 text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-800 font-medium transition-colors"
                        >
                            <span>← Atgriezties uz sākumlapu</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
