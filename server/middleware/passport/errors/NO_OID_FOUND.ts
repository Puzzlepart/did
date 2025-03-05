import { SigninError } from './SigninError'

/**
 * No OID found error
 */
export const NO_OID_FOUND = new SigninError(
  'no_oid_found',
  'Sorry to break it to you..',
  '... but an error occured attempting to sign you in.',
  'BlockedSite'
)
