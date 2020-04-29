import { ICustomer } from 'interfaces';
import { ICustomerProps } from '../ICustomerProps';

/**
 * @category Customers
 */
export interface ICustomerDetailsProps extends ICustomerProps {
    customer: ICustomer;
    onDelete: () => Promise<void>;
}
