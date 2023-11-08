import { createAction } from '@reduxjs/toolkit'
import { IAutocompleteControlProps } from '../types'

export type INIT_PAYLOAD = { props: IAutocompleteControlProps }
export const INIT = createAction<INIT_PAYLOAD>('INIT')
export const RESET = createAction('RESET')
export const ON_SEARCH = createAction<string>('ON_SEARCH')
export const SET_SELECTED = createAction<{
  optionText: string
  optionValue: string
}>('SET_SELECTED')
