import { createAction, createReducer } from '@reduxjs/toolkit'
import { KeyCodes } from 'office-ui-fabric'
import { AutocompleteSelectCallback, IAutocompleteProps, IAutocompleteState } from './types'

export const INIT = createAction<{ props: IAutocompleteProps }>('INIT')
export const ON_SEARCH = createAction<{ searchTerm: string }>('ON_SEARCH')
export const ON_KEY_DOWN = createAction<{ key: number, onEnter: AutocompleteSelectCallback }>('ON_KEY_DOWN')

export default () =>
    createReducer<IAutocompleteState>(
        {},
        {
            [INIT.type]: (state, { payload }: ReturnType<typeof INIT>) => {
                state.items = payload.props.items
                state.suggestions = []
            },

            [ON_SEARCH.type]: (state, { payload }: ReturnType<typeof ON_SEARCH>) => {
                state.selectedIndex = -1
                state.suggestions = state.items.filter((i) =>
                    i.searchValue.toLowerCase().includes(payload.searchTerm.toLowerCase())
                )
            },

            [ON_KEY_DOWN.type]: (state, { payload }: ReturnType<typeof ON_KEY_DOWN>) => {
                switch (payload.key) {
                    case KeyCodes.up: state.selectedIndex--
                        break
                    case KeyCodes.down: state.selectedIndex++
                        break
                    case KeyCodes.enter: {
                        const item = state.suggestions[state.selectedIndex]
                        if (item) payload.onEnter(JSON.parse(JSON.stringify(item)))
                    }
                        break
                }
            }
        }
    )