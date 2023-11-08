import { useReduxReducer as useReducer } from 'hooks/useReduxReducer'
import _ from 'underscore'
import { IAutocompleteControlProps, IAutocompleteControlState } from '../types'
import { SET_SELECTED, INIT, ON_SEARCH, RESET } from './actions'
import { current } from '@reduxjs/toolkit'

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
  const initialState: IAutocompleteControlState = {
    value: '',
    selectedItem: null,
    suggestions: []
  }
  return useReducer(initialState, (builder) =>
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
