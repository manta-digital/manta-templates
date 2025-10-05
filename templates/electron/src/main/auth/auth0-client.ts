import { shell } from 'electron'
import { generatePKCEPair, generateState } from './pkce'
import { auth0Config } from './auth0-config'

interface PendingAuth {
  state: string
  codeVerifier: string
  timestamp: number
}

interface TokenSet {
  accessToken: string
  refreshToken: string
  idToken: string
  expiresAt: number
}

class Auth0Client {
  private pendingAuth: PendingAuth | null = null
  private tokens: TokenSet | null = null
  private readonly STATE_TIMEOUT = 10 * 60 * 1000 // 10 minutes
  private readonly debug = process.env.NODE_ENV === 'development'

  async login(): Promise<void> {
    const { verifier, challenge } = generatePKCEPair()
    const state = generateState()

    // Store for verification
    this.pendingAuth = {
      state,
      codeVerifier: verifier,
      timestamp: Date.now()
    }

    // Build authorization URL
    const authUrl = new URL(`https://${auth0Config.domain}/authorize`)
    authUrl.searchParams.set('client_id', auth0Config.clientId)
    authUrl.searchParams.set('redirect_uri', auth0Config.redirectUri)
    authUrl.searchParams.set('response_type', 'code')
    authUrl.searchParams.set('code_challenge', challenge)
    authUrl.searchParams.set('code_challenge_method', 'S256')
    authUrl.searchParams.set('state', state)
    authUrl.searchParams.set('scope', auth0Config.scope)

    if (auth0Config.audience) {
      authUrl.searchParams.set('audience', auth0Config.audience)
    }

    if (this.debug) {
      console.log('🔐 Auth URL:', authUrl.toString())
      console.log('📋 State:', state)
      console.log('🔑 Code Challenge:', challenge.substring(0, 20) + '...')
    }

    console.log('Opening auth URL in browser...')
    await shell.openExternal(authUrl.toString())
  }

  async handleCallback(callbackUrl: string): Promise<void> {
    const url = new URL(callbackUrl)

    // Check for error response from Auth0 (user denied, etc.)
    const error = url.searchParams.get('error')
    if (error) {
      const errorDesc = url.searchParams.get('error_description')
      this.pendingAuth = null // Clear pending state
      throw new Error(`Auth0 error: ${error} - ${errorDesc || 'Unknown error'}`)
    }

    const code = url.searchParams.get('code')
    const receivedState = url.searchParams.get('state')

    // Verify state (CSRF protection)
    if (!this.verifyState(receivedState)) {
      throw new Error('Invalid state parameter - possible CSRF attack')
    }

    if (!code) {
      throw new Error('No authorization code in callback')
    }

    // Exchange code for tokens
    const tokens = await this.exchangeCodeForTokens(
      code,
      this.pendingAuth!.codeVerifier
    )

    // Store in memory
    this.tokens = tokens
    this.pendingAuth = null

    console.log('✅ Login successful! Tokens stored in memory.')
    console.log('Token expiry:', new Date(tokens.expiresAt))
  }

  private verifyState(receivedState: string | null): boolean {
    if (!this.pendingAuth || !receivedState) {
      return false
    }

    // Check timeout
    const elapsed = Date.now() - this.pendingAuth.timestamp
    if (elapsed > this.STATE_TIMEOUT) {
      this.pendingAuth = null
      return false
    }

    // Verify match
    return receivedState === this.pendingAuth.state
  }

  private async exchangeCodeForTokens(
    code: string,
    codeVerifier: string
  ): Promise<TokenSet> {
    const response = await fetch(
      `https://${auth0Config.domain}/oauth/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grant_type: 'authorization_code',
          client_id: auth0Config.clientId,
          code,
          code_verifier: codeVerifier,
          redirect_uri: auth0Config.redirectUri
        })
      }
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Token exchange failed: ${error}`)
    }

    const data = await response.json()

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      idToken: data.id_token,
      expiresAt: Date.now() + ((data.expires_in || 3600) * 1000) // Default 1 hour
    }
  }

  // For debugging/testing
  getTokens(): TokenSet | null {
    return this.tokens
  }
}

export const auth0Client = new Auth0Client()
