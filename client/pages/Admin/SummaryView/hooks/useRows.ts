import { ISummaryViewState } from '../types'

/**
 * Rows hook for SummaryView
 */
export function useRows(state: ISummaryViewState) {
    return state.users.map(user => ({
        user: user.displayName
    }))
}   