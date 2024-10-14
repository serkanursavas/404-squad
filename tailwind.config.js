/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      screens: {
        xs: '430px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px'
      },
      colors: {
        primary: {
          DEFAULT: '#04764E', // Ana renk
          error: '#D32F2F'
        },
        secondary: '#C084FC', // İkincil renk (örn: vurgu, butonlar)
        accent: '#F25C05', // Canlı vurgu renkleri (örn: CTA butonları)
        success: '#28a745',
        neutral: {
          light: '#F7F8FA', // Arka plan rengi
          DEFAULT: '#E5E7EB', // Varsayılan nötr
          dark: '#4B5563' // Metin ya da sınırlar için koyu nötr
        }
      },
      boxShadow: {
        'custom-light': '0 2px 10px rgba(0, 0, 0, 0.1)', // Hafif gölge
        'custom-dark': '0 4px 14px rgba(0, 0, 0, 0.2)', // Daha belirgin gölge
        pixel: '4px 4px 0px 0px #000', // Piksel tarzı gölge
        'pixel-light': '4px 4px 0px 0px #4B5563', // Piksel tarzı gölge
        light: '2px 2px 14px 2px #4B5563', // Piksel tarzı gölge
        x2light: '2px 2px 8px 1px #4B5563' // Piksel tarzı gölge
      },
      fontFamily: {
        sans: ['"Press Start 2P"', 'sans-serif'],
        retro: ['VT323', 'monospace'], // Retro terminal tarzı
        body: ['"Press Start 2P"', 'sans-serif'] // Ana yazı tipi
      }
      // keyframes: {
      //   pixelShadow: {
      //     '0%, 100%': {
      //       boxShadow: '2px 2px 0px 0px #333, 4px 4px 0px 0px #000'
      //     },
      //     '50%': {
      //       boxShadow: '4px 4px 0px 0px #333, 4px 4px 0px 0px #000'
      //     }
      //   }
      // },
      // animation: {
      //   pixelShadow: 'pixelShadow 1.5s infinite' // Pixel gölge animasyonu
      // }
    }
  },
  plugins: []
}
