import { ICustomer } from 'interfaces';

export interface ICustomerDetailsProps {
    customer: ICustomer;
    onDelete: () => Promise<void>;
}
