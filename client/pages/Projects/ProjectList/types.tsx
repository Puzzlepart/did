import { IListProps } from 'components/List/types'
import { IProject } from 'types/IProject'

export interface IProjectListProps extends IListProps<IProject> {
    renderLink?: boolean;
    hideColumns?: string[];
}

