/**
 * @category Customers
 */
export interface ICustomerFormModel {
    key?: string;
    name?: string;
    description?: string;
    icon?: string;
}

/**
 * @category Customers
 */
export interface ICustomerFormValidation {
    errors: {
        [key: string]: string;
    };
    invalid: boolean;
}
