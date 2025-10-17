// Load .env file
import { app } from 'electron'
import { authLogger } from './logger'

// Load .env from appropriate location
const { config } = await import('dotenv')
const { join } = await import('node:path')

const envPath = app.isPackaged
  ? join(process.resourcesPath, '.env')  // Packaged: look in Resources/
  : join(process.cwd(), '.env')          // Dev: look in project root

config({ path: envPath })
authLogger.debug('Loading .env from:', envPath)
authLogger.debug('.env file exists:', require('fs').existsSync(envPath))

// Debug: Log environment variables at startup
authLogger.debug('AUTH ENV DEBUG (after dotenv load):')
authLogger.debug('  process.env.AUTH_ENABLED:', process.env.AUTH_ENABLED)
authLogger.debug('  process.env.AUTH0_DOMAIN:', process.env.AUTH0_DOMAIN)
authLogger.debug('  process.env.AUTH0_CLIENT_ID:', process.env.AUTH0_CLIENT_ID ? '***set***' : 'not set')
authLogger.debug('  process.env.NODE_ENV:', process.env.NODE_ENV)

// Check if auth is enabled - use process.env (main process)
export const isAuthEnabled = process.env.AUTH_ENABLED === 'true'

// Localhost callback port (will be set dynamically when server starts)
export let callbackPort: number | null = null
export function setCallbackPort(port: number) {
  callbackPort = port
}

export function getRedirectUri(): string {
  if (callbackPort === null) {
    throw new Error('Callback server not started - port not set')
  }
  return `http://localhost:${callbackPort}/callback`
}

export const auth0Config = {
  domain: process.env.AUTH0_DOMAIN || '',
  clientId: process.env.AUTH0_CLIENT_ID || '',
  audience: process.env.AUTH0_AUDIENCE,
  scope: 'openid profile email offline_access',
}

// Validation with helpful error message - only if auth is enabled
if (isAuthEnabled) {
  if (!auth0Config.domain || !auth0Config.clientId) {
    const configSource = app.isPackaged
      ? 'environment variables (AUTH0_DOMAIN, AUTH0_CLIENT_ID)'
      : '.env file'
    authLogger.error(
      '\nAuth0 Configuration Error:\n' +
      `   AUTH_ENABLED is true but AUTH0_DOMAIN and AUTH0_CLIENT_ID are not set\n` +
      `   Configuration source: ${configSource}\n` +
      (app.isPackaged
        ? '   Set environment variables when launching the app\n'
        : '   See .env.example for required variables\n') +
      '   Set AUTH_ENABLED=false to disable authentication\n'
    )
    throw new Error('Missing Auth0 configuration')
  }
  authLogger.success('Auth0 authentication enabled')
} else {
  authLogger.info('Auth0 authentication disabled (AUTH_ENABLED not set to true)')
}
