/**
 * MD rakstu importēšanas skripts
 * Nolasa visus .md failus no norādītā direktorija un importē tos datubāzē
 * 
 * Palaišana: node scripts/import-md-articles.mjs
 */

import { readFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { PrismaClient } from '@prisma/client'

const __dirname = dirname(fileURLToPath(import.meta.url))
const prisma = new PrismaClient()

// MD failu direktorijs
const MD_DIR = join(__dirname, '..', 'izaugt milestiba raksti', 'md')

// Kategoriju kartēšana no URL uz latviešu nosaukumiem
const CATEGORY_MAP = {
    'emocijas': { id: 'emocijas', name: 'Sajūtas un emocijas' },
    'vecāki': { id: 'vecaki', name: 'Vecāki' },
    'vecaki': { id: 'vecaki', name: 'Vecāki' },
    'pirmais-gads-ar-mazuli': { id: 'pirmais-gads', name: 'Pirmais gads ar mazuli' },
    'bērnudārznieks': { id: 'bernudarznieks', name: 'Bērnudārznieks' },
    'bernudarznieks': { id: 'bernudarznieks', name: 'Bērnudārznieks' },
    'veseliba': { id: 'veseliba', name: 'Vecāku un mazuļa veselība' },
    'mazuli-planojot': { id: 'mazuli-planojot', name: 'Mazuli plānojot' },
    'gatavosanas': { id: 'gatavosanas', name: 'Praktiskā gatavošanās' },
    'iedvesma': { id: 'iedvesma', name: 'Iedvesma un idejas' },
    'attistiba': { id: 'attistiba', name: 'Bērna attīstība' },
    'pusaudzis': { id: 'pusaudzis', name: 'Pusaudzis' },
    'skola': { id: 'skola', name: 'Skola' },
    'attiecibas': { id: 'attiecibas', name: 'Attiecības' },
    'dzemdibas': { id: 'dzemdibas', name: 'Dzemdības' },
    'gaidibas': { id: 'gaidibas', name: 'Gaidību laiks' },
}

// Mēnešu kartēšana
const MONTH_MAP = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
}

/**
 * Parsē datumu no formāta "Mar 31, 2020"
 */
function parseDate(dateStr) {
    if (!dateStr) return new Date()
    const parts = dateStr.trim().split(' ')
    if (parts.length >= 3) {
        const month = MONTH_MAP[parts[0]] ?? 0
        const day = parseInt(parts[1].replace(',', '')) || 1
        const year = parseInt(parts[2]) || 2020
        return new Date(year, month, day)
    }
    return new Date()
}

/**
 * Parsē kategorijas no MD faila beigām
 */
function parseCategories(content) {
    const lines = content.split('\n')
    const categories = []

    for (const line of lines) {
        // Meklē rindiņas formātā: "  * [Kategorijas nosaukums](URL)"
        const match = line.match(/\*\s*\[([^\]]+)\]\(https:\/\/www\.izaugtmilestiba\.lv\/blog\/categories\/([^)]+)\)/)
        if (match) {
            const catSlug = match[2].toLowerCase()
                .replace(/ā/g, 'a').replace(/č/g, 'c').replace(/ē/g, 'e')
                .replace(/ģ/g, 'g').replace(/ī/g, 'i').replace(/ķ/g, 'k')
                .replace(/ļ/g, 'l').replace(/ņ/g, 'n').replace(/š/g, 's')
                .replace(/ū/g, 'u').replace(/ž/g, 'z')

            if (CATEGORY_MAP[catSlug]) {
                categories.push(CATEGORY_MAP[catSlug])
            } else if (CATEGORY_MAP[match[2]]) {
                categories.push(CATEGORY_MAP[match[2]])
            } else {
                // Nezināma kategorija - izmanto pirmās atrastās vērtību
                categories.push({ id: catSlug, name: match[1] })
            }
        }
    }

    return categories
}

/**
 * Parsē MD failu un atgriež raksta datus
 */
function parseMdFile(filePath, fileName) {
    const content = readFileSync(filePath, 'utf-8')
    const lines = content.split('\n')

    // Slug no faila nosaukuma
    const slug = fileName.replace('.md', '')

    // Virsraksts - meklē otro # rindiņu (pēc ---)
    let title = slug
    let foundSeparator = false
    for (const line of lines) {
        if (line.trim() === '---') {
            foundSeparator = true
            continue
        }
        if (foundSeparator && line.startsWith('# ')) {
            title = line.replace('# ', '').trim()
            break
        }
    }

    // Datums un lasīšanas laiks
    let dateStr = null
    let readTime = null
    let authorLine = null

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()
        // Meklē datumu formātā "* Jan 14, 2020" vai "* Mar 31, 2020"
        if (line.match(/^\*\s+[A-Z][a-z]{2}\s+\d{1,2},\s+\d{4}$/)) {
            dateStr = line.replace('*', '').trim()
        }
        // Lasīšanas laiks
        if (line.match(/^\*\s+\d+\s+min\s+read$/)) {
            readTime = line.replace('*', '').trim()
        }
    }

    // Kategorijas
    const categories = parseCategories(content)
    const primaryCategory = categories[0] || { id: 'raksti', name: 'Raksti' }

    // Saturs - viss pēc metadatiem (pēc lasīšanas laika rindiņas)
    // Noņemam attēlus (![...](...)  rindiņas) un tīram saturu
    let contentStarted = false
    let contentLines = []
    let metaLineCount = 0

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const trimmed = line.trim()

        // Pēc --- sākas raksts
        if (trimmed === '---' && !contentStarted) {
            contentStarted = true
            metaLineCount = 0
            continue
        }

        if (!contentStarted) continue

        // Izlaižam pirmās meta rindiņas (virsraksts, autors, datums, lasīšanas laiks)
        if (metaLineCount < 6) {
            if (trimmed.startsWith('# ') || trimmed.startsWith('* ') || trimmed === '') {
                metaLineCount++
                continue
            }
        }

        // Noņemam Wix attēlu rindiņas
        if (trimmed.startsWith('![') && trimmed.includes('wixstatic.com')) {
            continue
        }

        // Pārtraucam pie kategoriju saraksta beigās
        if (trimmed.match(/^\*\s*\[[^\]]+\]\(https:\/\/www\.izaugtmilestiba\.lv\/blog\/categories\//)) {
            break
        }

        contentLines.push(line)
    }

    // Tīram saturu
    let articleContent = contentLines.join('\n')
        .replace(/\n{3,}/g, '\n\n')  // Vairākas tukšas rindiņas -> divas
        .trim()

    // Izvilkums - pirmais rindkopa
    const excerptMatch = articleContent.match(/\*\*([^*]{50,300})\*\*/)
    let excerpt = excerptMatch ? excerptMatch[1].trim() : ''
    if (!excerpt) {
        // Ņemam pirmo ne-tukšo rindiņu
        const firstPara = articleContent.split('\n').find(l => l.trim().length > 50)
        excerpt = firstPara ? firstPara.trim().substring(0, 250) + '...' : ''
    }
    excerpt = excerpt.substring(0, 500)

    return {
        title,
        slug,
        excerpt,
        content: articleContent,
        category: primaryCategory.id,
        categoryName: primaryCategory.name,
        readTime: readTime || '5 min read',
        author: 'Izaugt Mīlestībā',
        image: null,
        date: parseDate(dateStr),
        published: true,
    }
}

async function main() {
    console.log('🚀 Sākam MD rakstu importēšanu...')
    console.log(`📁 Direktorijs: ${MD_DIR}`)

    // Nolasām visus MD failus
    const files = readdirSync(MD_DIR).filter(f => f.endsWith('.md'))
    console.log(`📄 Atrasti ${files.length} MD faili\n`)

    let imported = 0
    let skipped = 0
    let errors = 0

    for (const file of files) {
        const filePath = join(MD_DIR, file)
        const slug = file.replace('.md', '')

        try {
            // Pārbaudām, vai raksts jau eksistē
            const existing = await prisma.article.findUnique({
                where: { slug }
            })

            if (existing) {
                console.log(`⏭️  Izlaižam (jau eksistē): ${slug}`)
                skipped++
                continue
            }

            // Parsējam MD failu
            const articleData = parseMdFile(filePath, file)

            // Saglabājam datubāzē
            await prisma.article.create({
                data: articleData
            })

            console.log(`✅ Importēts: "${articleData.title}" (${slug})`)
            imported++

        } catch (error) {
            console.error(`❌ Kļūda ar failu ${file}:`, error.message)
            errors++
        }
    }

    console.log('\n📊 Rezultāts:')
    console.log(`   ✅ Importēti: ${imported}`)
    console.log(`   ⏭️  Izlaisti (jau eksistē): ${skipped}`)
    console.log(`   ❌ Kļūdas: ${errors}`)
    console.log('\n🎉 Importēšana pabeigta!')
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
