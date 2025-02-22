import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PersonasProvider } from './store/PersonasContext.tsx'

createRoot(document.getElementById('root')!).render(
  <PersonasProvider>
    <App />
  </PersonasProvider>
)
