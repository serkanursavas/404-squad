import { NavLink } from 'react-router-dom'

import homeIcon from '../../assets/icons/home.svg'
import matchesIcon from '../../assets/icons/matches.svg'
import profileIcon from '../../assets/icons/profile.svg'
import playersIcon from '../../assets/icons/players.svg'
import adminIcon from '../../assets/icons/android.svg'

import Icons from '../ui/Icons'
import useAuth from '../../hooks/useAuth'

interface Props {
  toggleMobileMenu: () => void
}

const navLinks = [
  { to: '/', label: 'Home', icon: homeIcon },
  { to: '/matches', label: 'Matches', icon: matchesIcon },
  { to: '/profile/1', label: 'Profile', icon: profileIcon },
  { to: '/players', label: 'Players', icon: playersIcon },
  { to: '/admin', label: 'Admin', icon: adminIcon }
]

export default function Navigation({ toggleMobileMenu }: Props) {
  const { logout, user } = useAuth()

  // Sadece admin rolü varsa admin linkini ekleyelim
  const filteredNavLinks = user?.role === 'ROLE_ADMIN' ? navLinks : navLinks.filter(link => link.label !== 'Admin')

  return (
    <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-screen h-full text-3xl bg-primary">
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
            onClick={logout}
            className="flex w-full items-center border-2 border-black justify-center px-4 py-2 mt-10 text-lg font-semibold tracking-[0.5rem] text-white transition duration-300 bg-red-600 hover:bg-red-700 active:scale-95 shadow-pixel"
          >
            LOGOUT
          </button>
        </div>
      </ul>
    </div>
  )
}
