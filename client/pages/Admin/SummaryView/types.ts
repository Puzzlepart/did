import { ILabelColumnProps } from 'components/LabelColumn/types'
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu'
import { TFunction } from 'i18next'
import { IPivotItemProps } from 'office-ui-fabric-react'
import dateUtils from 'utils/date'
import { TimeEntriesQuery } from 'types'

/**
 * Get scopes
 *
 * @param {TFunction} t Translate function
 */
export const getScopes = (t: TFunction): ISummaryViewScope[] => [
  {
    itemKey: 'week',
    fieldName: 'weekNumber',
    headerText: t('common.weekLabel'),
    itemIcon: 'CalendarWorkWeek',
    getColumnHeader: (idx: number) => `${t('common.weekLabel')} ${idx}`
  },
  {
    itemKey: 'month',
    fieldName: 'monthNumber',
    headerText: t('common.monthLabel'),
    itemIcon: 'Calendar',
    getColumnHeader: (idx: number) => dateUtils.getMonthName(idx)
  }
]

/**
 * Get view types
 *
 * @param {TFunction} t Translate function
 */
export const getViewTypes = (t: TFunction): IContextualMenuItem[] => [
  {
    key: 'resource',
    fieldName: 'resource.displayName',
    name: t('common.employeeLabel')
  },
  {
    key: 'project',
    fieldName: 'project.name',
    name: t('common.project')
  },
  {
    key: 'customer',
    fieldName: 'customer.name',
    name: t('common.customer')
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
  getColumnHeader: (idx: number) => string
}

export interface ISummaryViewProps {
  /**
   * Default selected year
   */
  defaultSelectedYear: number

  /**
   * Default selected scope
   */
  defaultSelectedScope: string

  /**
   * Default range
   */
  defaultRange: number
}

export interface ISummaryViewState {
  /**
   * Selected year
   */
  year: number

  /**
   * Selected scope
   */
  scope: ISummaryViewScope

  /**
   * Max month number
   */
  endMonthIndex: number

  /**
   * Time entries
   */
  timeentries: any[]

  /**
   * Selected range
   */
  range: number

  /**
   * Selected view type
   */
  type: IContextualMenuItem

  /**
   * Variables for timeentries query
   */
  variables?: {
    query: TimeEntriesQuery
  }
}

export interface ISummaryViewRow extends ILabelColumnProps {
  /**
   * Sum hours
   */
  sum: number
}
