// Check if auth is enabled
export const isAuthEnabled = process.env.AUTH_ENABLED === 'true'

export const auth0Config = {
  domain: process.env.AUTH0_DOMAIN || '',
  clientId: process.env.AUTH0_CLIENT_ID || '',
  audience: process.env.AUTH0_AUDIENCE,
  scope: 'openid profile email offline_access',
  redirectUri: 'electronapp://callback',
}

// Validation with helpful error message - only if auth is enabled
if (isAuthEnabled) {
  if (!auth0Config.domain || !auth0Config.clientId) {
    console.error(
      '\n❌ Auth0 Configuration Error:\n' +
      '   AUTH_ENABLED is true but AUTH0_DOMAIN and AUTH0_CLIENT_ID are not set in .env\n' +
      '   See .env.example for required variables\n' +
      '   Set AUTH_ENABLED=false to disable authentication\n'
    )
    throw new Error('Missing Auth0 configuration')
  }
  console.log('✓ Auth0 authentication enabled')
} else {
  console.log('ℹ Auth0 authentication disabled (AUTH_ENABLED not set to true)')
}
