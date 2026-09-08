import { Link } from 'react-router-dom'
import './Footer.css'

const footerLinks = {
  Programs: [
    { label: 'Bridge Engineering', to: '/programs' },
    { label: 'Robotics',           to: '/programs' },
    { label: 'Mechanical Eng.',    to: '/programs' },
    { label: 'Water Engineering',  to: '/programs' },
  ],
  Learn: [
    { label: 'Workshops',    to: '/workshops' },
    { label: 'Events',       to: '/events' },
    { label: 'Impact',       to: '/impact' },
    { label: 'About Us',     to: '/about' },
  ],
  Support: [
    { label: 'Get Involved', to: '/get-involved' },
    { label: 'Sponsors',     to: '/sponsors' },
    { label: 'Donate',       to: '/donate' },
    { label: 'Contact',      to: '/contact' },
  ],
}

const socialLinks = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top container">
        {/* Brand column */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo" aria-label="Techids">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36" aria-hidden="true">
              <rect width="40" height="40" rx="8" fill="var(--color-primary)"/>
              <rect x="6" y="12" width="3.5" height="18" fill="white" rx="0.5"/>
              <rect x="30.5" y="12" width="3.5" height="18" fill="white" rx="0.5"/>
              <rect x="5" y="27" width="30" height="3" fill="white" rx="0.5"/>
              <path d="M7.75 14 Q20 20 32.25 14" stroke="#F97316" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
              <line x1="14" y1="17.5" x2="14" y2="27" stroke="#F97316" strokeWidth="1.2"/>
              <line x1="20" y1="20" x2="20" y2="27" stroke="#F97316" strokeWidth="1.2"/>
              <line x1="26" y1="17.5" x2="26" y2="27" stroke="#F97316" strokeWidth="1.2"/>
            </svg>
            <span className="footer__logo-text">
              Tech<span>ids</span>
            </span>
          </Link>

          <p className="footer__tagline">
            Hands-on STEM and engineering education for kids — where students don't just learn about engineering, they live it.
          </p>

          <div className="footer__social">
            {socialLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                className="footer__social-link"
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div className="footer__col" key={heading}>
            <h3 className="footer__col-heading">{heading}</h3>
            <ul>
              {links.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="footer__link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter column */}
        <div className="footer__col footer__newsletter">
          <h3 className="footer__col-heading">Stay in the loop</h3>
          <p>Get updates on new programs, events, and how to bring Techids to your school.</p>
          <form
            className="footer__form"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Newsletter signup"
          >
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Email address"
              required
            />
            <button type="submit" className="btn btn-accent btn-sm">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer__bottom container">
        <p className="footer__copy">
          &copy; {new Date().getFullYear()} Techids. A student-founded STEM education organization.
        </p>
        <div className="footer__bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
        </div>
      </div>
    </footer>
  )
}
