import { SigninError } from './SigninError'

/**
 * Generic sign in failed error
 */
export const GENERIC_SIGNIN_FAILED = new SigninError(
  'generic_signin_failed',
  'An error occured signing you in to did',
  'Sorry, we were not able to sign you in right now, and we are not really sure why!<br/><br/> It can help to clear your browser cache.',
  'Dislike'
)
