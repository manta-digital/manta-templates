import { app, protocol } from 'electron'
import { auth0Client } from './auth0-client'

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
      scheme: 'electronapp',
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
    app.setAsDefaultProtocolClient('electronapp')
  }

  // macOS only - open-url event
  app.on('open-url', async (event, url) => {
    event.preventDefault()

    if (url.startsWith('electronapp://callback')) {
      try {
        await auth0Client.handleCallback(url)
      } catch (error) {
        console.error('Auth callback error:', error)
      }
    }
  })
}
