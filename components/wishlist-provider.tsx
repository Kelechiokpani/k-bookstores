"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"

export type WishlistItem = {
  id: string
  name: string
  price: number
  image: string
}

type WishlistContextType = {
  wishlist: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string) => void
  toggleWishlist: (item: WishlistItem) => void
  isInWishlist: (id: string) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const { toast } = useToast()

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("wishlist")
    if (saved) {
      try {
        setWishlist(JSON.parse(saved))
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
    window.dispatchEvent(new Event("wishlist-updated")) // notify other components
  }, [wishlist])

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev // already in wishlist
      toast({
        title: "Added to wishlist",
        description: `${item.name} added to your wishlist`,
      })
      return [...prev, item]
    })
  }

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => {
      const itemToRemove = prev.find((i) => i.id === id)
      if (itemToRemove) {
        toast({
          title: "Removed from wishlist",
          description: `${itemToRemove.name} removed from your wishlist`,
        })
      }
      return prev.filter((i) => i.id !== id)
    })
  }

  const toggleWishlist = (item: WishlistItem) => {
    if (wishlist.find((i) => i.id === item.id)) {
      removeFromWishlist(item.id)
    } else {
      addToWishlist(item)
    }
  }

  const isInWishlist = (id: string) => {
    return wishlist.some((i) => i.id === id)
  }

  const clearWishlist = () => {
    setWishlist([])
    toast({
      title: "Wishlist cleared",
      description: "All items removed from your wishlist",
    })
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider")
  return context
}
