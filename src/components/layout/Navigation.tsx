import { NavLink } from 'react-router-dom'

import homeIcon from '../../assets/icons/home.svg'
import matchesIcon from '../../assets/icons/matches.svg'
import profileIcon from '../../assets/icons/profile.svg'
import playersIcon from '../../assets/icons/players.svg'
import adminIcon from '../../assets/icons/android.svg'
import settingsIcon from '../../assets/icons/settings.svg'

import Icons from '../ui/Icons'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'

interface Props {
  toggleMobileMenu: () => void
}

export default function Navigation({ toggleMobileMenu }: Props) {
  const { logout, user } = useAuth()

  const navLinks = [
    { to: '/', label: 'Home', icon: homeIcon },
    { to: '/matches', label: 'Matches', icon: matchesIcon },
    { to: `/profile/${user?.id}`, label: 'Profile', icon: profileIcon },
    { to: '/players', label: 'Players', icon: playersIcon },
    { to: '/admin', label: 'Admin', icon: adminIcon },
    { to: '/settings', label: 'Settings', icon: settingsIcon }
  ]

  // Sadece admin rolü varsa admin linkini ekleyelim
  const filteredNavLinks = user?.role === 'ROLE_ADMIN' ? navLinks : navLinks.filter(link => link.label !== 'Admin')

  const handleLogout = () => {
    logout()
    toast.success('Logout successful')
  }

  return (
    <div className="absolute top-0 left-0 z-20 flex flex-col items-center justify-center w-screen h-full text-3xl bg-primary">
      <ul className="space-y-10">
        {filteredNavLinks.map(navLink => {
          return (
            <li key={navLink.to}>
              <NavLink
                to={navLink.to}
                onClick={toggleMobileMenu}
                className="flex items-center space-x-2 "
                style={({ isActive }) => ({
                  color: isActive ? 'white' : undefined
                })}
              >
                <Icons
                  src={navLink.icon}
                  className="h-full w-9"
                />
                <span>{navLink.label}</span>
              </NavLink>
            </li>
          )
        })}
        <div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center border-2 border-black justify-center px-4 py-2 mt-10 text-lg font-semibold tracking-[0.5rem] text-white transition duration-300 bg-red-600 hover:bg-red-700 active:scale-95 shadow-pixel"
          >
            LOGOUT
          </button>
        </div>
      </ul>
    </div>
  )
}
