
import { useQuery } from '@apollo/react-hooks';
import { Autocomplete, ISuggestionItem } from 'components/Autocomplete';
import resource from 'i18n';
import { ICustomer } from 'interfaces';
import GET_CUSTOMERS from 'pages/Customers/GET_CUSTOMERS';
import * as React from 'react';
import { ISearchCustomerProps } from './ISearchCustomerProps';


/**
 * @category Projects
 */
export const SearchCustomer = (props: ISearchCustomerProps) => {
    const { loading, data } = useQuery<{ customers: ICustomer[] }>(GET_CUSTOMERS, {
        variables: { sortBy: 'name' },
        fetchPolicy: 'cache-first',
    });

    const searchData: ISuggestionItem<ICustomer>[] = data ? data.customers.map(c => ({
        key: c.key,
        displayValue: c.name,
        searchValue: [c.key, c.name].join(' '),
        data: c,
    })) : [];

    return (
        <Autocomplete
            {...props}
            items={searchData}
            width={450}
            placeholder={resource('COMMON.SEARCH_PLACEHOLDER')}
            onClear={() => props.onSelected(null)}
            onSelected={item => props.onSelected(item.data)} />
    );
}