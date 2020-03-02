import { useMutation } from '@apollo/react-hooks';
import { ILabel } from 'interfaces';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';
import validator from 'validator';
import ADD_LABEL from './ADD_LABEL';
import { ILabelFormModalProps } from './ILabelFormModalProps';


/**
 * @component LabelFormModal
 * @description
 */
export const LabelFormModal = (props: ILabelFormModalProps) => {
    const [label, setLabel] = React.useState<ILabel>({ name: '', description: '', color: '' });
    let [addLabel] = useMutation(ADD_LABEL);

    /**
     * On save
     */
    const onSave = async () => {
        await addLabel({ variables: { label } });
        props.modal.onDismiss();
    }

    const isFormValid = () => {
        return !validator.isEmpty(label.name) && !validator.isEmpty(label.description) && !validator.isEmpty(label.color);
    }

    return (
        <Modal
            {...props.modal}
            containerClassName='c-AdminView-labelFormModal'
            isOpen={true}>
            <div className='c-AdminView-labelFormModal-title' hidden={!props.title}>{props.title}</div>
            <TextField
                label='Name'
                value={label.name}
                required={true}
                onChange={(_, id) => setLabel({ ...label, name })} />
            <TextField
                label='Description'
                value={label.description}
                required={true}
                onChange={(_, description) => setLabel({ ...label, description })} />
            <TextField
                label='Color'
                value={label.color}
                required={true}
                onChange={(_, color) => setLabel({ ...label, color })} />
            <PrimaryButton
                className='c-AdminView-labelFormModal-saveBtn'
                text='Save'
                disabled={!isFormValid()}
                onClick={onSave} />
        </Modal>
    );
}

export { ILabelFormModalProps };

