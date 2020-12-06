import { useQuery } from '@apollo/client'
import { AppContext } from 'AppContext'
import { PERMISSION } from 'config/security/permissions'
import { MessageBar, MessageBarType, Pivot, PivotItem } from 'office-ui-fabric'
import { CustomerForm } from 'pages/Customers/CustomerForm'
import React, { FunctionComponent, useContext, useEffect, useMemo, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { CustomersContext, ICustomersContext } from './context'
import { CustomerDetails } from './CustomerDetails'
import { CustomerList } from './CustomerList'
import $customers from './customers.gql'
import reducer, { initState } from './reducer'
import { CustomersView, ICustomersParams } from './types'

export const Customers: FunctionComponent = () => {
  const { t } = useTranslation()
  const { user } = useContext(AppContext)
  const history = useHistory()
  const params = useParams<ICustomersParams>()
  const [state, dispatch] = useReducer(reducer(history), initState(params))
  const query = useQuery($customers, {
    fetchPolicy: 'cache-first'
  })

  useEffect(() => dispatch({ type: 'DATA_UPDATED', query, params }), [query])

  const ctxValue: ICustomersContext = useMemo(() => ({
    state,
    dispatch,
    refetch: query.refetch,
    loading: query.loading
  }), [state])

  return (
    <CustomersContext.Provider value={ctxValue}>
      <Pivot
        selectedKey={params.view || 'search'}
        onLinkClick={({ props }) =>
          dispatch({
            type: 'CHANGE_VIEW',
            view: props.itemKey as CustomersView
          })
        }
        styles={{ itemContainer: { paddingTop: 10 } }}>
        <PivotItem
          itemID='search'
          itemKey='search'
          headerText={t('common.search')}
          itemIcon='FabricFolderSearch'>
          {query.error ? (
            <MessageBar messageBarType={MessageBarType.error}>
              {t('common.genericErrorText')}
            </MessageBar>
          ) : (
              <>
                <CustomerList />
                {state.selected && <CustomerDetails />}
              </>
            )}
        </PivotItem>
        {user.hasPermission(PERMISSION.MANAGE_CUSTOMERS) && (
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
