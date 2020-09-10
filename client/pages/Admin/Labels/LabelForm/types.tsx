import { IEntityLabel } from 'interfaces/IEntityLabel'
import { IPanelProps } from 'office-ui-fabric-react/lib/Panel'

/**
 * @category LabelForm
 */
export interface ILabelFormProps extends IPanelProps {
    title?: string;
    label?: IEntityLabel;
    onSave?: (label: IEntityLabel) => void;
}
