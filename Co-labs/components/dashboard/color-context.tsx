"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface ColorContextType {
  isColorful: boolean
  toggleColorful: () => void
}

const ColorContext = createContext<ColorContextType | undefined>(undefined)

export function ColorProvider({ children }: { children: ReactNode }) {
  const [isColorful, setIsColorful] = useState(false)

  const toggleColorful = () => setIsColorful((prev) => !prev)

  return (
    <ColorContext.Provider value={{ isColorful, toggleColorful }}>
      {children}
    </ColorContext.Provider>
  )
}

export function useColor() {
  const context = useContext(ColorContext)
  if (!context) {
    throw new Error("useColor must be used within a ColorProvider")
  }
  return context
}
