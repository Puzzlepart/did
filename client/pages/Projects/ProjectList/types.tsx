import { IListProps } from 'components/List/types'
import { IProject } from 'interfaces/IProject'

/**
 * @category ProjectList
 */
export interface IProjectListProps extends IListProps<IProject> {
    renderLink?: boolean;
    hideColumns?: string[];
    onEdit?: (project: IProject) => void;
}

