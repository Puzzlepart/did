import { Project } from 'types'
import { ISearchBoxProps } from 'office-ui-fabric-react/lib/SearchBox'

export interface ISearchProjectProps extends ISearchBoxProps {
  onSelected: (project: Project) => void
}
