'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface Atsauksme {
    id: string
    url: string
    caption?: string
    filename: string
}

// Placeholder cards shown when no images are uploaded yet
const placeholders = [
    { id: 'p1', label: 'Instagram ekrānšāviņš', icon: '📸' },
    { id: 'p2', label: 'WhatsApp ziņojums', icon: '💬' },
    { id: 'p3', label: 'Instagram stāsts', icon: '🌸' },
]

export default function TestimonialsGallery() {
    const [items, setItems] = useState<Atsauksme[]>([])
    const [loading, setLoading] = useState(true)
    const [current, setCurrent] = useState(0)
    const [lightbox, setLightbox] = useState<Atsauksme | null>(null)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const touchStartX = useRef<number | null>(null)

    useEffect(() => {
        fetch('/api/atsauksmes')
            .then(r => r.json())
            .then(d => setItems(d.atsauksmes || []))
            .catch(() => setItems([]))
            .finally(() => setLoading(false))
    }, [])

    const count = items.length
    const next = useCallback(() => setCurrent(p => (p + 1) % Math.max(count, 1)), [count])
    const prev = useCallback(() => setCurrent(p => (p - 1 + Math.max(count, 1)) % Math.max(count, 1)), [count])

    useEffect(() => {
        if (!isAutoPlaying || count < 2) return
        const t = setInterval(next, 4000)
        return () => clearInterval(t)
    }, [isAutoPlaying, next, count])

    // Touch swipe
    const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return
        const diff = touchStartX.current - e.changedTouches[0].clientX
        if (Math.abs(diff) > 40) diff > 0 ? next() : prev()
        touchStartX.current = null
    }

    // Keyboard
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (lightbox) { if (e.key === 'Escape') setLightbox(null); return }
            if (e.key === 'ArrowRight') next()
            if (e.key === 'ArrowLeft') prev()
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [next, prev, lightbox])

    // Visible indices: prev, current, next
    const getVisible = () => {
        if (count === 0) return []
        if (count === 1) return [{ idx: 0, pos: 'center' }]
        if (count === 2) return [
            { idx: current, pos: 'center' },
            { idx: (current + 1) % count, pos: 'right' },
        ]
        return [
            { idx: (current - 1 + count) % count, pos: 'left' },
            { idx: current, pos: 'center' },
            { idx: (current + 1) % count, pos: 'right' },
        ]
    }

    const visible = getVisible()

    return (
        <section
            className="section-padding bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-14">
                    <span className="inline-block text-4xl mb-3">💬</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                        <span className="text-gradient">Atsauksmes no mammām</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Īstas atsauksmes no mūsu kopienas mammām
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-10 h-10 border-4 border-primary-300 border-t-primary-600 rounded-full animate-spin" />
                    </div>
                ) : count === 0 ? (
                    /* Empty state – placeholder cards */
                    <div className="flex flex-col items-center gap-6">
                        <div className="flex gap-4 justify-center flex-wrap">
                            {placeholders.map(p => (
                                <div key={p.id} className="w-56 h-80 bg-white rounded-2xl shadow-md border-2 border-dashed border-primary-200 flex flex-col items-center justify-center gap-3 text-gray-400">
                                    <span className="text-5xl">{p.icon}</span>
                                    <span className="text-sm text-center px-4">{p.label}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-gray-500 text-sm">
                            Augšupielādē ekrānšāviņus admin panelī:{' '}
                            <a href="/labot/atsauksmes" className="text-primary-600 underline">Labot → Atsauksmes</a>
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Carousel */}
                        <div
                            className="relative flex items-center justify-center gap-4 min-h-[420px]"
                            onTouchStart={onTouchStart}
                            onTouchEnd={onTouchEnd}
                        >
                            <AnimatePresence mode="popLayout">
                                {visible.map(({ idx, pos }) => {
                                    const item = items[idx]
                                    const isCenter = pos === 'center'
                                    return (
                                        <motion.div
                                            key={`${idx}-${pos}`}
                                            layout
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{
                                                opacity: isCenter ? 1 : 0.4,
                                                scale: isCenter ? 1 : 0.82,
                                                y: isCenter ? 0 : 24,
                                            }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                                            className={`relative rounded-2xl overflow-hidden shadow-lg flex-shrink-0 cursor-pointer
                                                ${isCenter
                                                    ? 'w-64 sm:w-72 md:w-80 ring-4 ring-primary-300 shadow-2xl z-10'
                                                    : 'hidden md:block w-52 z-0'
                                                }`}
                                            style={{ aspectRatio: '9/16' }}
                                            onClick={() => isCenter ? setLightbox(item) : setCurrent(idx)}
                                        >
                                            <Image
                                                src={item.url}
                                                alt={item.caption || 'Atsauksme'}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 80vw, 320px"
                                            />
                                            {/* Gradient overlay on center */}
                                            {isCenter && item.caption && (
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                                    <p className="text-white text-sm">{item.caption}</p>
                                                </div>
                                            )}
                                            {/* Expand hint */}
                                            {isCenter && (
                                                <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-gray-700">
                                                    🔍 Palielināt
                                                </div>
                                            )}
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-center gap-4 mt-10">
                            <button
                                onClick={prev}
                                className="w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-primary-600 hover:border-primary-300 transition-all"
                                aria-label="Iepriekšējā"
                            >
                                <ChevronLeftIcon className="h-5 w-5" />
                            </button>

                            <div className="flex gap-2">
                                {items.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrent(i)}
                                        className={`rounded-full transition-all duration-300 ${i === current
                                            ? 'w-8 h-3 bg-primary-500'
                                            : 'w-3 h-3 bg-gray-300 hover:bg-primary-300'
                                            }`}
                                        aria-label={`Atsauksme ${i + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={next}
                                className="w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-primary-600 hover:border-primary-300 transition-all"
                                aria-label="Nākamā"
                            >
                                <ChevronRightIcon className="h-5 w-5" />
                            </button>
                        </div>

                        <p className="text-center text-sm text-gray-400 mt-3">
                            {current + 1} / {count} &nbsp;·&nbsp; Velc pa kreisi vai labi
                        </p>
                    </>
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                        onClick={() => setLightbox(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.85 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.85 }}
                            className="relative max-h-[90vh] max-w-sm w-full rounded-2xl overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <Image
                                src={lightbox.url}
                                alt={lightbox.caption || 'Atsauksme'}
                                width={400}
                                height={711}
                                className="w-full h-auto object-contain"
                            />
                            {lightbox.caption && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3">
                                    <p className="text-white text-sm">{lightbox.caption}</p>
                                </div>
                            )}
                        </motion.div>
                        <button
                            onClick={() => setLightbox(null)}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-all"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
