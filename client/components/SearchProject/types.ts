import { ISearchBoxProps } from '@fluentui/react'
import { Project } from 'types'

export interface ISearchProjectProps extends ISearchBoxProps {
  /**
   * Callback when a project is selected.
   * 
   * @param project The selected project
   */
  onSelected: (project: Project) => void
}
