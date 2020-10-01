import { ICommandBarProps } from 'office-ui-fabric-react/lib/CommandBar'
import { CheckboxVisibility, IColumn, IDetailsGroupRenderProps, IDetailsHeaderProps, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList'
import { ISearchBoxProps } from 'office-ui-fabric-react/lib/SearchBox'
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities'
import {FadeInProps} from 'react-fade-in'

/**
 * @category List
 */
export interface IListProps<T = any> {
    items: T[];
    columns?: IColumn[];
    enableShimmer?: boolean;
    height?: number;
    searchBox?: ISearchBoxProps;
    selection?: IListSelection;
    groups?: IListGroups;
    hidden?: boolean;
    groupProps?: IDetailsGroupRenderProps;
    onRenderDetailsHeader?: IRenderFunction<IDetailsHeaderProps>;
    commandBar?: ICommandBarProps;
    checkboxVisibility?: CheckboxVisibility;
    fadeIn?: FadeInProps;
}

/**
 * @category List
 */
export interface IListState {
    searchTerm?: string;
    origItems?: any[];
    items?: any[];
}

/**
 * @category List
 */
export interface IListSelection {
    mode: SelectionMode;
    defaultSelectedKey?: string;
    onChanged: (selected: any) => void;
}

/**
 * @category List
 */
export interface IListGroups {
    fieldName: string;
    groupNames?: string[];
    emptyGroupName?: string;
    totalFunc?: (items: any[]) => string;
}
