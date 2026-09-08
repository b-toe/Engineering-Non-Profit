import { Link } from 'react-router-dom'
import './Home.css'

// ---- Data ----------------------------------------------------------------

const steps = [
  {
    word: 'LEARN',
    color: 'blue',
    desc: 'Discover the engineering concept behind the challenge.',
  },
  {
    word: 'BUILD',
    color: 'orange',
    desc: 'Design and construct your solution with real materials.',
  },
  {
    word: 'TEST',
    color: 'green',
    desc: 'Put it to the test — does it do what you predicted?',
  },
  {
    word: 'IMPROVE',
    color: 'purple',
    desc: 'Analyze what happened, then redesign and try again.',
  },
]

const programs = [
  {
    id: 'bridge',
    colorClass: 'card--blue',
    title: 'Bridge Engineering',
    tagline: 'Structural Engineering & Forces',
    grades: 'Grades 2–5',
    desc: 'Design bridges from limited materials, predict load capacity, test to failure, then redesign. Students discover tension, compression, and load distribution through the challenge.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="6" y="14" width="5" height="22" rx="1" fill="currentColor" opacity="0.9"/>
        <rect x="37" y="14" width="5" height="22" rx="1" fill="currentColor" opacity="0.9"/>
        <rect x="4" y="33" width="40" height="5" rx="1" fill="currentColor"/>
        <path d="M8.5 17 Q24 26 39.5 17" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/>
        <line x1="17" y1="22" x2="17" y2="33" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
        <line x1="24" y1="26" x2="24" y2="33" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
        <line x1="31" y1="22" x2="31" y2="33" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
      </svg>
    ),
  },
  {
    id: 'robotics',
    colorClass: 'card--purple',
    title: 'Robotics',
    tagline: 'Programming & Sensor Design',
    grades: 'Grades 3–5',
    desc: 'Build and program robots to complete real challenges. Students learn about motors, sensors, and computational thinking through hands-on robot design.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="14" y="18" width="20" height="16" rx="3" fill="currentColor" opacity="0.85"/>
        <rect x="19" y="14" width="10" height="6" rx="2" fill="currentColor" opacity="0.7"/>
        <circle cx="20" cy="24" r="2.5" fill="white"/>
        <circle cx="28" cy="24" r="2.5" fill="white"/>
        <rect x="20" y="29" width="8" height="2" rx="1" fill="white" opacity="0.7"/>
        <rect x="8" y="22" width="6" height="3" rx="1.5" fill="currentColor" opacity="0.6"/>
        <rect x="34" y="22" width="6" height="3" rx="1.5" fill="currentColor" opacity="0.6"/>
        <rect x="17" y="34" width="5" height="6" rx="1" fill="currentColor" opacity="0.7"/>
        <rect x="26" y="34" width="5" height="6" rx="1" fill="currentColor" opacity="0.7"/>
      </svg>
    ),
  },
  {
    id: 'mechanical',
    colorClass: 'card--green',
    title: 'Mechanical Engineering',
    tagline: 'Gears, Levers & Motion',
    grades: 'Grades 2–5',
    desc: 'Explore machines that multiply force and change motion. Pulleys, gears, levers, and ramps — students build devices and discover mechanical advantage.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.85"/>
        <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.85"/>
        {/* Gear teeth */}
        {[0,45,90,135,180,225,270,315].map((deg) => (
          <rect
            key={deg}
            x="22.5"
            y="10"
            width="3"
            height="4"
            rx="1"
            fill="currentColor"
            opacity="0.7"
            style={{ transformOrigin: '24px 24px', transform: `rotate(${deg}deg)` }}
          />
        ))}
        <line x1="8" y1="38" x2="24" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },
  {
    id: 'water',
    colorClass: 'card--teal',
    title: 'Water Engineering',
    tagline: 'Buoyancy, Dams & Fluid Systems',
    grades: 'Grades 2–5',
    desc: 'Float a boat made of clay, design a dam, or move water through channels. Students experience buoyancy, displacement, and fluid dynamics first-hand.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M8 30 Q14 24 20 30 Q26 36 32 30 Q38 24 44 30" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5"/>
        <path d="M8 36 Q14 30 20 36 Q26 42 32 36 Q38 30 44 36" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.3"/>
        {/* Boat */}
        <path d="M14 28 L34 28 L30 22 L18 22 Z" fill="currentColor" opacity="0.85"/>
        <rect x="21" y="14" width="3" height="8" rx="1" fill="currentColor" opacity="0.7"/>
        <path d="M24 14 L32 19 L24 22 Z" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
  },
]

const audiences = [
  {
    id: 'students',
    emoji: '🔧',
    title: 'Students',
    pitch: 'STEM is more than reading — it\'s building things that actually work. Join a workshop and see what you can design.',
    cta: 'Find Events',
    to: '/events',
  },
  {
    id: 'schools',
    emoji: '🏫',
    title: 'Schools & Teachers',
    pitch: 'Structured, curriculum-aligned workshops you can bring to your classroom. We handle materials, facilitation, and setup.',
    cta: 'Book a Workshop',
    to: '/workshops',
  },
  {
    id: 'sponsors',
    emoji: '🤝',
    title: 'Sponsors & Donors',
    pitch: 'Every contribution funds real workshops for real students — especially those without access to hands-on STEM.',
    cta: 'Get Involved',
    to: '/get-involved',
  },
]

const stats = [
  { value: '500+',  label: 'Students Reached' },
  { value: '25+',   label: 'Workshops Run' },
  { value: '10+',   label: 'Schools Partnered' },
  { value: '2,500+', label: 'Projects Built' },
]

// ---- Components ----------------------------------------------------------

function ProgramCard({ colorClass, title, tagline, grades, desc, icon, id }) {
  return (
    <article className={`prog-card ${colorClass}`}>
      <div className="prog-card__icon">{icon}</div>
      <div className="prog-card__body">
        <span className="prog-card__grades">{grades}</span>
        <h3 className="prog-card__title">{title}</h3>
        <p className="prog-card__tagline">{tagline}</p>
        <p className="prog-card__desc">{desc}</p>
      </div>
      <Link to="/programs" className="prog-card__link" aria-label={`Learn more about ${title}`}>
        Learn more →
      </Link>
    </article>
  )
}

// ---- Page ----------------------------------------------------------------

export default function Home() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero__grid" aria-hidden="true" />
        <div className="hero__glow" aria-hidden="true" />
        <div className="container hero__inner">
          <span className="hero__eyebrow">
            <span aria-hidden="true">★</span> Student-Founded STEM Education
          </span>
          <h1 className="hero__heading" id="hero-heading">
            Where Kids Build<br />
            Like <span className="hero__accent">Engineers.</span>
          </h1>
          <p className="hero__sub">
            Build Buddies gives students the tools to design, build, test, and improve
            real solutions — not just read about engineering, but live it.
          </p>
          <div className="hero__actions">
            <Link to="/programs" className="btn btn-accent btn-lg">Explore Programs</Link>
            <Link to="/workshops" className="btn btn-outline-white btn-lg">Book a Workshop →</Link>
          </div>
        </div>

        {/* Decorative bridge SVG */}
        <div className="hero__illustration" aria-hidden="true">
          <svg viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="20" width="12" height="110" rx="2" fill="white" opacity="0.15"/>
            <rect x="278" y="20" width="12" height="110" rx="2" fill="white" opacity="0.15"/>
            <rect x="20" y="116" width="280" height="12" rx="2" fill="white" opacity="0.2"/>
            <path d="M36 30 Q160 90 284 30" stroke="#F97316" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.6"/>
            <line x1="90" y1="57" x2="90" y2="116" stroke="#F97316" strokeWidth="2.5" opacity="0.4"/>
            <line x1="130" y1="72" x2="130" y2="116" stroke="#F97316" strokeWidth="2.5" opacity="0.4"/>
            <line x1="160" y1="79" x2="160" y2="116" stroke="#F97316" strokeWidth="2.5" opacity="0.4"/>
            <line x1="190" y1="72" x2="190" y2="116" stroke="#F97316" strokeWidth="2.5" opacity="0.4"/>
            <line x1="230" y1="57" x2="230" y2="116" stroke="#F97316" strokeWidth="2.5" opacity="0.4"/>
          </svg>
        </div>
      </section>

      {/* ── Philosophy strip ──────────────────────────────────── */}
      <section className="philosophy" aria-label="Our learning philosophy">
        <div className="container">
          <ol className="philosophy__steps" role="list">
            {steps.map((step, i) => (
              <li key={step.word} className="philosophy__step">
                <span className={`philosophy__word philosophy__word--${step.color}`}>
                  {step.word}
                </span>
                <p className="philosophy__desc">{step.desc}</p>
                {i < steps.length - 1 && (
                  <span className="philosophy__arrow" aria-hidden="true">→</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Programs preview ──────────────────────────────────── */}
      <section className="section" aria-labelledby="programs-heading">
        <div className="container">
          <div className="section-intro">
            <span className="section-label">What We Build</span>
            <h2 className="heading-lg" id="programs-heading">Engineering Programs</h2>
            <p className="section-intro__sub">
              Hands-on challenges across four subject areas — each built around a real engineering problem.
            </p>
          </div>
          <div className="prog-grid">
            {programs.map((p) => <ProgramCard key={p.id} {...p} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
            <Link to="/programs" className="btn btn-primary btn-lg">View All Programs</Link>
          </div>
        </div>
      </section>

      {/* ── Quote / Philosophy ────────────────────────────────── */}
      <section className="section section-alt philosophy-quote" aria-label="Our teaching philosophy">
        <div className="container">
          <div className="philosophy-quote__inner">
            <div className="philosophy-quote__text">
              <span className="section-label">Our Approach</span>
              <blockquote className="philosophy-quote__blockquote">
                "Here's a problem.<br />Can you solve it?"
              </blockquote>
              <p>
                Instead of "Build this bridge," we say: <em>"Can you design a bridge that supports
                the most weight using only these materials?"</em> Students experiment, fail, analyze,
                redesign, and try again — the same loop real engineers use every day.
              </p>
              <p>
                The result isn't just a bridge. It's a student who understands <strong>tension</strong>,
                {' '}<strong>compression</strong>, and <strong>load distribution</strong> — because
                they discovered it themselves.
              </p>
            </div>
            <div className="philosophy-quote__steps" aria-hidden="true">
              <div className="process-step">
                <div className="process-step__num">1</div>
                <div>Here's a problem</div>
              </div>
              <div className="process-step__arrow">↓</div>
              <div className="process-step">
                <div className="process-step__num">2</div>
                <div>Design a solution</div>
              </div>
              <div className="process-step__arrow">↓</div>
              <div className="process-step">
                <div className="process-step__num">3</div>
                <div>Build & test it</div>
              </div>
              <div className="process-step__arrow">↓</div>
              <div className="process-step">
                <div className="process-step__num">4</div>
                <div>Understand why</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Audience ──────────────────────────────────────────── */}
      <section className="section" aria-labelledby="audience-heading">
        <div className="container">
          <div className="section-intro">
            <span className="section-label">Who It's For</span>
            <h2 className="heading-lg" id="audience-heading">Built for Your Community</h2>
          </div>
          <div className="audience-grid">
            {audiences.map(({ id, emoji, title, pitch, cta, to }) => (
              <div className="audience-card" key={id}>
                <div className="audience-card__emoji" aria-hidden="true">{emoji}</div>
                <h3 className="audience-card__title">{title}</h3>
                <p className="audience-card__pitch">{pitch}</p>
                <Link to={to} className="btn btn-outline">{cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats strip ───────────────────────────────────────── */}
      <section className="stats-strip" aria-label="Our impact by the numbers">
        <div className="container">
          <dl className="stats-strip__grid">
            {stats.map(({ value, label }) => (
              <div className="stat" key={label}>
                <dt className="stat__value">{value}</dt>
                <dd className="stat__label">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── School CTA ────────────────────────────────────────── */}
      <section className="school-cta" aria-labelledby="school-cta-heading">
        <div className="container school-cta__inner">
          <div>
            <h2 className="heading-lg" id="school-cta-heading">
              Bring Build Buddies to Your School
            </h2>
            <p>
              We handle everything — materials, facilitation, and the engineering challenge.
              All you need is a group of curious students.
            </p>
          </div>
          <div className="school-cta__actions">
            <Link to="/workshops" className="btn btn-lg" style={{ background: 'white', color: 'var(--color-accent-dark)', fontWeight: 700 }}>
              Request a Workshop
            </Link>
            <Link to="/contact" className="btn btn-outline-white btn-lg">Ask a Question</Link>
          </div>
        </div>
      </section>
    </>
  )
}
