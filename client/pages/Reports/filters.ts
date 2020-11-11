import { BaseFilter, CustomerFilter, ProjectFilter, ResourceFilter } from 'components/FilterPanel/Filters'
import { TFunction } from 'i18next'

export const filters = (t: TFunction): BaseFilter[] => [
  new ResourceFilter('resource.displayName', t('common.employeeLabel')),
  new CustomerFilter('customer.name', t('common.customer')),
  new ProjectFilter('project.name', t('common.project'))
]