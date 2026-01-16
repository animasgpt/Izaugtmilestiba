import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const defaultTexts = [
    // Home page
    {
        key: 'home.hero.title',
        value: 'Izaugt Mīlestībā',
        description: 'Sākumlapas galvenais virsraksts',
        section: 'home'
    },
    {
        key: 'home.hero.subtitle',
        value: 'Atbalsts vecākiem audzināšanas ceļā',
        description: 'Sākumlapas apakšvirsraksts',
        section: 'home'
    },
    {
        key: 'home.hero.cta',
        value: 'Sākt lasīt',
        description: 'Sākumlapas galvenā pogas teksts',
        section: 'home'
    },

    // About page
    {
        key: 'about.title',
        value: 'Par mani',
        description: 'Par mani lapas virsraksts',
        section: 'about'
    },
    {
        key: 'about.intro',
        value: 'Sveiki! Es esmu Laura Bērziņa, bērnu psiholoģe un vecāku konsultante.',
        description: 'Par mani lapas ievads',
        section: 'about'
    },

    // Services page
    {
        key: 'services.title',
        value: 'Pakalpojumi',
        description: 'Pakalpojumu lapas virsraksts',
        section: 'services'
    },
    {
        key: 'services.subtitle',
        value: 'Izvēlies sev piemērotāko atbalsta veidu',
        description: 'Pakalpojumu lapas apakšvirsraksts',
        section: 'services'
    },

    // Shop page
    {
        key: 'shop.title',
        value: 'Veikals',
        description: 'Veikala lapas virsraksts',
        section: 'shop'
    },
    {
        key: 'shop.subtitle',
        value: 'Grāmatas un materiāli vecākiem',
        description: 'Veikala lapas apakšvirsraksts',
        section: 'shop'
    },

    // Contact page
    {
        key: 'contact.title',
        value: 'Sazinies ar mani',
        description: 'Kontaktu lapas virsraksts',
        section: 'contact'
    },
    {
        key: 'contact.email.label',
        value: 'E-pasts',
        description: 'Kontaktu formas e-pasta lauka nosaukums',
        section: 'contact'
    },
    {
        key: 'contact.submit',
        value: 'Nosūtīt ziņu',
        description: 'Kontaktu formas pogas teksts',
        section: 'contact'
    },

    // Footer
    {
        key: 'footer.copyright',
        value: '© 2026 Izaugt Mīlestībā. Visas tiesības aizsargātas.',
        description: 'Kājenes autortiesību teksts',
        section: 'other'
    },
    {
        key: 'footer.tagline',
        value: 'Atbalsts vecākiem audzināšanas ceļā',
        description: 'Kājenes sauklis',
        section: 'other'
    },
]

async function main() {
    console.log('🌱 Sāk pievienot noklusējuma tekstus...')

    for (const text of defaultTexts) {
        try {
            await prisma.siteText.upsert({
                where: { key: text.key },
                update: {},
                create: text
            })
            console.log(`✅ Pievienots: ${text.key}`)
        } catch (error) {
            console.error(`❌ Kļūda pievienojot ${text.key}:`, error)
        }
    }

    console.log('✨ Pabeigts!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
