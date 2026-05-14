import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getCurrentUser } from './lib/supabase'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import InventoryPage from './pages/InventoryPage'
import AddInventoryPage from './pages/AddInventoryPage'
import ReportPage from './pages/ReportPage'
import SettingsPage from './pages/SettingsPage'
import DashboardLayout from './components/DashboardLayout'

function ProtectedRoute({ children }) {
  const user = getCurrentUser()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="inventaris" element={<InventoryPage />} />
          <Route path="inventaris/tambah" element={<AddInventoryPage />} />
          <Route path="laporan" element={<ReportPage />} />
          <Route path="pengaturan" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
