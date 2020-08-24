import { useQuery } from '@apollo/react-hooks'
import { AppContext } from 'AppContext'
import { value as value } from 'helpers'
import { ICustomer } from 'interfaces'
import { SelectionMode } from 'office-ui-fabric-react/lib/DetailsList'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot'
import { CustomerForm } from 'pages/Customers/CustomerForm'
import React, { useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { contains, find } from 'underscore'
import { CustomerDetails } from './CustomerDetails'
import { CustomerList } from './CustomerList'
import GET_CUSTOMERS, { IGetCustomersData } from './GET_CUSTOMERS'
import { manageCustomers } from 'config/security/permissions'

/**
 * @category Customers
 */
export const Customers = () => {
    const { t } = useTranslation(['common', 'ADMINS'])
    const { user } = useContext(AppContext)
    const params = useParams<{ key: string }>()
    const [selected, setSelected] = useState<ICustomer>(null)
    const { loading, error, data } = useQuery<IGetCustomersData>(GET_CUSTOMERS, { fetchPolicy: 'cache-first' })

    const customers = value<ICustomer[]>(data, 'customers', [])

    useEffect(() => {
        if (!selected && params.key) {
            const _selected = find(customers, p => p.key === params.key)
            setSelected(_selected)
        }
    }, [params.key, customers])

    return (
        <Pivot styles={{ itemContainer: { paddingTop: 10 } }}>
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
                                selection={{ mode: SelectionMode.single, onChanged: selected => setSelected(selected) }}
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