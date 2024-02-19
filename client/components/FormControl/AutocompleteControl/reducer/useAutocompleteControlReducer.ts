import { current } from '@reduxjs/toolkit'
import { useReduxReducer as useReducer } from 'hooks/useReduxReducer'
import _ from 'underscore'
import { IAutocompleteControlProps, IAutocompleteControlState } from '../types'
import { INIT, ON_SEARCH, RESET_SELECTION, SET_SELECTED } from './actions'


/**
 * Hook that returns a reducer and its initial state for the AutocompleteControl component.
 *
 * @param props - Props for the AutocompleteControl component.
 *
 * @returns A tuple containing the state and dispatch function for the reducer.
 */
export function useAutocompleteControlReducer({
  minCharacters,
  onSelected
}: IAutocompleteControlProps) {
  return useReducer({
    value: '',
    selectedItem: null,
    items: [],
    suggestions: []
  } as IAutocompleteControlState, (builder) =>
    builder
      .addCase(INIT, (state, { payload }) => {
        state.items = payload.props.items
        state.suggestions = []
        state.selectedItem =
          _.find(
            state.items,
            (item) => item.key === payload.props.selectedKey
          ) ?? state.selectedItem
        state.value = state.selectedItem?.text
      })
      .addCase(RESET_SELECTION, (state) => {
          state.selectedItem = null
          state.value = ''
          state.suggestions = []
          onSelected(null)
      })
      .addCase(ON_SEARCH, (state, { payload }) => {
        state.selectedItem = null
        state.value = payload ?? ''
        state.suggestions =
          state.value.length >= minCharacters
            ? state.items.filter((index) =>
              index.searchValue.toLowerCase().includes(payload.toLowerCase())
            )
            : []
      })
      .addCase(SET_SELECTED, (state, { payload }) => {
        const selectedItem = _.find(
          current(state).items,
          (item) => item.key === payload.optionValue
        )
        state.suggestions = []
        if (selectedItem) {
          state.value = selectedItem.text
          state.selectedItem = selectedItem
          onSelected(selectedItem)
        }
      })
  )
}
