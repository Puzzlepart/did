import { useEffect } from 'react'
import { ISigninError } from './types'

/**
 * Custom hook that redirects the user to the login page of the specified authentication provider
 * after a delay if a specific login error is present.
 *
 * @param loginError - The login error object containing the authentication provider
 * and the delay in milliseconds before redirecting.
 */
export function useLoginRedirect(loginError: ISigninError) {
  useEffect(() => {
    if (loginError?.redirectDelayMs) {
      setTimeout(() => {
        window.location.replace(`/auth/${loginError.authProvider}/signin`)
      }, loginError.redirectDelayMs)
    }
  }, [loginError])
}
