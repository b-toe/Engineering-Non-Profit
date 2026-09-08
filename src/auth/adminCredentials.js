// Admin accounts — to change a password, run:
//   echo -n "yourpassword" | shasum -a 256
// and replace the passwordHash value.
//
// DEFAULT PASSWORD for all accounts: Techids@Admin2024
// Change before going live.

export const ADMIN_ACCOUNTS = [
  {
    id: 'admin-alberto',
    username: 'alberto',
    displayName: 'Alberto',
    role: 'admin',
    passwordHash: '0f0c0c200197967c33eb3fa50c4269a8c51eb4b3256cc447e50b72f7e14c3747',
  },
  {
    id: 'admin-yaakov',
    username: 'yaakov',
    displayName: 'Yaakov',
    role: 'admin',
    passwordHash: '0f0c0c200197967c33eb3fa50c4269a8c51eb4b3256cc447e50b72f7e14c3747',
  },
  {
    id: 'admin-main',
    username: 'admin',
    displayName: 'Admin',
    role: 'admin',
    passwordHash: '0f0c0c200197967c33eb3fa50c4269a8c51eb4b3256cc447e50b72f7e14c3747',
  },
]
