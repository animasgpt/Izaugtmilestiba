'use client'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-primary-50">
            <div className="text-center px-4">
                <h1 className="text-6xl font-display font-bold text-gradient mb-4">
                    Kļūda
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Atvainojiet, radās neparedzēta kļūda.
                </p>
                <button
                    onClick={reset}
                    className="btn-primary">
                    Mēģināt vēlreiz
                </button>
            </div>
        </div>
    )
}
