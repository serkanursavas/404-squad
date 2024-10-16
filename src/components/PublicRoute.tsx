import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()

  // Eğer kullanıcı oturum açmışsa, anasayfaya yönlendir
  if (isAuthenticated) {
    return (
      <Navigate
        to="/"
        replace
      />
    )
  }

  // Oturum açılmamışsa, içeriği (login veya signup) göster
  return <>{children}</>
}

export default PublicRoute
