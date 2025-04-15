// Unified settings file

// mongodb settings
export const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017"
export const MONGODB_NAME = process.env.MONGODB_NAME || "blog"

// Encrypt token key
export const SECRET = process.env.SECRET || "rain"

// Cookie settings
// https://nuxt.com/docs/api/composables/use-cookie
export const TokenName = "rain_token"
export const CookieSetting = {
  maxAge: 604800, // 7 days
  sameSite: 'lax' as 'lax',
  httpOnly: false,
  // secure: true,
}