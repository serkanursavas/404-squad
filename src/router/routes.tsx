import { createBrowserRouter } from 'react-router-dom'

import Home from '../pages/Home'
import Matches from '../pages/Matches'
import NotFound from '../pages/NotFound'
import MatchDetails from '../pages/MatchDetails'
import Profile from '../pages/Profile'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    index: true
  },
  {
    path: '/matches',
    element: <Matches />
  },
  {
    path: '/matches/:id',
    element: <MatchDetails />
  },
  {
    path: '/profile/:id',
    element: <Profile />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default routes
