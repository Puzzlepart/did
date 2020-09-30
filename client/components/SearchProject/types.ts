import { IProject } from 'types/IProject'
import { ISearchBoxProps } from 'office-ui-fabric-react/lib/SearchBox'

/**
 * @category SearchProject
 */
export interface ISearchProjectProps extends ISearchBoxProps {
  onSelected: (project: IProject) => void
}
