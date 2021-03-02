import DateUtils, {DateObject} from 'DateUtils'
import {TFunction} from 'i18next'
import {IPivotItemProps} from 'office-ui-fabric-react'
import {ILabelColumnProps} from 'pages/Admin/SummaryView/LabelColumn/types'
import {ReportsQuery} from 'types'

/**
 * Get scopes
 *
 * @param t - Translate function
 */
export const getScopes = (t: TFunction): ISummaryViewScope[] => [
  {
    itemKey: 'week',
    fieldName: 'weekNumber',
    headerText: t('common.weekLabel'),
    itemIcon: 'CalendarWorkWeek',
    getColumnHeader: (index: number) => `${t('common.weekLabel')} ${index}`
  },
  {
    itemKey: 'month',
    fieldName: 'monthNumber',
    headerText: t('common.monthLabel'),
    itemIcon: 'Calendar',
    getColumnHeader: (index: number) => DateUtils.getMonthName(index)
  }
]

export interface ISummaryViewScope extends IPivotItemProps {
  /**
   * Field name
   */
  fieldName: string

  /**
   * Get column header for the specified index
   */
  getColumnHeader: (index: number) => string
}

export interface ISummaryViewRange {
  from?: DateObject
  to?: DateObject
}

export interface ISummaryViewState {
  /**
   * Selected scope
   */
  scope: ISummaryViewScope

  /**
   * Time entries
   */
  timeentries: any[]

  /**
   * Selected range
   */
  range?: ISummaryViewRange

  /**
   * Variables for timeentries query
   */
  variables?: {
    query: ReportsQuery
  }
}

export interface ISummaryViewRow extends ILabelColumnProps {
  /**
   * Sum hours
   */
  sum: number
}
