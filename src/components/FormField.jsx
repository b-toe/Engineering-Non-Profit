import './FormField.css'

/**
 * Accessible form field wrapper.
 * Renders label + input/textarea/select + error with aria-describedby wiring.
 */
export default function FormField({
  id,
  label,
  hint,
  error,
  touched,
  required: isRequired,
  children,    // rendered input element (cloned with id + aria props)
  className = '',
}) {
  const descId  = `${id}-desc`
  const errorId = `${id}-error`
  const showError = !!(touched && error)

  return (
    <div className={`field${showError ? ' field--error' : ''} ${className}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {isRequired && <span className="field__required" aria-hidden="true"> *</span>}
      </label>

      {hint && <p className="field__hint" id={descId}>{hint}</p>}

      {/* Pass down a11y props to the actual input */}
      {children({
        id,
        'aria-describedby': [hint ? descId : null, showError ? errorId : null]
          .filter(Boolean)
          .join(' ') || undefined,
        'aria-invalid': showError ? 'true' : undefined,
        'aria-required': isRequired ? 'true' : undefined,
      })}

      {showError && (
        <p className="field__error" id={errorId} role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  )
}
