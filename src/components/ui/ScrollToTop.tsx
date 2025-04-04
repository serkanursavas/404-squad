import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    // iOS için delay önemli olabiliyor
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 50)
  }, [location.pathname])

  return null
}
