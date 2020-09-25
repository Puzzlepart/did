/**
 * @category Customers
 */
export interface ICustomerFormValidation {
    errors: {
        [key: string]: string;
    };
    invalid: boolean;
}

export interface ICustomerFormProps {
    /**
     * Name length [min, max]
     */
    nameLength?: number[];
}