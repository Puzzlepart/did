import { IContextualMenuItem } from '@fluentui/react'
import { IListGroupProps, ListFilterState } from 'components/List/types'
import { ITabProps } from 'components/Tabs'
import { IDatePeriod } from 'DateUtils'
import { TFunction } from 'i18next'
import { Project, ReportLink, TimesheetPeriodObject, User } from 'types'

/**
 * @category Reports
 */
export interface IReportsQuery<QueryType = any> extends ITabProps {
  /**
   * Unique query identifier
   */
  id: string

  /**
   * GraphQL query
   */
  query: QueryType

  /**
   * GraphQL query variables
   */
  variables?: Record<string, any>

  /**
   * Export file name template. {0} will be replaced
   * with the current date and time.
   *
   * @example TimeEntries-{0}.xlsx
   */
  exportFileName?: string

  /**
   * Report link reference. String in the format
   * `{year}_{month}`. This is used to match
   * report links to queries.
   */
  reportLinkRef?: string

  /**
   * Report links for the current query. They
   * are matched by the `reportLinkRef` property
   * on the query to the `ref` property on the
   * report link.
   */
  reportLinks?: ReportLink[]

  /**
   * Date periods for the summary report.
   */
  periods?: IDatePeriod[]
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

  /**
   * Report links
   */
  reportLinks?: ReportLink[]

  /**
   * Loading state
   */
  loading?: boolean
}

/**
 * @category Reports
 */
export interface IReportsState {
  /**
   * Data for the current query
   */
  data?: Partial<IReportsData>

  /**
   * Whether the filter panel is open
   */
  isFiltersOpen?: boolean

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
  queryPreset: string
}
