import crypto from 'crypto'

export function generatePKCEPair(): { verifier: string; challenge: string } {
  // Generate random verifier (128 bytes)
  const verifier = crypto.randomBytes(128).toString('base64url')

  // Generate SHA-256 challenge
  const hash = crypto.createHash('sha256')
  hash.update(verifier)
  const challenge = hash.digest('base64url')

  return { verifier, challenge }
}

export function generateState(): string {
  return crypto.randomBytes(32).toString('base64url')
}
