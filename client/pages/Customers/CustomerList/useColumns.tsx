import { IconText, ItemColumn } from 'components'
import { CustomerLink } from 'components/CustomerLink'
import { IListColumn } from 'components/List/types'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Customer } from 'types'
import { createColumnDef } from 'utils/createColumnDef'
import { useCustomersContext } from '../context'
import { SET_SELECTED_CUSTOMER } from '../reducer/actions'

/**
 * Column wrapper component that sets opacity to 0.4 if customer is inactive.
 *
 * @category Customers
 */
const ColumnWrapper = ({ customer, children }) => (
  <div style={{ opacity: customer.inactive ? 0.4 : 1 }}>{children}</div>
)

/**
 * Returns column definitions
 *
 * @category Customers
 */
export function useColumns(): IListColumn[] {
  const { t } = useTranslation()
  const context = useCustomersContext()

  const columns = useMemo(
    () => [
      createColumnDef<Customer>(
        'key',
        t('common.keyFieldLabel'),
        {
          minWidth: 125,
          maxWidth: 125
        },
        (customer) => {
          return customer.inactive ? (
            <IconText
              title={t('customers.inactiveText')}
              iconName='Warning'
              styles={{ root: { color: '#ffbf00' } }}
              text={customer.key}
            />
          ) : (
            <IconText iconName={customer.icon} text={customer.key} />
          )
        }
      ),
      createColumnDef<Customer>(
        'name',
        t('common.nameFieldLabel'),
        { maxWidth: 300 },
        (customer) => (
          <CustomerLink
            customer={customer}
            onClick={() =>
              context.dispatch(SET_SELECTED_CUSTOMER({ customer }))
            }
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
    ],
    []
  )

  const columnsWithWrapper = useMemo(
    () =>
      columns.map((column) => ({
        ...column,
        onRender: (customer: Customer) => (
          <ColumnWrapper customer={customer}>
            <ItemColumn column={column} item={customer} />
          </ColumnWrapper>
        )
      })),
    [columns]
  )

  return columnsWithWrapper
}
