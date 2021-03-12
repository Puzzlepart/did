import { ISummaryViewState } from '../types'

/**
 * Rows hook for SummaryView
 */
export function useRows(state: ISummaryViewState) {
  return state.users.map((user) => {
    const periods = state.periods.filter(period => period.userId === user.id)
    return {
      user: user.displayName,
      ...periods.reduce((data, period) => {
        const key = `${period.week}_${period.year}`
        return {
          ...data,
          [key]: [...data[key] || [], period]
        }
      }, {})
    }
  })
}
