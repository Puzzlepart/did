import { useAppContext } from 'AppContext'
import { useLocation } from 'react-router-dom'

/**
 * Component logic for `Home`
 */
export function useHome() {
  const { user, subscription } = useAppContext()
  const location = useLocation<{ prevPath: string }>()
  const urlSearchParameters = new URLSearchParams(document.location.search)
  const loginError: Error =
    urlSearchParameters.get('error') &&
    JSON.parse(atob(urlSearchParameters.get('error')))
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
