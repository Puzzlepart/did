export interface ICreateCustomerFormValidation {
    errors: {
        [key: string]: string;
    };
    invalid: boolean;
}
