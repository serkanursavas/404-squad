import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { ReactNode } from 'react'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth()

  // Oturum durumu yüklenirken loading göstergesi
  if (isLoading) {
    return <div>Loading...</div>
  }

  // Eğer kullanıcı oturum açmamışsa login sayfasına yönlendirilir
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  // Oturum açılmışsa, içeriği render et
  return <>{children}</>
}

export default ProtectedRoute
