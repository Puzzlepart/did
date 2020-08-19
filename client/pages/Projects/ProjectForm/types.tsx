import { IProject } from 'interfaces'

export interface IProjectFormProps {
    edit?: IProject;
    onSubmitted?: () => void;
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
