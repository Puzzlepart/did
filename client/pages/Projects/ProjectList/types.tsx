/* eslint-disable tsdoc/syntax */
import { IListProps } from 'components/List/types'
import { Project } from 'types'

/**
 * @category Projects
 */
export interface IProjectListProps extends IListProps<Project> {
  renderLink?: boolean
  hideColumns?: string[]
}
