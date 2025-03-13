import { TagProps } from '@fluentui/react-tags-preview'
import { EntityLabel, ItemColumn } from 'components'
import { ICustomerLinkProps } from 'components/CustomerLink'
import { IListColumn } from 'components/List/types'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Customer, LabelObject } from 'types'
import { getFluentIconWithFallback } from 'utils'
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
      createColumnDef<Customer, TagProps>('key', t('customers.keyFieldLabel'), {
        minWidth: 125,
        maxWidth: 125,
        renderAs: 'tag',
        createRenderProps: (customer) => ({
          icon: getFluentIconWithFallback(customer.icon, {
            default: 'Folder'
          })
        })
      }),
      createColumnDef<Customer, ICustomerLinkProps>(
        'name',
        t('common.nameFieldLabel'),
        {
          maxWidth: 300,
          renderAs: 'customerLink',
          createRenderProps: (customer) => ({
            onClick: () => context.dispatch(SET_SELECTED_CUSTOMER(customer)),
            showIcon: false,
            customer
          })
        }
      ),
      createColumnDef<Customer>(
        'description',
        t('common.descriptionFieldLabel'),
        {
          maxWidth: 350,
          isMultiline: true
        }
      ),
      createColumnDef<Customer>(
        'labels',
        t('common.labelFieldLabel'),
        {},
        (customer) => (
          <>
            {(customer.labels as LabelObject[]).map((label, index: number) => (
              <EntityLabel key={index} label={label} />
            ))}
          </>
        )
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
