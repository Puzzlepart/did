import { IProject } from 'interfaces'
import { createContext } from 'react'

/**
 * @category Projects
 */
export interface IProjectDetailsProps {
    project: IProject;
}

export interface IProjectDetailsContext {
    loading: boolean;
    error: any;
    project: IProject;
    timeentries: any[];
    setProject: React.Dispatch<React.SetStateAction<any>>;
}

export const ProjectDetailsContext = createContext<IProjectDetailsContext>(null)