import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// No service worker: stale app-shell caches were blanking deep links on
// redeploys (old hashed chunks 404 against a cached index.html). Unregister any
// previously installed worker and drop its caches so clients self-heal.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => {
        registrations.forEach((registration) => registration.unregister())
      })
      .catch(() => {})
    if ('caches' in window) {
      caches
        .keys()
        .then((keys) =>
          Promise.all(keys.filter((k) => k.startsWith('edusuite')).map((k) => caches.delete(k))),
        )
        .catch(() => {})
    }
  })
}
