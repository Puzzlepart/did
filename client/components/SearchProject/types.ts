import { ISearchBoxProps } from 'office-ui-fabric-react'
import { Project } from 'types'

export interface ISearchProjectProps extends ISearchBoxProps {
  onSelected: (project: Project) => void
}
