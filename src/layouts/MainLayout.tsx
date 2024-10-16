import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import Navigation from '../components/layout/Navigation'
import { useEffect, useState } from 'react'
import Footer from '../components/layout/Footer'
import { useDispatch } from 'react-redux'
import { getUserFromToken } from '../services/authService'
import { loginSuccess } from '../store/authSlice'

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsOpen(prevIsOpen => !prevIsOpen)
  }

  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = getUserFromToken(token)
      if (user) {
        dispatch(loginSuccess({ user, token }))
      }
    }
  }, [dispatch])

  return (
    <div className="flex flex-col min-h-screen bg-neutral">
      <Header
        toggleMobileMenu={toggleMobileMenu}
        isOpen={isOpen}
      />
      <main className="flex-grow p-2">{isOpen ? <Navigation toggleMobileMenu={toggleMobileMenu} /> : <Outlet />}</main>
      <Footer />
    </div>
  )
}
