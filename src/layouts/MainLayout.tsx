import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import Navigation from '../components/layout/Navigation'
import { useEffect, useState } from 'react'
import Footer from '../components/layout/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getUserFromToken } from '../services/authService'
import { loginSuccess } from '../store/authSlice'
import { RootState } from '../store'
import useRatings from '../hooks/useRatings'
import ScrollToTop from '../components/ui/ScrollToTop'

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false)
  const [voteChecked, setVoteChecked] = useState(false) // Ekledik

  const toggleMobileMenu = () => {
    document.body.classList.toggle('overflow-hidden') // Body'ye overflow hidden ekleyip kaldırır
    setIsOpen(prevIsOpen => !prevIsOpen)
  }

  const dispatch = useDispatch()

  const { hasVoted } = useSelector((state: RootState) => state.auth) // Redux'tan hasVoted değerini alıyoruz

  const { checkVote } = useRatings()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && !hasVoted && !voteChecked) {
      const user = getUserFromToken(token)
      if (user) {
        dispatch(loginSuccess({ user, token }))
        checkVote(user.id)
        setVoteChecked(true)
      }
    }
  }, [dispatch, hasVoted, checkVote, voteChecked])

  return (
    <div className="flex flex-col min-h-screen bg-neutral">
      <ScrollToTop />
      <Header isOpen={isOpen} />

      {/* Header yüksekliği kadar boşluk */}
      <div className="h-32 " />

      {/* Hamburger / Close Button */}
      <button
        className="fixed z-50 p-2 rounded-md top-8 right-6 "
        onClick={toggleMobileMenu}
      >
        <div id={isOpen ? 'hamburger-close' : 'hamburger-button'}>{/* buraya ikon gelecek */}</div>
      </button>

      <main className="flex-grow p-2">{isOpen ? <Navigation toggleMobileMenu={toggleMobileMenu} /> : <Outlet />}</main>
      {!isOpen && <Footer />}
    </div>
  )
}
