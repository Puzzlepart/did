import { useAppContext } from 'AppContext'
import { useLocation } from 'react-router-dom'

/**
 * @ignore
 */
export function useHome() {
  const { user, subscription } = useAppContext()
  const location = useLocation<{ prevPath: string }>()
  const urlParameters = new URLSearchParams(document.location.search)
  const error = urlParameters.get('name') && {
    name: urlParameters.get('name'),
    message: urlParameters.get('message'),
    icon: urlParameters.get('icon')
  }
  const redirectPage =
    user.startPage &&
    user.startPage !== '/' &&
    location.state?.prevPath === undefined
      ? user.startPage
      : null
  return {
    error,
    subscription,
    redirectPage
  }
}
