import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

// Path to JSON file for fallback storage
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

// Ensure data directory exists
async function ensureDataDir() {
    const dir = path.dirname(TEXTS_FILE)
    try {
        await fs.access(dir)
    } catch {
        await fs.mkdir(dir, { recursive: true })
    }
}

// Read texts from JSON file
async function readTexts(): Promise<SiteText[]> {
    try {
        await ensureDataDir()
        const data = await fs.readFile(TEXTS_FILE, 'utf-8')
        return JSON.parse(data)
    } catch {
        return []
    }
}

// Write texts to JSON file
async function writeTexts(texts: SiteText[]) {
    await ensureDataDir()
    await fs.writeFile(TEXTS_FILE, JSON.stringify(texts, null, 2))
}

// GET all site texts or filter by section
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const section = searchParams.get('section')
        const key = searchParams.get('key')

        let texts = await readTexts()

        if (section) {
            texts = texts.filter(t => t.section === section)
        }

        if (key) {
            texts = texts.filter(t => t.key === key)
        }

        return NextResponse.json(texts)
    } catch (error) {
        console.error('Error fetching site texts:', error)
        return NextResponse.json(
            { error: 'Failed to fetch site texts' },
            { status: 500 }
        )
    }
}

// POST - Create new site text
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { key, value, description, section } = body

        if (!key || !value || !section) {
            return NextResponse.json(
                { error: 'Key, value, and section are required' },
                { status: 400 }
            )
        }

        const texts = await readTexts()

        // Check if key already exists
        if (texts.some(t => t.key === key)) {
            return NextResponse.json(
                { error: 'A text with this key already exists' },
                { status: 400 }
            )
        }

        const newText: SiteText = {
            id: Date.now().toString(),
            key,
            value,
            description,
            section,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        texts.push(newText)
        await writeTexts(texts)

        return NextResponse.json(newText, { status: 201 })
    } catch (error: any) {
        console.error('Error creating site text:', error)
        return NextResponse.json(
            { error: 'Failed to create site text' },
            { status: 500 }
        )
    }
}

// PUT - Update multiple site texts
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json()
        const { texts: textsToUpdate } = body

        if (!Array.isArray(textsToUpdate)) {
            return NextResponse.json(
                { error: 'Texts must be an array' },
                { status: 400 }
            )
        }

        const texts = await readTexts()

        // Update texts
        textsToUpdate.forEach(update => {
            const index = texts.findIndex(t => t.id === update.id)
            if (index !== -1) {
                texts[index] = {
                    ...texts[index],
                    value: update.value,
                    description: update.description,
                    updatedAt: new Date().toISOString()
                }
            }
        })

        await writeTexts(texts)

        return NextResponse.json({ success: true, updated: textsToUpdate.length })
    } catch (error) {
        console.error('Error updating site texts:', error)
        return NextResponse.json(
            { error: 'Failed to update site texts' },
            { status: 500 }
        )
    }
}
