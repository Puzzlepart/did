import { IContextualMenuItem } from 'office-ui-fabric'
import DateUtils from 'DateUtils'
import { ISummaryViewScope, ISummaryViewState } from './types'

export type SummaryViewAction =
  | { type: 'DATA_UPDATED'; payload: { timeentries: any[] } }
  | { type: 'CHANGE_TYPE'; payload: IContextualMenuItem }
  | { type: 'CHANGE_SCOPE'; payload: ISummaryViewScope }
  | { type: 'SET_RANGE'; payload: { start?: Date, end?: Date } }

export const reducer = (state: ISummaryViewState, action: SummaryViewAction): ISummaryViewState => {
  const newState: ISummaryViewState = { ...state }
  switch (action.type) {
    case 'DATA_UPDATED':
      {
        if (action.payload) newState.timeentries = action.payload.timeentries
      }
      break

    case 'CHANGE_TYPE':
      {
        newState.type = action.payload
      }
      break

    case 'SET_RANGE':
      {
        newState.range = { ...newState.range, ...action.payload }
      }
      break

    case 'CHANGE_SCOPE':
      {
        newState.scope = action.payload
      }
      break

    default:
      throw new Error()
  }
  newState.endMonthIndex = DateUtils.getMonthIndex()
  return newState
}
