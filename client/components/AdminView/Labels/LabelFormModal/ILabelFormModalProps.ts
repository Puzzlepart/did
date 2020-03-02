import { IModalProps } from 'office-ui-fabric-react/lib/Modal';
import { ILabel } from 'interfaces';

export interface ILabelFormModalProps {
    title?: string;
    label?: ILabel;
    modal?: IModalProps;
}
