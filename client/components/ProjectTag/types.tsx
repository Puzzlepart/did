import { InteractionTagPrimaryProps } from '@fluentui/react-tags-preview'
import { Project } from 'types'

/**
 * Props for the ProjectLink component.
 */
export interface IProjectTagProps extends InteractionTagPrimaryProps {
  /**
   * The project to link to.
   */
  project: Project

  /**
   * Does the user have a Outlook category for this project.
   */
  hasOutlookCategory?: boolean
}
