/* eslint-disable react-hooks/exhaustive-deps */
import { IReportsState } from 'pages/Reports/types'
import { useMemo } from 'react'

/**
 * Rows hook for SummaryView
 */
export function useRows({ data }: IReportsState) {
  return useMemo(
    () =>
      data.users.map((user) => {
        const periods = data.periods.filter(
          (period) => period.userId === user.id
        )
        return {
          user,
          ...periods.reduce((data, period) => {
            const key = `${period.week}_${period.year}`
            return {
              ...data,
              [key]: [...(data[key] || []), period]
            }
          }, {})
        }
      }),
    [data.periods]
  )
}
