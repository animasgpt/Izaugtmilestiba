import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import path from 'path'

const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json')

async function readLeads(): Promise<any[]> {
    try {
        const data = await readFile(LEADS_FILE, 'utf-8')
        return JSON.parse(data)
    } catch {
        return []
    }
}

async function writeLeads(data: any[]) {
    await writeFile(LEADS_FILE, JSON.stringify(data, null, 2), 'utf-8')
}

export async function POST(request: NextRequest) {
    try {
        const { email, name, source } = await request.json()

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Nepareizs e-pasta formāts' }, { status: 400 })
        }

        const leads = await readLeads()

        // Check duplicate
        const exists = leads.find((l: any) => l.email.toLowerCase() === email.toLowerCase())
        if (exists) {
            // Still return success so they can download
            return NextResponse.json({ success: true, alreadyExists: true })
        }

        const newLead = {
            id: Date.now().toString(),
            email: email.toLowerCase().trim(),
            name: name || '',
            source: source || 'homepage',
            createdAt: new Date().toISOString(),
        }

        leads.push(newLead)
        await writeLeads(leads)

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Lead capture error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function GET() {
    const leads = await readLeads()
    return NextResponse.json({ leads, count: leads.length })
}
