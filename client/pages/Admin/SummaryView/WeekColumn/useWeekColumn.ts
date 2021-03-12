import { Project } from 'types'
import { find, isEmpty } from 'underscore'
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
 * @param props - Component props
 */
export function useWeekColumn(props: IWeekColumnProps): IUseWeekColumnResult {
  if (isEmpty(props.periods)) return { total: null }
  return props.periods.reduce(
    (sum_, period) => {
      for (const event of period.events) {
        const customerKey = firstPart(event.projectId)
        sum_.project[customerKey] = sum_.project[customerKey]
        if (!sum_.project[customerKey]) {
          sum_.project[customerKey] = {
            hours: 0,
            details: find(props.projects, (p) => p.customerKey === customerKey)
          }
        }
        sum_.project[customerKey].hours += event.duration
      }
      sum_.total = sum_.total + period.hours
      return sum_
    },
    { total: 0, project: {} }
  )
}

export * from './types'
