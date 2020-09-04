import { IProject } from 'interfaces'

/**
 * @ignore
 */
export interface IGetProjectsData {
    projects: IProject[];
}

export interface IProjectsParams {
    key: string;
    view: string;
}
