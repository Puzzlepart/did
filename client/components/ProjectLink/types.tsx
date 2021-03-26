import { HTMLAttributes } from 'react'
import { Project } from 'types'

export interface IProjectLinkProps extends HTMLAttributes<HTMLDivElement> {
  project: Project
  text?: string
  icon?: string
}
