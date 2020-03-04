import { ICustomer } from 'interfaces';
import { ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';

export interface ISearchCustomerProps extends ITextFieldProps {
    onSelected: (customer: ICustomer) => void;
}
