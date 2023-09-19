import { createAction } from '@reduxjs/toolkit'
import {
  AutocompleteControlSelectCallback,
  IAutocompleteControlProps,
  ISuggestionItem
} from '../types'

export type INIT_PAYLOAD = { props: IAutocompleteControlProps }
export const INIT = createAction<INIT_PAYLOAD>('INIT')
export const RESET = createAction('RESET')
export const ON_SEARCH = createAction<string>('ON_SEARCH')
export const ON_KEY_DOWN = createAction<{
  key: string
  onEnter: AutocompleteControlSelectCallback
}>('ON_KEY_DOWN')
export const SET_SELECTED_INDEX = createAction<number>('SET_SELECTED_INDEX')
export const DISMISS_CALLOUT = createAction<{
  item: ISuggestionItem<any>
}>('DISMISS_CALLOUT')
