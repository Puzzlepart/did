import { ICustomer } from 'interfaces/ICustomer';

/**
 * @category SearchProject
 */
export interface ISearchProjectProps extends React.HTMLProps<HTMLDivElement> {
    onSelected: any;
    customer: ICustomer;
    placeholder: string;
}