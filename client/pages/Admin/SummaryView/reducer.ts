import { IContextualMenuItem } from 'office-ui-fabric'
import DateUtils from 'utils/date'
import { ISummaryViewScope, ISummaryViewState } from './types'

export type SummaryViewAction =
  | { type: 'DATA_UPDATED'; payload: { timeentries: any[] } }
  | { type: 'CHANGE_TYPE'; payload: IContextualMenuItem }
  | { type: 'CHANGE_RANGE'; payload: number }
  | { type: 'CHANGE_SCOPE'; payload: ISummaryViewScope }

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

    case 'CHANGE_RANGE':
      {
        newState.range = action.payload
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
