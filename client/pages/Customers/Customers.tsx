import { TabComponent, TabContainer } from 'components'
import { CustomerForm } from 'pages/Customers/CustomerForm'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { CustomersContext } from './context'
import { CustomerDetails } from './CustomerDetails'
import { ICustomerFormProps } from './CustomerForm/types'
import { CustomerList } from './CustomerList'
import { CHANGE_VIEW } from './reducer/actions'
import { CustomersView } from './types'
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
          onTabChanged={(itemKey) =>
            context.dispatch(CHANGE_VIEW({ view: itemKey as CustomersView }))
          }
          styles={{ itemContainer: { paddingTop: 10 } }}
        >
          <CustomerList
            itemKey='search'
            headerText={t('common.search')}
            itemIcon='FabricFolderSearch'
          />
          <CustomerForm
            itemKey='new'
            headerText={t('customers.createNewText')}
            itemIcon='AddTo'
            permission={PermissionScope.MANAGE_CUSTOMERS}
          />
        </TabContainer>
      )}
    </CustomersContext.Provider>
  )
}
