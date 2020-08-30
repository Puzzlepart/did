import { useMutation } from '@apollo/react-hooks'
import { EntityLabel } from 'components/EntityLabel'
import { IEntityLabel } from 'interfaces/IEntityLabel'
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { Label } from 'office-ui-fabric-react/lib/Label'
import { Modal } from 'office-ui-fabric-react/lib/Modal'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import * as React from 'react'
import SketchPicker from 'react-color/lib/components/sketch/Sketch'
import { useTranslation } from 'react-i18next'
import { omit } from 'underscore'
import validator from 'validator'
import styles from './LabelForm.module.scss'
import { ILabelFormProps } from './types'
import ADD_OR_UPDATE_LABEL from '../ADD_OR_UPDATE_LABEL'

/**
 * @category LabelForm
 */
export const LabelForm = (props: ILabelFormProps) => {
    const { t } = useTranslation(['common', 'admin'])
    const [label, setLabel] = React.useState<IEntityLabel>(props.label || {
        name: '',
        description: '',
        color: '#F8E71C',
    })
    const [colorPickerVisible, setColorPickerVisible] = React.useState<boolean>(false)
    const [addOrUpdateLabel] = useMutation(ADD_OR_UPDATE_LABEL)

    const onSave = async () => {
        await addOrUpdateLabel({ variables: { label: omit(label, '__typename') } })
        props.onSave(label)
    }

    const isFormValid = (): boolean => !validator.isEmpty(label.name) && !validator.isEmpty(label.color)

    return (
        <Modal
            {...props}
            containerClassName={styles.root}
            isOpen={true}>
            <div className={styles.title}>{
                props.label
                    ? t('editLabel', { ns: 'admin' })
                    : t('addNewLabel', { ns: 'admin' })
            }</div>

            <TextField
                spellCheck={false}
                maxLength={18}
                label={t('nameLabel')}
                value={label.name}
                required={true}
                onChange={(_, name) => setLabel({ ...label, name })} />

            <TextField
                spellCheck={false}
                label={t('descriptionLabel')}
                value={label.description}
                multiline={true}
                onChange={(_, description) => setLabel({ ...label, description })} />

            <TextField
                spellCheck={false}
                label={t('iconLabel')}
                value={label.icon}
                onChange={(_, icon) => setLabel({ ...label, icon })} />

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
                    color={label.color}
                    onChange={({ hex }) => setLabel({ ...label, color: hex })} />
            )}

            <Label>{t('previewText')}</Label>
            <EntityLabel label={label} size='medium' />

            <PrimaryButton
                className={styles.saveBtn}
                text={t('save', { ns: 'common' })}
                disabled={!isFormValid()}
                onClick={onSave} />
        </Modal>
    )
}

export { ILabelFormProps }

