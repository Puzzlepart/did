import { isEqual } from 'lodash'
import { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

/**
 * Returns a callback function that updates the URL path at the specified level with the given key.
 *
 * @param level The level in the URL path to update.
 * @param selectedValue The currently selected value.
 *
 * @returns A callback function that updates the URL path.
 */
export function useTabsHistory(level: number, selectedValue: string) {
  const history = useHistory()
  const paths = history.location.pathname.split('/')
  const updateCallback = useCallback(
    (key: string) => {
      const paths = Array.from(history.location.pathname.split('/'))
      const updatedPaths = Array.from(paths)
      updatedPaths[level] = key
      if(isEqual(paths, updatedPaths)) return
      history.replace(
        `/${updatedPaths
          .filter(Boolean)
          .splice(0, level + 1)
          .join('/')}`
      )
    },
    [history]
  )

  useEffect(() => {
    if (!selectedValue) return
    updateCallback(selectedValue)
  }, [`${selectedValue}_${level}`])

  return [updateCallback, paths[level]] as const
}
