import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateSession } from '@/lib/auth/auth'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Allow access to login page
    if (pathname === '/labot') {
        return NextResponse.next()
    }

    // Check if accessing protected admin routes
    if (pathname.startsWith('/labot/')) {
        const token = request.cookies.get('auth-token')?.value

        if (!token) {
            return NextResponse.redirect(new URL('/labot', request.url))
        }

        const user = validateSession(token)

        if (!user) {
            const response = NextResponse.redirect(new URL('/labot', request.url))
            response.cookies.delete('auth-token')
            return response
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/labot/:path*',
}
