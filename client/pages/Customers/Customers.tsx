import { Tabs } from 'components/Tabs'
import { CustomerForm } from 'pages/Customers/CustomerForm'
import React, { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { PermissionScope } from 'security'
import { usePermissions } from 'hooks'
import { CustomerDetails } from './CustomerDetails'
import { CustomerList } from './CustomerList'
import { BulkEditCustomersPanel } from './BulkEditCustomersPanel'
import { CustomersContext } from './context'
import { CLOSE_BULK_EDIT_PANEL } from './reducer'
import { useCustomers } from './useCustomers'

/**
 * @category Function Component
 */
export const Customers: FC = () => {
  const { t } = useTranslation()
  const { context, renderDetails, currentTab } = useCustomers()
  const history = useHistory()
  const [, hasPermission] = usePermissions()

  // Block access to /customers/new without permission (before rendering)
  const canCreateCustomer = hasPermission(PermissionScope.MANAGE_CUSTOMERS)

  useEffect(() => {
    if (currentTab === 'new' && !canCreateCustomer) {
      history.replace('/customers')
    }
  }, [currentTab, canCreateCustomer, history])

  // Don't render unauthorized form to prevent flash of content
  if (currentTab === 'new' && !canCreateCustomer) {
    return null
  }

  return (
    <CustomersContext.Provider value={context}>
      {renderDetails ? (
        <CustomerDetails />
      ) : (
        <Tabs
          defaultSelectedValue={currentTab}
          items={{
            s: [CustomerList, t('common.search')],
            new: [
              CustomerForm,
              t('customers.createNewText'),
              { permission: PermissionScope.MANAGE_CUSTOMERS }
            ]
          }}
        />
      )}
      <BulkEditCustomersPanel
        open={context.state.bulkEditPanelOpen}
        onDismiss={() => context.dispatch(CLOSE_BULK_EDIT_PANEL())}
        customers={context.state.bulkEditCustomers || []}
        onSave={async () => {
          await context.refetch()
        }}
      />
    </CustomersContext.Provider>
  )
}

Customers.displayName = 'Customers'
Customers.defaultProps = {
  projectForm: {
    open: false
  }
}
