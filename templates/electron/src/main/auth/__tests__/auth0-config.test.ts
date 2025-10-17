import { describe, it, expect, vi } from 'vitest'

describe('Auth0 Configuration', () => {
  describe('when AUTH_ENABLED is false', () => {
    it('should not throw error even with missing credentials', async () => {
      vi.stubEnv('AUTH_ENABLED', 'false')
      vi.stubEnv('AUTH0_DOMAIN', '')
      vi.stubEnv('AUTH0_CLIENT_ID', '')
      vi.resetModules()

      // Should not throw
      const configModule = await import('../auth0-config')
      expect(configModule).toBeDefined()
    })

    it('should log that auth is disabled', async () => {
      vi.stubEnv('AUTH_ENABLED', 'false')
      vi.resetModules()
      const consoleLogSpy = vi.spyOn(console, 'log')

      await import('../auth0-config')

      // authLogger.info() prepends 'ℹ️  [Auth]' to the message
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'ℹ️  [Auth]',
        'Auth0 authentication disabled (AUTH_ENABLED not set to true)'
      )

      consoleLogSpy.mockRestore()
    })

    it('should set isAuthEnabled to false', async () => {
      vi.stubEnv('AUTH_ENABLED', 'false')
      vi.resetModules()

      const { isAuthEnabled } = await import('../auth0-config')

      expect(isAuthEnabled).toBe(false)
    })
  })

  describe('when AUTH_ENABLED is true', () => {
    it('should throw error when AUTH0_DOMAIN is missing', async () => {
      vi.stubEnv('AUTH_ENABLED', 'true')
      vi.stubEnv('AUTH0_DOMAIN', '')
      vi.stubEnv('AUTH0_CLIENT_ID', 'test-client-id')
      vi.resetModules()

      await expect(() => import('../auth0-config')).rejects.toThrow('Missing Auth0 configuration')
    })

    it('should throw error when AUTH0_CLIENT_ID is missing', async () => {
      vi.stubEnv('AUTH_ENABLED', 'true')
      vi.stubEnv('AUTH0_DOMAIN', 'test.auth0.com')
      vi.stubEnv('AUTH0_CLIENT_ID', '')
      vi.resetModules()

      await expect(() => import('../auth0-config')).rejects.toThrow('Missing Auth0 configuration')
    })

    it('should log helpful error message for missing config', async () => {
      vi.stubEnv('AUTH_ENABLED', 'true')
      vi.stubEnv('AUTH0_DOMAIN', '')
      vi.stubEnv('AUTH0_CLIENT_ID', '')
      vi.resetModules()

      const consoleErrorSpy = vi.spyOn(console, 'error')

      await expect(() => import('../auth0-config')).rejects.toThrow()

      // authLogger.error() prepends '❌ [Auth]' and passes the full message
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '❌ [Auth]',
        expect.stringContaining('Auth0 Configuration Error')
      )

      consoleErrorSpy.mockRestore()
    })

    it('should load config successfully with valid credentials', async () => {
      vi.stubEnv('AUTH_ENABLED', 'true')
      vi.stubEnv('AUTH0_DOMAIN', 'test.auth0.com')
      vi.stubEnv('AUTH0_CLIENT_ID', 'test-client-id')
      vi.stubEnv('AUTH0_AUDIENCE', 'https://test-api.com')
      vi.resetModules()

      const { auth0Config, isAuthEnabled } = await import('../auth0-config')

      expect(isAuthEnabled).toBe(true)
      expect(auth0Config.domain).toBe('test.auth0.com')
      expect(auth0Config.clientId).toBe('test-client-id')
      expect(auth0Config.audience).toBe('https://test-api.com')
    })

    it('should have correct default values', async () => {
      vi.stubEnv('AUTH_ENABLED', 'true')
      vi.stubEnv('AUTH0_DOMAIN', 'test.auth0.com')
      vi.stubEnv('AUTH0_CLIENT_ID', 'test-client-id')
      vi.resetModules()

      const { auth0Config } = await import('../auth0-config')

      expect(auth0Config.scope).toBe('openid profile email offline_access')
      expect(auth0Config.redirectUri).toBe('electron-template-auth://callback')
    })

    it('should use custom protocol scheme from env var', async () => {
      vi.stubEnv('AUTH_ENABLED', 'true')
      vi.stubEnv('AUTH0_DOMAIN', 'test.auth0.com')
      vi.stubEnv('AUTH0_CLIENT_ID', 'test-client-id')
      vi.stubEnv('AUTH_PROTOCOL_SCHEME', 'my-custom-app-auth')
      vi.resetModules()

      const { auth0Config, AUTH_PROTOCOL_SCHEME } = await import('../auth0-config')

      expect(AUTH_PROTOCOL_SCHEME).toBe('my-custom-app-auth')
      expect(auth0Config.redirectUri).toBe('my-custom-app-auth://callback')
    })

    it('should fallback to default protocol scheme when not set', async () => {
      vi.stubEnv('AUTH_ENABLED', 'true')
      vi.stubEnv('AUTH0_DOMAIN', 'test.auth0.com')
      vi.stubEnv('AUTH0_CLIENT_ID', 'test-client-id')
      vi.stubEnv('AUTH_PROTOCOL_SCHEME', '')
      vi.resetModules()

      const { AUTH_PROTOCOL_SCHEME } = await import('../auth0-config')

      expect(AUTH_PROTOCOL_SCHEME).toBe('electron-template-auth')
    })

    it('should make audience optional', async () => {
      vi.stubEnv('AUTH_ENABLED', 'true')
      vi.stubEnv('AUTH0_DOMAIN', 'test.auth0.com')
      vi.stubEnv('AUTH0_CLIENT_ID', 'test-client-id')
      vi.stubEnv('AUTH0_AUDIENCE', '') // Explicitly empty
      vi.resetModules()

      const { auth0Config } = await import('../auth0-config')

      expect(auth0Config.audience).toBe('')
    })

    it('should log success message when enabled', async () => {
      vi.stubEnv('AUTH_ENABLED', 'true')
      vi.stubEnv('AUTH0_DOMAIN', 'test.auth0.com')
      vi.stubEnv('AUTH0_CLIENT_ID', 'test-client-id')
      vi.resetModules()

      const consoleLogSpy = vi.spyOn(console, 'log')

      await import('../auth0-config')

      // authLogger.success() prepends '✅ [Auth]' to the message
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '✅ [Auth]',
        'Auth0 authentication enabled'
      )

      consoleLogSpy.mockRestore()
    })
  })

  describe('when AUTH_ENABLED is not set', () => {
    it('should default to disabled', async () => {
      // Don't set AUTH_ENABLED at all, explicitly set to empty or undefined
      vi.stubEnv('AUTH_ENABLED', '')
      vi.stubEnv('AUTH0_DOMAIN', 'test.auth0.com')
      vi.stubEnv('AUTH0_CLIENT_ID', 'test-client-id')
      vi.resetModules()

      const { isAuthEnabled } = await import('../auth0-config')

      expect(isAuthEnabled).toBe(false)
    })

    it('should not validate config when disabled by default', async () => {
      // Don't set any env vars
      vi.stubEnv('AUTH_ENABLED', '')
      vi.stubEnv('AUTH0_DOMAIN', '')
      vi.stubEnv('AUTH0_CLIENT_ID', '')
      vi.resetModules()

      // Should not throw
      const configModule = await import('../auth0-config')
      expect(configModule).toBeDefined()
    })
  })
})
