import { useSubscriptionSettings } from 'AppContext'
import {
  InputControl,
  InputControlOptions,
  useFormContext
} from 'components/FormControl'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import {
  useValidateKeyFunction,
  useValidateUniqueKeyFunction
} from './validation'

export const ProjectKeyInput: FC = () => {
  const { t } = useTranslation()
  const { model, register, isEditMode } = useFormContext()
  const keyMaxLength = useSubscriptionSettings('projects.keyMaxLength', 12)
  const validateKeyFunction = useValidateKeyFunction(keyMaxLength)
  const validateUniqueKeyFunction = useValidateUniqueKeyFunction(!isEditMode)
  return (
    <InputControl
      {...register<InputControlOptions>('key', {
        required: !isEditMode,
        casing: 'upper',
        replace: [new RegExp('[^a-zA-Z0-9]'), ''],
        validators: [validateKeyFunction, validateUniqueKeyFunction]
      })}
      label={t('projects.keyFieldLabel')}
      description={t('projects.keyFieldDescription', {
        min: 2,
        max: keyMaxLength
      })}
      disabled={isEditMode || !Boolean(model.value('customerKey'))}
      maxLength={keyMaxLength}
    />
  )
}

ProjectKeyInput.displayName = 'ProjectKeyInput'
