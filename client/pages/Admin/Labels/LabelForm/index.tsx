import { useMutation } from '@apollo/react-hooks'
import { EntityLabel } from 'components/EntityLabel'
import { IEntityLabel } from 'interfaces/IEntityLabel'
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { Label } from 'office-ui-fabric-react/lib/Label'
import { Modal } from 'office-ui-fabric-react/lib/Modal'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import React, { useState } from 'react'
import SketchPicker from 'react-color/lib/components/sketch/Sketch'
import { useTranslation } from 'react-i18next'
import { omit } from 'underscore'
import validator from 'validator'
import ADD_OR_UPDATE_LABEL from './ADD_OR_UPDATE_LABEL'
import styles from './LabelForm.module.scss'
import { ILabelFormProps } from './types'

/**
 * @category LabelForm
 */
export const LabelForm = (props: ILabelFormProps) => {
    const { t } = useTranslation(['common', 'admin'])
    const [model, setModel] = useState<IEntityLabel>(props.label || {
        name: '',
        description: '',
        color: '#F8E71C',
    })
    const [colorPickerVisible, setColorPickerVisible] = useState<boolean>(false)
    const [addOrUpdateLabel] = useMutation(ADD_OR_UPDATE_LABEL)

    /**
     * On save label
     */
    const onSave = async () => {
        await addOrUpdateLabel({
            variables: {
                label: omit(model, '__typename'),
                update: !!props.label,
            }
        })
        props.onSave(model)
    }

    /**
     * Checks if form is valid
     */
    const isFormValid = (): boolean => !validator.isEmpty(model.name) && !validator.isEmpty(model.color)

    return (
        <Modal
            {...props}
            containerClassName={styles.root}
            isOpen={true}>
            <div className={styles.title}>
                {t(!!props.label ? 'editLabel' : 'addNewLabel', { ns: 'admin' })}
            </div>
            <TextField
                spellCheck={false}
                maxLength={18}
                label={t('nameLabel')}
                value={model.name}
                required={true}
                onChange={(_, name) => setModel({ ...model, name })} />

            <TextField
                spellCheck={false}
                label={t('descriptionLabel')}
                value={model.description}
                multiline={true}
                onChange={(_, description) => setModel({ ...model, description })} />

            <TextField
                spellCheck={false}
                label={t('iconLabel')}
                value={model.icon}
                onChange={(_, icon) => setModel({ ...model, icon })} />

            <Label>{t('colorLabel')}</Label>
            <DefaultButton
                text={
                    colorPickerVisible
                        ? t('closeColorPickerText')
                        : t('openColorPickerText')
                }
                iconProps={{ iconName: colorPickerVisible ? 'ChromeClose' : 'Color' }}
                onClick={() => setColorPickerVisible(!colorPickerVisible)} />
            {colorPickerVisible && (
                <SketchPicker
                    color={model.color}
                    onChange={({ hex }) => setModel({ ...model, color: hex })} />
            )}
            <Label>{t('previewText')}</Label>
            <EntityLabel label={model} size='medium' />
            <PrimaryButton
                className={styles.saveBtn}
                text={t('save', { ns: 'common' })}
                disabled={!isFormValid()}
                onClick={onSave} />
        </Modal>
    )
}

export { ILabelFormProps }

