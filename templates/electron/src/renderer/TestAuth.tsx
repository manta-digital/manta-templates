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
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async () => {
    console.log('Login button clicked')
    console.log('window.electronAPI:', window.electronAPI)
    console.log('window.electronAPI.auth:', window.electronAPI?.auth)

    try {
      setError(null)
      setLoading(true)

      if (!window.electronAPI?.auth?.login) {
        throw new Error('Auth API not available - is AUTH_ENABLED=true?')
      }

      await window.electronAPI.auth.login()
      console.log('Login initiated - check browser')
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error)
      console.error('Login failed:', error)
      setError(`Login failed: ${errMsg}`)
    } finally {
      setLoading(false)
    }
  }

  const handleGetTokens = async () => {
    console.log('Get Tokens button clicked')

    try {
      setError(null)

      if (!window.electronAPI?.auth?.getTokens) {
        throw new Error('Auth API not available - is AUTH_ENABLED=true?')
      }

      const tokens = await window.electronAPI.auth.getTokens()
      console.log('Tokens retrieved:', tokens)
      setTokens(tokens)
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error)
      console.error('Get tokens failed:', error)
      setError(`Get tokens failed: ${errMsg}`)
    }
  }

  return (
    <div style={{
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h2 style={{
        fontSize: '24px',
        marginBottom: '20px',
        color: '#333'
      }}>Auth0 Test UI</h2>

      <div style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: loading ? '#ccc' : '#635bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '500'
          }}
        >
          {loading ? 'Opening browser...' : 'Login with Auth0'}
        </button>
        <button
          onClick={handleGetTokens}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Get Tokens
        </button>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '15px',
          borderRadius: '6px',
          marginBottom: '20px',
          border: '1px solid #f5c6cb'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {tokens && (
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <h3 style={{
            fontSize: '18px',
            marginBottom: '15px',
            color: '#333'
          }}>Tokens (In Memory)</h3>
          <pre style={{
            background: '#fff',
            padding: '15px',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '13px',
            lineHeight: '1.5',
            border: '1px solid #dee2e6'
          }}>
            {JSON.stringify(tokens, null, 2)}
          </pre>
          <p style={{
            marginTop: '15px',
            fontSize: '14px',
            color: '#666'
          }}>
            <strong>Expires:</strong> {new Date(tokens.expiresAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  )
}
