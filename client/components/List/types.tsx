import { ICommandBarProps } from 'office-ui-fabric'
import { CheckboxVisibility, IColumn, IDetailsGroupRenderProps, IDetailsHeaderProps, SelectionMode } from 'office-ui-fabric'
import { ISearchBoxProps } from 'office-ui-fabric'
import { IRenderFunction } from 'office-ui-fabric'

export interface IListProps<T = any> extends React.HTMLProps<HTMLDivElement> {
    /**
     * Items 
     */
    items: T[];

    /**
     * Columns
     */
    columns?: IColumn[];

    /**
     * Enable shimmer (normally while loading)
     */
    enableShimmer?: boolean;

    /**
     * Fixed height
     */
    height?: number;

    /**
     * Search box props
     */
    searchBox?: ISearchBoxProps;

    /**
     * Selection
     */
    selection?: IListSelection;

    /**
     * Groups
     */
    groups?: IListGroups;

    /**
     * Group props
     */
    groupProps?: IDetailsGroupRenderProps;

    /**
     * On render details header
     */
    onRenderDetailsHeader?: IRenderFunction<IDetailsHeaderProps>;

    /**
     * Command bar props
     */
    commandBar?: ICommandBarProps;

    /**
     * Check box visibility
     */
    checkboxVisibility?: CheckboxVisibility;

    /**
     * Fade in props 
     * 
     * [delay, transitionDuration]
     */
    fadeIn?: [number, number];

    /**
     * Filters
     */
    filters?: { [key: string]: any }
}

export interface IListState {
    /**
     * Search term
     */
    searchTerm?: string;

    /**
     * Original items
     */
    origItems?: any[];

    /**
     * Current items
     */
    items?: any[];
}

export interface IListSelection {
    mode: SelectionMode;
    defaultSelectedKey?: string;
    onChanged: (selected: any) => void;
}

export interface IListGroups {
    fieldName: string;
    groupNames?: string[];
    emptyGroupName?: string;
    totalFunc?: (items: any[]) => string;
}
