import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { ReactNode, useMemo } from 'react'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth()

  // Memoize state values to prevent unnecessary renders
  const isUserAuthenticated = useMemo(() => isAuthenticated, [isAuthenticated])
  const isAppLoading = useMemo(() => isLoading, [isLoading])

  if (isAppLoading) {
    return <div>Loading...</div>
  }

  if (!isUserAuthenticated) {
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
