import { useAuth } from '../auth/AuthContext'
import { getSubmissionsByEmail } from '../auth/submissionStore'
import './UserPortal.css'

export default function UserPortal() {
  const { currentUser, logout } = useAuth()
  const subs = getSubmissionsByEmail(currentUser.email)

  return (
    <div className="portal-page">
      <header className="portal-header">
        <div className="portal-header__inner container">
          <div>
            <h1 className="portal-header__title">My Requests</h1>
            <p className="portal-header__sub">{currentUser.email}</p>
          </div>
          <button className="btn btn-outline-white btn-sm" onClick={logout}>Sign Out</button>
        </div>
      </header>

      <main className="portal-main">
        {subs.length === 0 ? (
          <div className="portal-empty">
            <p className="portal-empty__icon">📭</p>
            <p>No submissions yet.</p>
            <p>
              Workshop requests and contact messages submitted with this email address will appear here.
            </p>
          </div>
        ) : (
          <ul className="portal-list">
            {subs.map((sub) => (
              <li key={sub.id} className="portal-item">
                <div className="portal-item__type">
                  {sub.type === 'workshop' ? '🏫 Workshop Request' : '💬 Contact Message'}
                </div>
                <div className="portal-item__info">
                  <span className="portal-item__date">
                    Submitted {new Date(sub.submittedAt).toLocaleDateString()}
                  </span>
                  <span className={`portal-status portal-status--${sub.status}`}>{sub.status}</span>
                </div>
                {sub.type === 'workshop' && sub.data.school && (
                  <p className="portal-item__detail">
                    <strong>School:</strong> {sub.data.school}
                    {sub.data.program ? ` — ${sub.data.program}` : ''}
                  </p>
                )}
                {sub.type === 'contact' && sub.data.message && (
                  <p className="portal-item__detail portal-item__msg">
                    "{sub.data.message.slice(0, 120)}{sub.data.message.length > 120 ? '…' : ''}"
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
