import { InputOnChangeData } from '@fluentui/react-components'
import { ChangeEvent } from 'react'
import {
  DISMISS_CALLOUT,
  ON_KEY_DOWN,
  ON_SEARCH,
  SET_SELECTED_INDEX
} from './actions'
import { ISuggestionItem } from './types'

/**
 * Use Autocomplete events
 *
 * @category Autocomplete
 */
export function useAutocompleteEvents({ dispatch, props }) {
  return {
    onDismissCallout: (item: ISuggestionItem) => {
      dispatch(DISMISS_CALLOUT({ item }))
      props.onSelected(item)
    },
    onSetSelected: (index: number) => dispatch(SET_SELECTED_INDEX({ index })),
    onSearch: (_: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) =>
      dispatch(ON_SEARCH({ searchTerm: data?.value })),
    onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) =>
      dispatch(
        ON_KEY_DOWN({
          key: event.key,
          onEnter: (item) => props.onSelected(item)
        })
      )
  }
}
