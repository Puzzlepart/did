import { IconText } from 'components'
import { CustomerLink } from 'components/CustomerLink'
import { IListColumn } from 'components/List/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Customer } from 'types'
import { createColumnDef } from 'utils/createColumnDef'
import { useCustomersContext } from '../context'
import { SET_SELECTED_CUSTOMER } from '../reducer/actions'

/**
 * Returns column definitions
 */
export function useColumns(): IListColumn[] {
  const { t } = useTranslation()
  const context = useCustomersContext()
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
          onClick={() => context.dispatch(SET_SELECTED_CUSTOMER({ customer }))}
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
