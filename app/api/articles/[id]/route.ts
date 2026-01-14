import { NextRequest, NextResponse } from 'next/server'
import { getArticleById, updateArticle, deleteArticle } from '@/lib/db/articles'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const article = getArticleById(params.id)

        if (!article) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 })
        }

        return NextResponse.json({ article })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 })
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const data = await request.json()
        const article = updateArticle(params.id, data)

        if (!article) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, article })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update article' }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const success = deleteArticle(params.id)

        if (!success) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
    }
}
