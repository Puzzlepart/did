import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

/**
 * Returns a callback function that updates the URL path at the specified level with the given key.
 *
 * @param level The level in the URL path to update.
 *
 * @returns A callback function that updates the URL path.
 */
export function useTabsHistory(level: number) {
  const history = useHistory()
  const paths = history.location.pathname.split('/')
  const updateCallback = useCallback(
    (key: string) => {
      const paths = history.location.pathname.split('/')
      paths[level] = key
      history.replace(
        `/${paths
          .filter(Boolean)
          .splice(0, level + 1)
          .join('/')}`
      )
    },
    [history]
  )
  return [updateCallback, paths[level]] as const
}
