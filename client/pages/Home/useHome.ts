/* eslint-disable unicorn/prevent-abbreviations */
import { useAppContext } from 'AppContext'
import { useLocation } from 'react-router-dom'
import { ISigninError } from './types'

/**
 * Component logic for `Home`
 * 
 * @param paramName - The name of the parameter to use for the error
 * 
 * @returns The logic for the `Home` component
 */
export function useHome(paramName = 'error') {
  const { user, subscription } = useAppContext()
  const location = useLocation<{ prevPath: string }>()
  const urlSearchParameters = new URLSearchParams(document.location.search)
  const loginError: ISigninError =
    urlSearchParameters.get(paramName) &&
    JSON.parse(atob(urlSearchParameters.get(paramName) as string))
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
