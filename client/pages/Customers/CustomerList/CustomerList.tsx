import { InactiveCheckboxMenuItem, List } from 'components'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useCustomersContext } from '../context'
import { useCustomerList } from './useCustomerList'
import { CheckboxVisibility, SelectionMode } from '@fluentui/react'
import { SET_SELECTED_CUSTOMERS, OPEN_BULK_EDIT_PANEL } from '../reducer'
import { Customer } from 'types'
import { ListMenuItem } from 'components/List'
import { usePermissions } from 'hooks/user/usePermissions'
import { PermissionScope } from 'security'

export const CustomerList: TabComponent = (props) => {
  const { t } = useTranslation()
  const context = useCustomersContext()
  const { columns, showInactive } = useCustomerList()
  const [, hasPermission] = usePermissions()
  return (
    <>
      <List
        searchBox={{
          persist: true,
          disabled: context.loading,
          placeholder: (state) =>
            t('customers.searchPlaceholder', {
              count: state.origItems?.length ?? 0
            })
        }}
        enableShimmer={context.loading}
        items={context.state.customers}
        columns={columns}
        menuItems={(_context) => [
          ...(context.state.customers.some((c) => c.inactive)
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
            : []),
          new ListMenuItem(t('customers.bulkEdit.label'))
            .withIcon('Edit')
            .setHidden(
              !hasPermission(PermissionScope.MANAGE_CUSTOMERS) ||
                (context?.state?.selectedCustomers?.length ?? 0) <= 1
            )
            .withDispatch(
              context,
              OPEN_BULK_EDIT_PANEL,
              context.state.selectedCustomers
            )
        ]}
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
        checkboxVisibility={CheckboxVisibility.onHover}
        selectionProps={[
          SelectionMode.multiple,
          (selected) =>
            context.dispatch(SET_SELECTED_CUSTOMERS(selected as Customer[]))
        ]}
      />
      {props.children}
    </>
  )
}
