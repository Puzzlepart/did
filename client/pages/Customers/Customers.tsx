/* eslint-disable tsdoc/syntax */
import { usePermissions } from 'hooks'
import {
  MessageBar,
  MessageBarType,
  Pivot,
  PivotItem
} from 'office-ui-fabric-react'
import { CustomerForm } from 'pages/Customers/CustomerForm'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { CustomersContext } from './context'
import { CustomerDetails } from './CustomerDetails'
import { CustomerList } from './CustomerList'
import { useCustomers } from './hooks/useCustomers'
import { CHANGE_VIEW } from './reducer/actions'
import { CustomersView } from './types'

/**
 * @category Function Component
 */
export const Customers: FunctionComponent = () => {
  const { t } = useTranslation()
  const { hasPermission } = usePermissions()
  const { state, dispatch, context, view } = useCustomers()

  return (
    <CustomersContext.Provider value={context}>
      <Pivot
        selectedKey={view}
        onLinkClick={({ props }) =>
          dispatch(CHANGE_VIEW({ view: props.itemKey as CustomersView }))
        }
        styles={{ itemContainer: { paddingTop: 10 } }}>
        <PivotItem
          itemID='search'
          itemKey='search'
          headerText={t('common.search')}
          itemIcon='FabricFolderSearch'>
          {state.error && (
            <MessageBar messageBarType={MessageBarType.error}>
              {t('common.genericErrorText')}
            </MessageBar>
          )}
          <CustomerList />
          {state.selected && <CustomerDetails />}
        </PivotItem>
        {hasPermission(PermissionScope.MANAGE_CUSTOMERS) && (
          <PivotItem
            itemID='new'
            itemKey='new'
            headerText={t('customers.createNewText')}
            itemIcon='AddTo'>
            <CustomerForm />
          </PivotItem>
        )}
      </Pivot>
    </CustomersContext.Provider>
  )
}
