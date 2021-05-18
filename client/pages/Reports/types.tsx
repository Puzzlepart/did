/* eslint-disable tsdoc/syntax */
import { IContextualMenuItem, IPivotItemProps } from '@fluentui/react'
import { IListGroupProps } from 'components/List/types'
import { TFunction } from 'i18next'
import { Project, TimesheetPeriodObject, User } from 'types'

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
   * Export file name
   */
  exportFileName?: string

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
  values: { [key: string]: any }
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
   * Filtered subset of data.timeEntries
   */
  subset?: any[]

  /**
   * Filter panel open
   */
  isFiltersOpen?: boolean

  /**
   * Query preset
   */
  preset?: IReportsQuery

  /**
   * Group by properties
   */
  groupBy?: IListGroupProps

  /**
   * Loading
   */
  loading?: boolean

  /**
   * Is filtered
   */
  isFiltered?: boolean

  /**
   * Saved filters
   */
  savedFilters?: { [key: string]: IReportsSavedFilter }

  /**
   * Active filter
   */
  filter?: IReportsSavedFilter
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
