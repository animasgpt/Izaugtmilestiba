import { NextRequest, NextResponse } from 'next/server'
import { getAllArticles, createArticle, bulkCreateArticles } from '@/lib/db/articles'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const publishedOnly = searchParams.get('published') === 'true'

        const articles = await getAllArticles(publishedOnly)
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
            const articles = await bulkCreateArticles(data)
            return NextResponse.json({ success: true, count: articles.length, articles })
        }

        // Single article
        const article = await createArticle(data)
        return NextResponse.json({ success: true, article })
    } catch (error: any) {
        console.error('Failed to create article:', error);
        return NextResponse.json({
            error: 'Failed to create article',
            details: error.message || 'Unknown error'
        }, { status: 500 })
    }
}
