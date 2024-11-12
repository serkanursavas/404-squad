import './Header.css'
import notiIcon from '../../assets/icons/notification.svg'
import logo from '../../assets/images/logos/logo.png'
import { Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'

interface Props {
  toggleMobileMenu: () => void
  isOpen: boolean
}

export default function Header({ toggleMobileMenu, isOpen }: Props) {
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight)
      }
    }

    // İlk yüklemede yüksekliği ayarla
    updateHeaderHeight()

    // ResizeObserver ile header yüksekliğini takip et
    const resizeObserver = new ResizeObserver(updateHeaderHeight)
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current)
    }

    return () => {
      if (headerRef.current) {
        resizeObserver.unobserve(headerRef.current)
      }
    }
  }, [])

  const headerBgClass = isOpen ? 'bg-primary' : 'bg-neutral'

  return (
    <>
      <div
        ref={headerRef}
        className={`fixed z-30 flex items-center justify-between w-full px-8 py-4 ${headerBgClass}`}
      >
        <img
          src={notiIcon}
          alt="Notifications"
          className={`w-6 ${isOpen ? 'invisible' : ''}`}
        />
        <Link
          to="/"
          className={`${isOpen ? 'invisible' : ''} cursor-pointer`}
        >
          <img
            src={logo}
            alt="Logo"
            width={80}
          />
        </Link>
        <button
          className="relative z-20"
          onClick={toggleMobileMenu}
        >
          <div id={isOpen ? 'hamburger-close' : 'hamburger-button'}></div>
        </button>
      </div>

      {/* Header yüksekliği kadar boşluk ekle */}
      <div style={{ height: headerHeight }}></div>
    </>
  )
}
