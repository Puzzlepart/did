/* eslint-disable react-hooks/exhaustive-deps */
import { ReportsContext } from 'pages'
import { useContext } from 'react'
import { Project } from 'types'
import _ from 'underscore'
import { firstPart } from '../../../../../shared/utils/firstPart'
import { IPeriodColumnProps } from './types'

export interface IUsePeriodColumnResult {
  total: number
  project?: {
    [key: string]: {
      details: Project
      hours: number
    }
  }
}

/**
 * Hook for calculating total hours and hours per project/customer for
 * the `<PeriodColumn />` component.
 *
 * @param props - Component props
 */
export function usePeriodColumn({
  periods = []
}: IPeriodColumnProps): IUsePeriodColumnResult {
  const { state } = useContext(ReportsContext)
  return periods.reduce(
    (sum_, period) => {
      sum_.total = sum_.total ? sum_.total + period.hours : period.hours
      if (!period.events) return sum_
      for (const event of period.events) {
        const customerKey = firstPart(event.projectId)
        sum_.project[customerKey] = sum_.project[customerKey]
        if (!sum_.project[customerKey]) {
          sum_.project[customerKey] = {
            hours: 0,
            details: _.find(
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
  )
}

export * from './types'
