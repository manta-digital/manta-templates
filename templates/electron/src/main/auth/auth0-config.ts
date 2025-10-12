// Load .env file first before reading environment variables
import { config } from 'dotenv'
import { join } from 'node:path'
import { authLogger } from './logger'

const envPath = join(process.cwd(), '.env')
config({ path: envPath })

// Debug: Log environment variables at startup
authLogger.debug('AUTH ENV DEBUG (after dotenv load):')
authLogger.debug('  process.env.AUTH_ENABLED:', process.env.AUTH_ENABLED)
authLogger.debug('  process.env.AUTH0_DOMAIN:', process.env.AUTH0_DOMAIN)
authLogger.debug('  process.env.AUTH0_CLIENT_ID:', process.env.AUTH0_CLIENT_ID ? '***set***' : 'not set')
authLogger.debug('  process.env.NODE_ENV:', process.env.NODE_ENV)

// Check if auth is enabled - use process.env (main process)
export const isAuthEnabled = process.env.AUTH_ENABLED === 'true'

// Custom protocol scheme - should be unique per application
// TODO: Change this to match your app name to avoid conflicts with other Electron apps
export const AUTH_PROTOCOL_SCHEME = 'manta-electron-template'

export const auth0Config = {
  domain: process.env.AUTH0_DOMAIN || '',
  clientId: process.env.AUTH0_CLIENT_ID || '',
  audience: process.env.AUTH0_AUDIENCE,
  scope: 'openid profile email offline_access',
  // Use unique protocol to avoid conflicts with other Electron apps
  redirectUri: `${AUTH_PROTOCOL_SCHEME}://callback`,
}

// Validation with helpful error message - only if auth is enabled
if (isAuthEnabled) {
  if (!auth0Config.domain || !auth0Config.clientId) {
    authLogger.error(
      '\nAuth0 Configuration Error:\n' +
      '   AUTH_ENABLED is true but AUTH0_DOMAIN and AUTH0_CLIENT_ID are not set in .env\n' +
      '   See .env.example for required variables\n' +
      '   Set AUTH_ENABLED=false to disable authentication\n'
    )
    throw new Error('Missing Auth0 configuration')
  }
  authLogger.success('Auth0 authentication enabled')
} else {
  authLogger.info('Auth0 authentication disabled (AUTH_ENABLED not set to true)')
}
