import { useQuery } from '@apollo/react-hooks'
import { AppContext } from 'AppContext'
import { manageCustomers } from 'config/security/permissions'
import { value } from 'helpers'
import { ICustomer } from 'interfaces'
import { SelectionMode } from 'office-ui-fabric-react/lib/DetailsList'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot'
import { CustomerForm } from 'pages/Customers/CustomerForm'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { contains, find } from 'underscore'
import { CustomerDetails } from './CustomerDetails'
import { CustomerList } from './CustomerList'
import GET_CUSTOMERS from './GET_CUSTOMERS'
import { ICustomersParams, IGetCustomersData } from './types'

/**
 * @category Customers
 */
export const Customers = () => {
    const { t } = useTranslation(['common', 'ADMINS'])
    const history = useHistory()
    const { user } = useContext(AppContext)
    const params = useParams<ICustomersParams>()
    const [selected, setSelected] = useState<ICustomer>(null)
    const { loading, error, data } = useQuery<IGetCustomersData>(
        GET_CUSTOMERS,
        {
            variables: { sortBy: 'name' },
            fetchPolicy: 'cache-first'
        })

    const customers = value<ICustomer[]>(data, 'customers', [])

    useEffect(() => {
        if (!selected && params.key) {
            const _selected = find(customers, p => p.key === params.key)
            setSelected(_selected)
        }
    }, [params.key, customers])

    function onPivotClick({ props: { itemKey } }: PivotItem) {
        setSelected(null)
        history.push(`/customers/${itemKey}`)
    }

    return (
        <Pivot
            selectedKey={params.view || 'search'}
            onLinkClick={onPivotClick}
            styles={{ itemContainer: { paddingTop: 10 } }}>
            <PivotItem
                itemID='search'
                itemKey='search'
                headerText={t('search')}
                itemIcon='FabricFolderSearch'>
                {error
                    ? <MessageBar messageBarType={MessageBarType.error}>{t('genericErrorText')}</MessageBar>
                    : (
                        <>
                            <CustomerList
                                enableShimmer={loading}
                                items={customers}
                                searchBox={{ placeholder: t('searchPlaceholder') }}
                                selection={{
                                    mode: SelectionMode.single,
                                    onChanged: selected => {
                                        selected && history.push([
                                            '/customers',
                                            params.view || 'search',
                                            selected.key
                                        ].filter(p => p).join('/'))
                                        setSelected(selected)
                                    }
                                }}
                                height={selected && 400} />
                            {selected && <CustomerDetails customer={selected} />}
                        </>
                    )}
            </PivotItem>
            {contains(user.role.permissions, manageCustomers) && (
                <PivotItem
                    itemID='new'
                    itemKey='new'
                    headerText={t('createNewText')}
                    itemIcon='AddTo'>
                    <CustomerForm />
                </PivotItem>
            )}
        </Pivot >
    )
}