import { useEffect } from 'react'
import { IListContext } from './context'
import { persistUrlState } from 'utils'

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
    persistUrlState(context.state.searchTerm, parameterName, 'hash')
  }, [context.state.searchTerm])
}
