import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import Navigation from '../components/layout/Navigation'
import { useState } from 'react'
import Footer from '../components/layout/Footer'

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsOpen(prevIsOpen => !prevIsOpen)
  }

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
