import { KeyboardEvent } from 'react'
import {
  DISMISS_CALLOUT,
  ON_KEY_DOWN,
  ON_SEARCH,
  SET_SELECTED_INDEX
} from './actions'
import { ISuggestionItem } from './types'

/**
 * Hook for AutocompleteControl events.
 *
 * @category Autocomplete
 */
export function useAutocompleteControlEvents({ dispatch, props }) {
  return {
    onDismissCallout: (item: ISuggestionItem) => {
      dispatch(DISMISS_CALLOUT({ item }))
      props.onSelected(item)
    },
    onSetSelected: (index: number) => dispatch(SET_SELECTED_INDEX({ index })),
    onSearch: (searchTerm: string) => dispatch(ON_SEARCH({ searchTerm })),
    onKeyDown: (event: KeyboardEvent<HTMLDivElement>) =>
      dispatch(
        ON_KEY_DOWN({
          key: event.key,
          onEnter: (item) => props.onSelected(item)
        })
      )
  }
}
