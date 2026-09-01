import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import BackToTop from './components/BackToTop'
import { AuthProvider } from './context/AuthContext'

const Landing = lazy(() => import('./pages/Landing'))
const Compare = lazy(() => import('./pages/Compare'))
const Login = lazy(() => import('./pages/Login'))
const NotFound = lazy(() => import('./pages/NotFound'))
const BasicDashboard = lazy(() => import('./pages/demos/BasicDashboard'))
const StandardDashboard = lazy(() => import('./pages/demos/StandardDashboard'))
const PremiumDashboard = lazy(() => import('./pages/demos/PremiumDashboard'))

function PageLoader() {
  return (
    <div className="page-loader">
      <span className="page-loader-spinner" />
      <span className="page-loader-text">Loading…</span>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="app-bg" />
        <ScrollToTop />
        <Navbar />
        <BackToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/demo/basic" element={<BasicDashboard />} />
            <Route path="/demo/standard" element={<StandardDashboard />} />
            <Route path="/demo/premium" element={<PremiumDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </AuthProvider>
  )
}

export default App