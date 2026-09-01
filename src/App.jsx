import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route, useLocation, useSearchParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import BackToTop from './components/BackToTop'
import { ToastProvider } from './components/ui'
import { AuthProvider } from './context/AuthContext'

const Landing = lazy(() => import('./pages/Landing'))
const StartDemo = lazy(() => import('./pages/StartDemo'))
const Login = lazy(() => import('./pages/Login'))
const NotFound = lazy(() => import('./pages/NotFound'))
const DashboardLayout = lazy(() => import('./components/DashboardLayout'))
const DashboardPage = lazy(() => import('./pages/app/DashboardPage'))
const AttendancePage = lazy(() => import('./pages/app/AttendancePage'))
const TimetablePage = lazy(() => import('./pages/app/TimetablePage'))
const StaffPage = lazy(() => import('./pages/app/StaffPage'))
const StudentsPage = lazy(() => import('./pages/app/StudentsPage'))
const HomeworkPage = lazy(() => import('./pages/app/HomeworkPage'))
const TestsPage = lazy(() => import('./pages/app/TestsPage'))
const NotesPage = lazy(() => import('./pages/app/NotesPage'))
const DoubtsPage = lazy(() => import('./pages/app/DoubtsPage'))
const FeesPage = lazy(() => import('./pages/app/FeesPage'))
const SchedulePage = lazy(() => import('./pages/app/SchedulePage'))
const AnnouncementsPage = lazy(() => import('./pages/app/AnnouncementsPage'))
const NotificationsPage = lazy(() => import('./pages/app/NotificationsPage'))
const AnalyticsPage = lazy(() => import('./pages/app/AnalyticsPage'))
const QuestionBankPage = lazy(() => import('./pages/app/QuestionBankPage'))
const ActivityPage = lazy(() => import('./pages/app/ActivityPage'))

function PageLoader() {
  return (
    <div className="page-loader">
      <span className="page-loader-spinner" />
      <span className="page-loader-text">Loading…</span>
    </div>
  )
}

function PublicNav() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/app')) return null
  return <Navbar />
}

function LoginRoute() {
  const [params] = useSearchParams()
  return <Login key={params.get('plan') || 'basic'} />
}

function AnimatedRoutes({ children }) {
  const location = useLocation()
  return (
    <div key={location.pathname} className="route-fade">
      {children}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <HashRouter>
          <div className="app-bg" />
          <ScrollToTop />
          <PublicNav />
          <BackToTop />
          <Suspense fallback={<PageLoader />}>
            <AnimatedRoutes>
              <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/start" element={<StartDemo />} />
              <Route path="/login" element={<LoginRoute />} />
              <Route path="/app" element={<DashboardLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="attendance" element={<AttendancePage />} />
                <Route path="timetable" element={<TimetablePage />} />
                <Route path="staff" element={<StaffPage />} />
                <Route path="students" element={<StudentsPage />} />
                <Route path="homework" element={<HomeworkPage />} />
                <Route path="tests" element={<TestsPage />} />
                <Route path="notes" element={<NotesPage />} />
                <Route path="doubts" element={<DoubtsPage />} />
                <Route path="fees" element={<FeesPage />} />
                <Route path="schedule" element={<SchedulePage />} />
                <Route path="announcements" element={<AnnouncementsPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="questionbank" element={<QuestionBankPage />} />
                <Route path="activity" element={<ActivityPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatedRoutes>
          </Suspense>
        </HashRouter>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App