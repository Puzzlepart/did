import { Project } from 'types'
import { createContext } from 'react'

export interface IProjectDetailsContext {
  loading: boolean
  error: any
  project: Project
  timeentries: any[]
  setProject: React.Dispatch<React.SetStateAction<any>>
}

export const ProjectDetailsContext = createContext<IProjectDetailsContext>(null)
