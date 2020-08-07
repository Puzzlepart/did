/**
 * @category Projects
 */
export interface IProjectFormModel {
    key?: string;
    name?: string;
    customerKey?: string;
    description?: string;
    icon?: string;
    labels?: string[];
}

/**
 * @category Projects
 */
export interface IProjectFormValidation {
    errors: {
        [key: string]: string;
    };
    invalid: boolean;
}
