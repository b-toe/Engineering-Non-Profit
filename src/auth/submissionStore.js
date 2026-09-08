const SUBS_KEY = 'techids_submissions'

function getAll() {
  try { return JSON.parse(localStorage.getItem(SUBS_KEY) || '[]') }
  catch { return [] }
}

function save(subs) {
  try { localStorage.setItem(SUBS_KEY, JSON.stringify(subs)) }
  catch {}
}

export function addSubmission(type, data, submitterEmail) {
  const entry = {
    id: `sub-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    data,
    submitterEmail,
    submittedAt: new Date().toISOString(),
    status: 'pending',
  }
  save([entry, ...getAll()])
  return entry
}

export function getAllSubmissions() { return getAll() }

export function getSubmissionsByEmail(email) {
  return getAll().filter((s) => s.submitterEmail?.toLowerCase() === email.toLowerCase())
}

export function updateStatus(id, status) {
  save(getAll().map((s) => (s.id === id ? { ...s, status } : s)))
}
