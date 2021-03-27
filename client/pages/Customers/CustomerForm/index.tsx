import { IconPicker } from 'components'
import { FormControl } from 'components/FormControl'
import { TextControl } from 'components/FormControl/TextControl'
import { TextControlOptions } from 'components/FormControl/TextControl/types'
import { config } from 'package'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ICustomerFormProps } from './types'
import { useCustomerForm } from './useCustomerForm'

export const CustomerForm: React.FC<ICustomerFormProps> = (props) => {
  const { t } = useTranslation()
  const { submit, register } = useCustomerForm(props)
  return (
    <FormControl {...props} submitProps={submit}>
      <TextControl
        {...register<TextControlOptions>('key', { casing: 'upper' })}
        disabled={!!props.edit}
        label={t('customers.keyFieldLabel')}
        description={t('customers.keyFieldDescription', config.app)}
        required={true}
      />
      <TextControl
        {...register<TextControlOptions>('name', { casing: 'capitalized' })}
        label={t('common.nameFieldLabel')}
        description={t('customers.nameFieldDescription', config.app)}
        required={true}
      />
      <TextControl
        {...register<TextControlOptions>('description', {
          casing: 'capitalized'
        })}
        label={t('common.descriptionFieldLabel')}
        description={t('customers.descriptionFieldDescription')}
        multiline={true}
        autoAdjustHeight={true}
      />
      <IconPicker
        {...register('icon')}
        label={t('common.iconFieldLabel')}
        description={t('customers.iconFieldDescription')}
        placeholder={t('common.iconSearchPlaceholder')}
        width={300}
        required={true}
      />
    </FormControl>
  )
}
