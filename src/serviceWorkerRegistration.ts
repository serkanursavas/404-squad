export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js') // public/service-worker.js dosyasına işaret eder
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope)
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error)
        })
    })
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister()
    })
  }
}
