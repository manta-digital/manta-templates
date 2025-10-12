/**
 * Auth Provider Types
 *
 * Common interfaces for authentication providers (Auth0, Supabase, etc.)
 * This abstraction allows swapping providers without changing app code
 */

export interface TokenSet {
  accessToken: string
  refreshToken: string
  idToken: string
  expiresAt: number
}

export interface AuthConfig {
  provider: 'auth0' | 'supabase' | 'custom'
  redirectUri: string
  scope: string
}

export interface AuthProvider {
  /**
   * Initiate login flow (opens external browser)
   */
  login(): Promise<void>

  /**
   * Handle OAuth callback and exchange code for tokens
   */
  handleCallback(callbackUrl: string): Promise<void>

  /**
   * Retrieve stored tokens (in-memory for Slice 110)
   */
  getTokens(): TokenSet | null

  /**
   * Refresh access token using refresh token (Slice 113)
   */
  refreshTokens?(): Promise<TokenSet>

  /**
   * Logout and clear tokens (Slice 113)
   */
  logout?(): Promise<void>
}

export interface Auth0Config extends AuthConfig {
  provider: 'auth0'
  domain: string
  clientId: string
  audience?: string
}

export interface SupabaseConfig extends AuthConfig {
  provider: 'supabase'
  url: string
  anonKey: string
}

// Future providers can extend this
export type ProviderConfig = Auth0Config | SupabaseConfig
