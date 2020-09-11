import { ILabelColumnProps } from 'components/LabelColumn/types'
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu'
import { SummaryViewAction } from './SummaryViewReducer'
import { ITimeEntriesVariables } from './TIME_ENTRIES'

export interface ISummaryViewProps {
    defaultYear: number;
    defaultRange: number;
}

export interface ISummaryViewState {
    year: number;
    timeentries: any[];
    range: number;
    scope: ISummaryViewScope;
    type: ISummaryViewType;
    variables?: ITimeEntriesVariables;
}

export interface ISummaryViewScope extends IContextualMenuItem {
    getColumnHeader: (idx: number) => string;
}

export type ISummaryViewType = IContextualMenuItem;


export interface ISummaryViewContext extends ISummaryViewState {
    dispatch?: React.Dispatch<SummaryViewAction>;
    scopes: ISummaryViewScope[];
    types: ISummaryViewType[];
    loading?: boolean;
}

export interface ISummaryViewRow extends ILabelColumnProps {
    sum: number;
}