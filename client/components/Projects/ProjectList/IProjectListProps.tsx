import { IListProps } from 'components/List/IListProps';

export interface IProjectListProps extends IListProps {
    renderLink?: boolean;
    hideColumns?: string[];
}
