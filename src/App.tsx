import { RouterProvider } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

import routes from './router/routes'
import { Provider } from 'react-redux'
import { store } from './store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Toast from './components/ui/Toast'

const queryClient = new QueryClient()

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Toast />
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </Provider>
  )
}

export default App
