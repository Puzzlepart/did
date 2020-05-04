import { IListProps } from 'common/components/List/IListProps';
import { IProject } from 'interfaces/IProject';

/**
 * @category ProjectList
 */
export interface IProjectListProps extends IListProps<IProject> {
    renderLink?: boolean;
    hideColumns?: string[];
}
