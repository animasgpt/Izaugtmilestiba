/**
 * Piesaista attēlus rakstiem pēc kategorijas un slug
 * Izmanto Unsplash bezmaksas attēlus
 */

import { PrismaClient } from '@prisma/client'

const p = new PrismaClient()

// Unsplash attēli pa kategorijām (fiksēti, augstas kvalitātes)
const CATEGORY_IMAGES = {
    'emocijas': 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80', // māte ar bērnu
    'veseliba': 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80', // bērna veselība
    'mazuli-planojot': 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80', // grūtniecība
    'pirmais-gads': 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800&q=80', // mazulis
    'gatavosanas': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80', // gatavošanās
    'iedvesma': 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80', // iedvesma
    'vecaki': 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&q=80', // ģimene
    'raksti': 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&q=80', // vispārīgi
    'labsajuta': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80', // sports/labsajūta
    'bernudarznieks': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80', // bērnudārzs
    'dzives-gads': 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80', // 1. dzīves gads
    'sarunas': 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80', // sarunas
    'gaidibas': 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80', // gaidības
    'attistiba': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80', // attīstība
    'pusaudzis': 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80', // pusaudzis
    'skola': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80', // skola
    'attiecibas': 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&q=80', // attiecības
    'dzemdibas': 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80', // dzemdības
}

// Slug-specifiskas attēlu piesaistes (unikāli attēli konkrētiem rakstiem)
const SLUG_IMAGES = {
    // Emocijas
    'dusmas': 'https://images.unsplash.com/photo-1541199249251-f713e6145474?w=800&q=80',
    'emocijas': 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80',
    'emocionala_drosiba': 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80',
    'bebisaemocijas': 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800&q=80',
    'mamma_un_emocijas': 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80',
    'pasapzina': 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80',
    'pozitivisms': 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80',
    'lidzsvars': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    'stress': 'https://images.unsplash.com/photo-1541199249251-f713e6145474?w=800&q=80',
    'gaidas': 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80',
    'nomaktibapusaudzim': 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80',
    'vecakais': 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&q=80',
    'divgadnieks': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
    'divgadnieks-1': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
    'adaptacija': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
    'gatavs-bernudarzam': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
    'skirts_tetis': 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80',
    'seksualitate': 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&q=80',

    // Veselība
    'iesnas': 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80',
    'psihosomatika': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    'psihosomatika-2': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    'valoda': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
    'ergonomiskiprincipi': 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800&q=80',
    'podinmaciba': 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800&q=80',
    'gulammaisi': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80',
    'lidzatkariba': 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80',
    'izlutinatie': 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800&q=80',
    'bernu_drosiba': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
    'labiedarbi': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80',
    'jaundzimusais': 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800&q=80',
    'sarunasgaidibulaika': 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80',
    'gaidibu-laiks': 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80',
    'dzemdibusakums': 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80',
    'dzemdibusoma': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80',
    'dzemdibu-sapes': 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80',
    'paliktnis': 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',

    // Mazuli plānojot / Gatavošanās
    'autokresls': 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
    'autokresls_jaundzimusais': 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
    'toddler_autokresls': 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
    'bernistabas_remonts': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    'pirmaspreces': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80',
    'rati_mazulim': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80',
    'gaidibas': 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80',
    'abonesana': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80',
    'bukazins': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
    'piedzimsanas-pabalsti': 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80',
    'prasmes-zidainim': 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800&q=80',
    'otrsmazais': 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&q=80',
    'bernkopiba': 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80',
    'mamma-un-darbs': 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80',

    // Rotaļlietas
    'rotalas': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    'attistosas_rotallietas': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',

    // Iedvesma / Personāži
    'dzimtaskoks': 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80',
    'advente': 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&q=80',
    'just-do-it': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    'montesori-seminars': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',

    // Attiecības / Pāris
    'attiecibas': 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&q=80',
    'partneri': 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&q=80',
    'pec_mazula_dzimsanas': 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&q=80',
    'laimigi-vecaki-ir-laimigi-berni': 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&q=80',
    'socialie-tikli-berniem': 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80',
    'vispirms-milestiba': 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80',
    'holsteini-upmani': 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&q=80',

    // Intervijas / Personāži
    '_gege': 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800&q=80',
    'annapanna': 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80',
    'beitika': 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80',
    'dace_helmane': 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80',
    'danagulbe': 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80',
    'dinararudane': 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80',
    'evelina_strazdina': 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80',
    'ginta-filia-solis': 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80',
    'ieva_cipruse': 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80',
    'ievaunoskars': 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80',
    'irinapetersone': 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80',
    'kaspars_breidaks': 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80',
    'klava': 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80',
    'kristine-zilde-krevica': 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80',
    'kristinebrice': 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80',
    'leldecerina': 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80',
    'mairisbriedis': 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80',
    'martasproge': 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80',
    'peterisklava': 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80',
    'sanda_dejus': 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80',
    'saruna': 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80',
    'saruna_kristine_omshanti': 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80',
    'sipkevics': 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80',
    'viktorija_ozola': 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80',
    'vertiba': 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80',
    'vecakurevolucija': 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&q=80',
    'davanasgege': 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&q=80',
    'emotologs': 'https://images.unsplash.com/photo-1541199249251-f713e6145474?w=800&q=80',
    'dzimtaskoks': 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80',
}

async function main() {
    console.log('🖼️  Sākam attēlu piesaistīšanu rakstiem...')

    const articles = await p.article.findMany({
        select: { id: true, slug: true, category: true, image: true }
    })

    let updated = 0
    let skipped = 0

    for (const article of articles) {
        // Ja attēls jau ir piesaistīts, izlaižam
        if (article.image) {
            skipped++
            continue
        }

        // Meklējam slug-specifisku attēlu, citādi kategorijas attēlu
        const imageUrl = SLUG_IMAGES[article.slug] || CATEGORY_IMAGES[article.category] || CATEGORY_IMAGES['raksti']

        await p.article.update({
            where: { id: article.id },
            data: { image: imageUrl }
        })

        console.log(`✅ ${article.slug} -> ${imageUrl.substring(0, 60)}...`)
        updated++
    }

    console.log(`\n📊 Rezultāts: ${updated} atjaunināti, ${skipped} izlaisti`)
}

main()
    .catch(console.error)
    .finally(() => p.$disconnect())
