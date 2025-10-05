export const auth0Config = {
  domain: process.env.AUTH0_DOMAIN!,
  clientId: process.env.AUTH0_CLIENT_ID!,
  audience: process.env.AUTH0_AUDIENCE,
  scope: 'openid profile email offline_access',
  redirectUri: 'electronapp://callback',
}

// Validation with helpful error message
if (!auth0Config.domain || !auth0Config.clientId) {
  console.error(
    '\n❌ Auth0 Configuration Error:\n' +
    '   AUTH0_DOMAIN and AUTH0_CLIENT_ID must be set in .env\n' +
    '   See .env.example for required variables\n'
  )
  throw new Error('Missing Auth0 configuration')
}
