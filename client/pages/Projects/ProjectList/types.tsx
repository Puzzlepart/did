import { IListProps } from 'components/List/types'
import { Project } from 'types'

/**
 * Props for the ProjectList component.
 *
 * @category Projects
 */
export interface IProjectListProps
  extends Omit<IListProps<Project>, 'role' | 'items'> {
  /**
   * Determines whether to render a link for each project.
   */
  renderLink?: boolean
  /**
   * Function to be called when a project link is clicked.
   *
   * @param project - The project that was clicked.
   */
  linkOnClick?: (project: Project) => void

  /**
   * An array of column names to hide.
   */
  hideColumns?: string[]

  /**
   * Id of the tab.
   */
  id?: 's' | 'm'
}
