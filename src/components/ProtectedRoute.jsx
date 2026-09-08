import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export function AdminRoute({ children }) {
  const { currentUser } = useAuth()
  const location = useLocation()
  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/login" state={{ from: location, requireAdmin: true }} replace />
  }
  return children
}

export function UserRoute({ children }) {
  const { currentUser } = useAuth()
  const location = useLocation()
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}
