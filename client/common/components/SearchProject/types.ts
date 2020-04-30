import { ICustomer } from 'interfaces/ICustomer';

/**
 * @category SearchProject
 */
export interface ISearchProjectProps {
    onSelected: any;
    customer: ICustomer;
    placeholder: string;
}