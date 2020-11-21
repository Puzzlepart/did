import { IListProps } from 'components/List/types'
import { Project } from 'types'

export interface IProjectListProps extends IListProps<Project> {
  renderLink?: boolean
  hideColumns?: string[]
}
