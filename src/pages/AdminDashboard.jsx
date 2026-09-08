import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { getAllSubmissions, updateStatus } from '../auth/submissionStore'
import './AdminDashboard.css'

const LABEL = {
  name: 'Name', email: 'Email', school: 'School', role: 'Role',
  program: 'Program', students: 'Students', grades: 'Grades', date: 'Date',
  notes: 'Notes', org: 'Organization', message: 'Message',
}

export default function AdminDashboard() {
  const { currentUser, logout } = useAuth()
  const [typeFilter, setTypeFilter]     = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [expanded, setExpanded]         = useState(null)
  const [subs, setSubs]                 = useState(() => getAllSubmissions())

  function refresh() { setSubs(getAllSubmissions()) }

  function toggle(id) { setExpanded((prev) => (prev === id ? null : id)) }

  function markReviewed(id) { updateStatus(id, 'reviewed'); refresh() }
  function markPending(id)  { updateStatus(id, 'pending');  refresh() }

  const filtered = subs.filter((s) => {
    if (typeFilter !== 'all' && s.type !== typeFilter)       return false
    if (statusFilter !== 'all' && s.status !== statusFilter) return false
    return true
  })

  const pendingCount = subs.filter((s) => s.status === 'pending').length

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="admin-header__inner container">
          <div>
            <h1 className="admin-header__title">Admin Dashboard</h1>
            <p className="admin-header__sub">
              Signed in as <strong>{currentUser.displayName || currentUser.username}</strong>
              {pendingCount > 0 && (
                <span className="admin-pending-badge">{pendingCount} pending</span>
              )}
            </p>
          </div>
          <button className="btn btn-outline-white btn-sm" onClick={logout}>Sign Out</button>
        </div>
      </header>

      <main className="admin-main container">
        <div className="admin-filters">
          <div className="admin-filter-group">
            <span className="admin-filter-label">Type:</span>
            {['all', 'workshop', 'contact'].map((f) => (
              <button
                key={f}
                className={`admin-filter-btn${typeFilter === f ? ' active' : ''}`}
                onClick={() => setTypeFilter(f)}
              >
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="admin-filter-group">
            <span className="admin-filter-label">Status:</span>
            {['all', 'pending', 'reviewed'].map((f) => (
              <button
                key={f}
                className={`admin-filter-btn${statusFilter === f ? ' active' : ''}`}
                onClick={() => setStatusFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <span className="admin-count">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="admin-empty">
            <p className="admin-empty__icon">📭</p>
            <p>No submissions here yet.</p>
            <p className="admin-empty__note">
              Workshop requests and contact messages will appear here once submitted.
            </p>
          </div>
        ) : (
          <ul className="admin-list">
            {filtered.map((sub) => (
              <li key={sub.id} className={`admin-item admin-item--${sub.type}`}>
                <div className="admin-item__header" onClick={() => toggle(sub.id)}>
                  <div className="admin-item__meta">
                    <span className={`admin-type-badge admin-type-badge--${sub.type}`}>
                      {sub.type === 'workshop' ? '🏫 Workshop' : '💬 Contact'}
                    </span>
                    <span className="admin-item__name">{sub.data.name}</span>
                    <span className="admin-item__email">{sub.data.email}</span>
                  </div>
                  <div className="admin-item__right">
                    <span className={`admin-status admin-status--${sub.status}`}>{sub.status}</span>
                    <span className="admin-item__date">
                      {new Date(sub.submittedAt).toLocaleDateString()}
                    </span>
                    <span className="admin-item__chevron">{expanded === sub.id ? '▲' : '▼'}</span>
                  </div>
                </div>

                {expanded === sub.id && (
                  <div className="admin-item__body">
                    <dl className="admin-detail-grid">
                      {Object.entries(sub.data)
                        .filter(([, v]) => v?.toString().trim())
                        .map(([k, v]) => (
                          <div key={k} className="admin-detail-row">
                            <dt className="admin-detail-key">{LABEL[k] || k}</dt>
                            <dd className="admin-detail-val">{String(v)}</dd>
                          </div>
                        ))}
                    </dl>
                    <div className="admin-item__actions">
                      {sub.status === 'pending' ? (
                        <button className="btn btn-primary btn-sm" onClick={() => markReviewed(sub.id)}>
                          Mark Reviewed
                        </button>
                      ) : (
                        <button className="btn btn-outline btn-sm" onClick={() => markPending(sub.id)}>
                          Mark Pending
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
