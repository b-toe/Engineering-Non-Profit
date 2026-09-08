import { Link } from 'react-router-dom'
import './Programs.css'

const programs = [
  {
    id: 'bridge',
    colorClass: 'p--blue',
    emoji: '🌉',
    title: 'Bridge Engineering',
    tagline: 'Structural Engineering & Forces',
    grades: 'Grades 2–5',
    duration: '60–90 min',
    concepts: ['Tension & compression', 'Load distribution', 'Structural stability', 'Truss design', 'Failure analysis'],
    description:
      'Students receive a limited set of materials and a single challenge: build a bridge that supports the most weight. Before building, they learn about forces — what tension and compression are, how load travels through a structure. Then they design, build, predict how much weight their bridge will hold, test it, watch it fail, and figure out why. Then they redesign.',
    challenge:
      'Can you design a bridge that holds the most weight — using only these 20 popsicle sticks and a length of string?',
  },
  {
    id: 'robotics',
    colorClass: 'p--purple',
    emoji: '🤖',
    title: 'Robotics',
    tagline: 'Programming & Sensor Design',
    grades: 'Grades 3–5',
    duration: '75–90 min',
    concepts: ['Motor control', 'Sensors & feedback', 'Sequential logic', 'Simple machines', 'Robot design'],
    description:
      'Students design and build robots to complete a challenge course — navigating obstacles, sensing walls, or picking up objects. They learn how motors translate electrical signals into movement, how sensors detect the environment, and how a sequence of instructions becomes behavior. Programming is taught as problem-solving, not syntax memorization.',
    challenge:
      'Can you program your robot to navigate the maze — without touching any walls?',
  },
  {
    id: 'mechanical',
    colorClass: 'p--green',
    emoji: '⚙️',
    title: 'Mechanical Engineering',
    tagline: 'Gears, Levers & Motion',
    grades: 'Grades 2–5',
    duration: '60–90 min',
    concepts: ['Mechanical advantage', 'Gear ratios', 'Lever classes', 'Pulley systems', 'Ramp & inclined planes'],
    description:
      'Students explore how simple machines reduce the effort needed to do work. They build pulley systems to lift heavy loads, create gear trains that trade speed for torque, and experiment with levers to balance objects of different weights. Each challenge reveals how engineers design machines that amplify human effort.',
    challenge:
      'Can you build a machine that lifts a 1 kg weight — using only your finger?',
  },
  {
    id: 'water',
    colorClass: 'p--teal',
    emoji: '🌊',
    title: 'Water Engineering',
    tagline: 'Buoyancy, Dams & Fluid Systems',
    grades: 'Grades 2–5',
    duration: '60–90 min',
    concepts: ['Buoyancy & displacement', 'Density', 'Fluid pressure', 'Dam design', 'Channel flow'],
    description:
      'Students discover why things float (or sink) by building boats from clay — then compete to carry the most cargo without sinking. They design dams to control water flow, build channels that move water from A to B, and experiment with how fluid pressure changes with depth. Water makes abstract physics concrete.',
    challenge:
      'Can you build a clay boat that floats — and holds more pennies than anyone else?',
  },
]

export default function Programs() {
  return (
    <>
      {/* Page header */}
      <section className="page-header page-header--programs">
        <div className="container">
          <span className="section-label">What We Do</span>
          <h1 className="heading-xl" style={{ color: 'white', marginTop: 'var(--space-3)' }}>
            Engineering Programs
          </h1>
          <p style={{ color: 'rgb(255 255 255 / 0.75)', fontSize: 'var(--text-lg)', maxWidth: '52ch', marginTop: 'var(--space-4)' }}>
            Four subject areas. Dozens of challenges. One goal: students who understand engineering
            by doing it — not by reading about it.
          </p>
        </div>
      </section>

      {/* Programs list */}
      <section className="section">
        <div className="container">
          <div className="programs-list">
            {programs.map(({ id, colorClass, emoji, title, tagline, grades, duration, concepts, description, challenge }) => (
              <article key={id} className={`program-card ${colorClass}`} aria-labelledby={`prog-${id}`}>
                <div className="program-card__sidebar">
                  <div className="program-card__emoji" aria-hidden="true">{emoji}</div>
                  <div className="program-card__meta">
                    <div className="program-card__meta-item">
                      <span className="program-card__meta-label">Grades</span>
                      <span className="program-card__meta-value">{grades}</span>
                    </div>
                    <div className="program-card__meta-item">
                      <span className="program-card__meta-label">Duration</span>
                      <span className="program-card__meta-value">{duration}</span>
                    </div>
                  </div>
                  <Link to="/workshops" className="btn btn-primary">Book This Program</Link>
                </div>

                <div className="program-card__body">
                  <p className="program-card__tagline">{tagline}</p>
                  <h2 className="heading-md" id={`prog-${id}`}>{title}</h2>
                  <p className="program-card__desc">{description}</p>

                  <div className="program-card__challenge">
                    <span className="program-card__challenge-label">The Challenge</span>
                    <blockquote className="program-card__challenge-text">
                      {challenge}
                    </blockquote>
                  </div>

                  <div className="program-card__concepts">
                    <span className="program-card__concepts-label">Concepts Covered</span>
                    <ul className="program-card__concepts-list" role="list">
                      {concepts.map((c) => (
                        <li key={c} className="program-card__concept">{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-alt" aria-labelledby="programs-cta-heading">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="heading-md" id="programs-cta-heading">Ready to bring a program to your students?</h2>
          <p style={{ color: 'var(--color-text-muted)', marginTop: 'var(--space-3)', fontSize: 'var(--text-lg)' }}>
            We work with schools, community orgs, and after-school programs — and we handle everything.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', marginTop: 'var(--space-8)', flexWrap: 'wrap' }}>
            <Link to="/workshops" className="btn btn-primary btn-lg">Request a Workshop</Link>
            <Link to="/contact" className="btn btn-outline btn-lg">Ask a Question</Link>
          </div>
        </div>
      </section>
    </>
  )
}
