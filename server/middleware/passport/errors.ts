export const NO_OID_FOUND = new Error()
NO_OID_FOUND.name = 'Sorry to break it to you..'
NO_OID_FOUND.message = '... but an error occured attempting to sign you in.'

export const TENANT_NOT_ENROLLED = new Error()
TENANT_NOT_ENROLLED.name = 'I hate to be the one telling you this...'
TENANT_NOT_ENROLLED.message =
  '... but your company is not enrolled in did. Please contact <a href="mailto:did@puzzlepart.com">did@puzzlepart.com</a> for more information.'

export const USER_NOT_ENROLLED = new Error()
USER_NOT_ENROLLED.name = 'I promised to keep it a secret...'
USER_NOT_ENROLLED.message = "...but it seems you're not enrolled in did. Please contact your system owner."
