/* eslint-disable tsdoc/syntax */
import { FlexiblePivot, FlexiblePivotItem } from 'components'
import { usePermissions } from 'hooks'
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
export const Customers: FlexiblePivotItem<ICustomerFormProps> = () => {
  const { t } = useTranslation()
  const { hasPermission } = usePermissions()
  const { state, dispatch, context, view } = useCustomers()

  return (
    <CustomersContext.Provider value={context}>
      <FlexiblePivot
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
        {hasPermission(PermissionScope.MANAGE_CUSTOMERS) && (
          <CustomerForm
            itemKey='new'
            headerText={t('customers.createNewText')}
            itemIcon='AddTo'
          />
        )}
      </FlexiblePivot>
    </CustomersContext.Provider>
  )
}
