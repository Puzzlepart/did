import { IconText } from 'components'
import { CustomerLink } from 'components/CustomerLink'
import { IListColumn } from 'components/List/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Customer } from 'types'
import { createColumnDef } from 'utils/createColumnDef'
import { useCustomerList } from './useCustomerList'

/**
 * Returns column definitions
 */
export function useColumns({
  setSelectedCustomer
}: Partial<ReturnType<typeof useCustomerList>>): IListColumn[] {
  const { t } = useTranslation()
  return [
    createColumnDef<Customer>(
      'key',
      t('common.keyFieldLabel'),
      {
        minWidth: 125,
        maxWidth: 125
      },
      ({ key, icon, inactive }: Customer) => {
        if (inactive) {
          return (
            <IconText
              title={t('customers.inactiveText')}
              iconName='Warning'
              styles={{ root: { color: '#ffbf00' } }}
              text={key}
            />
          )
        }
        return <IconText iconName={icon} text={key} />
      }
    ),
    createColumnDef<Customer>(
      'name',
      t('common.nameFieldLabel'),
      { maxWidth: 300 },
      (customer) => (
        <CustomerLink
          customer={customer}
          onClick={() => setSelectedCustomer(customer)}
        />
      )
    ),
    createColumnDef<Customer>(
      'description',
      t('common.descriptionFieldLabel'),
      {
        maxWidth: 300,
        isMultiline: true
      }
    )
  ]
}
