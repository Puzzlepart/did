import { Project } from 'types'
import { ISearchBoxProps } from 'office-ui-fabric'

export interface ISearchProjectProps extends ISearchBoxProps {
  onSelected: (project: Project) => void
}
