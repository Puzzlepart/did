import { Project } from 'types'
import { createContext } from 'react'

export interface IProjectDetailsContext {
  project: Project
  setProject: React.Dispatch<React.SetStateAction<any>>
}

export const ProjectDetailsContext = createContext<IProjectDetailsContext>(null)
