/**
 * @category Customers
 */
export interface ICustomerFormValidation {
    errors: {
        [key: string]: string;
    };
    invalid: boolean;
}
