import { createContext, useContext, useState, useCallback } from 'react'
import { hashPassword } from './crypto'
import { ADMIN_ACCOUNTS } from './adminCredentials'
import { findByEmail, createUser } from './userStore'

const AuthContext = createContext(null)
const SESSION_KEY = 'techids_session'

function loadSession() {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)) }
  catch { return null }
}

function saveSession(user) {
  try {
    user
      ? sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
      : sessionStorage.removeItem(SESSION_KEY)
  } catch {}
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => loadSession())

  const loginAdmin = useCallback(async (username, password) => {
    const hash = await hashPassword(password)
    const account = ADMIN_ACCOUNTS.find(
      (a) => a.username.toLowerCase() === username.toLowerCase() && a.passwordHash === hash
    )
    if (!account) return { error: 'Invalid username or password.' }
    const user = { id: account.id, username: account.username, displayName: account.displayName, role: 'admin' }
    setCurrentUser(user)
    saveSession(user)
    return { user }
  }, [])

  const loginUser = useCallback(async (email, password) => {
    const hash = await hashPassword(password)
    const account = findByEmail(email)
    if (!account || account.passwordHash !== hash) return { error: 'Invalid email or password.' }
    const user = { id: account.id, email: account.email, role: 'user' }
    setCurrentUser(user)
    saveSession(user)
    return { user }
  }, [])

  const registerUser = useCallback(async (email, password) => {
    const hash = await hashPassword(password)
    const result = createUser(email, hash)
    if (result.error) return result
    const user = { id: result.user.id, email: result.user.email, role: 'user' }
    setCurrentUser(user)
    saveSession(user)
    return { user }
  }, [])

  const logout = useCallback(() => {
    setCurrentUser(null)
    saveSession(null)
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, loginAdmin, loginUser, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
