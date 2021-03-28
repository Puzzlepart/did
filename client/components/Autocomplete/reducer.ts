/* eslint-disable react-hooks/exhaustive-deps */
import { KeyCodes } from '@fluentui/react'
import { createAction, createReducer } from '@reduxjs/toolkit'
import { useMemo, useReducer } from 'react'
import { find } from 'underscore'
import {
  AutocompleteSelectCallback,
  IAutocompleteProps,
  IAutocompleteState,
  ISuggestionItem
} from './types'

export const INIT = createAction<{ props: IAutocompleteProps }>('INIT')
export const RESET = createAction('RESET')
export const ON_SEARCH = createAction<{ searchTerm: string }>('ON_SEARCH')
export const ON_KEY_DOWN = createAction<{
  key: number
  onEnter: AutocompleteSelectCallback
}>('ON_KEY_DOWN')
export const SET_SELECTED_INDEX = createAction<{ index: number }>(
  'SET_SELECTED_INDEX'
)
export const DISMISS_CALLOUT = createAction<{ item: ISuggestionItem<any> }>(
  'DISMISS_CALLOUT'
)

/**
 * Creates reducer using `createReducer` from [\@reduxjs/toolkit](https://www.npmjs.com/package/\@reduxjs/toolkit)
 *
 * @param initialState - Initial state
 *
 * @returns `Reducer<IAutocompleteState<any>, AnyAction>`
 */
export const createAutocompleteReducer = (initialState: IAutocompleteState) =>
  createReducer<IAutocompleteState>(initialState, (builder) =>
    builder
      .addCase(INIT, (state, { payload }) => {
        state.items = payload.props.items
        state.suggestions = []
        state.selectedItem = find(
          state.items,
          (item) => item.key === payload.props.defaultSelectedKey
        )
        state.value = state.selectedItem?.text
      })
      .addCase(RESET, (state) => {
        state.selectedItem = null
        state.value = ''
        state.suggestions = []
      })
      .addCase(ON_SEARCH, (state, { payload }) => {
        state.selectedIndex = -1
        state.value = payload.searchTerm || ''
        state.suggestions =
          state.value.length > 0
            ? state.items.filter((index) =>
                index.searchValue
                  .toLowerCase()
                  .includes(payload.searchTerm.toLowerCase())
              )
            : []
      })
      .addCase(ON_KEY_DOWN, (state, { payload }) => {
        switch (payload.key) {
          case KeyCodes.up:
            state.selectedIndex--
            break
          case KeyCodes.down:
            state.selectedIndex++
            break
          case KeyCodes.enter:
            {
              const item = state.suggestions[state.selectedIndex]
              if (item) payload.onEnter(JSON.parse(JSON.stringify(item)))
              state.suggestions = []
              state.value = item.text
            }
            break
        }
      })
      .addCase(SET_SELECTED_INDEX, (state, { payload }) => {
        state.selectedIndex = payload.index
      })
      .addCase(DISMISS_CALLOUT, (state, { payload }) => {
        state.suggestions = []
        state.value = payload?.item?.text
        state.selectedItem = payload?.item
      })
  )

/**
 * Auto complete reducer using `useReducer`
 *
 * @param initialState - Initial state
 *
 * @returns [state, dispatch]
 */
export function useAutocompleteReducer(initialState: IAutocompleteState) {
  const reducer = useMemo(() => createAutocompleteReducer(initialState), [])
  return useReducer(reducer, initialState)
}
