import { Tabs } from 'components/Tabs'
import { CustomerForm } from 'pages/Customers/CustomerForm'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
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

  return (
    <CustomersContext.Provider value={context}>
      {renderDetails ? (
        <CustomerDetails />
      ) : (
        <Tabs
          defaultSelectedValue={currentTab}
          items={{
            s: [CustomerList, t('common.search')],
            new: [CustomerForm, t('customers.createNewText')]
          }}
        />
      )}
      <BulkEditCustomersPanel
        open={context.state.bulkEditPanelOpen}
        onDismiss={() => context.dispatch(CLOSE_BULK_EDIT_PANEL())}
        customers={context.state.selectedCustomers || []}
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
