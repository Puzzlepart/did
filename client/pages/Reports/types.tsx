/* eslint-disable tsdoc/syntax */
import { IListGroups } from 'components/List/types'
import { TFunction } from 'i18next'
import { IContextualMenuItem } from 'office-ui-fabric-react'

/**
 * @category Reports
 */
export interface IReportsQueryPresetItem extends IContextualMenuItem {
  /**
   * GraphQL query
   */
  query: any

  /**
   * Export file name
   */
  exportFileName: string
}

/**
 * @ignore
 */
export interface IGroupByOption extends IContextualMenuItem {
  props: IListGroups
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
   * Query preset
   */
  preset?: IReportsQueryPresetItem

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
