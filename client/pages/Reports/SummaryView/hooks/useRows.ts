/* eslint-disable react-hooks/exhaustive-deps */
import { IReportsState } from 'pages/Reports/types'
import { useMemo } from 'react'
import { TimesheetPeriodObject } from 'types'

/**
 * Generate column data from periods collection
 * 
 * @param periods - Periods collection
 */
function generateColumnData(periods: TimesheetPeriodObject[]) {
  return periods.reduce((data, period) => {
    const key = `${period.week}_${period.year}`
    return {
      ...data,
      [key]: [...(data[key] || []), period]
    }
  }, {})
}

/**
 * Rows hook for SummaryView
 */
export function useRows({ data }: IReportsState) {
  return useMemo(
    () => {
      return [
        ...data.users.map((user) => {
          const periods = data.periods.filter(
            (period) => period.userId === user.id
          )
          return {
            user,
            ...generateColumnData(periods)
          }
        }),
        {
          isTotalRow: true,
          ...generateColumnData(data.periods)
        }
      ]
    }, [data.periods]
  )
}
