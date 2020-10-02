import { IEntityLabel } from 'types/IEntityLabel'
import { IPanelProps } from 'office-ui-fabric-react/lib/Panel'

export interface ILabelFormProps extends IPanelProps {
    title?: string;
    label?: IEntityLabel;
    onSave?: (label: IEntityLabel) => void;
}
