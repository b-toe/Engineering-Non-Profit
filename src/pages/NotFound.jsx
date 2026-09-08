import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page-stub">
      <span className="badge badge-orange">404</span>
      <h1>Page Not Found</h1>
      <p>We couldn't find what you were looking for. It might have moved, or maybe it's still being built!</p>
      <Link to="/" className="btn btn-primary btn-lg" style={{ marginTop: '1rem' }}>
        Back to Home
      </Link>
    </div>
  )
}
