import { describe, it, expect } from 'vitest'
import { generatePKCEPair, generateState } from '../pkce'
import crypto from 'crypto'

describe('PKCE Utilities', () => {
  describe('generatePKCEPair', () => {
    it('should generate a verifier and challenge', () => {
      const { verifier, challenge } = generatePKCEPair()

      expect(verifier).toBeDefined()
      expect(challenge).toBeDefined()
      expect(typeof verifier).toBe('string')
      expect(typeof challenge).toBe('string')
    })

    it('should generate base64url encoded verifier (no +, /, = characters)', () => {
      const { verifier } = generatePKCEPair()

      // base64url should not contain +, /, or = characters
      expect(verifier).not.toMatch(/[+/=]/)

      // Should only contain base64url safe characters
      expect(verifier).toMatch(/^[A-Za-z0-9_-]+$/)
    })

    it('should generate challenge as SHA-256 hash of verifier', () => {
      const { verifier, challenge } = generatePKCEPair()

      // Manually compute the expected challenge
      const expectedHash = crypto.createHash('sha256')
      expectedHash.update(verifier)
      const expectedChallenge = expectedHash.digest('base64url')

      expect(challenge).toBe(expectedChallenge)
    })

    it('should generate base64url encoded challenge (no +, /, = characters)', () => {
      const { challenge } = generatePKCEPair()

      // base64url should not contain +, /, or = characters
      expect(challenge).not.toMatch(/[+/=]/)

      // Should only contain base64url safe characters
      expect(challenge).toMatch(/^[A-Za-z0-9_-]+$/)
    })

    it('should generate different values on each call (randomness check)', () => {
      const pair1 = generatePKCEPair()
      const pair2 = generatePKCEPair()

      // Verifiers should be different (cryptographically random)
      expect(pair1.verifier).not.toBe(pair2.verifier)
      expect(pair1.challenge).not.toBe(pair2.challenge)
    })

    it('should generate verifier of appropriate length', () => {
      const { verifier } = generatePKCEPair()

      // 128 bytes -> base64url encodes to roughly 171 characters
      // (128 * 8 / 6 ≈ 170.67, rounded up)
      expect(verifier.length).toBeGreaterThanOrEqual(170)
      expect(verifier.length).toBeLessThanOrEqual(172)
    })

    it('should generate challenge of SHA-256 length', () => {
      const { challenge } = generatePKCEPair()

      // SHA-256 produces 32 bytes -> base64url encodes to 43 characters
      // (32 * 8 / 6 ≈ 42.67, rounded to 43)
      expect(challenge.length).toBe(43)
    })
  })

  describe('generateState', () => {
    it('should generate a state string', () => {
      const state = generateState()

      expect(state).toBeDefined()
      expect(typeof state).toBe('string')
    })

    it('should generate base64url encoded state (no +, /, = characters)', () => {
      const state = generateState()

      // base64url should not contain +, /, or = characters
      expect(state).not.toMatch(/[+/=]/)

      // Should only contain base64url safe characters
      expect(state).toMatch(/^[A-Za-z0-9_-]+$/)
    })

    it('should generate different values on each call (randomness check)', () => {
      const state1 = generateState()
      const state2 = generateState()

      // States should be different (cryptographically random)
      expect(state1).not.toBe(state2)
    })

    it('should generate state of appropriate length', () => {
      const state = generateState()

      // 32 bytes -> base64url encodes to 43 characters
      // (32 * 8 / 6 ≈ 42.67, rounded to 43)
      expect(state.length).toBe(43)
    })
  })
})
