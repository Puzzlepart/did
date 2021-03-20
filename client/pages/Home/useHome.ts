/* eslint-disable tsdoc/syntax */
import { useAppContext } from 'AppContext'

/**
 * @ignore
 */
export function useHome() {
  const { subscription } = useAppContext()
  const urlParameters = new URLSearchParams(document.location.search)
  const error = urlParameters.get('name') && {
    name: urlParameters.get('name'),
    message: urlParameters.get('message'),
    icon: urlParameters.get('icon')
  }
  return {
    error,
    subscription
  }
}
