import { IAutocompleteProps } from 'components/Autocomplete'

export interface ISearchCustomerProps extends IAutocompleteProps {
    label?: string;
    onSelected: (customer: any) => void;
}
