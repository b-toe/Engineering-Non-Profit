import { Link } from 'react-router-dom'
import FormField from '../components/FormField'
import { useForm, required, email, compose, maxLength, minLength } from '../hooks/useForm'
import { addSubmission } from '../auth/submissionStore'
import './Workshops.css'

// ---- Workshop structure steps ----------------------------------------

const workshopSteps = [
  { icon: '📖', title: 'Lesson', desc: 'We open with a short, visual introduction to the engineering concept behind the challenge.' },
  { icon: '🏗️', title: 'Build', desc: 'Students receive their materials and get to work — designing and constructing their solution.' },
  { icon: '⚡', title: 'Challenge', desc: 'The engineering challenge begins. Each team puts their design to the test against the problem.' },
  { icon: '🔬', title: 'Test', desc: 'We test every design — seeing how much weight it holds, whether it floats, or how far it moves.' },
  { icon: '💡', title: 'Reflection', desc: 'Groups share what worked, what failed, and why. We connect their discoveries to real-world engineering.' },
  { icon: '🧹', title: 'Cleanup', desc: 'We handle all cleanup. Materials are sorted and repacked — your classroom stays spotless.' },
]

// ---- Form setup -------------------------------------------------------

const initialValues = {
  name:         '',
  email:        '',
  school:       '',
  role:         '',
  program:      '',
  students:     '',
  grades:       '',
  date:         '',
  notes:        '',
}

const rules = {
  name:    compose(required('Your name'), maxLength('Name', 100)),
  email:   email(),
  school:  compose(required('School or organization name'), maxLength('School name', 150)),
  role:    required('Your role'),
  program: required('Program interest'),
  students: (v) => {
    if (!v?.trim()) return 'Number of students is required.'
    const n = parseInt(v, 10)
    if (isNaN(n) || n < 1) return 'Enter a valid number of students (minimum 1).'
    if (n > 500) return 'For groups over 500, please contact us directly.'
    return null
  },
  grades:  required('Grade level(s)'),
  notes:   maxLength('Additional notes', 1000),
}

// ---- Form component ---------------------------------------------------

function WorkshopForm() {
  const {
    values, errors, touched, submitting, submitted, submitError,
    honeypot, setHoneypot,
    handleChange, handleBlur, handleSubmit, reset,
  } = useForm(initialValues, rules)

  const onSubmit = async (data) => {
    addSubmission('workshop', data, data.email)
    await new Promise((res) => setTimeout(res, 400))
  }

  if (submitted) {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <div className="form-success__icon" aria-hidden="true">✅</div>
        <h3>Request Received!</h3>
        <p>Thanks, {values.name.split(' ')[0]}! We'll be in touch within 2 business days to confirm details for <strong>{values.school}</strong>.</p>
        <button className="btn btn-outline" onClick={reset}>Submit another request</button>
      </div>
    )
  }

  return (
    <form
      className="workshop-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Workshop request form"
    >
      {/* Honeypot — hidden from real users, attracts bots */}
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="hp-website">Website (leave blank)</label>
        <input
          type="text"
          id="hp-website"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="form-row">
        <FormField id="name" label="Your name" required error={errors.name} touched={touched.name}>
          {(a11y) => (
            <input
              {...a11y}
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Jane Smith"
              autoComplete="name"
              maxLength={100}
            />
          )}
        </FormField>

        <FormField id="email" label="Email address" required error={errors.email} touched={touched.email}>
          {(a11y) => (
            <input
              {...a11y}
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="you@school.edu"
              autoComplete="email"
              maxLength={254}
            />
          )}
        </FormField>
      </div>

      <div className="form-row">
        <FormField id="school" label="School or organization" required error={errors.school} touched={touched.school}>
          {(a11y) => (
            <input
              {...a11y}
              type="text"
              name="school"
              value={values.school}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Lincoln Elementary School"
              autoComplete="organization"
              maxLength={150}
            />
          )}
        </FormField>

        <FormField id="role" label="Your role" required error={errors.role} touched={touched.role}>
          {(a11y) => (
            <select {...a11y} name="role" value={values.role} onChange={handleChange} onBlur={handleBlur}>
              <option value="">Select your role…</option>
              <option value="teacher">Classroom Teacher</option>
              <option value="admin">School Administrator</option>
              <option value="parent">Parent / Guardian</option>
              <option value="org">Community Org / After-School</option>
              <option value="other">Other</option>
            </select>
          )}
        </FormField>
      </div>

      <div className="form-row">
        <FormField id="program" label="Program of interest" required error={errors.program} touched={touched.program}>
          {(a11y) => (
            <select {...a11y} name="program" value={values.program} onChange={handleChange} onBlur={handleBlur}>
              <option value="">Select a program…</option>
              <option value="bridge">Bridge Engineering</option>
              <option value="robotics">Robotics</option>
              <option value="mechanical">Mechanical Engineering</option>
              <option value="water">Water Engineering</option>
              <option value="unsure">Not sure yet — let's talk</option>
            </select>
          )}
        </FormField>

        <FormField
          id="students"
          label="Estimated number of students"
          required
          error={errors.students}
          touched={touched.students}
          hint="We typically work with groups of 15–35."
        >
          {(a11y) => (
            <input
              {...a11y}
              type="number"
              name="students"
              value={values.students}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="25"
              min="1"
              max="500"
            />
          )}
        </FormField>
      </div>

      <div className="form-row">
        <FormField id="grades" label="Grade level(s)" required error={errors.grades} touched={touched.grades}>
          {(a11y) => (
            <select {...a11y} name="grades" value={values.grades} onChange={handleChange} onBlur={handleBlur}>
              <option value="">Select grade(s)…</option>
              <option value="2">Grade 2</option>
              <option value="3">Grade 3</option>
              <option value="4">Grade 4</option>
              <option value="5">Grade 5</option>
              <option value="2-3">Grades 2–3</option>
              <option value="3-4">Grades 3–4</option>
              <option value="4-5">Grades 4–5</option>
              <option value="2-5">Grades 2–5 (mixed)</option>
            </select>
          )}
        </FormField>

        <FormField
          id="date"
          label="Preferred date or date range"
          hint="Flexible? Just say 'anytime in March' — we'll work around your schedule."
          error={errors.date}
          touched={touched.date}
        >
          {(a11y) => (
            <input
              {...a11y}
              type="text"
              name="date"
              value={values.date}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. March 10–14, or 'anytime in April'"
              maxLength={100}
            />
          )}
        </FormField>
      </div>

      <FormField
        id="notes"
        label="Anything else we should know?"
        hint={`${values.notes.length}/1000 characters`}
        error={errors.notes}
        touched={touched.notes}
      >
        {(a11y) => (
          <textarea
            {...a11y}
            name="notes"
            value={values.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Special accommodations, scheduling constraints, specific goals for students…"
            maxLength={1000}
            rows={4}
          />
        )}
      </FormField>

      {submitError && (
        <p className="form-submit-error" role="alert" aria-live="assertive">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-accent btn-lg"
        disabled={submitting}
        aria-busy={submitting}
      >
        {submitting ? 'Sending…' : 'Send Workshop Request'}
      </button>

      <p className="form-privacy">
        Your information is used only to schedule your workshop and is never sold or shared with third parties.
      </p>
    </form>
  )
}

// ---- Page -------------------------------------------------------------

export default function Workshops() {
  return (
    <>
      {/* Page header */}
      <section className="page-header page-header--workshops">
        <div className="container">
          <span className="section-label">Bring It to Your School</span>
          <h1 className="heading-xl" style={{ color: 'white', marginTop: 'var(--space-3)' }}>
            Request a Workshop
          </h1>
          <p style={{ color: 'rgb(255 255 255 / 0.75)', fontSize: 'var(--text-lg)', maxWidth: '52ch', marginTop: 'var(--space-4)' }}>
            We come to you. Fill in the form below and we'll get back to you within 2 business days.
          </p>
        </div>
      </section>

      {/* Workshop structure */}
      <section className="section section-alt" aria-labelledby="how-it-works">
        <div className="container">
          <div className="section-intro">
            <span className="section-label">What to Expect</span>
            <h2 className="heading-lg" id="how-it-works">How a Workshop Runs</h2>
            <p className="section-intro__sub">
              Every Techids workshop follows the same structure — a proven format designed to keep students engaged from the first minute to the last.
            </p>
          </div>
          <ol className="workshop-steps" aria-label="Workshop structure" role="list">
            {workshopSteps.map(({ icon, title, desc }) => (
              <li key={title} className="workshop-step">
                <div className="workshop-step__icon" aria-hidden="true">{icon}</div>
                <div>
                  <h3 className="workshop-step__title">{title}</h3>
                  <p className="workshop-step__desc">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Request form */}
      <section className="section" aria-labelledby="request-heading">
        <div className="container">
          <div className="workshop-layout">
            <div className="workshop-layout__info">
              <span className="section-label">Request a Workshop</span>
              <h2 className="heading-lg" id="request-heading">Book for Your Students</h2>
              <ul className="workshop-includes" aria-label="What's included">
                {[
                  'All materials provided',
                  'Facilitation by Techids team',
                  'Setup and full cleanup',
                  'Curriculum-aligned learning objectives',
                  'Post-workshop summary for teachers',
                  'Works in your classroom, gym, or library',
                ].map((item) => (
                  <li key={item} className="workshop-includes__item">
                    <span aria-hidden="true">✓</span> {item}
                  </li>
                ))}
              </ul>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-4)' }}>
                Have a question first?{' '}
                <Link to="/contact" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Contact us here →</Link>
              </p>
            </div>

            <div className="workshop-layout__form">
              <WorkshopForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
