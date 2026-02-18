import { PrismaClient } from '@prisma/client'
import { writeFileSync } from 'fs'

const p = new PrismaClient()

const arts = await p.article.findMany({
    select: { id: true, title: true, slug: true, category: true, categoryName: true },
    orderBy: { date: 'desc' }
})

writeFileSync('scripts/articles-list.json', JSON.stringify(arts, null, 2), 'utf-8')
console.log('Saglabāts scripts/articles-list.json ar', arts.length, 'rakstiem')

await p.$disconnect()
