import { SigninError } from './SigninError'

/**
 * User account disabled error
 */
export const USER_ACCOUNT_DISABLED = new SigninError(
  'e0666582',
  'An error occured signing you in to did',
  'Your account is disabled.',
  'Cancel'
)
