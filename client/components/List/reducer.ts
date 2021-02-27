import { searchObject } from 'utils'
import { IListProps, IListState } from './types'

type Action =
  | { type: 'PROPS_UPDATED'; payload: IListProps }
  | { type: 'SEARCH'; payload: string }

/**
 * Reducer for Timesheet
 *
 * @param state - State
 * @param action - Action
 */
export default (state: IListState, action: Action): IListState => {
  const newState: IListState = { ...state }
  switch (action.type) {
    case 'PROPS_UPDATED':
      newState.origItems = action.payload.items || []
      break

    case 'SEARCH':
      newState.searchTerm = action.payload
      break
    default:
      throw new Error()
  }
  newState.items = newState.origItems.filter((i) =>
    searchObject(i, newState.searchTerm)
  )
  return newState
}
