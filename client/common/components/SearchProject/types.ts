import { ICustomer } from 'interfaces/ICustomer';

export interface ISearchProjectProps {
    onSelected: any;
    customer: ICustomer;
    placeholder: string;
}