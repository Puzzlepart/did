import { SigninError } from './SigninError'

/**
 * Tenant not enrolled error
 */
export const TENANT_NOT_ENROLLED = new SigninError(
  'de72e4da',
  'Your company is not enrolled in did',
  'We\'re currently accepting new pilot customers.\n\nPlease contact <a href="mailto:did@puzzlepart.com">did@puzzlepart.com</a> for more information.',
  'Phone',
  'warning'
)
