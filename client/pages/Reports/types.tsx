import { IListGroups } from 'components/List/types'
import { TFunction } from 'i18next'
import { IContextualMenuItem } from 'office-ui-fabric'
import { TimeEntriesQuery } from 'types'
import { omit } from 'underscore'
import { capitalize } from 'underscore.string'
import { DateObject } from 'utils/date'

export interface IReportsQuery extends IContextualMenuItem {
  /**
   * Variables used for graphl query
   */
  variables: {
    query: TimeEntriesQuery
    forecast?: boolean
    sortAsc?: boolean
  }

  /**
   * Export file name
   */
  exportFileName: string
}

export interface IGroupByOption extends IContextualMenuItem {
  props: IListGroups
}

export interface IReportsState {
  /**
   * Filter panel open
   */
  readonly isFiltersOpen?: boolean

  /**
   * Query
   */
  readonly query?: IReportsQuery

  /**
   * Group by properties
   */
  readonly groupBy?: IListGroups

  /**
   * Filtered subset
   */
  readonly subset?: any[]
}

/**
 * Get queries
 *
 * @param {TFunction} t Translate function
 */
export function getQueries<T = IReportsQuery>(t: TFunction): T[] {
  const now = new DateObject()
  const lastMonth = now.add('-1month').toObject()
  const currentMonth = now.toObject()
  const currentYear = now.toObject('year')
  return [
    ({
      key: 'lastMonth',
      text: t('common.exportTypeLastMonth', lastMonth),
      iconName: 'CalendarDay',
      variables: { query: omit(lastMonth, 'monthName') },
      exportFileName: `TimeEntries-${capitalize(lastMonth.monthName)}-{0}.xlsx`
    } as unknown) as T,
    ({
      key: 'currentMonth',
      text: t('common.exportTypeCurrentMonth', currentMonth),
      iconName: 'Calendar',
      variables: { query: omit(currentMonth, 'monthName') },
      exportFileName: `TimeEntries-${capitalize(currentMonth.monthName)}-{0}.xlsx`
    } as unknown) as T,
    ({
      key: 'currentYear',
      text: t('common.exportTypeCurrentYear', currentYear),
      iconName: 'CalendarReply',
      variables: { query: currentYear },
      exportFileName: `TimeEntries-${currentYear.year}-{0}.xlsx`
    } as unknown) as T,
    ({
      key: 'forecast',
      text: t('reports.forecast'),
      iconName: 'TimeSheet',
      variables: {
        sortAsc: true,
        forecast: true,
        query: {
          startDateTime: new Date().toISOString()
        }
      },
      exportFileName: 'Forecast-{0}.xlsx'
    } as unknown) as T
  ]
}

/**
 * Get group by options
 *
 * @param {TFunction} t Translate function
 */
export const getGroupByOptions = (t: TFunction): IGroupByOption[] => [
  {
    key: 'none',
    text: t('common.none'),
    props: {
      fieldName: '.',
      emptyGroupName: t('common.all')
    }
  },
  {
    key: 'resource.displayName',
    text: t('common.employeeLabel'),
    props: {
      fieldName: 'resource.displayName',
      emptyGroupName: ''
    }
  },
  {
    key: 'customer',
    text: t('common.customer'),
    props: {
      fieldName: 'customer.name',
      emptyGroupName: ''
    }
  },
  {
    key: 'project',
    text: t('common.project'),
    props: {
      fieldName: 'project.name',
      emptyGroupName: ''
    }
  },
  {
    key: 'weekNumber',
    text: t('common.weekNumberLabel'),
    props: {
      fieldName: 'weekNumber',
      emptyGroupName: ' '
    }
  }
]

export interface IReportsParams {
  query: string
}
