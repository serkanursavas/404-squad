import React, { useState } from 'react'
import Select, { MultiValue, SingleValue } from 'react-select'
import { personaSelectCustomStyles } from './SelectStyles'
import CustomOption from './CustomOption'

// Define types for props
interface Option {
  value: string | number
  label: string
  description?: string // 🎯 açıklama buradan gelecek
}

interface PersonaSelectProps {
  name: string
  options: Option[] | { label: string; options: Option[] }[]
  isMulti?: boolean
  value: MultiValue<Option> | SingleValue<Option>
  onChange: (selectedOptions: MultiValue<Option> | SingleValue<Option>) => void
  placeholder?: string
  maxLimit?: number // Yeni maxLimit özelliği
}

// PersonaSelect component
const PersonaSelect: React.FC<PersonaSelectProps> = ({
  name,
  options,
  isMulti = true,
  value,
  onChange,
  placeholder = 'Select Persona',
  maxLimit = 3 // Varsayılan maksimum seçim sınırı
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false) // Dropdown'ın açık/kapalı durumunu kontrol ediyoruz

  // Maksimum sınıra ulaşılıp ulaşılmadığını kontrol et
  const isMaxLimitReached = isMulti && Array.isArray(value) && value.length >= maxLimit

  // Çarpı (Clear All) butonunu tamamen kaldırıyoruz
  const customClearIndicator = () => null

  // Dropdown'ın açılmasını kontrol eden fonksiyon
  const handleMenuOpen = () => {
    // Eğer maksimum seçim sınırına ulaşılmışsa, dropdown'ı açma
    if (!isMaxLimitReached) {
      setMenuIsOpen(true)
    }
  }

  const handleMenuClose = () => {
    setMenuIsOpen(false)
  }

  return (
    <div>
      <Select
        name={name}
        options={options}
        isMulti={isMulti}
        value={value}
        onChange={selectedOptions => {
          onChange(selectedOptions) // Seçimleri üst componente ilet
          // Seçimler değiştiğinde menü durumunu kontrol et
          if (Array.isArray(selectedOptions) && selectedOptions.length < maxLimit) {
            setMenuIsOpen(false) // Seçimler temizlendiyse menüyü kapalı yap
          }
        }}
        placeholder={placeholder}
        styles={personaSelectCustomStyles}
        components={{
          Option: CustomOption,
          ClearIndicator: customClearIndicator // Çarpı butonunu tamamen kaldırıyoruz
        }}
        menuIsOpen={menuIsOpen} // Menü durumunu kontrol et
        onMenuOpen={handleMenuOpen} // Menü açılma kontrolü
        onMenuClose={handleMenuClose} // Menü kapanma kontrolü
        isSearchable={false} // Maksimum seçim sınırına ulaşıldığında yazmayı devre dışı bırak
        menuPlacement="auto" // Dinamik olarak yukarı/aşağı açılır
      />
    </div>
  )
}

export default PersonaSelect
