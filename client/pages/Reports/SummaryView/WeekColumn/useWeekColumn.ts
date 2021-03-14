/* eslint-disable react-hooks/exhaustive-deps */
import { ReportsContext } from 'pages'
import { useContext, useMemo } from 'react'
import { Project } from 'types'
import { find } from 'underscore'
import { firstPart } from '../../../../../server/utils'
import { IWeekColumnProps } from './types'

export interface IUseWeekColumnResult {
  total: number
  project?: {
    [key: string]: {
      details: Project
      hours: number
    }
  }
}

/**
 * Hook for WeekColumn
 *
 * Calculates total hours and hours per project/customer.
 *
 * This is displayed in the `<WeekColumnTooltip />` component.
 *
 * @param props - Component props
 */
export function useWeekColumn({
  periods = []
}: IWeekColumnProps): IUseWeekColumnResult {
  const { state } = useContext(ReportsContext)
  return useMemo(
    () =>
      periods.reduce(
        (sum_, period) => {
          sum_.total = sum_.total ? sum_.total + period.hours : period.hours
          if (!period.events) return sum_
          for (const event of period.events) {
            const customerKey = firstPart(event.projectId)
            sum_.project[customerKey] = sum_.project[customerKey]
            if (!sum_.project[customerKey]) {
              sum_.project[customerKey] = {
                hours: 0,
                details: find(
                  state.data.projects,
                  (p) => p.customerKey === customerKey
                )
              }
            }
            sum_.project[customerKey].hours += event.duration
          }
          return sum_
        },
        { total: null, project: {} }
      ),
    [state.data.projects]
  )
}

export * from './types'
