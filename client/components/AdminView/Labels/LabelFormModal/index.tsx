import { useMutation } from '@apollo/react-hooks';
import { EntityLabel } from 'components/EntityLabel';
import { ILabel } from 'interfaces';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';
import { SketchPicker } from 'react-color';
import * as _ from 'underscore';
import validator from 'validator';
import ADD_OR_UPDATE_LABEL from './ADD_OR_UPDATE_LABEL';
import { ILabelFormModalProps } from './ILabelFormModalProps';


/**
 * @component LabelFormModal
 * @description
 */
export const LabelFormModal = (props: ILabelFormModalProps) => {
    const [label, setLabel] = React.useState<ILabel>(props.label || { name: '', description: '', color: '#F8E71C' });
    const [colorPickerVisible, setColorPickerVisible] = React.useState<boolean>(false);
    let [addOrUpdateLabel] = useMutation(ADD_OR_UPDATE_LABEL);

    /**
     * On save
     */
    const onSave = async () => {
        await addOrUpdateLabel({ variables: { label: _.omit(label, '__typename') } });
        props.modal.onDismiss();
    }

    /**
     * Is form valid
     */
    const isFormValid = (): boolean => {
        return !validator.isEmpty(label.name) && !validator.isEmpty(label.color);
    }


    return (
        <Modal
            {...props.modal}
            containerClassName='c-AdminView-labelFormModal'
            isOpen={true}>
            <div className='c-AdminView-labelFormModal-title'>{props.label ? `Edit ${props.label.name}` : props.title}</div>
            <TextField
                label='Name'
                placeholder='Label 1'
                value={label.name}
                required={true}
                onChange={(_, name) => setLabel({ ...label, name })} />
            <TextField
                label='Description'
                value={label.description}
                multiline={true}
                onChange={(_, description) => setLabel({ ...label, description })} />
            <TextField
                label='Icon'
                value={label.icon}
                onChange={(_, icon) => setLabel({ ...label, icon })} />
            <Label>Color</Label>
            <DefaultButton
                text={colorPickerVisible ? 'Close color picker' : 'Click to pick color'}
                iconProps={{ iconName: colorPickerVisible ? 'ChromeClose' : 'Color' }}
                onClick={_ => setColorPickerVisible(!colorPickerVisible)} />
            {colorPickerVisible && <SketchPicker color={label.color} onChange={({ hex }) => setLabel({ ...label, color: hex })} />}
            <Label>Preview</Label>
            <EntityLabel {...label} />
            <PrimaryButton
                className='c-AdminView-labelFormModal-saveBtn'
                text='Save'
                disabled={!isFormValid()}
                onClick={onSave} />
        </Modal>
    );
}

export { ILabelFormModalProps };

