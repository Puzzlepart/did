const NO_OID_FOUND = new Error()
NO_OID_FOUND.name = 'NO_OID_FOUND'
NO_OID_FOUND.message = 'An error occured attempting to sign you in.'
NO_OID_FOUND.status = 401

const TENANT_NOT_ENROLLED = new Error()
TENANT_NOT_ENROLLED.name = 'TENANT_NOT_ENROLLED'
TENANT_NOT_ENROLLED.message = 'Your company is not enrolled in Did. Please contact did@puzzlepart.com.'
TENANT_NOT_ENROLLED.status = 401

const USER_NOT_ENROLLED = new Error()
USER_NOT_ENROLLED.name = 'USER_NOT_ENROLLED'
USER_NOT_ENROLLED.message = "It seems you're not enrolled in Did. Please contact your system owner."
USER_NOT_ENROLLED.status = 401

module.exports = {
  NO_OID_FOUND,
  TENANT_NOT_ENROLLED,
  USER_NOT_ENROLLED,
}
