import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import Navigation from '../components/layout/Navigation'
import { useState } from 'react'

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsOpen(prevIsOpen => !prevIsOpen)
  }

  return (
    <div>
      <Header
        toggleMobileMenu={toggleMobileMenu}
        isOpen={isOpen}
      />
      <main className="p-2">
        {isOpen ? <Navigation toggleMobileMenu={toggleMobileMenu} /> : <Outlet />}
      </main>
    </div>
  )
}
