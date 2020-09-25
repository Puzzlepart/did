import { ApolloQueryResult } from '@apollo/react-hooks'
import { createContext } from 'react'

export interface IProjectsContext {
    refetch(variables?: any): Promise<ApolloQueryResult<any>>;
}

export const ProjectsContext = createContext<IProjectsContext>(null)