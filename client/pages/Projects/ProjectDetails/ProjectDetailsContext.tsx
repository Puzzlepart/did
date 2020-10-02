import { IProject } from 'types'
import { createContext } from 'react'


export interface IProjectDetailsContext {
    loading: boolean;
    error: any;
    project: IProject;
    timeentries: any[];
    setProject: React.Dispatch<React.SetStateAction<any>>;
}

export const ProjectDetailsContext = createContext<IProjectDetailsContext>(null)