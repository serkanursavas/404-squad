import './Header.css'
import notiIcon from '../../assets/icons/notification.svg'
import logo from '../../assets/images/logos/logo.png'
import { Link } from 'react-router-dom'

interface Props {
  isOpen: boolean
}

export default function Header({ isOpen }: Props) {
  const headerBgClass = isOpen ? 'bg-primary' : 'bg-neutral border-b shadow-md border-secondary'

  return (
    <>
      <div className={`fixed flex z-40 items-center justify-between w-full px-8 py-4 ${headerBgClass}`}>
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
        <div></div>
      </div>
    </>
  )
}
