import { searchObject } from 'utils'
import { IListProps } from './IListProps'
export interface IListState {
    searchTerm?: string;
    origItems?: any[];
    items?: any[];
}

type Action =
    { type: 'PROPS_UPDATED'; payload: IListProps }
    | { type: 'search'; payload: string };

/**
 * Reducer for Timesheet
 * 
 * @param {ITimesheetState} state State
 * @param {IAction} action Action
 */
export const reducer = (state: IListState, action: Action): IListState => {
    // eslint-disable-next-line prefer-const
    let newState: IListState = { ...state }
    switch (action.type) {
        case 'PROPS_UPDATED':
            newState.origItems = action.payload.items
            newState.items = newState.origItems.filter(i => searchObject(i, newState.searchTerm))
            break
        case 'search':
            newState.searchTerm = action.payload
            newState.items = newState.origItems.filter(i => searchObject(i, newState.searchTerm))
            break
        default: throw new Error()
    }
    return newState
}