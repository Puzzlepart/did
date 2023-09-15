import {
  FormControl,
  IconPickerControl,
  SwitchControl,
  SwitchControlOptions,
  TextControl,
  TextControlOptions
} from 'components/FormControl'
import packageFile from 'package'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { ICustomerFormProps } from './types'
import { useCustomerForm } from './useCustomerForm'

export const CustomerForm: FC<ICustomerFormProps> = (props) => {
  const { t } = useTranslation()
  const { submit, register } = useCustomerForm(props)
  return (
    <FormControl {...props} submitProps={submit}>
      <TextControl
        {...register<TextControlOptions>('key', {
          casing: 'upper',
          replace: [new RegExp('[^a-zA-Z0-9]'), '']
        })}
        disabled={!!props.edit}
        label={t('customers.keyFieldLabel')}
        description={t('customers.keyFieldDescription', packageFile.config.app)}
        required={true}
      />
      <TextControl
        {...register<TextControlOptions>('name', { casing: 'capitalized' })}
        label={t('common.nameFieldLabel')}
        description={t(
          'customers.nameFieldDescription',
          packageFile.config.app
        )}
        required={true}
      />
      <TextControl
        {...register<TextControlOptions>('description', {
          casing: 'capitalized'
        })}
        label={t('common.descriptionFieldLabel')}
        description={t('customers.descriptionFieldDescription')}
        rows={14}
      />
      <IconPickerControl
        {...register('icon')}
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
