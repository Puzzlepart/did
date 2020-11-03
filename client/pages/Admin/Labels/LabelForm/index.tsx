import { useMutation } from '@apollo/client'
import { EntityLabel } from 'components/EntityLabel'
import { LabelObject } from 'types'
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { Label } from 'office-ui-fabric-react/lib/Label'
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import React, { useState } from 'react'
import SketchPicker from 'react-color/lib/components/sketch/Sketch'
import { useTranslation } from 'react-i18next'
import { omit } from 'underscore'
import validator from 'validator'
import ADD_OR_UPDATE_LABEL from './ADD_OR_UPDATE_LABEL'
import styles from './LabelForm.module.scss'
import { ILabelFormProps } from './types'
import { IconPicker } from 'components/IconPicker'

export const LabelForm = (props: ILabelFormProps) => {
    const { t } = useTranslation()
    const [model, setModel] = useState<LabelObject>(props.label || {
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
        <Panel
            {...props}
            type={PanelType.smallFixedFar}
            className={styles.root}
            headerText={!!props.label ? t('admin.editLabel') : t('admin.addNewLabel')}
            isOpen={true}>
            <TextField
                className={styles.inputField}
                spellCheck={false}
                maxLength={18}
                label={t('common.nameFieldLabel')}
                value={model.name}
                required={true}
                onChange={(_, name) => setModel({ ...model, name })} />
            <TextField
                className={styles.inputField}
                spellCheck={false}
                label={t('common.descriptionFieldLabel')}
                value={model.description}
                multiline={true}
                onChange={(_, description) => setModel({ ...model, description })} />
            <IconPicker
                className={styles.inputField}
                defaultSelected={model.icon}
                label={t('common.iconLabel')}
                placeholder={t('common.iconSearchPlaceholder')}
                width={300}
                onSelected={icon => setModel({ ...model, icon })} />
            <div className={styles.inputField}>
                <Label>{t('common.colorLabel')}</Label>
                <DefaultButton
                    text={
                        colorPickerVisible
                            ? t('common.closeColorPickerText')
                            : t('common.openColorPickerText')
                    }
                    iconProps={{ iconName: colorPickerVisible ? 'ChromeClose' : 'Color' }}
                    onClick={() => setColorPickerVisible(!colorPickerVisible)} />
                {colorPickerVisible && (
                    <SketchPicker
                        color={model.color}
                        onChange={({ hex }) => setModel({ ...model, color: hex })} />
                )}
            </div>
            <div className={styles.inputField}>
                <Label>{t('common.previewText')}</Label>
                <EntityLabel label={model} size='medium' />
            </div>
            <PrimaryButton
                className={styles.saveBtn}
                text={t('common.save')}
                disabled={!isFormValid()}
                onClick={onSave} />
        </Panel>
    )
}

export * from './types'

