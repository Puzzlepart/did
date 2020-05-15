import { useMutation } from '@apollo/react-hooks';
import { EntityLabel } from 'components/EntityLabel';
import { IEntityLabel } from 'interfaces/IEntityLabel';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';
import SketchPicker from 'react-color/lib/components/sketch/Sketch';
import { useTranslation } from 'react-i18next';
import { omit } from 'underscore';
import validator from 'validator';
import { ADD_LABEL, UPDATE_LABEL } from '../types';
import styles from './LabelForm.module.scss';
import { ILabelFormProps } from './types';

/**
 * @category LabelForm
 */
export const LabelForm = (props: ILabelFormProps) => {
    const { t } = useTranslation(['COMMON', 'ADMIN']);
    const [label, setLabel] = React.useState<IEntityLabel>(props.label || {
        name: '',
        description: '',
        color: '#F8E71C',
    });
    const [colorPickerVisible, setColorPickerVisible] = React.useState<boolean>(false);
    const [addLabel] = useMutation(ADD_LABEL);
    const [updateLabel] = useMutation(UPDATE_LABEL);

    const onSave = async () => {
        if (props.label) await updateLabel({ variables: { label: omit(label, '__typename') } });
        else await addLabel({ variables: { label: omit(label, '__typename') } });
        props.onSave(label);
    }

    const isFormValid = (): boolean => !validator.isEmpty(label.name) && !validator.isEmpty(label.color);

    return (
        <Modal
            {...props}
            containerClassName={styles.root}
            isOpen={true}>
            <div className={styles.title}>{
                props.label
                    ? t('EDIT_LABEL', { ns: 'ADMIN' })
                    : t('ADD_NEW_LABEL', { ns: 'ADMIN' })
            }</div>

            <TextField
                spellCheck={false}
                label={t('NAME_LABEL')}
                value={label.name}
                required={true}
                onChange={(_, name) => setLabel({ ...label, name })} />

            <TextField
                spellCheck={false}
                label={t('DESCRIPTION_LABEL')}
                value={label.description}
                multiline={true}
                onChange={(_, description) => setLabel({ ...label, description })} />

            <TextField
                spellCheck={false}
                label={t('ICON_LABEL')}
                value={label.icon}
                onChange={(_, icon) => setLabel({ ...label, icon })} />

            <Label>{t('COLOR_LABEL')}</Label>
            <DefaultButton
                text={
                    colorPickerVisible
                        ? t('CLOSE_COLOR_PICKER_TEXT')
                        : t('OPEN_COLOR_PICKER_TEXT')
                }
                iconProps={{ iconName: colorPickerVisible ? 'ChromeClose' : 'Color' }}
                onClick={() => setColorPickerVisible(!colorPickerVisible)} />
            {colorPickerVisible && (
                <SketchPicker
                    color={label.color}
                    onChange={({ hex }) => setLabel({ ...label, color: hex })} />
            )}

            <Label>{t('PREVIEW_TEXT')}</Label>
            <EntityLabel label={label} size='medium' />

            <PrimaryButton
                className={styles.saveBtn}
                text={t('SAVE', { ns: 'COMMON' })}
                disabled={!isFormValid()}
                onClick={onSave} />
        </Modal>
    );
}

export { ILabelFormProps };

