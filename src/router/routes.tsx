import { createBrowserRouter } from 'react-router-dom'

import Home from '../pages/Home'
import Matches from '../pages/Matches'
import NotFound from '../pages/NotFound'
import MatchDetails from '../pages/MatchDetails'
import Profile from '../pages/Profile'
import MainLayout from '../layouts/MainLayout'
import AllPlayers from '../pages/AllPlayers'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import AllUsers from '../pages/admin/AllUsers'
import UpdateUser from '../pages/admin/UpdateUser'
import AdminHome from '../pages/admin/AdminHome'
import ManagePlayers from '../pages/admin/AllPlayers'
import ManageMatches from '../pages/admin/ManageMatches'
import MatchFormPage from '../pages/admin/MatchFormPage'
import UpdatePlayer from '../pages/admin/UpdatePlayer'
import MatchGoalsPage from '../pages/admin/MatchGoalsPage'
import ProtectedRoute from '../components/ProtectedRoute'
import AdminRoute from '../components/AdminRoute'
import PublicRoute from '../components/PublicRoute'

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
        index: true
      },
      {
        path: 'matches',
        element: <Matches />
      },
      {
        path: 'matches/:id',
        element: <MatchDetails />
      },
      {
        path: 'profile/:id',
        element: <Profile />
      },
      {
        path: 'players',
        element: <AllPlayers />
      }
    ]
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <MainLayout />
        </AdminRoute>
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <AdminHome />
      },
      {
        path: 'users',
        element: <AllUsers />
      },
      {
        path: 'update-user/:id',
        element: <UpdateUser />
      },
      {
        path: 'update-player/:id',
        element: <UpdatePlayer />
      },
      {
        path: 'matches',
        element: <ManageMatches />
      },
      {
        path: 'matches/create',
        element: <MatchFormPage />
      },
      {
        path: 'matches/:id',
        element: <MatchFormPage />
      },
      {
        path: 'matches/:id/add-goals',
        element: <MatchGoalsPage />
      },
      {
        path: 'players',
        element: <ManagePlayers />
      }
    ]
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    )
  },
  {
    path: '/signup',
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    )
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default routes
