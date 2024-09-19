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
    <div className="">
      <Header
        toggleMobileMenu={toggleMobileMenu}
        isOpen={isOpen}
      />
      <main className="bg-yellow-200 ">
        {isOpen ? <Navigation toggleMobileMenu={toggleMobileMenu} /> : <Outlet />}
      </main>
    </div>
  )
}
