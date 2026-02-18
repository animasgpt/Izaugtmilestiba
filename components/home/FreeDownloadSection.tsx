'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDownTrayIcon, CheckCircleIcon, SparklesIcon, BookOpenIcon, HeartIcon } from '@heroicons/react/24/outline'

const BENEFITS = [
    'Kā saglabāt mieru, kad bērns raud',
    'Praktiskas tehnikas emociju regulācijai',
    'Kā runāt ar bērnu, lai viņš jūtas dzirdēts',
]

// The free PDF file should be placed at: public/downloads/gramatas-fragments.pdf
const FREE_PDF_URL = '/downloads/gramatas-fragments.pdf'

export default function FreeDownloadSection() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setErrorMsg('')

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, source: 'free-download' }),
            })
            const data = await res.json()

            if (data.success) {
                setStatus('success')
                // Trigger download
                const link = document.createElement('a')
                link.href = FREE_PDF_URL
                link.download = 'Izaugt-Milestiba-Fragments.pdf'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            } else {
                setErrorMsg(data.error || 'Kļūda. Mēģini vēlreiz.')
                setStatus('error')
            }
        } catch {
            setErrorMsg('Savienojuma kļūda. Mēģini vēlreiz.')
            setStatus('error')
        }
    }

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 py-20 md:py-28">
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-300/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left — book mockup + benefits */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-white"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                            <SparklesIcon className="h-4 w-4 text-yellow-300" />
                            <span className="text-sm font-semibold text-white">100% Bezmaksas</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 leading-tight">
                            Grūts brīdis ar bērnu?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 leading-relaxed">
                            Lejuplādē bezmaksas fragmentu no manas grāmatas —
                            praktisks atbalsts tieši tagad, kad tas visvairāk vajadzīgs.
                        </p>

                        {/* Book visual */}
                        <div className="relative inline-block mb-8">
                            <div className="w-40 h-52 bg-white rounded-xl shadow-2xl flex flex-col items-center justify-center p-4 relative">
                                {/* Book spine effect */}
                                <div className="absolute left-0 top-0 bottom-0 w-3 bg-primary-200 rounded-l-xl" />
                                <BookOpenIcon className="h-10 w-10 text-primary-400 mb-2" />
                                <p className="text-primary-700 font-display font-bold text-center text-sm leading-tight">
                                    Izaugt<br />Mīlestībā
                                </p>
                                <p className="text-primary-400 text-xs mt-1 text-center">Fragments</p>
                                <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                                    FREE
                                </div>
                            </div>
                            {/* Floating hearts */}
                            <motion.div
                                animate={{ y: [-4, 4, -4] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -right-6 top-4"
                            >
                                <HeartIcon className="h-8 w-8 text-pink-300 fill-pink-300" />
                            </motion.div>
                        </div>

                        {/* Benefits */}
                        <ul className="space-y-3">
                            {BENEFITS.map((b, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 + 0.3 }}
                                    viewport={{ once: true }}
                                    className="flex items-start gap-3"
                                >
                                    <CheckCircleIcon className="h-5 w-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                                    <span className="text-white/90">{b}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Right — form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
                            <AnimatePresence mode="wait">
                                {status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-6"
                                    >
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircleIcon className="h-10 w-10 text-green-500" />
                                        </div>
                                        <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
                                            Paldies! 🎉
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Lejupielāde sākusies automātiski. Ja nē —
                                        </p>
                                        <a
                                            href={FREE_PDF_URL}
                                            download="Izaugt-Milestiba-Fragments.pdf"
                                            className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                                        >
                                            <ArrowDownTrayIcon className="h-5 w-5" />
                                            Lejuplādēt vēlreiz
                                        </a>
                                        <p className="text-xs text-gray-400 mt-4">
                                            Mēs nenosūtīsim surogātpastu. Tikai noderīgs saturs.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <div className="mb-6">
                                            <h3 className="text-2xl font-display font-bold text-gray-900 mb-1">
                                                Saņem bezmaksas fragmentu
                                            </h3>
                                            <p className="text-gray-500 text-sm">
                                                Ievadi savu e-pastu un fragments būs tavs uzreiz
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Vārds <span className="text-gray-400 font-normal">(neobligāts)</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={e => setName(e.target.value)}
                                                    placeholder="Tavs vārds"
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 text-gray-900 placeholder-gray-400"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    E-pasta adrese <span className="text-red-400">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                    placeholder="tava@epasts.lv"
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 text-gray-900 placeholder-gray-400"
                                                />
                                            </div>

                                            {status === 'error' && (
                                                <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg">
                                                    {errorMsg}
                                                </p>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={status === 'loading'}
                                                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed text-lg"
                                            >
                                                {status === 'loading' ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                                        Gatavo...
                                                    </>
                                                ) : (
                                                    <>
                                                        <ArrowDownTrayIcon className="h-5 w-5" />
                                                        Lejuplādēt BEZMAKSAS
                                                    </>
                                                )}
                                            </button>

                                            <p className="text-xs text-gray-400 text-center">
                                                🔒 Tavs e-pasts ir drošībā. Nekāda surogātpasta.
                                            </p>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
