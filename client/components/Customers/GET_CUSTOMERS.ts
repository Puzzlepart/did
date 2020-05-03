
import gql from 'graphql-tag';
import { ICustomer } from 'interfaces/ICustomer';

/**
 * @category Customers
 */
export interface IGetCustomersData {
    customers: ICustomer[];
}

/**
 * @ignore
 */
export default gql`
{
    customers {
        id
        key
        name
        description
        webLink
        icon
        inactive
    }
}`;
