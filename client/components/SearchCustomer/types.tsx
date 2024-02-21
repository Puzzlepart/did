import {
  IAutocompleteControlProps,
  ISuggestionItem
} from 'components/FormControl/AutocompleteControl'
import { Customer } from 'types'

export interface ISearchCustomerProps
  extends IAutocompleteControlProps<Customer> {
  label?: string
  onSelected: (customer: ISuggestionItem<Customer>) => void
}
