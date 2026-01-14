const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Sāk seed process...')

    // 1. Izveido admin lietotāju
    console.log('👤 Izveido admin lietotāju...')
    const admin = await prisma.user.upsert({
        where: { username: 'Madara' },
        update: {},
        create: {
            username: 'Madara',
            password: '$2a$10$YourHashedPasswordHere', // Nomainīt ar reālu hashed password
            email: 'admin@izaugtmilestiba.lv',
            role: 'admin',
        },
    })
    console.log('✅ Admin lietotājs izveidots:', admin.username)

    // 2. Izveido produktus
    console.log('📦 Izveido produktus...')
    const products = await Promise.all([
        prisma.product.create({
            data: {
                name: 'Grāmata "Izaugt Mīlestībā"',
                description: 'Praktisks ceļvedis vecākiem par mīlestības pilnu audzināšanu',
                price: 24.99,
                image: '/images/demo/book.png',
                category: 'book',
                inStock: true,
                featured: true,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Individuāla konsultācija (60 min)',
                description: 'Personiska tikšanās ar vecāku konsultanti',
                price: 45.00,
                image: '/images/demo/consultation.png',
                category: 'consultation',
                inStock: true,
                featured: true,
            },
        }),
        prisma.product.create({
            data: {
                name: '30 dienu izaicinājums',
                description: 'Strukturēta programma vecākiem ar ikdienas uzdevumiem',
                price: 39.99,
                image: '/images/demo/challenge.png',
                category: 'program',
                inStock: true,
                featured: false,
            },
        }),
    ])
    console.log(`✅ Izveidoti ${products.length} produkti`)

    // 3. Izveido demo rakstus
    console.log('📝 Izveido demo rakstus...')
    const articles = await Promise.all([
        prisma.article.create({
            data: {
                title: 'Kā palīdzēt bērnam tikt galā ar emocijām',
                slug: 'ka-palidzet-bernam-tikt-gala-ar-emocijam',
                excerpt: 'Emociju regulācija ir svarīga prasme, ko bērni apgūst pakāpeniski.',
                content: '# Kā palīdzēt bērnam tikt galā ar emocijām\n\nEmociju regulācija ir būtiska prasme...',
                category: 'sarunas',
                categoryName: 'Sarunas',
                readTime: '5 min',
                author: 'Laura Bērziņa',
                published: true,
            },
        }),
        prisma.article.create({
            data: {
                title: 'Miega režīma nozīme mazuļiem',
                slug: 'miega-rezima-nozime-mazuliem',
                excerpt: 'Kvalitatīvs miegs ir būtisks bērna attīstībai.',
                content: '# Miega režīma nozīme mazuļiem\n\nKvalitatīvs miegs ir būtisks...',
                category: 'dzives-gads',
                categoryName: '1. dzīves gads',
                readTime: '7 min',
                author: 'Laura Bērziņa',
                published: true,
            },
        }),
        prisma.article.create({
            data: {
                title: 'Gaidību laiks: kā sagatavoties bērna ienākšanai',
                slug: 'gaidību-laiks-ka-sagatavoties',
                excerpt: 'Praktiski padomi topošajiem vecākiem.',
                content: '# Gaidību laiks\n\nPraktiski padomi par emocionālo un praktisko sagatavošanos...',
                category: 'gaidibas',
                categoryName: 'Gaidības',
                readTime: '10 min',
                author: 'Laura Bērziņa',
                published: true,
            },
        }),
    ])
    console.log(`✅ Izveidoti ${articles.length} raksti`)

    console.log('🎉 Seed process pabeigts!')
}

main()
    .catch((e) => {
        console.error('❌ Kļūda seed procesā:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
