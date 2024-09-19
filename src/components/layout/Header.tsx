import './Header.css'

import notiIcon from '../../assets/icons/notification.svg'

import logo from '../../assets/images/logos/logo.png'

interface Props {
  toggleMobileMenu: () => void
  isOpen: boolean
}

export default function Header({ toggleMobileMenu, isOpen }: Props) {
  return (
    <div className="flex items-center justify-between px-8 py-4 bg-white ">
      <img
        src={notiIcon}
        alt="Notifications"
        className="w-6"
      />
      <img
        src={logo}
        alt="Logo"
        width={80}
      />
      <button
        className="relative z-10"
        onClick={toggleMobileMenu}
      >
        <div id={isOpen ? 'hamburger-close' : 'hamburger-button'}></div>
      </button>
    </div>
  )
}
