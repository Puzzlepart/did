import { IContextualMenuItem, IPivotItemProps } from '@fluentui/react'
import { IListGroupProps, ListFilterState } from 'components/List/types'
import { TFunction } from 'i18next'
import { Project, ReportLink, TimesheetPeriodObject, User } from 'types'

/**
 * @category Reports
 */
export interface IReportsQuery extends IPivotItemProps {
  /**
   * GraphQL query
   */
  query: any

  /**
   * GraphQL query variables
   */
  variables?: any

  /**
   * Export file name template. {0} will be replaced
   * with the current date and time.
   *
   * @example TimeEntries-{0}.xlsx
   */
  exportFileName?: string

  /**
   * Report link reference
   */
  reportLinkRef?: string

  /**
   * Report links for the current query. They
   * are matched by the `reportLinkRef` property
   * on the query to the `ref` property on the
   * report link.
   */
  reportLinks?: ReportLink[]

  [key: string]: any
}

/**
 * @ignore
 */
export interface IGroupByOption extends IContextualMenuItem {
  props: IListGroupProps
}

/**
 * @category Reports
 */
export interface IReportsSavedFilter extends IContextualMenuItem {
  values: Record<string, any>
}

/**
 * @category Reports
 */
export interface IReportsData {
  /**
   * Time entries
   */
  timeEntries: any[]

  /**
   * Users
   */
  users: User[]

  /**
   * Periods
   */
  periods: TimesheetPeriodObject[]

  /**
   * Projects
   */
  projects: Project[]
}

/**
 * @category Reports
 */
export interface IReportsState {
  /**
   * Data
   */
  data?: IReportsData

  /**
   * Report links
   */
  reportLinks?: ReportLink[]

  /**
   * Whether the filter panel is open
   */
  isFiltersOpen?: boolean

  /**
   * Selected query preset
   */
  queryPreset?: IReportsQuery

  /**
   * Group by properties
   */
  groupBy?: IListGroupProps

  /**
   * Loading
   */
  loading?: boolean

  /**
   * Saved filters
   */
  savedFilters?: { [key: string]: IReportsSavedFilter }

  /**
   * Active filter
   */
  activeFilter?: IReportsSavedFilter

  /**
   * Current filter state
   */
  filterState?: ListFilterState
}

/**
 * Get group by options
 *
 * @ignore
 *
 * @param t - Translate function
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
    key: 'week',
    text: t('common.weekNumberLabel'),
    props: {
      fieldName: 'week',
      emptyGroupName: ' '
    }
  }
]

/**
 * @category Reports
 */
export interface IReportsParameters {
  query: string
}
