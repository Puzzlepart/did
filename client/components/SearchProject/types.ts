import { IProject } from 'interfaces/IProject';
import { ISearchBoxProps } from 'office-ui-fabric-react/lib/SearchBox';

/**
 * @category SearchProject
 */
export interface ISearchProjectProps extends ISearchBoxProps {
    onSelected: (project: IProject) => void;
}