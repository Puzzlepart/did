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
import { useSubscriptionSettings } from 'AppContext'

export const ProjectKey: FC = () => {
  const { t } = useTranslation()
  const { model, register, isEditMode } = useFormContext()
  const keyMaxLength = useSubscriptionSettings('projects.keyMaxLength', 12)
  const validateKeyFunction = useValidateKeyFunction(keyMaxLength)
  const validateUniqueKeyFunction = useValidateUniqueKeyFunction(
    model.value('customerKey'),
    !isEditMode
  )
  return (
    <InputControl
      {...register<InputControlOptions>('key', {
        casing: 'upper',
        replace: [new RegExp('[^a-zA-Z0-9]'), ''],
        validators: [validateKeyFunction, validateUniqueKeyFunction]
      })}
      disabled={isEditMode}
      label={t('projects.keyFieldLabel')}
      description={t('projects.keyFieldDescription', {
        min: 2,
        max: keyMaxLength
      })}
      required={!isEditMode}
    />
  )
}
