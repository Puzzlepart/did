import { IListProps } from 'common/components/List/IListProps';

/**
 * @category ProjectList
 */
export interface IProjectListProps extends IListProps {
    renderLink?: boolean;
    hideColumns?: string[];
}
