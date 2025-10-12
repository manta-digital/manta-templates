import { app, protocol } from 'electron'
import { auth0Client } from './auth0-client'
import { AUTH_PROTOCOL_SCHEME } from './auth0-config'

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
    console.log('🔐 Protocol handler registered:', registered)
    console.log('🔐 Is default protocol client:', app.isDefaultProtocolClient(AUTH_PROTOCOL_SCHEME))
  }

  // macOS only - open-url event
  app.on('open-url', async (event, url) => {
    event.preventDefault()
    console.log('🔐 RECEIVED CALLBACK URL:', url)

    if (url.startsWith(`${AUTH_PROTOCOL_SCHEME}://callback`)) {
      try {
        console.log('🔐 Processing auth callback...')
        await auth0Client.handleCallback(url)
        console.log('🔐 Auth callback processed successfully!')
      } catch (error) {
        console.error('❌ Auth callback error:', error)
      }
    }
  })

  console.log('🔐 Auth protocol handler setup complete')
}
