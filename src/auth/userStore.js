const USERS_KEY = 'techids_users'

function getAll() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') }
  catch { return [] }
}

function save(users) {
  try { localStorage.setItem(USERS_KEY, JSON.stringify(users)) }
  catch {}
}

export function findByEmail(email) {
  return getAll().find((u) => u.email.toLowerCase() === email.toLowerCase()) || null
}

export function createUser(email, passwordHash) {
  const users = getAll()
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { error: 'An account with this email already exists.' }
  }
  const user = {
    id: `user-${Date.now()}`,
    email,
    passwordHash,
    role: 'user',
    createdAt: new Date().toISOString(),
  }
  save([...users, user])
  return { user }
}
