/* eslint-disable tsdoc/syntax */
import { AppContext } from 'AppContext'
import { useContext } from 'react'

/**
 * @ignore
 */
export function useHome() {
  const { subscription } = useContext(AppContext)
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
