import { ICustomer } from 'interfaces';
import { ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';

/**
 * @category Projects
 */
export interface ISearchCustomerProps extends ITextFieldProps {
    onSelected: (customer: ICustomer) => void;
}
