import {
  Label,
  Panel,
  PanelType,
  PrimaryButton,
  TextField
} from '@fluentui/react'
import { ColorPickerField } from 'components'
import { EntityLabel } from 'components/EntityLabel'
import { IconPicker } from 'components/IconPicker'
import React from 'react'
import styles from './LabelForm.module.scss'
import { ILabelFormProps } from './types'
import { useLabelForm } from './useLabelForm'

export const LabelForm: React.FC<ILabelFormProps> = (props) => {
  const { model, setModel, isFormValid, onSave, t } = useLabelForm({ props })

  return (
    <Panel
      {...props}
      type={PanelType.smallFixedFar}
      className={styles.root}
      headerText={!!props.label ? t('admin.editLabel') : t('admin.addNewLabel')}
      isLightDismiss={true}>
      <TextField
        className={styles.inputField}
        spellCheck={false}
        maxLength={18}
        label={t('common.nameFieldLabel')}
        value={model.name}
        required={true}
        disabled={!!props.label}
        onChange={(_, name) => setModel({ ...model, name })}
      />
      <TextField
        className={styles.inputField}
        spellCheck={false}
        label={t('common.descriptionFieldLabel')}
        value={model.description}
        multiline={true}
        onChange={(_, description) => setModel({ ...model, description })}
      />
      <IconPicker
        className={styles.inputField}
        defaultSelected={model.icon}
        label={t('common.iconFieldLabel')}
        placeholder={t('common.iconSearchPlaceholder')}
        width={300}
        onSelected={(icon) => setModel({ ...model, icon })}
      />
      <ColorPickerField
        className={styles.inputField}
        label={t('common.colorLabel')}
        color={model.color}
        onChanged={(color) => setModel({ ...model, color })}
      />
      <div className={styles.inputField}>
        <Label>{t('common.previewText')}</Label>
        <EntityLabel label={model} />
      </div>
      <PrimaryButton
        className={styles.saveBtn}
        text={t('common.save')}
        disabled={!isFormValid()}
        onClick={onSave}
      />
    </Panel>
  )
}

export * from './types'
