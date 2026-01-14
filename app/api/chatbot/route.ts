import { NextRequest, NextResponse } from 'next/server'
import { generateAIResponse } from '@/lib/chatbot/simulator'

export async function POST(request: NextRequest) {
    try {
        const { message, conversationHistory } = await request.json()

        if (!message || typeof message !== 'string') {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            )
        }

        // Simulate thinking delay for more realistic experience
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200))

        const response = generateAIResponse(message, conversationHistory)

        return NextResponse.json({
            message: response,
            timestamp: new Date().toISOString(),
        })
    } catch (error) {
        console.error('Chatbot API error:', error)
        return NextResponse.json(
            { error: 'Failed to generate response' },
            { status: 500 }
        )
    }
}
