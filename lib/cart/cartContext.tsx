'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    image?: string
}

interface CartContextType {
    items: CartItem[]
    itemCount: number
    totalPrice: number
    addItem: (item: Omit<CartItem, 'quantity'>) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isClient, setIsClient] = useState(false)

    // Set isClient flag
    useEffect(() => {
        setIsClient(true)
    }, [])

    // Load cart from localStorage
    useEffect(() => {
        if (isClient && typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cart')
            if (savedCart) {
                try {
                    setItems(JSON.parse(savedCart))
                } catch (error) {
                    console.error('Failed to parse cart from localStorage:', error)
                }
            }
        }
    }, [isClient])

    // Save cart to localStorage
    useEffect(() => {
        if (isClient && typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(items))
        }
    }, [items, isClient])

    const addItem = (item: Omit<CartItem, 'quantity'>) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.id === item.id)
            if (existingItem) {
                return prevItems.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                )
            }
            return [...prevItems, { ...item, quantity: 1 }]
        })
    }

    const removeItem = (id: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id)
            return
        }
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        )
    }

    const clearCart = () => {
        setItems([])
    }

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                items,
                itemCount,
                totalPrice,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        // Return default values instead of throwing during SSR/build
        return {
            items: [],
            itemCount: 0,
            totalPrice: 0,
            addItem: () => { },
            removeItem: () => { },
            updateQuantity: () => { },
            clearCart: () => { },
        }
    }
    return context
}
