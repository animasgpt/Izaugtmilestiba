'use client'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
    \u003cdiv className = "min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-primary-50"\u003e
    \u003cdiv className = "text-center px-4"\u003e
    \u003ch1 className = "text-6xl font-display font-bold text-gradient mb-4"\u003e
    Kļūda
    \u003c / h1\u003e
    \u003cp className = "text-xl text-gray-600 mb-8"\u003e
    Atvainojiet, radās neparedzēta kļūda.
    \u003c / p\u003e
    \u003cbutton
    onClick = { reset }
    className = "btn-primary"\u003e
          Mēģināt vēlreiz
    \u003c / button\u003e
    \u003c / div\u003e
    \u003c / div\u003e
  )
}
