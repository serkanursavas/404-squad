import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'

// Context için TypeScript tipi
interface PersonasContextType {
  selectedPersonas: Record<number, any[]> // Oyuncu ID'sine göre seçilen personas
  setSelectedPersonas: Dispatch<SetStateAction<Record<number, any[]>>> // State güncelleme fonksiyonu
}

// React Context oluştur
const PersonasContext = createContext<PersonasContextType | undefined>(undefined)

// Provider tanımla
export const PersonasProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPersonas, setSelectedPersonas] = useState<Record<number, any[]>>({}) // State

  return <PersonasContext.Provider value={{ selectedPersonas, setSelectedPersonas }}>{children}</PersonasContext.Provider>
}

// Custom Hook: Context'e güvenli erişim sağlamak için
export const usePersonas = (): PersonasContextType => {
  const context = useContext(PersonasContext)
  if (!context) {
    throw new Error('usePersonas must be used within a PersonasProvider')
  }
  return context
}
