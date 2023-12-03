const JWT_SECRET = process.env.JWT_SECRET || 'random' // note: fixed fallback is security issue, but for this simple project this will do
const JWT_ACCESS_EXPIRATION = process.env.JWT_ACCESS_EXPIRATION || '1h'
const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION || '7d'

export { JWT_SECRET, JWT_ACCESS_EXPIRATION, JWT_REFRESH_EXPIRATION }
