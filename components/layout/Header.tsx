'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/lib/cart/cartContext'

const navigation = [
    {
        name: 'Pakalpojumi',
        href: '/pakalpojumi',
        dropdown: [
            { name: 'Konsultācijas', href: '/pakalpojumi/konsultacijas' },
            { name: 'Grāmata', href: '/pakalpojumi/gramata' },
            { name: 'Izaicinājumu programma', href: '/pakalpojumi/izaicinajums' },
        ],
    },
    {
        name: 'Lasi',
        href: '/lasi',
        dropdown: [
            { name: 'Visi raksti', href: '/lasi' },
            { name: 'Gaidības', href: '/lasi?kategorija=gaidibas' },
            { name: 'Dzīves gads', href: '/lasi?kategorija=dzives-gads' },
            { name: '2.-3. gadi', href: '/lasi?kategorija=2-3-gadi' },
            { name: 'Bērnudārzs', href: '/lasi?kategorija=bernudarzs' },
            { name: 'Sarunas', href: '/lasi?kategorija=sarunas' },
        ],
    },
    {
        name: 'Klausies',
        href: '/klausies',
    },
    {
        name: 'Runā',
        href: '/runa',
    },
    {
        name: 'Papildus',
        href: '#',
        dropdown: [
            { name: 'Iepazīsimies', href: '/iepazisimies' },
            { name: 'Atsauksmes', href: '/atsauksmes' },
            { name: 'Kontakti', href: '/kontakti' },
        ],
    },
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const pathname = usePathname()
    const { itemCount } = useCart()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-lg'
                : 'bg-white'
                }`}
        >
            <nav className="container-custom">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group">
                        <img
                            src="/images/IM-sirds pirms.png"
                            alt="Izaugt mīlestībā"
                            className="h-12 w-auto transform group-hover:scale-105 transition-transform"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navigation.map((item) => (
                            <div
                                key={item.name}
                                className="relative"
                                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    href={item.href}
                                    className={`px-4 py-2 rounded-lg text-base font-semibold transition-all ${pathname === item.href
                                        ? 'text-secondary-700 bg-secondary-50'
                                        : 'text-secondary-600 hover:text-secondary-700 hover:bg-gray-50'
                                        }`}
                                    style={{ fontFamily: 'Oswald, sans-serif' }}
                                >
                                    {item.name}
                                </Link>

                                {/* Dropdown */}
                                {item.dropdown && activeDropdown === item.name && (
                                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-slide-down">
                                        {item.dropdown.map((subItem) => (
                                            <Link
                                                key={subItem.name}
                                                href={subItem.href}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                                            >
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right side icons */}
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/veikals/grozs"
                            className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
                        >
                            <ShoppingCartIcon className="h-6 w-6" />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </Link>

                        <Link
                            href="/labot"
                            className="hidden md:block p-2 text-gray-700 hover:text-primary-600 transition-colors"
                        >
                            <UserIcon className="h-6 w-6" />
                        </Link>

                        {/* Mobile menu button */}
                        <button
                            type="button"
                            className="lg:hidden p-2 text-gray-700"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden py-4 animate-slide-down">
                        {navigation.map((item) => (
                            <div key={item.name} className="py-2">
                                <Link
                                    href={item.href}
                                    className="block px-4 py-2 text-lg font-semibold text-secondary-600 hover:text-secondary-700 hover:bg-gray-50 rounded-lg"
                                    style={{ fontFamily: 'Oswald, sans-serif' }}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                                {item.dropdown && (
                                    <div className="ml-4 mt-2 space-y-1">
                                        {item.dropdown.map((subItem) => (
                                            <Link
                                                key={subItem.name}
                                                href={subItem.href}
                                                className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    )
}
