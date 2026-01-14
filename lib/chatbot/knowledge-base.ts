export const demoKnowledgeBase = [
    {
        id: 1,
        title: 'Emociju regulācija bērniem',
        category: 'sarunas',
        keywords: ['emocijas', 'dusmas', 'bēdas', 'prieks', 'regulācija', 'jūtas'],
        content: `Emociju regulācija ir svarīga prasme, ko bērni apgūst pakāpeniski. Vecāki var palīdzēt:
    
    1. Nosaukt emocijas - "Es redzu, ka tu esi dusmīgs"
    2. Atzīt bērna jūtas - "Tas ir saprotami, ka tu jūties tā"
    3. Palīdzēt atrast risinājumu - "Ko mēs varētu darīt, lai justos labāk?"
    4. Būt pacietīgam - emociju regulācija ir process
    
    Atceries - visas emocijas ir pieļaujamas, bet ne visi uzvedības veidi.`,
    },
    {
        id: 2,
        title: 'Miega rutīnas nozīme',
        category: 'dzives-gads',
        keywords: ['miegs', 'rutīna', 'gulēt', 'nakts', 'dienasguļa', 'miega režīms'],
        content: `Kvalitatīvs miegs ir būtisks bērna attīstībai. Veselīgas miega rutīnas elementi:
    
    1. Konsekventums - ejiet gulēt vienā laikā
    2. Mierīgas aktivitātes - lasīšana, klusa mūzika
    3. Patīkama vide - tumša, vēsa, klusa istaba
    4. Bez ekrāniem 1 stundu pirms gulētiešanas
    5. Mierinošs rituāls - pasaka, apskāviens, laba nakts vēlējums
    
    Bērniem vecumā līdz 1 gadam nepieciešamas 12-16 stundas miega diennaktī.`,
    },
    {
        id: 3,
        title: 'Pozitīva komunikācija ar bērnu',
        category: 'sarunas',
        keywords: ['komunikācija', 'sarunas', 'runāt', 'klausīties', 'dialogs', 'saruna'],
        content: `PEP mammas metode uzsver pozitīvu komunikāciju:
    
    1. Klausies aktīvi - pievērs pilnu uzmanību
    2. Runā ar cieņu - tāpat kā ar pieaugušo
    3. Izmanto "es" teikumus - "Es jūtos..." nevis "Tu vienmēr..."
    4. Uzdod atvērtus jautājumus - ne tikai jā/nē
    5. Atzīsti bērna perspektīvu
    
    Atceries - bērns mācās komunikāciju no tevis!`,
    },
    {
        id: 4,
        title: 'Kad bērns neklausās',
        category: 'sarunas',
        keywords: ['neklausās', 'nepaklausība', 'uzvedība', 'disciplīna', 'robežas'],
        content: `Ja bērns neklausās, vispirms pārbaudi:
    
    1. Vai bērns tevi dzirdēja? Noliecies viņa līmenī un runā acīs
    2. Vai prasība ir skaidra un konkrēta?
    3. Vai bērns saprot, ko tu vēlies?
    4. Vai bērns ir pārguris vai izsalcis?
    
    Tad:
    - Piedāvā izvēli: "Vai vēlies uzvilkt kurpes pats vai man palīdzēt?"
    - Izskaidro sekas: "Ja tagad neuzvilksim kurpes, mēs nokavēsim parku"
    - Esi konsekvent ar robežām
    - Slavē, kad bērns klausās`,
    },
    {
        id: 5,
        title: 'Bērna pašapziņas veidošana',
        category: '2-3-gadi',
        keywords: ['pašapziņa', 'pašvērtējums', 'pašcieņa', 'uzslavas', 'atbalsts'],
        content: `Veselīgas pašapziņas veidošana 2-3 gadu vecumā:
    
    1. Slavē centienus, ne tikai rezultātus
    2. Ļauj bērnam darīt pašam (pat ja ilgāk)
    3. Atzīsti jūtas un pieredzi
    4. Izvairies no salīdzināšanas ar citiem
    5. Rādi beznosacījuma mīlestību
    
    Teikumi, kas veido pašapziņu:
    - "Tu ļoti centīes!"
    - "Es redzu, cik lepns tu jūties"
    - "Tu to izdarīji pats!"`,
    },
]

export function searchKnowledgeBase(query: string): typeof demoKnowledgeBase {
    const lowerQuery = query.toLowerCase()

    return demoKnowledgeBase.filter(article => {
        const titleMatch = article.title.toLowerCase().includes(lowerQuery)
        const contentMatch = article.content.toLowerCase().includes(lowerQuery)
        const keywordMatch = article.keywords.some(keyword =>
            lowerQuery.includes(keyword) || keyword.includes(lowerQuery)
        )

        return titleMatch || contentMatch || keywordMatch
    })
}
