import { useState } from 'react'

interface TokenSet {
  accessToken: string
  refreshToken: string
  idToken: string
  expiresAt: number
}

export function TestAuth() {
  const [tokens, setTokens] = useState<TokenSet | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setLoading(true)
      await window.electronAPI.auth.login()
      console.log('Login initiated - check browser')
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGetTokens = async () => {
    try {
      const tokens = await window.electronAPI.auth.getTokens()
      setTokens(tokens)
    } catch (error) {
      console.error('Get tokens failed:', error)
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Auth0 Test UI</h2>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleLogin} disabled={loading}>
          {loading ? 'Opening browser...' : 'Login with Auth0'}
        </button>
        <button onClick={handleGetTokens} style={{ marginLeft: '10px' }}>
          Get Tokens
        </button>
      </div>

      {tokens && (
        <div>
          <h3>Tokens (In Memory)</h3>
          <pre style={{
            background: '#f5f5f5',
            padding: '10px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
            {JSON.stringify(tokens, null, 2)}
          </pre>
          <p>Expires: {new Date(tokens.expiresAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  )
}
