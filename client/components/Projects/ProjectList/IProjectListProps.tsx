import { IListProps } from 'common/components/List/IListProps';

export interface IProjectListProps extends IListProps {
    renderLink?: boolean;
    hideColumns?: string[];
}
