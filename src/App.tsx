import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from './features/landing'
import { LoginPage, AuthCallback } from './features/auth'
import { DashboardLayout, DashboardHome, HistoryPage, CreditsPage } from './features/dashboard'
import { GeneratePage } from './features/generator'
import { AuthGuard } from './shared/components/auth/AuthGuard'
import { ErrorBoundary } from './shared/components/ui/ErrorBoundary'
import { ToastContainer } from './shared/components/ui/ToastContainer'

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route
            path="/dashboard"
            element={
              <AuthGuard fallback={<Navigate to="/login" replace />}>
                <DashboardLayout />
              </AuthGuard>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="generate" element={<GeneratePage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="credits" element={<CreditsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </ErrorBoundary>
  )
}
