import { ICustomer } from 'interfaces';

export interface ISearchCustomerProps {
    onSelected: (customer: ICustomer) => void;
    placeholder?: string;
}
