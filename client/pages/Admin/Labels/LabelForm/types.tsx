import { IEntityLabel } from 'components';
import { IModalProps } from 'office-ui-fabric-react/lib/Modal';
/**
 * @category LabelForm
 */
export interface ILabelFormProps extends IModalProps {
    title?: string;
    label?: IEntityLabel;
    onSave?: (label: IEntityLabel) => void;
}
