import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard'
import Timer from './pages/Timer'
import TasksList from './pages/Tasks/TasksList'
import TaskForm from './pages/Tasks/TaskForm'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import TagsManager from './pages/Tags/TagsManager'
import useAuthStore from './stores/authStore'

export default function App() {
  const { user } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Aguarda o carregamento da sessão do localStorage
    setIsLoading(false)
  }, [user])

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Routes>
          <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/tasks" element={<TasksList />} />
            <Route path="/tasks/new" element={<TaskForm />} />
            <Route path="/tasks/:id/edit" element={<TaskForm />} />
            <Route path="/tags" element={<TagsManager />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
        </div>
      </main>
    </div>
  )
}
