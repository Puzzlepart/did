import { ICustomer } from 'models';

export interface ISearchCustomerProps {
    onSelected: (customer: ICustomer) => void;
    placeholder?: string;
}
