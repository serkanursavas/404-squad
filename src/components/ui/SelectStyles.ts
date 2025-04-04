export const personaSelectCustomStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: '#fff',
    paddingTop: '0.2rem',
    paddingBottom: '0.2rem',
    borderColor: state.isFocused ? '#6366f1' : '#e5e7eb',
    boxShadow: state.isFocused ? '2px 2px 0 0 rgba(99, 102, 241, 0.2)' : 'none',
    '&:hover': {
      borderColor: '#6366f1'
    }
  }),
  placeholder: (provided: any) => ({
    ...provided,
    fontSize: '0.675rem'
  }),
  option: (provided: any, state: any) => {
    // Option'un kategoriye göre rengini belirleme
    const categoryColors: Record<string, string> = {
      bireysel: '#bbf7d0', // Daha soft yeşil
      takim_dinamigi: '#fed7aa', // Daha soft turuncu
      kaleci: '#fecaca', // Daha soft kırmızı
      defans: '#c7d2fe', // Daha soft mor
      orta_saha: '#e9d5ff', // Daha soft lavanta
      forvet: '#bae6fd', // Daha soft mavi
      teknik: '#fef08a', // Daha soft sarı
      special: 'linear-gradient(to right, #FFF, #FDE68A, #FBBF24)'
    }

    const bgColor = categoryColors[state.data.category] || 'black'

    return {
      ...provided,
      background: state.isSelected ? '#6366f1' : bgColor,
      color: state.isSelected ? 'white' : 'black'
    }
  },
  multiValue: (provided: any, state: any) => {
    const categoryColors: Record<string, string> = {
      bireysel: '#bbf7d0',
      takim_dinamigi: '#fed7aa',
      kaleci: '#fecaca',
      defans: '#c7d2fe',
      orta_saha: '#e9d5ff',
      forvet: '#bae6fd',
      teknik: '#fef08a',
      special: 'linear-gradient(to right, #FFF, #FDE68A, #FBBF24)'
    }
    const bgColor = categoryColors[state.data.category] || '#e0e7ff'
    const isSpecial = state.data.category === 'special'

    return {
      ...provided,
      background: bgColor,
      border: isSpecial ? '1px solid #FBBF24' : 'none',
      borderRadius: '0'
    }
  },
  multiValueLabel: (provided: any, state: any) => {
    const isSpecial = state.data.category === 'special'

    return {
      ...provided,
      color: isSpecial ? '#4b5563' : '#000',
      fontWeight: isSpecial ? 600 : 'normal',
      letterSpacing: isSpecial ? '0.3em' : 'normal'
    }
  },
  multiValueRemove: (provided: any, state: any) => {
    const isSpecial = state.data.category === 'special'

    return {
      ...provided,
      color: isSpecial ? 'white' : 'red',
      '&:hover': {
        backgroundColor: isSpecial ? 'linear-gradient(to right, #FFF, #FDE68A, #FBBF24)' : '#6366f1',
        color: 'white'
      }
    }
  },

  menu: (provided: any) => ({
    ...provided,
    zIndex: 30 // Menü görünürlük sorunlarını çözmek için
  })
}
