import { IProject } from 'interfaces'

export interface IProjectFormProps {
    project?: IProject;
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
