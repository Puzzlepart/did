import {
  FormControl,
  IconPickerControl,
  InputControl,
  InputControlOptions,
  SwitchControl,
  SwitchControlOptions
} from 'components/FormControl'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { CUSTOMER_KEY_REGEX, ICustomerFormProps } from './types'
import { useCustomerForm } from './useCustomerForm'

export const CustomerForm: FC<ICustomerFormProps> = (props) => {
  const { t } = useTranslation()
  const { model, submit, register } = useCustomerForm(props)
  return (
    <FormControl {...props} model={model} submitProps={submit} debug={true}>
      <InputControl
        {...register<InputControlOptions>('key', {
          casing: 'upper',
          replace: [new RegExp('[^a-zA-Z0-9]'), ''],
          validator: {
            regex: CUSTOMER_KEY_REGEX,
            messages: {
              regex: t('customers.keyInvalid', { min: 2, max: 12 })
            }
          }
        })}
        disabled={!!props.edit}
        label={t('customers.keyFieldLabel')}
        description={t('customers.keyFieldDescription', { min: 2, max: 12 })}
        required={true}
      />
      <InputControl
        {...register<InputControlOptions>('name', { casing: 'capitalized' })}
        label={t('common.nameFieldLabel')}
        description={t('customers.nameFieldDescription', { min: 2 })}
        required={true}
      />
      <InputControl
        {...register<InputControlOptions>('description', {
          casing: 'capitalized',
          validator: {
            minLength: 10,
            state: 'warning',
            messages: {
              minLength: t('customers.descriptionWarning')
            }
          }
        })}
        label={t('common.descriptionFieldLabel')}
        description={t('customers.descriptionFieldDescription')}
        rows={14}
      />
      <IconPickerControl
        {...register('icon', {
          validator: (value) => {
            if (value === 'Umbrella') {
              return [t('customers.iconEasterEgg'), 'warning']
            }
            return null
          }
        })}
        label={t('common.iconFieldLabel')}
        description={t('customers.iconFieldDescription')}
        placeholder={t('common.iconSearchPlaceholder')}
        required={true}
      />
      <SwitchControl
        {...register<SwitchControlOptions>('inactive')}
        label={t('common.inactiveFieldLabel')}
        description={t('customers.inactiveFieldDescription')}
        hidden={!props.edit}
      />
    </FormControl>
  )
}

CustomerForm.defaultProps = {
  permission: PermissionScope.MANAGE_CUSTOMERS
}
