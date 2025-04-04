import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'

// Context için TypeScript tipi
interface PersonasContextType {
  selectedPersonas: Record<number, any[]> // Oyuncu ID'sine göre seçilen personas
  setSelectedPersonas: Dispatch<SetStateAction<Record<number, any[]>>> // State güncelleme fonksiyonu
  usedSpecialPersonas: number[] // MVP gibi özel kişiliklerin id veya label'ları
}

// React Context oluştur
const PersonasContext = createContext<PersonasContextType | undefined>(undefined)

// Provider tanımla
export const PersonasProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPersonas, setSelectedPersonas] = useState<Record<number, any[]>>({}) // State

  const usedSpecialPersonas: number[] = Object.values(selectedPersonas)
    .flat()
    .filter(p => p.category === 'special')
    .map(p => p.value) // Burada .value number olmalı!

  return <PersonasContext.Provider value={{ selectedPersonas, setSelectedPersonas, usedSpecialPersonas }}>{children}</PersonasContext.Provider>
}

// Custom Hook: Context'e güvenli erişim sağlamak için
export const usePersonas = (): PersonasContextType => {
  const context = useContext(PersonasContext)
  if (!context) {
    throw new Error('usePersonas must be used within a PersonasProvider')
  }
  return context
}
