import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { ReactNode } from 'react'

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated, isLoading } = useAuth()

  // Eğer oturum bilgisi yükleniyorsa loading göster
  if (isLoading) {
    return <div>Loading...</div>
  }

  // Kullanıcı oturum açmamışsa giriş sayfasına yönlendir
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  // Kullanıcı "admin" değilse ana sayfaya yönlendir
  if (user?.role !== 'ROLE_ADMIN') {
    return (
      <Navigate
        to="/"
        replace
      />
    )
  }

  return <>{children}</>
}

export default AdminRoute
