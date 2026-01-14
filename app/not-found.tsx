import Link from 'next/link'

export default function NotFound() {
      return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-primary-50">
                  <div className="text-center px-4">
                        <h1 className="text-6xl font-display font-bold text-gradient mb-4">
                              404
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                              Lapa nav atrasta
                        </p>
                        <Link href="/" className="btn-primary inline-block">
                              Atgriezties sākumlapā
                        </Link>
                  </div>
            </div>
      )
}
