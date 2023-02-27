import { useQuery } from '@apollo/client'
import { useAppContext } from 'AppContext'
import { useLocation } from 'react-router-dom'
import $home from './home.gql'

/**
 * Component logic for `Home`
 */
export function useHome() {
  const { user, subscription } = useAppContext()
  const query = useQuery($home, {
    fetchPolicy: 'cache-first'
  })
  const location = useLocation<{ prevPath: string }>()
  const urlSearchParameters = new URLSearchParams(document.location.search)
  const error =
    urlSearchParameters.get('error') &&
    JSON.parse(atob(urlSearchParameters.get('error')))
  const redirectPage =
    user.startPage &&
      user.startPage !== '/' &&
      location.state?.prevPath === undefined
      ? user.startPage
      : null
  // eslint-disable-next-line no-console
  console.log(query?.data)
  return {
    error,
    subscription,
    redirectPage
  } as const
}
