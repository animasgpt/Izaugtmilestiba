import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { CartProvider } from '@/lib/cart/cartContext'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Izaugt mīlestībā - atbalsts vecākiem',
    description: 'Resursu centrs vecākiem, e-veikals un digitālā atbalsta platforma. Konsultācijas, raksti, podkāsti un ai chatbot atbalsts.',
    keywords: 'vecāki, bērni, audzināšana, konsultācijas, pep mamma, Latvija',
    authors: [{ name: 'Izaugt mīlestībā' }],
    openGraph: {
        title: 'Izaugt mīlestībā',
        description: 'Atbalsts vecākiem - konsultācijas, raksti, podkāsti',
        type: 'website',
        locale: 'lv_LV',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="lv" className={`${inter.variable} ${playfair.variable}`}>
            <body className="flex flex-col min-h-screen">
                <CartProvider>
                    <Header />
                    <main className="flex-grow">
                        {children}
                    </main>
                    <Footer />
                </CartProvider>
            </body>
        </html>
    )
}
