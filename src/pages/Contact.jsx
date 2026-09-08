import FormField from '../components/FormField'
import { useForm, required, email, compose, maxLength, minLength } from '../hooks/useForm'
import { addSubmission } from '../auth/submissionStore'
import './Contact.css'

// ---- Form setup -------------------------------------------------------

const initialValues = {
  role:    '',
  name:    '',
  email:   '',
  org:     '',
  message: '',
}

const rules = {
  role:    required('Your role'),
  name:    compose(required('Your name'), maxLength('Name', 100)),
  email:   email(),
  org:     maxLength('Organization', 150),
  message: compose(
    required('Message'),
    minLength('Message', 10),
    maxLength('Message', 2000),
  ),
}

// Roles that should show the org field
const ORG_ROLES = new Set(['teacher', 'admin', 'company', 'org'])

const roleOptions = [
  { value: 'student',  label: 'Student' },
  { value: 'parent',   label: 'Parent / Guardian' },
  { value: 'teacher',  label: 'Teacher' },
  { value: 'admin',    label: 'School Administrator' },
  { value: 'company',  label: 'Company / Sponsor' },
  { value: 'volunteer', label: 'Volunteer' },
  { value: 'org',      label: 'Community Organization' },
  { value: 'other',    label: 'Other' },
]

// ---- Component --------------------------------------------------------

function ContactForm() {
  const {
    values, errors, touched, submitting, submitted, submitError,
    honeypot, setHoneypot,
    handleChange, handleBlur, handleSubmit, reset,
  } = useForm(initialValues, rules)

  const showOrg = ORG_ROLES.has(values.role)

  const onSubmit = async (data) => {
    addSubmission('contact', data, data.email)
    await new Promise((res) => setTimeout(res, 400))
  }

  if (submitted) {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <div className="form-success__icon" aria-hidden="true">📬</div>
        <h3>Message Sent!</h3>
        <p>
          Thanks, {values.name.split(' ')[0]}! We read every message and will get back to you
          within 2 business days.
        </p>
        <button className="btn btn-outline" onClick={reset}>Send another message</button>
      </div>
    )
  }

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact form"
    >
      {/* Honeypot */}
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="hp-url">URL (leave blank)</label>
        <input
          type="text"
          id="hp-url"
          name="url"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <FormField id="role" label="I am a…" required error={errors.role} touched={touched.role}>
        {(a11y) => (
          <select {...a11y} name="role" value={values.role} onChange={handleChange} onBlur={handleBlur}>
            <option value="">Select your role…</option>
            {roleOptions.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        )}
      </FormField>

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
              placeholder="you@example.com"
              autoComplete="email"
              maxLength={254}
            />
          )}
        </FormField>
      </div>

      {showOrg && (
        <FormField
          id="org"
          label="Organization / School"
          error={errors.org}
          touched={touched.org}
          hint="Optional — helps us respond more specifically to your situation."
        >
          {(a11y) => (
            <input
              {...a11y}
              type="text"
              name="org"
              value={values.org}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Lincoln Elementary School"
              autoComplete="organization"
              maxLength={150}
            />
          )}
        </FormField>
      )}

      <FormField
        id="message"
        label="Message"
        required
        error={errors.message}
        touched={touched.message}
        hint={`${values.message.length}/2000 characters`}
      >
        {(a11y) => (
          <textarea
            {...a11y}
            name="message"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tell us what you're looking for, what questions you have, or how we can help…"
            maxLength={2000}
            rows={5}
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
        className="btn btn-primary btn-lg"
        disabled={submitting}
        aria-busy={submitting}
      >
        {submitting ? 'Sending…' : 'Send Message'}
      </button>

      <p className="form-privacy">
        We only use your information to respond to your message and will never share it with third parties.
      </p>
    </form>
  )
}

// ---- Page -------------------------------------------------------------

export default function Contact() {
  return (
    <>
      <section className="page-header page-header--contact">
        <div className="container">
          <span className="section-label">Get in Touch</span>
          <h1 className="heading-xl" style={{ color: 'white', marginTop: 'var(--space-3)' }}>
            Contact Us
          </h1>
          <p style={{ color: 'rgb(255 255 255 / 0.75)', fontSize: 'var(--text-lg)', maxWidth: '50ch', marginTop: 'var(--space-4)' }}>
            Whether you're a student, parent, teacher, sponsor, or volunteer — we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-layout__info">
              <h2 className="heading-md">How can we help?</h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                Use the form to ask any question — about our programs, how to get involved,
                sponsorship, or anything else. We respond within 2 business days.
              </p>

              <div className="contact-cards">
                <div className="contact-card">
                  <span className="contact-card__icon" aria-hidden="true">🏫</span>
                  <div>
                    <h3>Schools &amp; Teachers</h3>
                    <p>Looking to book a workshop? Use the <a href="/workshops" style={{ color: 'var(--color-primary)' }}>Workshops page</a> for faster handling.</p>
                  </div>
                </div>
                <div className="contact-card">
                  <span className="contact-card__icon" aria-hidden="true">🤝</span>
                  <div>
                    <h3>Sponsors &amp; Partners</h3>
                    <p>Interested in supporting Techids? Tell us about your organization and goals.</p>
                  </div>
                </div>
                <div className="contact-card">
                  <span className="contact-card__icon" aria-hidden="true">🙋</span>
                  <div>
                    <h3>Volunteers</h3>
                    <p>We're always looking for people who want to help run workshops and build programs.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-layout__form">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
