import { IPivotItemProps } from '@fluentui/react'
import { IListProps } from 'components/List/types'
import { Project } from 'types'

/**
 * @category Projects
 */
export interface IProjectListProps
  extends Omit<IListProps<Project>, 'role'>,
    Omit<IPivotItemProps, 'componentRef'> {
  renderLink?: boolean
  hideColumns?: string[]
}
