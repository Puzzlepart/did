import { IAutocompleteProps, ISuggestionItem } from 'components/Autocomplete'
import { Customer } from 'types'

export interface ISearchCustomerProps extends IAutocompleteProps<Customer> {
  label?: string
  onSelected: (customer: ISuggestionItem<Customer>) => void
}
