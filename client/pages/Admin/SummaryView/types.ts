import { ILabelColumnProps } from 'components/LabelColumn/types'
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu'
import { SummaryViewAction } from './SummaryViewReducer'

export interface ISummaryViewState {
    year: number;
    timeentries: any[];
    range: number;
    scope: ISummaryViewScope;
    type: ISummaryViewType;
}

export interface ISummaryViewScope extends IContextualMenuItem {
    getColumnHeader: (idx: number) => string;
}

export type ISummaryViewType = IContextualMenuItem;


export interface ISummaryViewContext extends ISummaryViewState {
    dispatch?: React.Dispatch<SummaryViewAction>;
    scopes: ISummaryViewScope[];
    types: ISummaryViewType[];
}

export interface ISummaryViewRow extends ILabelColumnProps {
    sum: number;
}