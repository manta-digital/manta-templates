/**
 * Auth Logger Utility
 *
 * Conditionally logs auth-related messages based on environment
 * Set AUTH_DEBUG=true in .env to enable debug logging in production
 */

const isDev = process.env.NODE_ENV === 'development'
const isDebugEnabled = process.env.AUTH_DEBUG === 'true' || isDev

export const authLogger = {
  debug: (...args: any[]) => {
    if (isDebugEnabled) {
      console.log('🔍 [Auth]', ...args)
    }
  },

  info: (...args: any[]) => {
    console.log('ℹ️  [Auth]', ...args)
  },

  success: (...args: any[]) => {
    console.log('✅ [Auth]', ...args)
  },

  error: (...args: any[]) => {
    console.error('❌ [Auth]', ...args)
  },

  warn: (...args: any[]) => {
    console.warn('⚠️  [Auth]', ...args)
  },

  // Security-sensitive: Never log in production
  sensitive: (message: string, data?: any) => {
    if (isDev && isDebugEnabled) {
      console.log('🔐 [Auth Sensitive]', message, data ? '(data hidden in prod)' : '')
      if (data) {
        console.log('  ', data)
      }
    }
  }
}
