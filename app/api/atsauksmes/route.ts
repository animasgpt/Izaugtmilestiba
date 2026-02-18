import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const ATSAUKSMES_DIR = path.join(process.cwd(), 'public', 'images', 'atsauksmes')
const ATSAUKSMES_JSON = path.join(process.cwd(), 'data', 'atsauksmes.json')

async function ensureDir() {
    if (!existsSync(ATSAUKSMES_DIR)) {
        await mkdir(ATSAUKSMES_DIR, { recursive: true })
    }
}

async function readAtsauksmes(): Promise<any[]> {
    try {
        const data = await readFile(ATSAUKSMES_JSON, 'utf-8')
        return JSON.parse(data)
    } catch {
        return []
    }
}

async function writeAtsauksmes(data: any[]) {
    await writeFile(ATSAUKSMES_JSON, JSON.stringify(data, null, 2), 'utf-8')
}

// GET - list all
export async function GET() {
    const list = await readAtsauksmes()
    return NextResponse.json({ atsauksmes: list })
}

// POST - upload new image
export async function POST(request: NextRequest) {
    try {
        await ensureDir()
        const formData = await request.formData()
        const file = formData.get('file') as File
        const caption = (formData.get('caption') as string) || ''

        if (!file) {
            return NextResponse.json({ error: 'Nav fails' }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
        const filename = `atsauksme-${Date.now()}.${ext}`
        const filepath = path.join(ATSAUKSMES_DIR, filename)

        await writeFile(filepath, buffer)

        const list = await readAtsauksmes()
        const newItem = {
            id: Date.now().toString(),
            filename,
            url: `/images/atsauksmes/${filename}`,
            caption,
            createdAt: new Date().toISOString(),
        }
        list.push(newItem)
        await writeAtsauksmes(list)

        return NextResponse.json({ success: true, item: newItem })
    } catch (error: any) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// DELETE - remove by id
export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json()
        const list = await readAtsauksmes()
        const item = list.find((a: any) => a.id === id)

        if (item) {
            const filepath = path.join(ATSAUKSMES_DIR, item.filename)
            if (existsSync(filepath)) {
                const { unlink } = await import('fs/promises')
                await unlink(filepath)
            }
        }

        const updated = list.filter((a: any) => a.id !== id)
        await writeAtsauksmes(updated)

        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
