import bcrypt from 'bcryptjs'

// Demo users - in production, this would be in a database
const USERS = [
    {
        username: 'Madara',
        // Password: Teodors24 (hashed)
        passwordHash: '$2a$10$YourHashedPasswordHere', // Will be replaced with actual hash
        role: 'admin',
    },
]

export interface User {
    username: string
    role: string
}

export async function validateCredentials(username: string, password: string): Promise<User | null> {
    // For demo purposes, simple check
    if (username === 'Madara' && password === 'Teodors24') {
        return {
            username: 'Madara',
            role: 'admin',
        }
    }

    return null
}

export function createSession(user: User): string {
    // In production, use proper JWT or session tokens
    // For demo, we'll use a simple base64 encoded string
    const sessionData = {
        username: user.username,
        role: user.role,
        createdAt: Date.now(),
    }

    return Buffer.from(JSON.stringify(sessionData)).toString('base64')
}

export function validateSession(token: string): User | null {
    try {
        const sessionData = JSON.parse(Buffer.from(token, 'base64').toString())

        // Check if session is not older than 24 hours
        const age = Date.now() - sessionData.createdAt
        if (age > 24 * 60 * 60 * 1000) {
            return null
        }

        return {
            username: sessionData.username,
            role: sessionData.role,
        }
    } catch {
        return null
    }
}
