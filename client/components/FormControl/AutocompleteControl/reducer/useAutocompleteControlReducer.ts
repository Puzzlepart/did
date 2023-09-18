import { useReduxReducer } from 'hooks/useReduxReducer'
import _ from 'underscore'
import { IAutocompleteControlProps, IAutocompleteControlState } from '../types'
import {
  DISMISS_CALLOUT,
  INIT,
  ON_KEY_DOWN,
  ON_SEARCH,
  RESET,
  SET_SELECTED_INDEX
} from './actions'

/**
 * Hook that returns a reducer and its initial state for the AutocompleteControl component.
 *
 * @param props - Props for the AutocompleteControl component.
 *
 * @returns A tuple containing the state and dispatch function for the reducer.
 */
export function useAutocompleteControlReducer({
  onSelected
}: IAutocompleteControlProps) {
  const initialState: IAutocompleteControlState = {
    value: '',
    selectedItem: null,
    selectedIndex: -1,
    suggestions: []
  }
  return useReduxReducer(initialState, (builder) =>
    builder
      .addCase(INIT, (state, { payload }) => {
        state.items = payload.props.items
        state.suggestions = []
        state.selectedItem =
          _.find(
            state.items,
            (item) => item.key === payload.props.defaultSelectedKey
          ) ?? state.selectedItem
        state.value = state.selectedItem?.text
      })
      .addCase(RESET, (state) => {
        state.selectedItem = null
        state.value = ''
        state.suggestions = []
        onSelected(state.selectedItem)
      })
      .addCase(ON_SEARCH, (state, { payload }) => {
        state.selectedIndex = -1
        state.value = payload ?? ''
        state.suggestions =
          state.value.length > 0
            ? state.items.filter((index) =>
                index.searchValue.toLowerCase().includes(payload.toLowerCase())
              )
            : []
      })
      .addCase(ON_KEY_DOWN, (state, { payload }) => {
        switch (payload.key) {
          case 'ArrowUp': {
            state.selectedIndex--
            break
          }
          case 'ArrowDown': {
            state.selectedIndex++
            break
          }
          case 'Enter': {
            {
              state.suggestions = []
              const item = state.suggestions[state.selectedIndex]
              if (item) {
                payload.onEnter(JSON.parse(JSON.stringify(item)))
                state.value = item.text
              }
            }
            break
          }
        }
      })
      .addCase(SET_SELECTED_INDEX, (state, { payload }) => {
        state.selectedIndex = payload
      })
      .addCase(DISMISS_CALLOUT, (state, { payload }) => {
        state.suggestions = []
        if (payload?.item) {
          state.value = payload.item.text
          state.selectedItem = payload.item
          onSelected(payload.item)
        }
      })
  )
}
