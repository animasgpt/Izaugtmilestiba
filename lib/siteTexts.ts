// Utility functions for managing site texts

export interface SiteText {
    id: string
    key: string
    value: string
    description?: string
    section: string
    createdAt: Date
    updatedAt: Date
}

// Cache for site texts
let textsCache: Record<string, string> = {}
let cacheTimestamp: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

/**
 * Get a site text by key
 * @param key - The unique key for the text (e.g., "home.hero.title")
 * @param fallback - Fallback text if key is not found
 * @returns The text value or fallback
 */
export async function getSiteText(key: string, fallback: string = ''): Promise<string> {
    // Check cache
    const now = Date.now()
    if (textsCache[key] && (now - cacheTimestamp) < CACHE_DURATION) {
        return textsCache[key]
    }

    try {
        const response = await fetch(`/api/site-texts?key=${key}`, {
            cache: 'no-store'
        })

        if (response.ok) {
            const texts: SiteText[] = await response.json()
            if (texts.length > 0) {
                textsCache[key] = texts[0].value
                cacheTimestamp = now
                return texts[0].value
            }
        }
    } catch (error) {
        console.error(`Error fetching site text for key: ${key}`, error)
    }

    return fallback
}

/**
 * Get all site texts for a section
 * @param section - The section name (e.g., "home", "about")
 * @returns Object with key-value pairs
 */
export async function getSectionTexts(section: string): Promise<Record<string, string>> {
    try {
        const response = await fetch(`/api/site-texts?section=${section}`, {
            cache: 'no-store'
        })

        if (response.ok) {
            const texts: SiteText[] = await response.json()
            const result: Record<string, string> = {}

            texts.forEach(text => {
                result[text.key] = text.value
            })

            return result
        }
    } catch (error) {
        console.error(`Error fetching section texts for: ${section}`, error)
    }

    return {}
}

/**
 * Clear the texts cache (useful after updates)
 */
export function clearTextsCache() {
    textsCache = {}
    cacheTimestamp = 0
}

/**
 * Hook for using site texts in React components
 */
export function useSiteText(key: string, fallback: string = '') {
    const [text, setText] = React.useState(fallback)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        getSiteText(key, fallback).then(value => {
            setText(value)
            setLoading(false)
        })
    }, [key, fallback])

    return { text, loading }
}

// For React import
import React from 'react'
