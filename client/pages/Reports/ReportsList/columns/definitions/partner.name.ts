import { ICustomerLinkProps } from 'components'
import { CustomerFilter } from 'components/FilterPanel'
import { TimeEntry } from 'types'
import { createColumnDef, CreateColumnDefFunction } from 'utils'

/**
 * Partner name column definition for reports list
 */
export const partnerNameColumn: CreateColumnDefFunction = (t) =>
  createColumnDef<TimeEntry, ICustomerLinkProps>(
    'partner.name',
    t('common.partner'),
    {
      minWidth: 100,
      maxWidth: 140,
      renderAs: 'customerLink',
      createRenderProps: ({ partner }) => ({
        customer: partner
      }),
      data: {
        isSortable: true,
        isGroupable: true,
        isFilterable: true,
        filterType: CustomerFilter
      }
    }
  )
