'use client'

import { useEffect, useState } from 'react'

interface SiteTextProps {
    textKey: string
    fallback?: string
    className?: string
    as?: keyof JSX.IntrinsicElements
}

/**
 * Component to display editable site text
 * Usage: <SiteText textKey="home.hero.title" fallback="Default Title" as="h1" />
 */
export default function SiteText({
    textKey,
    fallback = '',
    className = '',
    as: Component = 'span'
}: SiteTextProps) {
    const [text, setText] = useState(fallback)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchText = async () => {
            try {
                const response = await fetch(`/api/site-texts?key=${textKey}`)
                if (response.ok) {
                    const data = await response.json()
                    if (data.length > 0) {
                        setText(data[0].value)
                    }
                }
            } catch (error) {
                console.error(`Error fetching text for key: ${textKey}`, error)
            } finally {
                setLoading(false)
            }
        }

        fetchText()
    }, [textKey])

    if (loading && !fallback) {
        return <Component className={className}>...</Component>
    }

    return <Component className={className}>{text}</Component>
}
