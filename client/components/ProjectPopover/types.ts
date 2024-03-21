import { HTMLProps } from 'react'
import { Project } from 'types'

export interface IProjectPopoverProps extends HTMLProps<HTMLDivElement> {
  project: Project
}
