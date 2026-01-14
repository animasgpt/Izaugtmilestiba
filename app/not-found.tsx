import Link from 'next/link'

export default function NotFound() {
    return (
    \u003cdiv className = "min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-primary-50"\u003e
    \u003cdiv className = "text-center px-4"\u003e
    \u003ch1 className = "text-6xl font-display font-bold text-gradient mb-4"\u003e
    404
    \u003c / h1\u003e
    \u003cp className = "text-xl text-gray-600 mb-8"\u003e
          Lapa nav atrasta
    \u003c / p\u003e
    \u003cLink href = "/" className = "btn-primary inline-block"\u003e
          Atgriezties sākumlapā
    \u003c / Link\u003e
    \u003c / div\u003e
    \u003c / div\u003e
  )
}
