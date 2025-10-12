import { app, protocol } from 'electron'
import { auth0Client } from './auth0-client'
import { AUTH_PROTOCOL_SCHEME } from './auth0-config'
import { authLogger } from './logger'

/**
 * Auth Protocol Handler for OAuth Callbacks (Slice 110)
 *
 * macOS only - uses open-url event
 * Windows/Linux support comes in Slice 114 (second-instance event)
 */

export function registerAuthProtocol() {
  // Must be called BEFORE app.ready
  protocol.registerSchemesAsPrivileged([
    {
      scheme: AUTH_PROTOCOL_SCHEME,
      privileges: {
        standard: true,
        secure: true,
        supportFetchAPI: false,
        corsEnabled: false
      }
    }
  ])
}

export function setupAuthProtocolHandler() {
  // macOS: Set as default handler AFTER app is ready
  if (process.platform === 'darwin') {
    const registered = app.setAsDefaultProtocolClient(AUTH_PROTOCOL_SCHEME)
    authLogger.debug('Protocol handler registered:', registered)
    authLogger.debug('Is default protocol client:', app.isDefaultProtocolClient(AUTH_PROTOCOL_SCHEME))
  }

  // macOS only - open-url event
  app.on('open-url', async (event, url) => {
    event.preventDefault()
    authLogger.debug('RECEIVED CALLBACK URL:', url)

    if (url.startsWith(`${AUTH_PROTOCOL_SCHEME}://callback`)) {
      try {
        authLogger.debug('Processing auth callback...')
        await auth0Client.handleCallback(url)
        authLogger.success('Auth callback processed successfully!')
      } catch (error) {
        authLogger.error('Auth callback error:', error)
      }
    }
  })

  authLogger.success('Auth protocol handler setup complete')
}
