import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from './features/landing'
import { LoginPage, AuthCallback } from './features/auth'
import { DashboardLayout } from './features/dashboard'
import { GeneratePage } from './features/generator'
import { AuthGuard } from './shared/components/auth/AuthGuard'

function DashboardHome() {
  return (
    <div className="text-center py-20">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-white/50">Your videos will appear here.</p>
    </div>
  )
}

export default function App() {
  return (
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
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
