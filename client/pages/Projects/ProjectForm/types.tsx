import { IProject } from 'interfaces'

export interface IProjectFormProps {
    /**
     * Project to edit
     */
    edit?: IProject;
    
    /**
     * On submitted callback
     */
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
