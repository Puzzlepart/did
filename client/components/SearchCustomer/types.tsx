import { IAutocompleteProps } from 'components/Autocomplete'
/**
 * @category Projects
 */
export interface ISearchCustomerProps extends IAutocompleteProps {
    label?: string;
    onSelected: (customer: any) => void;
}
