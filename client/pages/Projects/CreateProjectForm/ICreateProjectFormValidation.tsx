/**
 * @category Projects
 */
export interface ICreateProjectFormValidation {
    errors: {
        [key: string]: string;
    };
    invalid: boolean;
}
