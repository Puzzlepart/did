import { InactiveCheckboxMenuItem, List } from 'components'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useCustomersContext } from '../context'
import { useCustomerList } from './useCustomerList'

export const CustomerList: TabComponent = (props) => {
  const { t } = useTranslation()
  const context = useCustomersContext()
  const { columns, showInactive } = useCustomerList()
  return (
    <>
      <List
        searchBox={{ placeholder: t('common.searchPlaceholder') }}
        enableShimmer={context.loading}
        items={context.state.customers}
        columns={columns}
        menuItems={(_context) => {
          return context.state.customers.some((c) => c.inactive)
            ? [
                InactiveCheckboxMenuItem(
                  t('customers.toggleInactive', {
                    count: _context.state.itemsPreFilter.filter(
                      (c) => c.inactive
                    ).length
                  }),
                  showInactive.toggle
                )
              ]
            : []
        }}
        getColumnStyle={(customer) => ({
          opacity: customer.inactive ? 0.4 : 1
        })}
        filterValues={
          showInactive.value
            ? {}
            : {
                '!inactive': true
              }
        }
      />
      {props.children}
    </>
  )
}
