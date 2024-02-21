import { InactiveCheckboxMenuItem, List } from 'components'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useCustomersContext } from '../context'
import { useCustomerList } from './useCustomerList'

export const CustomerList: TabComponent = (props) => {
  const { t } = useTranslation()
  const context = useCustomersContext()
  const { customers, inactiveCustomers, columns, showInactive } =
    useCustomerList()

  return (
    <>
      <List
        searchBox={{ placeholder: t('common.searchPlaceholder') }}
        enableShimmer={context.loading}
        items={customers}
        columns={columns}
        menuItems={[
          inactiveCustomers.length > 0 &&
            InactiveCheckboxMenuItem(
              t('customers.toggleInactive', {
                count: inactiveCustomers.length
              }),
              showInactive.toggle
            )
        ]}
        getColumnStyle={(customer) => ({
          opacity: customer.inactive ? 0.4 : 1
        })}
      />
      {props.children}
    </>
  )
}
