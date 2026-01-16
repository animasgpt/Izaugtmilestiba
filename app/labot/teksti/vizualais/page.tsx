'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { ArrowLeftIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import HeroSection from '@/components/home/HeroSection'
import ServicesPreview from '@/components/home/ServicesPreview'
import ArticlesPreview from '@/components/home/ArticlesPreview'
import PodcastPreview from '@/components/home/PodcastPreview'
import ChatbotCTA from '@/components/home/ChatbotCTA'

interface SiteText {
    id: string
    key: string
    value: string
    description?: string
    section: string
}

interface EditableTextProps {
    textKey: string
    currentValue: string
    onSave: (key: string, value: string) => Promise<void>
    className?: string
    as?: keyof JSX.IntrinsicElements
}

function EditableText({ textKey, currentValue, onSave, className = '', as: Component = 'span' }: EditableTextProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(currentValue)
    const [saving, setSaving] = useState(false)

    const handleSave = async () => {
        setSaving(true)
        try {
            await onSave(textKey, value)
            setIsEditing(false)
        } catch (error) {
            console.error('Error saving:', error)
            alert('Kļūda saglabājot tekstu')
        } finally {
            setSaving(false)
        }
    }

    const handleCancel = () => {
        setValue(currentValue)
        setIsEditing(false)
    }

    if (isEditing) {
        return (
            <div className="relative inline-block w-full">
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full p-2 border-2 border-primary-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows={3}
                    autoFocus
                />
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-3 py-1 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center gap-1 text-sm"
                    >
                        <CheckIcon className="h-4 w-4" />
                        {saving ? 'Saglabā...' : 'Saglabāt'}
                    </button>
                    <button
                        onClick={handleCancel}
                        className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors flex items-center gap-1 text-sm"
                    >
                        <XMarkIcon className="h-4 w-4" />
                        Atcelt
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="relative inline-block group">
            <Component className={className}>{currentValue}</Component>
            <button
                onClick={() => setIsEditing(true)}
                className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-primary-500 text-white rounded-lg hover:bg-primary-600 shadow-lg"
                title="Labot tekstu"
            >
                <PencilIcon className="h-4 w-4" />
            </button>
        </div>
    )
}

export default function VisualEditorPage() {
    const [texts, setTexts] = useState<Record<string, SiteText>>({})
    const [loading, setLoading] = useState(true)
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        fetchTexts()
    }, [])

    const fetchTexts = async () => {
        try {
            const response = await fetch('/api/site-texts')
            if (response.ok) {
                const data: SiteText[] = await response.json()
                const textsMap: Record<string, SiteText> = {}
                data.forEach(text => {
                    textsMap[text.key] = text
                })
                setTexts(textsMap)
            }
        } catch (error) {
            console.error('Error fetching texts:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSaveText = async (key: string, value: string) => {
        const text = texts[key]
        if (!text) {
            // Create new text
            const response = await fetch('/api/site-texts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    key,
                    value,
                    section: 'home',
                    description: 'Izveidots caur vizuālo redaktoru'
                })
            })
            if (response.ok) {
                await fetchTexts()
            }
        } else {
            // Update existing text
            const response = await fetch(`/api/site-texts/${text.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ value })
            })
            if (response.ok) {
                await fetchTexts()
            }
        }
    }

    const getText = (key: string, fallback: string) => {
        return texts[key]?.value || fallback
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Ielādē...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Admin Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container-custom py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/labot/teksti">
                                <Button variant="secondary" size="sm">
                                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                                    Atpakaļ uz sarakstu
                                </Button>
                            </Link>
                            <h1 className="text-xl font-display font-bold">Vizuālais Tekstu Redaktors</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-sm text-gray-600">
                                {editMode ? (
                                    <span className="text-primary-600 font-semibold">✏️ Labošanas režīms aktīvs</span>
                                ) : (
                                    <span>Novietojiet peli virs teksta, lai redzētu labošanas ikonu</span>
                                )}
                            </div>
                            <Button
                                onClick={() => setEditMode(!editMode)}
                                variant={editMode ? 'primary' : 'secondary'}
                            >
                                {editMode ? 'Izslēgt labošanu' : 'Ieslēgt labošanu'}
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Preview with editable texts */}
            <div className={editMode ? 'editable-mode' : ''}>
                <style jsx global>{`
                    .editable-mode .group:hover {
                        outline: 2px dashed #8B5CF6;
                        outline-offset: 4px;
                        background-color: rgba(139, 92, 246, 0.05);
                    }
                `}</style>

                {/* Hero Section - Editable */}
                <section className="relative overflow-hidden bg-gradient-to-r from-cream-500 to-light py-4 md:py-6">
                    <div className="container-custom">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold">
                                    <span>⭐</span>
                                    {editMode ? (
                                        <EditableText
                                            textKey="home.hero.badge"
                                            currentValue={getText('home.hero.badge', 'Tavs atbalsts vecāku ceļā')}
                                            onSave={handleSaveText}
                                        />
                                    ) : (
                                        <span>{getText('home.hero.badge', 'Tavs atbalsts vecāku ceļā')}</span>
                                    )}
                                </div>

                                {editMode ? (
                                    <EditableText
                                        textKey="home.hero.title"
                                        currentValue={getText('home.hero.title', 'Atbalsts vecākiem ceļā uz mīlošu un saprotošu ģimeni.')}
                                        onSave={handleSaveText}
                                        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-primary-500"
                                        as="h1"
                                    />
                                ) : (
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-primary-500">
                                        {getText('home.hero.title', 'Atbalsts vecākiem ceļā uz mīlošu un saprotošu ģimeni.')}
                                    </h1>
                                )}

                                {editMode ? (
                                    <EditableText
                                        textKey="home.hero.subtitle"
                                        currentValue={getText('home.hero.subtitle', 'Konsultācijas, raksti, podkāsti un AI asistents - viss vienuviet, lai palīdzētu Jums augt kopā ar bērnu.')}
                                        onSave={handleSaveText}
                                        className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-xl"
                                        as="p"
                                    />
                                ) : (
                                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-xl">
                                        {getText('home.hero.subtitle', 'Konsultācijas, raksti, podkāsti un AI asistents - viss vienuviet, lai palīdzētu Jums augt kopā ar bērnu.')}
                                    </p>
                                )}

                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Button href="/runa" variant="primary" size="lg">
                                        {editMode ? (
                                            <EditableText
                                                textKey="home.hero.cta1"
                                                currentValue={getText('home.hero.cta1', 'Izmēģini AI PEP Mammu')}
                                                onSave={handleSaveText}
                                            />
                                        ) : (
                                            getText('home.hero.cta1', 'Izmēģini AI PEP Mammu')
                                        )}
                                    </Button>
                                    <Button href="/pakalpojumi" variant="secondary" size="lg">
                                        {editMode ? (
                                            <EditableText
                                                textKey="home.hero.cta2"
                                                currentValue={getText('home.hero.cta2', 'Apskatīt pakalpojumus')}
                                                onSave={handleSaveText}
                                            />
                                        ) : (
                                            getText('home.hero.cta2', 'Apskatīt pakalpojumus')
                                        )}
                                    </Button>
                                </div>

                                <div className="flex items-center gap-8 pt-6">
                                    <div>
                                        {editMode ? (
                                            <EditableText
                                                textKey="home.hero.stat1.number"
                                                currentValue={getText('home.hero.stat1.number', '500+')}
                                                onSave={handleSaveText}
                                                className="text-2xl md:text-3xl font-bold text-primary-500"
                                                as="div"
                                            />
                                        ) : (
                                            <div className="text-2xl md:text-3xl font-bold text-primary-500">
                                                {getText('home.hero.stat1.number', '500+')}
                                            </div>
                                        )}
                                        {editMode ? (
                                            <EditableText
                                                textKey="home.hero.stat1.label"
                                                currentValue={getText('home.hero.stat1.label', 'Apmierināti vecāki')}
                                                onSave={handleSaveText}
                                                className="text-sm text-gray-600"
                                                as="div"
                                            />
                                        ) : (
                                            <div className="text-sm text-gray-600">
                                                {getText('home.hero.stat1.label', 'Apmierināti vecāki')}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        {editMode ? (
                                            <EditableText
                                                textKey="home.hero.stat2.number"
                                                currentValue={getText('home.hero.stat2.number', '100+')}
                                                onSave={handleSaveText}
                                                className="text-2xl md:text-3xl font-bold text-primary-500"
                                                as="div"
                                            />
                                        ) : (
                                            <div className="text-2xl md:text-3xl font-bold text-primary-500">
                                                {getText('home.hero.stat2.number', '100+')}
                                            </div>
                                        )}
                                        {editMode ? (
                                            <EditableText
                                                textKey="home.hero.stat2.label"
                                                currentValue={getText('home.hero.stat2.label', 'Raksti un resursi')}
                                                onSave={handleSaveText}
                                                className="text-sm text-gray-600"
                                                as="div"
                                            />
                                        ) : (
                                            <div className="text-sm text-gray-600">
                                                {getText('home.hero.stat2.label', 'Raksti un resursi')}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        {editMode ? (
                                            <EditableText
                                                textKey="home.hero.stat3.number"
                                                currentValue={getText('home.hero.stat3.number', '24/7')}
                                                onSave={handleSaveText}
                                                className="text-2xl md:text-3xl font-bold text-primary-500"
                                                as="div"
                                            />
                                        ) : (
                                            <div className="text-2xl md:text-3xl font-bold text-primary-500">
                                                {getText('home.hero.stat3.number', '24/7')}
                                            </div>
                                        )}
                                        {editMode ? (
                                            <EditableText
                                                textKey="home.hero.stat3.label"
                                                currentValue={getText('home.hero.stat3.label', 'AI atbalsts')}
                                                onSave={handleSaveText}
                                                className="text-sm text-gray-600"
                                                as="div"
                                            />
                                        ) : (
                                            <div className="text-sm text-gray-600">
                                                {getText('home.hero.stat3.label', 'AI atbalsts')}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Image placeholder */}
                            <div className="relative">
                                <div className="bg-gray-200 rounded-3xl h-96 flex items-center justify-center">
                                    <p className="text-gray-500">Hero attēls</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Other sections preview */}
                <div className="mb-16 md:mb-24 opacity-50 pointer-events-none">
                    <ServicesPreview />
                </div>
                <div className="mb-16 md:mb-24 opacity-50 pointer-events-none">
                    <ArticlesPreview />
                </div>
                <div className="mb-16 md:mb-24 opacity-50 pointer-events-none">
                    <PodcastPreview />
                </div>
                <div className="opacity-50 pointer-events-none">
                    <ChatbotCTA />
                </div>
            </div>

            {/* Info banner */}
            <div className="fixed bottom-4 right-4 bg-white shadow-xl rounded-lg p-4 max-w-sm border-2 border-primary-500">
                <h3 className="font-bold text-primary-700 mb-2">💡 Kā lietot:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                    <li>1. Ieslēdz labošanas režīmu</li>
                    <li>2. Novietojiet peli virs teksta</li>
                    <li>3. Spiediet uz zīmuļa ikonas ✏️</li>
                    <li>4. Labojiet tekstu un saglabājiet</li>
                </ul>
            </div>
        </div>
    )
}
