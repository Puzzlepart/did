import dateUtils, { moment } from 'utils/date'
import { ISummaryViewState, ISummaryViewType } from './types'

export type SummaryViewAction =
    { type: 'DATA_UPDATED'; payload: { timeentries: any[] } }
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
    if(newState.year !== moment().year()) newState.maxMonth = 12
    else newState.maxMonth = dateUtils.getMonthIndex()
    return newState
}