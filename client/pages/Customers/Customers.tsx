import { Tabs } from 'components/Tabs'
import { CustomerForm } from 'pages/Customers/CustomerForm'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { CustomerDetails } from './CustomerDetails'
import { CustomerList } from './CustomerList'
import { CustomersContext } from './context'
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
    </CustomersContext.Provider>
  )
}

Customers.displayName = 'Customers'
Customers.defaultProps = {
  projectForm: {
    open: false
  }
}
