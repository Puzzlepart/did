import { ICalloutProps } from 'office-ui-fabric-react/lib/Callout'
import { IEntityLabel } from 'interfaces'

export interface ISelectCalloutProps extends ICalloutProps {
    labels: IEntityLabel[];
    searchLabelText: string;
    defaultSelectedKeys?: string[];
    onToggleLabel: (label: IEntityLabel) => void;
}
