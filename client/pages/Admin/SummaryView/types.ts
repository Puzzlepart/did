import { ILabelColumnProps } from 'components/LabelColumn/types'
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu'
import { SummaryViewAction } from './reducer'
import { ITimeEntriesVariables } from './TIME_ENTRIES'
import { TFunction } from 'i18next'

export const getViewTypes = (t: TFunction): ISummaryViewType[] => ([
    {
        key: 'resource',
        fieldName: 'resourceName',
        name: t('employeeLabel'),
        iconProps: { iconName: 'FabricUserFolder' },
    },
    {
        key: 'project',
        fieldName: 'project.name',
        name: t('project'),
        iconProps: { iconName: 'Teamwork' },
    },
    {
        key: 'customer',
        fieldName: 'customer.name',
        name: t('customer'),
        iconProps: { iconName: 'CustomList' },
    }
])

export interface ISummaryViewProps {
    defaultYear: number;
    defaultRange: number;
}

export interface ISummaryViewState {
    year: number;
    maxMonth: number;
    timeentries: any[];
    range: number;
    type: ISummaryViewType;
    variables?: ITimeEntriesVariables;
}

export type ISummaryViewType = IContextualMenuItem;


export interface ISummaryViewContext extends ISummaryViewState {
    dispatch?: React.Dispatch<SummaryViewAction>;
    types: ISummaryViewType[];
    loading?: boolean;
}

export interface ISummaryViewRow extends ILabelColumnProps {
    sum: number;
}