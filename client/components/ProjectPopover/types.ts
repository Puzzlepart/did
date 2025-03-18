import { HTMLProps, ReactNode } from 'react'
import { Project } from 'types'

export interface IProjectPopoverProps
  extends Pick<HTMLProps<HTMLDivElement>, 'hidden' | 'width'> {
  project: Project
  content?: ReactNode
}
