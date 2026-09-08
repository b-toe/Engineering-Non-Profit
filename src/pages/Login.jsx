import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import './Login.css'

const Logo = () => (
  <svg viewBox="0 0 40 40" fill="none" width="40" height="40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="var(--color-primary)"/>
    <rect x="6" y="12" width="3.5" height="18" fill="white" rx="0.5"/>
    <rect x="30.5" y="12" width="3.5" height="18" fill="white" rx="0.5"/>
    <rect x="5" y="27" width="30" height="3" fill="white" rx="0.5"/>
    <path d="M7.75 14 Q20 20 32.25 14" stroke="#F97316" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    <line x1="14" y1="17.5" x2="14" y2="27" stroke="#F97316" strokeWidth="1.2"/>
    <line x1="20" y1="20" x2="20" y2="27" stroke="#F97316" strokeWidth="1.2"/>
    <line x1="26" y1="17.5" x2="26" y2="27" stroke="#F97316" strokeWidth="1.2"/>
  </svg>
)

export default function Login() {
  const [tab, setTab] = useState('admin')
  const { loginAdmin, loginUser, registerUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname
  const requireAdmin = location.state?.requireAdmin

  // Admin form state
  const [adminForm, setAdminForm] = useState({ username: '', password: '' })
  const [adminError, setAdminError] = useState('')
  const [adminBusy, setAdminBusy] = useState(false)

  // User sign-in state
  const [userForm, setUserForm] = useState({ email: '', password: '' })
  const [userError, setUserError] = useState('')
  const [userBusy, setUserBusy] = useState(false)

  // Register state
  const [regForm, setRegForm] = useState({ email: '', password: '', confirm: '' })
  const [regError, setRegError] = useState('')
  const [regBusy, setRegBusy] = useState(false)

  async function handleAdminSubmit(e) {
    e.preventDefault()
    setAdminError('')
    setAdminBusy(true)
    const result = await loginAdmin(adminForm.username.trim(), adminForm.password)
    setAdminBusy(false)
    if (result.error) { setAdminError(result.error); return }
    navigate('/admin', { replace: true })
  }

  async function handleUserSubmit(e) {
    e.preventDefault()
    setUserError('')
    setUserBusy(true)
    const result = await loginUser(userForm.email.trim(), userForm.password)
    setUserBusy(false)
    if (result.error) { setUserError(result.error); return }
    navigate(requireAdmin ? '/' : (from || '/portal'), { replace: true })
  }

  async function handleRegisterSubmit(e) {
    e.preventDefault()
    setRegError('')
    if (regForm.password !== regForm.confirm) { setRegError('Passwords do not match.'); return }
    if (regForm.password.length < 8) { setRegError('Password must be at least 8 characters.'); return }
    setRegBusy(true)
    const result = await registerUser(regForm.email.trim(), regForm.password)
    setRegBusy(false)
    if (result.error) { setRegError(result.error); return }
    navigate('/portal', { replace: true })
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <Logo />
          <span className="login-logo__name">Techids</span>
        </div>

        <div className="login-tabs" role="tablist">
          {[
            { id: 'admin', label: 'Team Login' },
            { id: 'user', label: 'Sign In' },
            { id: 'register', label: 'Create Account' },
          ].map(({ id, label }) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              className={`login-tab${tab === id ? ' login-tab--active' : ''}`}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'admin' && (
          <form className="login-form" onSubmit={handleAdminSubmit} noValidate aria-label="Team login">
            <p className="login-form__hint">For Techids team members only.</p>
            <label className="login-label">
              Username
              <input
                className="login-input"
                type="text"
                value={adminForm.username}
                onChange={(e) => setAdminForm((f) => ({ ...f, username: e.target.value }))}
                autoComplete="username"
                required
                placeholder="your username"
              />
            </label>
            <label className="login-label">
              Password
              <input
                className="login-input"
                type="password"
                value={adminForm.password}
                onChange={(e) => setAdminForm((f) => ({ ...f, password: e.target.value }))}
                autoComplete="current-password"
                required
                placeholder="••••••••"
              />
            </label>
            {adminError && <p className="login-error" role="alert">{adminError}</p>}
            <button type="submit" className="btn btn-primary btn-lg login-submit" disabled={adminBusy}>
              {adminBusy ? 'Signing in…' : 'Sign In as Team'}
            </button>
          </form>
        )}

        {tab === 'user' && (
          <form className="login-form" onSubmit={handleUserSubmit} noValidate aria-label="User sign in">
            <p className="login-form__hint">Sign in to track your workshop requests.</p>
            <label className="login-label">
              Email
              <input
                className="login-input"
                type="email"
                value={userForm.email}
                onChange={(e) => setUserForm((f) => ({ ...f, email: e.target.value }))}
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
            </label>
            <label className="login-label">
              Password
              <input
                className="login-input"
                type="password"
                value={userForm.password}
                onChange={(e) => setUserForm((f) => ({ ...f, password: e.target.value }))}
                autoComplete="current-password"
                required
                placeholder="••••••••"
              />
            </label>
            {userError && <p className="login-error" role="alert">{userError}</p>}
            <button type="submit" className="btn btn-primary btn-lg login-submit" disabled={userBusy}>
              {userBusy ? 'Signing in…' : 'Sign In'}
            </button>
            <p className="login-switch">
              No account yet?{' '}
              <button type="button" className="login-switch__link" onClick={() => setTab('register')}>
                Create one →
              </button>
            </p>
          </form>
        )}

        {tab === 'register' && (
          <form className="login-form" onSubmit={handleRegisterSubmit} noValidate aria-label="Create account">
            <p className="login-form__hint">Create a free account to track your requests.</p>
            <label className="login-label">
              Email
              <input
                className="login-input"
                type="email"
                value={regForm.email}
                onChange={(e) => setRegForm((f) => ({ ...f, email: e.target.value }))}
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
            </label>
            <label className="login-label">
              Password
              <input
                className="login-input"
                type="password"
                value={regForm.password}
                onChange={(e) => setRegForm((f) => ({ ...f, password: e.target.value }))}
                autoComplete="new-password"
                required
                placeholder="At least 8 characters"
              />
            </label>
            <label className="login-label">
              Confirm password
              <input
                className="login-input"
                type="password"
                value={regForm.confirm}
                onChange={(e) => setRegForm((f) => ({ ...f, confirm: e.target.value }))}
                autoComplete="new-password"
                required
                placeholder="••••••••"
              />
            </label>
            {regError && <p className="login-error" role="alert">{regError}</p>}
            <button type="submit" className="btn btn-primary btn-lg login-submit" disabled={regBusy}>
              {regBusy ? 'Creating account…' : 'Create Account'}
            </button>
            <p className="login-switch">
              Already have an account?{' '}
              <button type="button" className="login-switch__link" onClick={() => setTab('user')}>
                Sign in →
              </button>
            </p>
          </form>
        )}

        <div style={{ textAlign: 'center' }}>
          <Link to="/" style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
            ← Back to site
          </Link>
        </div>
      </div>
    </div>
  )
}
