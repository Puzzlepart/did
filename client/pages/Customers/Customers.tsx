/* eslint-disable tsdoc/syntax */
import { TabComponent, TabContainer } from 'components'
import { CustomerForm } from 'pages/Customers/CustomerForm'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { CustomersContext } from './context'
import { CustomerDetails } from './CustomerDetails'
import { ICustomerFormProps } from './CustomerForm/types'
import { CustomerList } from './CustomerList'
import { useCustomers } from './hooks/useCustomers'
import { CHANGE_VIEW } from './reducer/actions'
import { CustomersView } from './types'

/**
 * @category Function Component
 */
export const Customers: TabComponent<ICustomerFormProps> = () => {
  const { t } = useTranslation()
  const { state, dispatch, context, view } = useCustomers()

  return (
    <CustomersContext.Provider value={context}>
      <TabContainer
        selectedKey={view}
        onLinkClick={({ props }) =>
          dispatch(CHANGE_VIEW({ view: props.itemKey as CustomersView }))
        }
        styles={{ itemContainer: { paddingTop: 10 } }}>
        <CustomerList
          itemKey='search'
          headerText={t('common.search')}
          itemIcon='FabricFolderSearch'>
          {state.selected && <CustomerDetails />}
        </CustomerList>
        <CustomerForm
          itemKey='new'
          headerText={t('customers.createNewText')}
          itemIcon='AddTo'
          permission={PermissionScope.MANAGE_CUSTOMERS}
        />
      </TabContainer>
    </CustomersContext.Provider>
  )
}
