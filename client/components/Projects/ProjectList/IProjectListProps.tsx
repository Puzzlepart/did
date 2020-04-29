import { IListProps } from 'common/components/List/IListProps';
import { IProject } from 'interfaces/IProject';

export interface IProjectListProps extends IListProps<IProject> {
    renderLink?: boolean;
    hideColumns?: string[];
}
