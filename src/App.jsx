import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Compare from './pages/Compare'
import Login from './pages/Login'
import BasicDashboard from './pages/demos/BasicDashboard'
import StandardDashboard from './pages/demos/StandardDashboard'
import PremiumDashboard from './pages/demos/PremiumDashboard'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="app-bg" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/demo/basic" element={<BasicDashboard />} />
          <Route path="/demo/standard" element={<StandardDashboard />} />
          <Route path="/demo/premium" element={<PremiumDashboard />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  )
}

export default App