
import gql from 'graphql-tag'
import { ICustomer } from 'interfaces/ICustomer'

/**
 * {@docCategory Customers}
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
        externalSystemURL
        icon
        inactive
    }
}`
