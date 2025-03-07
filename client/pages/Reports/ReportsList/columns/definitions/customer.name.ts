import { ICustomerLinkProps } from 'components'
import { CustomerFilter } from 'components/FilterPanel'
import { TimeEntry } from 'types'
import { createColumnDef, CreateColumnDefFunction } from 'utils'

/**
 * Customer name column definition for reports list
 */
export const customerNameColumn: CreateColumnDefFunction = (t) =>
  createColumnDef<TimeEntry, ICustomerLinkProps>(
    'customer.name',
    t('common.customer'),
    {
      minWidth: 100,
      maxWidth: 140,
      renderAs: 'customerLink',
      createRenderProps: ({ customer }) => ({
        customer
      }),
      data: {
        isSortable: true,
        isGroupable: true,
        isFilterable: true,
        filterType: CustomerFilter
      }
    }
  )
