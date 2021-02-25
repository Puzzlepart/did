import { IListGroups } from 'components/List/types'
import { TFunction } from 'i18next'
import { IContextualMenuItem } from 'office-ui-fabric'
import { ReportsQuery } from 'types'

export interface IReportsQuery extends IContextualMenuItem {
  /**
   * Variables used for graphl query
   */
  variables: {
    query: ReportsQuery
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

export interface IReportsSavedFilter {
  name?: string
  values: { [key: string]: any }
}

export interface IReportsState {
  /**
   * Time entries
   */
  timeentries?: any[]

  /**
   * Filtered subset
   */
  subset?: any[]

  /**
   * Filter panel open
   */
  isFiltersOpen?: boolean

  /**
   * Query
   */
  query?: IReportsQuery

  /**
   * Group by properties
   */
  groupBy?: IListGroups

  /**
   * Loading
   */
  loading?: boolean

  /**
   * Is filtered
   */
  isFiltered?: boolean

  /**
   * Saved filters (stored in browser storage)
   */
  savedFilters?: IReportsSavedFilter[]

  /**
   * Active filter
   */
  filter?: IReportsSavedFilter
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
    key: 'week',
    text: t('common.weekNumberLabel'),
    props: {
      fieldName: 'week',
      emptyGroupName: ' '
    }
  }
]

export interface IReportsParams {
  query: string
}
