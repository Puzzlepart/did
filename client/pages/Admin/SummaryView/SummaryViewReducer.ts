import { ISummaryViewScope, ISummaryViewState, ISummaryViewType } from './types'
import dateUtils from 'utils/date'

export type SummaryViewAction =
    { type: 'DATA_UPDATED'; payload: { timeentries: any[] } }
    |
    { type: 'CHANGE_SCOPE'; payload: ISummaryViewScope }
    |
    { type: 'CHANGE_TYPE'; payload: ISummaryViewType }
    |
    { type: 'CHANGE_RANGE'; payload: number }
    |
    { type: 'CHANGE_YEAR'; payload: number }


export const reducer = (state: ISummaryViewState, action: SummaryViewAction): ISummaryViewState => {
    const newState: ISummaryViewState = { ...state }
    switch (action.type) {
        case 'DATA_UPDATED': {
            if (action.payload) newState.timeentries = action.payload.timeentries
        }
            break

        case 'CHANGE_SCOPE': {
            newState.scope = action.payload
        }
            break

        case 'CHANGE_TYPE': {
            newState.type = action.payload
        }
            break

        case 'CHANGE_RANGE': {
            newState.range = action.payload
        }
            break

        case 'CHANGE_YEAR': {
            newState.year = action.payload
        }
            break

        default: throw new Error()
    }

    // eslint-disable-next-line default-case
    switch (newState.scope.key) {
        case 'month': {
            newState.variables = {
                year: state.year,
                minMonthNumber: dateUtils.getMonthIndex() - state.range + 1,
                maxMonthNumber: dateUtils.getMonthIndex(),
            }
        }
            break
        case 'week': {
            newState.variables = {
                year: state.year,
                minWeekNumber: dateUtils.getWeek() - state.range + 1,
                maxWeekNumber: dateUtils.getWeek(),
            }
        }
            break
    }
    return newState
}