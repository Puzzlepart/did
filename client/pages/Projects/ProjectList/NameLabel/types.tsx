import { HTMLProps } from 'react'
import { Project } from 'types'

export interface INameLabelProps extends HTMLProps<HTMLDivElement> {
  project: Project
  renderLink?: boolean
}
