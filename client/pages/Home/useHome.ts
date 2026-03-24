/* eslint-disable unicorn/prevent-abbreviations */
import { useAppContext } from 'AppContext'
import { useLocation } from 'react-router-dom'
import { ISigninError } from './types'
import { useLoginRedirect } from './useLoginRedirect'

/**
 * Component logic for `Home`
 *
 * @param paramName - The name of the parameter to use for the error
 *
 * @returns The logic for the `Home` component
 */
export function useHome(paramName = 'client_response') {
  const { user, subscription } = useAppContext()
  const location = useLocation<{ prevPath: string }>()
  const urlSearchParameters = new URLSearchParams(document.location.search)
  let loginError: ISigninError = null
  try {
    const raw = urlSearchParameters.get(paramName)
    if (raw) loginError = JSON.parse(atob(raw))
  } catch {
    // Malformed URL parameter — ignore rather than crash
  }

  useLoginRedirect(loginError)

  const redirectPage =
    user.startPage &&
    user.startPage !== '/' &&
    location.state?.prevPath === undefined
      ? user.startPage
      : null

  return {
    loginError,
    subscription,
    redirectPage
  }
}
