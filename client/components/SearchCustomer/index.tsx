
import { useQuery } from '@apollo/react-hooks'
import { ICustomer } from 'interfaces'
import GET_CUSTOMERS from 'pages/Customers/GET_CUSTOMERS'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Autocomplete, ISuggestionItem } from '../Autocomplete'
import { ISearchCustomerProps } from './types'

/**
 * @category SearchCustomer
 */
export const SearchCustomer = (props: ISearchCustomerProps) => {
    const { t } = useTranslation('COMMON')
    const { loading, data } = useQuery<{ customers: ICustomer[] }>(GET_CUSTOMERS, {
        variables: { sortBy: 'name' },
        fetchPolicy: 'cache-first',
    })

    const searchData: ISuggestionItem<ICustomer>[] = data ? data.customers.map(customer => ({
        key: customer.key,
        displayValue: customer.name,
        searchValue: [customer.key, customer.name].join(' '),
        data: customer,
    })) : []

    return (
        <Autocomplete
            {...props}
            disabled={loading}
            items={searchData}
            width={450}
            placeholder={t('searchPlaceholder')}
            onClear={() => props.onSelected(null)}
            onSelected={item => props.onSelected(item.data)} />
    )
}