import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Product } from '../types'

interface WishlistContextType {
  wishlistItems: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (id: number) => void
  isWishlisted: (id: number) => boolean
  totalWishlist: number
}

const WishlistContext = createContext<WishlistContextType | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])

  const addToWishlist = (product: Product) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) return prev
      return [...prev, product]
    })
  }

  const removeFromWishlist = (id: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id))
  }

  const isWishlisted = (id: number) => {
    return wishlistItems.some(item => item.id === id)
  }

  const totalWishlist = wishlistItems.length

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isWishlisted,
      totalWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used within WishlistProvider')
  return context
}