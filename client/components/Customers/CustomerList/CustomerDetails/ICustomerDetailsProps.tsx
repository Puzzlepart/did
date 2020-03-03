import { ICustomer } from 'interfaces';
import { ICustomerProps } from '../../ICustomerProps';

export interface ICustomerDetailsProps extends ICustomerProps {
    customer: ICustomer;
    onDelete: () => Promise<void>;
}
