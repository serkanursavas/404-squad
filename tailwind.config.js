/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px'
      },
      colors: {
        primary: {
          DEFAULT: '#04764E' // Ana renk
        },
        secondary: '#F2C94C', // İkincil renk (örn: vurgu, butonlar)
        accent: '#F25C05', // Canlı vurgu renkleri (örn: CTA butonları)
        neutral: {
          light: '#F7F8FA', // Arka plan rengi
          DEFAULT: '#E5E7EB', // Varsayılan nötr
          dark: '#4B5563' // Metin ya da sınırlar için koyu nötr
        },
        error: '#D32F2F',
        success: '#28a745'
      },
      boxShadow: {
        'custom-light': '0 2px 10px rgba(0, 0, 0, 0.1)', // Hafif gölge
        'custom-dark': '0 4px 14px rgba(0, 0, 0, 0.2)' // Daha belirgin gölge
      },
      fontFamily: {
        sans: ['"Press Start 2P"', 'sans-serif'],
        retro: ['VT323', 'monospace'], // Retro terminal tarzı
        body: ['"Press Start 2P"', 'sans-serif'] // Ana yazı tipi
      }
    }
  },
  plugins: []
}
