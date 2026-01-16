import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const TEXTS_FILE = path.join(process.cwd(), 'data', 'site-texts.json')

interface SiteText {
    id: string
    key: string
    value: string
    description?: string
    section: string
    createdAt: string
    updatedAt: string
}

async function readTexts(): Promise<SiteText[]> {
    try {
        const data = await fs.readFile(TEXTS_FILE, 'utf-8')
        return JSON.parse(data)
    } catch {
        return []
    }
}

async function writeTexts(texts: SiteText[]) {
    const dir = path.dirname(TEXTS_FILE)
    try {
        await fs.access(dir)
    } catch {
        await fs.mkdir(dir, { recursive: true })
    }
    await fs.writeFile(TEXTS_FILE, JSON.stringify(texts, null, 2))
}

// GET single site text by ID
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const texts = await readTexts()
        const text = texts.find(t => t.id === params.id)

        if (!text) {
            return NextResponse.json(
                { error: 'Site text not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(text)
    } catch (error) {
        console.error('Error fetching site text:', error)
        return NextResponse.json(
            { error: 'Failed to fetch site text' },
            { status: 500 }
        )
    }
}

// PUT - Update single site text
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json()
        const { value, description } = body

        const texts = await readTexts()
        const index = texts.findIndex(t => t.id === params.id)

        if (index === -1) {
            return NextResponse.json(
                { error: 'Site text not found' },
                { status: 404 }
            )
        }

        texts[index] = {
            ...texts[index],
            value,
            description,
            updatedAt: new Date().toISOString()
        }

        await writeTexts(texts)

        return NextResponse.json(texts[index])
    } catch (error) {
        console.error('Error updating site text:', error)
        return NextResponse.json(
            { error: 'Failed to update site text' },
            { status: 500 }
        )
    }
}

// DELETE - Delete site text
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const texts = await readTexts()
        const filteredTexts = texts.filter(t => t.id !== params.id)

        if (texts.length === filteredTexts.length) {
            return NextResponse.json(
                { error: 'Site text not found' },
                { status: 404 }
            )
        }

        await writeTexts(filteredTexts)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting site text:', error)
        return NextResponse.json(
            { error: 'Failed to delete site text' },
            { status: 500 }
        )
    }
}

