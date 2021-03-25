import { ISearchBoxProps } from '@fluentui/react-react'
import { Project } from 'types'

export interface ISearchProjectProps extends ISearchBoxProps {
  onSelected: (project: Project) => void
}
