import { IColumn, IDetailsGroupRenderProps, IDetailsHeaderProps } from 'office-ui-fabric-react/lib/DetailsList';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import { ISearchBoxProps } from 'office-ui-fabric-react/lib/SearchBox';
import { IListGroups } from './IListGroups';
import { IListSelection } from './IListSelection';

/**
 * @category List
 */
export interface IListProps {
    items: any[];
    columns?: IColumn[];
    enableShimmer?: boolean;
    height?: number;
    searchBox?: ISearchBoxProps;
    selection?: IListSelection;
    groups?: IListGroups;
    hidden?: boolean;
    groupProps?: IDetailsGroupRenderProps;
    onRenderDetailsHeader?: IRenderFunction<IDetailsHeaderProps>;
}
