import { NextRequest, NextResponse } from 'next/server'
import { getAllArticles, createArticle, bulkCreateArticles } from '@/lib/db/articles'

export async function GET() {
    try {
        const articles = getAllArticles()
        return NextResponse.json({ articles })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()

        // Check if bulk upload
        if (Array.isArray(data)) {
            const articles = bulkCreateArticles(data)
            return NextResponse.json({ success: true, count: articles.length, articles })
        }

        // Single article
        const article = createArticle(data)
        return NextResponse.json({ success: true, article })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create article' }, { status: 500 })
    }
}
