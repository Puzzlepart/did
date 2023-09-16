import { AutocompleteControl } from 'components/FormControl'
import { ReusableComponent } from 'components/types'
import React from 'react'
import { ISearchCustomerProps } from './types'
import { useSearchCustomer } from './useSearchCustomer'

/**
 * Search for customers using `<Autocomplete />`
 *
 * @category Reusable Component
 */
export const SearchCustomer: ReusableComponent<ISearchCustomerProps> = (
  props
) => {
  const [items, disabled] = useSearchCustomer()
  return (
    <AutocompleteControl
      {...props}
      disabled={disabled}
      items={items}
      itemIcons={{
        style: {
          marginTop: 8,
          fontSize: 14
        }
      }}
      placeholder={props.placeholder}
    />
  )
}
