import { TabComponent, TabContainer } from 'components'
import { CustomerForm } from 'pages/Customers/CustomerForm'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { CustomersContext } from './context'
import { CustomerDetails } from './CustomerDetails'
import { ICustomerFormProps } from './CustomerForm/types'
import { CustomerList } from './CustomerList'
import { CHANGE_TAB } from './reducer/actions'
import { CustomersTab } from './types'
import { useCustomers } from './useCustomers'

/**
 * @category Function Component
 */
export const Customers: TabComponent<ICustomerFormProps> = () => {
  const { t } = useTranslation()
  const { context, view, renderDetails } = useCustomers()

  return (
    <CustomersContext.Provider value={context}>
      {renderDetails ? (
        <CustomerDetails />
      ) : (
        <TabContainer
          defaultSelectedKey={view}
          onTabChanged={(tab: CustomersTab) =>
            context.dispatch(CHANGE_TAB({ tab }))
          }
        >
          <CustomerList itemKey='s' headerText={t('common.search')} />
          <CustomerForm
            itemKey='new'
            headerText={t('customers.createNewText')}
            permission={PermissionScope.MANAGE_CUSTOMERS}
          />
        </TabContainer>
      )}
    </CustomersContext.Provider>
  )
}
