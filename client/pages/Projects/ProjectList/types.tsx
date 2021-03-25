/* eslint-disable tsdoc/syntax */
import { IListProps } from 'components/List/types'
import { IPivotItemProps } from '@fluentui/react-react'
import { Project } from 'types'

/**
 * @category Projects
 */
export interface IProjectListProps
  extends IListProps<Project>,
    Omit<IPivotItemProps, 'componentRef'> {
  renderLink?: boolean
  hideColumns?: string[]
}
