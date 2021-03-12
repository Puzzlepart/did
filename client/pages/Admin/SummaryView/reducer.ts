import { ISummaryViewScope, ISummaryViewState } from './types'

export type SummaryViewAction =
  | { type: 'DATA_UPDATED'; payload: any }
  | { type: 'CHANGE_SCOPE'; payload: ISummaryViewScope }

export const reducer = (
  state: ISummaryViewState,
  action: SummaryViewAction
): ISummaryViewState => {
  const newState: ISummaryViewState = { ...state }
  switch (action.type) {
    case 'DATA_UPDATED':
      {
        if (action.payload) {
          newState.users = action.payload.users
          newState.periods = action.payload.periods
          newState.projects = action.payload.projects
        }
      }
      break

    case 'CHANGE_SCOPE':
      {
        newState.scope = action.payload
      }
      break
  }
  return newState
}
