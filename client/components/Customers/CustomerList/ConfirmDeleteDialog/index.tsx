import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import * as React from 'react';
import { IConfirmDeleteDialogProps } from './IConfirmDeleteDialogProps';


/**
 * @category Customers
 */
export const ConfirmDeleteDialog = (props: IConfirmDeleteDialogProps) => {
    let subText = props.projects.length > 0
        ? `All the ${props.projects.length} projects for the customer will also be deleted.`
        : 'There\'s no projects connected to the customer.';
    return (
        <Dialog
            hidden={false}
            containerClassName='c-ConfirmDeleteDialog'
            dialogContentProps={{
                type: DialogType.largeHeader,
                title: `Are you sure you want to delete customer ${props.customer.name}?`,
                subText,
            }}
            modalProps={{
                isBlocking: false,
                styles: { main: { minWidth: 550, width: 550, maxWidth: 550 } }
            }}>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                {props.projects.map(p => <li key={p.id}>{p.name}</li>)}
            </ul>
            <DialogFooter>
                <PrimaryButton onClick={props.onConfirm} text="Yes" />
                <DefaultButton onClick={props.onDismiss} text="Cancel" />
            </DialogFooter>
        </Dialog>
    );
}

export { IConfirmDeleteDialogProps };

