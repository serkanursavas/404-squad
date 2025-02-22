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
      teknik: '#fef08a' // Daha soft sarı
    }

    const bgColor = categoryColors[state.data.category] || 'black'

    return {
      ...provided,
      backgroundColor: state.isSelected ? '#6366f1' : bgColor,
      color: state.isSelected ? 'white' : 'black',
      '&:hover': {
        backgroundColor: '#6366f1',
        color: 'white'
      }
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
      teknik: '#fef08a'
    }
    const bgColor = categoryColors[state.data.category] || '#e0e7ff'

    return {
      ...provided,
      backgroundColor: bgColor
    }
  },
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: '#000'
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: 'red',
    '&:hover': {
      backgroundColor: '#6366f1',
      color: 'white'
    }
  }),
  menu: (provided: any) => ({
    ...provided,
    zIndex: 9999 // Menü görünürlük sorunlarını çözmek için
  })
}
