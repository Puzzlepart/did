import { ICustomer } from 'interfaces/ICustomer'

/**
 * @ignore
 */
export interface IGetCustomersData {
    customers: ICustomer[];
}

export interface ICustomersParams {
    key: string;
    view: string;
}

