import { useState, useCallback, useRef } from 'react'

/**
 * Secure form hook with field-level validation, blur-triggered errors,
 * honeypot anti-spam, and submit state management.
 *
 * @param {object} initialValues  - { fieldName: defaultValue }
 * @param {object} rules          - { fieldName: (value) => errorString | null }
 */
export function useForm(initialValues, rules = {}) {
  const [values, setValues]       = useState(initialValues)
  const [errors, setErrors]       = useState({})
  const [touched, setTouched]     = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  // Honeypot: filled value means bot — never sent to any backend
  const [honeypot, setHoneypot]   = useState('')
  const firstErrorRef             = useRef(null)

  const validateField = useCallback(
    (name, value) => (rules[name] ? rules[name](value, values) ?? null : null),
    [rules, values],
  )

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (touched[name]) {
      setErrors((err) => ({ ...err, [name]: rules[name]?.(value, values) ?? null }))
    }
  }, [touched, rules, values])

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors((err) => ({ ...err, [name]: validateField(name, value) }))
  }, [validateField])

  /** Run all validators, focus first error field, return whether form is valid. */
  const validate = useCallback(() => {
    const newErrors = {}
    Object.keys(rules).forEach((field) => {
      const err = rules[field](values[field], values)
      if (err) newErrors[field] = err
    })
    setErrors(newErrors)
    setTouched(Object.fromEntries(Object.keys(rules).map((k) => [k, true])))
    if (Object.keys(newErrors).length > 0) {
      // Focus first error for accessibility
      const first = Object.keys(newErrors)[0]
      firstErrorRef.current = first
      document.getElementById(first)?.focus()
      return false
    }
    return true
  }, [rules, values])

  /**
   * Returns an onSubmit handler. Pass your async submit function.
   * Silently drops submissions from honeypot-filled bots.
   */
  const handleSubmit = useCallback(
    (onSubmit) => async (e) => {
      e.preventDefault()
      setSubmitError(null)

      // Honeypot check — bots fill hidden fields
      if (honeypot !== '') return

      if (!validate()) return

      setSubmitting(true)
      try {
        await onSubmit(values)
        setSubmitted(true)
      } catch (err) {
        setSubmitError(err?.message ?? 'Something went wrong. Please try again.')
      } finally {
        setSubmitting(false)
      }
    },
    [honeypot, validate, values],
  )

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setSubmitted(false)
    setSubmitError(null)
    setHoneypot('')
  }, [initialValues])

  return {
    values,
    errors,
    touched,
    submitting,
    submitted,
    submitError,
    honeypot,
    setHoneypot,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  }
}

// ---- Composable validators ----

export const required = (label) => (v) =>
  !v?.toString().trim() ? `${label} is required.` : null

export const email = () => (v) => {
  if (!v?.trim()) return 'Email address is required.'
  // RFC-5321 simplified pattern — no eval, no regex from user input
  if (!/^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(v.trim()))
    return 'Enter a valid email address.'
  return null
}

export const maxLength = (label, max) => (v) =>
  v?.length > max ? `${label} must be ${max} characters or fewer.` : null

export const minLength = (label, min) => (v) =>
  !v?.trim() || v.trim().length < min
    ? `${label} must be at least ${min} characters.`
    : null

/** Compose validators — returns first failing error, or null. */
export const compose = (...fns) => (v, all) => {
  for (const fn of fns) {
    const err = fn(v, all)
    if (err) return err
  }
  return null
}
