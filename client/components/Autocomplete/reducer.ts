import { createAction, createReducer } from '@reduxjs/toolkit'
import { KeyCodes } from 'office-ui-fabric-react'
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

export default () =>
  createReducer<IAutocompleteState>(
    {},
    {
      [INIT.type]: (state, { payload }: ReturnType<typeof INIT>) => {
        state.items = payload.props.items
        state.suggestions = []
        state.selectedItem = find(
          state.items,
          (item) => item.key === payload.props.defaultSelectedKey
        )
        state.value = state.selectedItem?.text
      },
      [RESET.type]: (state) => {
        state.value = null
        state.suggestions = []
      },

      [ON_SEARCH.type]: (state, { payload }: ReturnType<typeof ON_SEARCH>) => {
        state.selectedIndex = -1
        state.suggestions = state.items.filter((index) =>
          index.searchValue
            .toLowerCase()
            .includes(payload.searchTerm.toLowerCase())
        )
        state.value = payload.searchTerm
      },

      [ON_KEY_DOWN.type]: (
        state,
        { payload }: ReturnType<typeof ON_KEY_DOWN>
      ) => {
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
      },

      [SET_SELECTED_INDEX.type]: (
        state,
        { payload }: ReturnType<typeof SET_SELECTED_INDEX>
      ) => {
        state.selectedIndex = payload.index
      },

      [DISMISS_CALLOUT.type]: (
        state,
        { payload }: ReturnType<typeof DISMISS_CALLOUT>
      ) => {
        state.suggestions = []
        state.value = payload?.item?.text
      }
    }
  )
