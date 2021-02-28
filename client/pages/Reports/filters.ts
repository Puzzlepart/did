/* eslint-disable tsdoc/syntax */
import {
  BaseFilter,
  CustomerFilter,
  ProjectFilter,
  ResourceFilter
} from 'components/FilterPanel/Filters'
import { TFunction } from 'i18next'
import { IReportsSavedFilter } from './types'

/**
 * Returns filter config for Reports
 *
 * @ignore
 *
 * @param filter - The active filter
 * @param t - Translate function
 */
export default (filter: IReportsSavedFilter, t: TFunction): BaseFilter[] => [
  new ResourceFilter(
    'resource.id',
    'resource.displayName',
    t('common.employeeLabel')
  ).setDefaults(filter?.values),
  new CustomerFilter('customer.name', t('common.customer')).setDefaults(
    filter?.values
  ),
  new ProjectFilter('project.name', t('common.project')).setDefaults(
    filter?.values
  )
]
