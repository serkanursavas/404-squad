import { RouterProvider } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

import routes from './router/routes'
import { Provider } from 'react-redux'
import { store } from './store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Toast from './components/ui/Toast'
import { useEffect } from 'react'

const queryClient = new QueryClient()

function cleanupServiceWorkers() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        registration.unregister().then(() => {
          console.log('Service Worker unregistered:', registration)
        })
      })
    })
  }
}

function App() {
  useEffect(() => {
    // Service Worker temizleme işlemini yalnızca bir kez çalıştır
    cleanupServiceWorkers()
  }, [])

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
