import { ApolloQueryResult } from 'apollo-client'
import { createContext } from 'react'
import { IProject } from 'types/IProject'


export interface IProjectsContext {
    outlookCategories: any[];
    projects: any[];
    setSelected: React.Dispatch<React.SetStateAction<IProject>>;
    refetch(variables?: any): Promise<ApolloQueryResult<any>>;
}

export const ProjectsContext = createContext<IProjectsContext>(null)
