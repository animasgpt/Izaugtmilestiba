import { searchKnowledgeBase } from './knowledge-base'

const SYSTEM_PERSONALITY = `Tu esi Digitālā PEP mamma. Tava misija ir sniegt emocionālu atbalstu un pārbaudītu informāciju vecākiem. 

Tava personība:
- Empātiska un saprotoša
- Nosvērta un atbalstoša
- Nekad nenosodi vecākus
- Atzīsti, ka vecāku ceļš ir grūts
- Sniedz praktisku padomu, balstoties uz PEP mammas metodoloģiju

Atbildes stils:
- Sāc ar empātiju un atzīšanu
- Sniedz konkrētus, praktiskus padomus
- Beidz ar iedrošinājumu
- Ja nezini atbildi, godīgi saki un iesaki konsultāciju

Atbildi latviešu valodā, siltā un atbalstošā tonī.`

interface ChatMessage {
    role: 'user' | 'assistant'
    content: string
}

export function generateAIResponse(userMessage: string, conversationHistory: ChatMessage[] = []): string {
    const lowerMessage = userMessage.toLowerCase()

    // Search knowledge base
    const relevantArticles = searchKnowledgeBase(userMessage)

    // Greeting responses
    if (lowerMessage.match(/^(sveiki|labdien|čau|hei|hello)/)) {
        return `Sveika! 👋 Es esmu Digitālā PEP mamma - tavs atbalsts vecāku ceļā. 

Varu palīdzēt ar jautājumiem par:
• Bērnu emocijām un uzvedību
• Miega rutīnām
• Komunikāciju ar bērnu
• Ikdienas izaicinājumiem

Ko vēlies aprunāt šodien?`
    }

    // Sleep-related questions
    if (lowerMessage.match(/(mieg|gul|nakts|dienasguļa|nevar aizmigt)/)) {
        const article = relevantArticles.find(a => a.keywords.includes('miegs'))
        return `Es saprotu, ka miega jautājumi var būt ļoti nogurdinoši vecākiem! 😴

${article ? article.content : `Daži pamata padomi par miegu:
- Izveidojiet konsekventu rutīnu
- Nodrošiniet mierīgu vidi
- Izvairieties no ekrāniem pirms gulētiešanas
- Ievērojiet regulāru režīmu`}

Vai vēlies runāt par kādu konkrētu miega problēmu? Es esmu šeit, lai palīdzētu!`
    }

    // Emotion-related questions
    if (lowerMessage.match(/(emocij|dusm|bēd|raud|histērij|tantrum|jūt)/)) {
        const article = relevantArticles.find(a => a.keywords.includes('emocijas'))
        return `Emocijas ir tik svarīga tēma! Ir pilnīgi normāli, ka bērni piedzīvo spēcīgas emocijas - viņi tikai mācās tās regulēt. ❤️

${article ? article.content : `Galvenais, ko atcerēties:
- Visas emocijas ir pieļaujamas
- Nosauciet emociju: "Es redzu, ka tu esi dusmīgs"
- Atzīstiet jūtas: "Tas ir grūti, es saprotu"
- Palīdziet atrast risinājumu`}

Tu dari lieliski, ka meklē veidus, kā atbalstīt savu bērnu! Vai ir kāda konkrēta situācija, par ko vēlies parunāt?`
    }

    // Behavior/discipline questions
    if (lowerMessage.match(/(neklaus|nepaklaus|uzved|disciplīn|robež|noteikum)/)) {
        return `Uzvedības jautājumi ir vieni no izaicinošākajiem vecāku ceļā. Tu neesi viens! 💪

Daži PEP mammas metodes principi:
1. **Skaidras robežas** - bērnam jāzina, ko sagaidāt
2. **Konsekventums** - ievērojiet noteikumus vienmēr
3. **Izvēles** - "Vai vēlies uzvilkt zilo vai sarkano kreklu?"
4. **Dabiskās sekas** - ļaujiet bērnam mācīties no pieredzēm

Atceries - uzvedība ir komunikācija. Bērns cenšas kaut ko pateikt.

Vai vēlies parunāt par kādu konkrētu uzvedības situāciju?`
    }

    // Communication questions
    if (lowerMessage.match(/(runā|saruna|komunikāc|klausī|dialogs)/)) {
        const article = relevantArticles.find(a => a.title.includes('komunikācija'))
        return `Komunikācija ir pamats veselīgām attiecībām ar bērnu! 🗣️

${article ? article.content : `PEP mammas komunikācijas principi:
- Klausies aktīvi un ar pilnu uzmanību
- Runā ar cieņu
- Izmanto "es" teikumus
- Uzdod atvērtus jautājumus
- Atzīsti bērna perspektīvu`}

Bērns mācās komunikāciju no tevis - un es redzu, ka tu rūpējies par to, kā runāt ar savu bērnu. Tas ir brīnišķīgi!`
    }

    // If relevant articles found but no specific pattern matched
    if (relevantArticles.length > 0) {
        const article = relevantArticles[0]
        return `Laba jautājums! Es atradu informāciju, kas varētu palīdzēt:

${article.content}

Vai tas atbild uz tavu jautājumu? Vai vēlies uzzināt vairāk par kādu konkrētu aspektu?`
    }

    // No relevant info found
    return `Paldies, ka dalījies ar savu jautājumu! 🌸

Lai gan man nav konkrētas informācijas par šo tēmu manā datubāzē, es iesaku:

1. **Konsultācija** - Personīga saruna ar speciālisti varētu būt ļoti noderīga. [Rezervē konsultāciju](/pakalpojumi/konsultacijas)

2. **Raksti** - Pārlūko mūsu rakstu sadaļu, iespējams, atradīsi ko noderīgu. [Skatīt rakstus](/lasi)

3. **Grāmata** - "Izaugt Mīlestībā" grāmatā ir plašāka informācija par dažādām tēmām. [Uzzināt vairāk](/pakalpojumi/gramata)

Atceries - tu dari lieliski, ka meklē atbildes un vēlies būt labāks vecāks! ❤️`
}
