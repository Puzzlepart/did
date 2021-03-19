import { useMutation } from '@apollo/client'
import { ColorPickerField } from 'components'
import { EntityLabel } from 'components/EntityLabel'
import { IconPicker } from 'components/IconPicker'
import {
  Label,
  Panel,
  PanelType,
  PrimaryButton,
  TextField
} from 'office-ui-fabric-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LabelInput } from 'types'
import { omit } from 'underscore'
import validator from 'validator'
import $addOrUpdateLabel from './addOrUpdateLabel.gql'
import styles from './LabelForm.module.scss'
import { ILabelFormProps } from './types'

export const LabelForm = (props: ILabelFormProps) => {
  const { t } = useTranslation()
  const [model, setModel] = useState<LabelInput>(
    props.label || {
      name: '',
      description: '',
      color: '#F8E71C'
    }
  )
  const [addOrUpdateLabel] = useMutation($addOrUpdateLabel)

  /**
   * On save label
   */
  const onSave = async () => {
    await addOrUpdateLabel({
      variables: {
        label: omit(model, '__typename'),
        update: !!props.label
      }
    })
    props.onSave(model)
  }

  /**
   * Checks if form is valid
   */
  const isFormValid = (): boolean =>
    !validator.isEmpty(model.name) && !validator.isEmpty(model.color)

  return (
    <Panel
      {...props}
      type={PanelType.smallFixedFar}
      className={styles.root}
      headerText={!!props.label ? t('admin.editLabel') : t('admin.addNewLabel')}
      isLightDismiss={true}
      isOpen={true}>
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
