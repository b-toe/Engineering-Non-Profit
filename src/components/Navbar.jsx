import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
  { label: 'About',       to: '/about' },
  { label: 'Programs',    to: '/programs' },
  { label: 'Workshops',   to: '/workshops' },
  { label: 'Events',      to: '/events' },
  { label: 'Impact',      to: '/impact' },
  { label: 'Get Involved', to: '/get-involved' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled]  = useState(false)
  const menuRef = useRef(null)
  const { pathname } = useLocation()

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} ref={menuRef}>
      <div className="navbar__inner container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" aria-label="Build Buddies — Home">
          <svg className="navbar__logo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="40" height="40" rx="8" fill="var(--color-primary)"/>
            {/* Bridge towers */}
            <rect x="6" y="12" width="3.5" height="18" fill="white" rx="0.5"/>
            <rect x="30.5" y="12" width="3.5" height="18" fill="white" rx="0.5"/>
            {/* Deck */}
            <rect x="5" y="27" width="30" height="3" fill="white" rx="0.5"/>
            {/* Cable */}
            <path d="M7.75 14 Q20 20 32.25 14" stroke="#F97316" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            {/* Hangers */}
            <line x1="14" y1="17.5" x2="14" y2="27" stroke="#F97316" strokeWidth="1.2"/>
            <line x1="20" y1="20" x2="20" y2="27" stroke="#F97316" strokeWidth="1.2"/>
            <line x1="26" y1="17.5" x2="26" y2="27" stroke="#F97316" strokeWidth="1.2"/>
          </svg>
          <span className="navbar__logo-text">
            Build<span className="navbar__logo-accent">Buddies</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="navbar__links" aria-label="Main navigation">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `navbar__link${isActive ? ' navbar__link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="navbar__actions">
          <Link to="/donate" className="btn btn-outline btn-sm">Donate</Link>
          <Link to="/workshops" className="btn btn-accent btn-sm">Book a Workshop</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile${menuOpen ? ' navbar__mobile--open' : ''}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`
              }
              tabIndex={menuOpen ? 0 : -1}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="navbar__mobile-actions">
          <Link to="/donate" className="btn btn-outline" tabIndex={menuOpen ? 0 : -1}>Donate</Link>
          <Link to="/workshops" className="btn btn-accent" tabIndex={menuOpen ? 0 : -1}>Book a Workshop</Link>
        </div>
      </div>
    </header>
  )
}
