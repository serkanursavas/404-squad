import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { ReactNode, useMemo } from 'react'

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated, isLoading } = useAuth()

  const isUserAdmin = useMemo(() => user?.role === 'ROLE_ADMIN', [user])
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

  if (!isUserAdmin) {
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
