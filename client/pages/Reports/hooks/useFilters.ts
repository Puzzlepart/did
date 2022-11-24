import {
  BaseFilter,
  CustomerFilter,
  ProjectFilter,
  ResourceFilter
} from 'components/FilterPanel/Filters'
import { useTranslation } from 'react-i18next'
import { IReportsSavedFilter } from '../types'

/**
 * Returns filter configuration for Reports
 */
export function useFilters(filter: IReportsSavedFilter) {
  const { t } = useTranslation()
  return [
    new ResourceFilter(
      t('common.employeeLabel'),
      'resource.id',
      'resource.displayName'
    ) as BaseFilter,
    new CustomerFilter(
      t('common.customer'),
      'customer.key',
      'customer.name'
    ) as BaseFilter,
    new ProjectFilter(
      t('common.project'),
      'project.tag',
      'project.name'
    ) as BaseFilter,
    new ProjectFilter(
      t('projects.keyFieldLabel'),
      'project.tag',
      'project.tag'
    ) as BaseFilter
  ].map((filter_) => filter_.setDefaults(filter?.values))
}
