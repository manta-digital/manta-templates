import { createServer, type Server, type IncomingMessage, type ServerResponse } from 'node:http'
import { URL } from 'node:url'
import { BrowserWindow } from 'electron'
import { auth0Client } from './auth0-client'
import { setCallbackPort } from './auth0-config'
import { authLogger } from './logger'

let server: Server | null = null

/**
 * Start localhost callback server on random available port
 * Returns the port number
 */
export async function startCallbackServer(): Promise<number> {
  if (server) {
    authLogger.warn('Callback server already running')
    return (server.address() as any).port
  }

  return new Promise((resolve, reject) => {
    server = createServer(handleCallback)

    server.on('error', (error) => {
      authLogger.error('Callback server error:', error)
      reject(error)
    })

    // Listen on fixed port 52847
    // Auth0 and Okta don't support RFC 8252 dynamic ports despite OAuth spec requiring it
    // Using high port number to minimize conflicts
    const AUTH_CALLBACK_PORT = 52847
    server.listen(AUTH_CALLBACK_PORT, '127.0.0.1', () => {
      const address = server!.address()
      if (typeof address === 'object' && address !== null) {
        const port = address.port
        setCallbackPort(port)
        authLogger.success(`Auth callback server listening on http://localhost:${port}`)
        resolve(port)
      } else {
        reject(new Error('Failed to get server address'))
      }
    })
  })
}

/**
 * Stop the callback server
 */
export function stopCallbackServer(): Promise<void> {
  if (!server) {
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    server!.close(() => {
      authLogger.debug('Callback server stopped')
      server = null
      resolve()
    })
  })
}

/**
 * Handle incoming callback requests
 */
async function handleCallback(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url || '', `http://${req.headers.host}`)

  authLogger.debug('Callback request received:', url.pathname)

  // Only handle /callback path
  if (url.pathname !== '/callback') {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not Found')
    return
  }

  try {
    // Extract code and state from query params
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')

    if (!code || !state) {
      throw new Error('Missing code or state parameter')
    }

    authLogger.debug('Processing auth callback...')

    // Build full callback URL for auth0Client
    const callbackUrl = url.toString()
    await auth0Client.handleCallback(callbackUrl)

    authLogger.success('Auth callback processed successfully!')

    // Send success response to browser
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Authentication Successful</title>
          <style>
            body { font-family: system-ui; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f5f5f5; }
            .container { text-align: center; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            h1 { color: #10b981; margin: 0 0 1rem; }
            p { color: #666; margin: 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>✓ Authentication Successful</h1>
            <p>You can close this browser tab and return to the application.</p>
          </div>
          <script>setTimeout(() => window.close(), 2000)</script>
        </body>
      </html>
    `)

    // Restore and reload the main window
    const allWindows = BrowserWindow.getAllWindows()
    if (allWindows.length > 0) {
      const mainWindow = allWindows[0]
      mainWindow.show()
      mainWindow.focus()
      // Reload to show authenticated state
      mainWindow.reload()
    }

    // Stop the server after successful auth
    setTimeout(() => stopCallbackServer(), 3000)

  } catch (error) {
    authLogger.error('Auth callback error:', error)

    res.writeHead(500, { 'Content-Type': 'text/html' })
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Authentication Failed</title>
          <style>
            body { font-family: system-ui; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f5f5f5; }
            .container { text-align: center; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            h1 { color: #ef4444; margin: 0 0 1rem; }
            p { color: #666; margin: 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>✗ Authentication Failed</h1>
            <p>An error occurred during authentication. Please try again.</p>
          </div>
        </body>
      </html>
    `)
  }
}
