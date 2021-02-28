/* eslint-disable tsdoc/syntax */
import { useQuery } from '@apollo/client'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Customer } from 'types'
import { Autocomplete, ISuggestionItem } from '../Autocomplete'
import $customers from './customers.gql'
import { ISearchCustomerProps } from './types'

/**
 * @category Function Component
 */
export const SearchCustomer = (props: ISearchCustomerProps) => {
  const { t } = useTranslation()
  const { loading, data } = useQuery<{ customers: Customer[] }>($customers, {
    fetchPolicy: 'cache-first'
  })

  const searchData: ISuggestionItem<Customer>[] = useMemo(
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

  return (
    <div hidden={props.hidden}>
      <Autocomplete
        {...props}
        disabled={loading}
        items={searchData}
        itemIcons={{
          style: {
            marginTop: 8,
            fontSize: 14
          }
        }}
        width={550}
        placeholder={t('common.searchPlaceholder')}
        onClear={() => props.onSelected(null)}
        onSelected={(item) => props.onSelected(item)}
      />
    </div>
  )
}
