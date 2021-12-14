/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { useQuery } from '@apollo/client'
import { useMemo } from 'react'
import { Customer } from 'types'
import $customers from '../../pages/Customers/customers.gql'
import { ISuggestionItem } from '../Autocomplete'

/**
 * Component logic hook for `<SearchCustomer />`
 */
export function useSearchCustomer() {
  const { loading, data } = useQuery<{ customers: Customer[] }>($customers)
  const items: ISuggestionItem<Customer>[] = useMemo(
    () =>
      (data?.customers || []).map(
        (customer) =>
        ({
          key: customer.key,
          text: customer.name,
          searchValue: [customer.key, customer.name].join(' '),
          data: customer,
          iconName: customer.icon || 'Page'
        } as ISuggestionItem<Customer>)
      ),
    [data]
  )

  return [items, loading] as const
}
