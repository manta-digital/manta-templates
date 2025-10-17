import { shell } from 'electron'
import { generatePKCEPair, generateState } from './pkce'
import { auth0Config } from './auth0-config'
import { authLogger } from './logger'

/**
 * Auth0 OAuth 2.0 + PKCE Client for Electron (Slice 110)
 *
 * Features:
 * - PKCE flow for secure authentication
 * - Token expiry validation with 60s grace period
 * - Tokens stored in memory only (Slice 111 adds persistent encrypted storage)
 * - macOS only (Windows/Linux support comes in Slice 114)
 */

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
  private tokens: TokenSet | null = null // In-memory only - Slice 111 adds persistence
  private readonly STATE_TIMEOUT = 10 * 60 * 1000 // 10 minutes
  private readonly TOKEN_GRACE_PERIOD = 60 * 1000 // 60 seconds

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

    // Log sensitive auth data (only in dev with AUTH_DEBUG)
    authLogger.sensitive('Auth URL:', authUrl.toString())
    authLogger.sensitive('State:', state)
    authLogger.sensitive('Code Challenge:', challenge.substring(0, 20) + '...')

    authLogger.debug('Opening auth URL in browser...')
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

    authLogger.success('Login successful! Tokens stored in memory.')
    authLogger.success('Token expiry:', new Date(tokens.expiresAt))
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

  /**
   * Get valid access token (internal use only)
   *
   * Validates token exists and hasn't expired. Uses grace period to prevent
   * edge cases where token expires during API call.
   *
   * @throws {Error} If not authenticated or token expired
   * @returns {string} Valid access token
   *
   * @example
   * // In IPC handler or internal method
   * try {
   *   const token = this.getValidAccessToken()
   *   // Use token for API call
   * } catch (error) {
   *   // Handle not authenticated or expired
   * }
   */
  private getValidAccessToken(): string {
    if (!this.tokens) {
      throw new Error('Not authenticated - please login first')
    }

    // Check expiry with grace period
    // Grace period prevents edge cases where token expires during API call
    const now = Date.now()
    const expiryWithGrace = this.tokens.expiresAt - this.TOKEN_GRACE_PERIOD

    if (now >= expiryWithGrace) {
      const expiryDate = new Date(this.tokens.expiresAt)
      authLogger.warn('Access token expired at:', expiryDate)
      // TODO (Slice 113): Implement automatic token refresh here
      throw new Error('Session expired - please login again')
    }

    return this.tokens.accessToken
  }

  // For debugging/testing
  getTokens(): TokenSet | null {
    return this.tokens
  }

  /**
   * Check if user is authenticated with valid token
   *
   * @returns {boolean} True if authenticated with non-expired token
   */
  isAuthenticated(): boolean {
    try {
      this.getValidAccessToken()
      return true
    } catch {
      return false
    }
  }
}

export const auth0Client = new Auth0Client()
