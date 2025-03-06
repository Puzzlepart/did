import { useEffect } from 'react'
import { IListContext } from './context'

/**
 * Custom hook that persists the search term in the URL hash. It will update the URL hash
 * whenever the search term changes. If the search term is empty, the URL parameter will be removed.
 * This is useful for sharing search results with others.
 *
 * @param context - The context object containing the search term and other properties.
 * @param parameterName - The name of the URL parameter to use for the search term. Defaults to 'q'.
 */
export function useListPersistedSearch(
  context: IListContext,
  parameterName = 'q'
) {
  useEffect(() => {
    if (!context.props.searchBox?.persist) return
    if (context.state.searchTerm === '') {
      const hash = window.location.hash.replace(
        new RegExp(`${parameterName}=[^&]*&?`),
        ''
      )
      window.location.hash = hash.length === 1 ? '' : hash
      return
    }
    window.location.hash = `${parameterName}=${context.state.searchTerm ?? ''}`
  }, [context.state.searchTerm])
}
