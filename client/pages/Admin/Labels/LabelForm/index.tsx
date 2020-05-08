import { useMutation } from '@apollo/react-hooks';
import { EntityLabel, IEntityLabel } from 'components';
import resource from 'i18n';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';
import SketchPicker from 'react-color/lib/components/sketch/Sketch';
import { omit } from 'underscore';
import validator from 'validator';
import { ADD_LABEL, UPDATE_LABEL } from '../types';
import styles from './LabelForm.module.scss';
import { ILabelFormProps } from './types';

/**
 * @category LabelForm
 */
export const LabelForm = (props: ILabelFormProps) => {
    const [label, setLabel] = React.useState<IEntityLabel>(props.label || {
        name: '',
        description: '',
        color: '#F8E71C',
    });
    const [colorPickerVisible, setColorPickerVisible] = React.useState<boolean>(false);
    const [addLabel] = useMutation(ADD_LABEL);
    const [updateLabel] = useMutation(UPDATE_LABEL);

    const onSave = async () => {
        if (props.label) {
            await updateLabel({ variables: { label: omit(label, '__typename') } });
        } else {
            await addLabel({ variables: { label: omit(label, '__typename') } });
        }
        props.onSave(label);
    }

    const isFormValid = (): boolean => {
        return !validator.isEmpty(label.name) && !validator.isEmpty(label.color);
    }

    return (
        <Modal
            {...props}
            containerClassName={styles.root}
            isOpen={true}>
            <div className={styles.title}>{resource('ADMIN.ADD_NEW_LABEL')}</div>

            <TextField
                label={resource('COMMON.NAME_LABEL')}
                value={label.name}
                required={true}
                onChange={(_, name) => setLabel({ ...label, name })} />

            <TextField
                label={resource('COMMON.DESCRIPTION_LABEL')}
                value={label.description}
                multiline={true}
                onChange={(_, description) => setLabel({ ...label, description })} />

            <TextField
                label={resource('COMMON.ICON_LABEL')}
                value={label.icon}
                onChange={(_, icon) => setLabel({ ...label, icon })} />

            <Label>{resource('COMMON.COLOR_LABEL')}</Label>
            <DefaultButton
                text={
                    colorPickerVisible
                        ? resource('COMMON.CLOSE_COLOR_PICKER_TEXT')
                        : resource('COMMON.OPEN_COLOR_PICKER_TEXT')
                }
                iconProps={{ iconName: colorPickerVisible ? 'ChromeClose' : 'Color' }}
                onClick={() => setColorPickerVisible(!colorPickerVisible)} />
            {colorPickerVisible && <SketchPicker color={label.color} onChange={({ hex }) => setLabel({ ...label, color: hex })} />}

            <Label>{resource('COMMON.PREVIEW_TEXT')}</Label>
            <EntityLabel label={label} />

            <PrimaryButton
                className={styles.saveBtn}
                text={resource('COMMON.SAVE')}
                disabled={!isFormValid()}
                onClick={onSave} />
        </Modal>
    );
}

export { ILabelFormProps };

