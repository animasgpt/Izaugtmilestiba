'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline'

export default function LoginPage() {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            })

            const data = await response.json()

            if (response.ok) {
                // Redirect to dashboard
                router.push('/labot/dashboard')
            } else {
                setError(data.error || 'Pieslēgšanās neizdevās')
            }
        } catch (err) {
            setError('Radās kļūda. Lūdzu, mēģini vēlreiz.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl overflow-hidden p-2">
                        <img
                            src="/images/IM-sirds mazs 2.png"
                            alt="Izaugt Mīlestībā"
                            className="w-full h-auto"
                        />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-white mb-2">
                        Admin Panelis
                    </h1>
                    <p className="text-white/80">Pieslēdzies, lai pārvaldītu saturu</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Lietotājvārds
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="input-field pl-10"
                                    placeholder="Madara"
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Parole
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field pl-10"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full"
                        >
                            {loading ? 'Pieslēdzas...' : 'Pieslēgties'}
                        </Button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-600 text-center">
                            Demo pieejas dati:<br />
                            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                Madara / Teodors24
                            </span>
                        </p>
                    </div>
                </div>

                {/* Back to site */}
                <div className="text-center mt-6">
                    <a href="/" className="text-white/80 hover:text-white text-sm transition-colors">
                        ← Atpakaļ uz vietni
                    </a>
                </div>
            </div>
        </div>
    )
}
