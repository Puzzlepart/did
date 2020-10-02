
import { useQuery } from '@apollo/react-hooks'
import { ICustomer } from 'types'
import GET_CUSTOMERS from 'pages/Customers/GET_CUSTOMERS'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Autocomplete, ISuggestionItem } from '../Autocomplete'
import { ISearchCustomerProps } from './types'

export const SearchCustomer = (props: ISearchCustomerProps) => {
    const { t } = useTranslation()
    const { loading, data } = useQuery<{ customers: ICustomer[] }>(GET_CUSTOMERS, {
        variables: { sortBy: 'name' },
        fetchPolicy: 'cache-first',
    })

    const searchData: ISuggestionItem<ICustomer>[] = useMemo(() => (data?.customers || []).map(customer => ({
        key: customer.key,
        displayValue: customer.name,
        searchValue: [customer.key, customer.name].join(' '),
        data: customer,
    })), [data])

    return (
        <div hidden={props.hidden}>
            <Autocomplete
                {...props}
                disabled={loading}
                items={searchData}
                width={550}
                placeholder={t('common.searchPlaceholder')}
                onClear={() => props.onSelected(null)}
                onSelected={item => props.onSelected(item.data)} />
        </div>
    )
}