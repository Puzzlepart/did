import { IProject } from 'interfaces'

export interface IProjectFormProps {
    /**
     * Name length [min, max]
     */
    nameLength?: number[];

    /**
     * Project to edit
     */
    edit?: IProject;

    /**
     * On submitted callback
     */
    onSubmitted?: () => void;
}

export class ProjectModel {
    public key = ''
    public name = ''
    public customerKey = ''
    public description = ''
    public inactive = false
    public icon = ''
    public labels: string[] = []
    public createOutlookCategory = false

    constructor(project?: IProject) {
        if (!!project) {
            this.key = project.key
            this.name = project.name
            this.customerKey = project.customerKey
            this.description = project.description
            this.inactive = project.inactive
            this.icon = project.icon
            this.labels = project.labels.map(label => label.name)
        }
    }

    public clone(): ProjectModel {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
    }
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
