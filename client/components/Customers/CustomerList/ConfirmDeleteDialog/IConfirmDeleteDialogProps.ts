import { IDialogProps } from 'office-ui-fabric-react/lib/Dialog';
import { ICustomer, IProject } from 'interfaces';

/**
 * @category Customers
 */
export interface IConfirmDeleteDialogProps extends IDialogProps {
    customer: ICustomer;
    projects: IProject[];
    onConfirm: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
