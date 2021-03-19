import { CustomerLink } from 'components/CustomerLink'
import { TFunction } from 'i18next'
import { IColumn, Icon } from 'office-ui-fabric-react'
import React from 'react'
import { Customer } from 'types'
import { generateColumn as col } from 'utils/generateColumn'

/**
 * Generate column definitions
 */
export const columns = (t: TFunction): IColumn[] => [
  col('icon', '', { maxWidth: 35, minWidth: 35 }, (customer: Customer) => {
    if (customer.inactive) {
      return (
        <Icon
          title={t('customers.inactiveText')}
          iconName='Warning'
          styles={{ root: { fontSize: 16, color: '#ffbf00' } }}
        />
      )
    }
    return (
      <Icon
        iconName={customer.icon || 'Page'}
        styles={{ root: { fontSize: 16 } }}
      />
    )
  }),
  col('key', t('common.keyFieldLabel'), { maxWidth: 120 }),
  col(
    'name',
    t('common.nameFieldLabel'),
    { maxWidth: 300 },
    (customer: Customer) => <CustomerLink customer={customer} />
  )
]
