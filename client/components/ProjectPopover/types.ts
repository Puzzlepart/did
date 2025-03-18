import { HTMLProps, ReactNode } from 'react'
import { Project } from 'types'

export interface IProjectPopoverProps
  extends Pick<HTMLProps<HTMLDivElement>, 'hidden' | 'width'> {
  /**
   * The project to be displayed in the popover.
   */
  project: Project

  /**
   * Additional content to be displayed in the popover
   * (e.g. project details, actions, etc.) after the
   * description, but before the labels in the footer.
   */
  content?: ReactNode
}
