import { HTMLProps } from 'react'
import { Project } from 'types'

export interface IProjectLinkProps extends HTMLProps<HTMLDivElement> {
  project: Project
  text?: string
  icon?: string
}
