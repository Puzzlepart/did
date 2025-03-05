import { SigninError } from './SigninError'

/**
 * User account disabled error
 */
export const USER_ACCOUNT_DISABLED = new SigninError(
  'user_account_disabled',
  'An error occured signing you in to did',
  'Your account is disabled.',
  'Cancel'
)
