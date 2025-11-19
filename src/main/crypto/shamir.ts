import secrets from 'secrets.js-grempe'

export function splitSecret(
  secret: string,
  totalShares: number,
  threshold: number
): string[] {
  const hexSecret = Buffer.from(secret, 'utf8').toString('hex')
  const shares = secrets.share(hexSecret, totalShares, threshold)
  return shares
}

export function combineShares(shares: string[]): string {
  const hexSecret = secrets.combine(shares)
  const secret = Buffer.from(hexSecret, 'hex').toString('utf8')
  return secret
}

