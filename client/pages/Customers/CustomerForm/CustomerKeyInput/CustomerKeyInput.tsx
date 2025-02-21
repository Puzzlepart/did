import { useSubscriptionSettings } from 'AppContext'
import {
  InputControl,
  InputControlOptions,
  useFormContext
} from 'components/FormControl'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import {
  useValidateUniqueKeyFunction,
  useValidateKeyFunction
} from './validation'

export const CustomerKeyInput: FC = () => {
  const { t } = useTranslation()
  const { register, isEditMode } = useFormContext()
  const keyMaxLength = useSubscriptionSettings('customers.keyMaxLength', 12)
  const validateKeyFunction = useValidateKeyFunction(keyMaxLength)
  const validateUniqueKeyFunction = useValidateUniqueKeyFunction()
  return (
    <InputControl
      {...register<InputControlOptions>('key', {
        required: !isEditMode,
        casing: 'upper',
        replace: [new RegExp('[^a-zA-Z0-9]'), ''],
        validators: [validateKeyFunction, validateUniqueKeyFunction]
      })}
      label={t('customers.keyFieldLabel')}
      description={t('customers.keyFieldDescription', {
        min: 2,
        max: keyMaxLength
      })}
      disabled={isEditMode}
      maxLength={keyMaxLength}
    />
  )
}
