import { SigninError } from './SigninError'

/**
 * Generic sign in failed error
 */
export const GENERIC_SIGNIN_FAILED = new SigninError(
  'e0666582',
  'An error occured signing you in to did',
  'Sorry, we were not able to sign you in right now, and we are not really sure why!<br/><br/> It can help to clear your browser cache.',
  'Dislike'
)
