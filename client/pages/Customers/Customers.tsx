import { TabComponent } from 'components'
import { Tabs } from 'components/Tabs'
import { CustomerForm } from 'pages/Customers/CustomerForm'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CustomersContext } from './context'
import { CustomerDetails } from './CustomerDetails'
import { ICustomerFormProps } from './CustomerForm/types'
import { CustomerList } from './CustomerList'
import { useCustomers } from './useCustomers'

/**
 * @category Function Component
 */
export const Customers: TabComponent<ICustomerFormProps> = () => {
  const { t } = useTranslation()
  const { context, renderDetails } = useCustomers()

  return (
    <CustomersContext.Provider value={context}>
      {renderDetails ? (
        <CustomerDetails />
      ) : (
        <Tabs
          items={{
            s: [CustomerList, t('common.search')],
            new: [CustomerForm, t('customers.createNewText')]
          }}
        />
      )}
    </CustomersContext.Provider>
  )
}
