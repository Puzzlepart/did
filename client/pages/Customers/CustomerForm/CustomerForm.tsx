import {
  FormControl,
  IconPickerControl,
  InputControl,
  InputControlOptions,
  LabelPickerControl,
  SwitchControl,
  SwitchControlOptions
} from 'components/FormControl'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { CustomerKey } from './CustomerKey'
import { ICustomerFormProps } from './types'
import { useCustomerForm } from './useCustomerForm'
import { useValidateUniqueNameFunction } from './validation'

export const CustomerForm: FC<ICustomerFormProps> = (props) => {
  const { t } = useTranslation()
  const { formControl } = useCustomerForm(props)
  const ValidateUniqueNameFunction = useValidateUniqueNameFunction(props)
  return (
    <FormControl {...formControl}>
      <CustomerKey />
      <InputControl
        {...formControl.register<InputControlOptions>('name', {
          required: true,
          casing: 'capitalized',
          validators: [
            {
              minLength: 2
            },
            ValidateUniqueNameFunction
          ]
        })}
        label={t('common.nameFieldLabel')}
        description={t('customers.nameFieldDescription', { min: 2 })}
      />
      <InputControl
        {...formControl.register<InputControlOptions>('description', {
          casing: 'capitalized',
          validators: [
            {
              minLength: 10,
              state: 'warning',
              messages: {
                minLength: t('customers.descriptionWarning')
              }
            }
          ]
        })}
        label={t('common.descriptionFieldLabel')}
        description={t('customers.descriptionFieldDescription')}
        rows={14}
      />
      <IconPickerControl
        {...formControl.register('icon', {
          required: true,
          validators: [
            (value) => {
              if (value === 'Umbrella') {
                return [t('customers.iconEasterEgg'), 'warning']
              }
              return null
            }
          ]
        })}
        label={t('common.iconFieldLabel')}
        description={t('customers.iconFieldDescription')}
        placeholder={t('common.iconSearchPlaceholder')}
      />
      <LabelPickerControl
        label={t('common.labelsText')}
        placeholder={t('common.filterLabels')}
        noSelectionText={t('customers.noLabelsSelectedText')}
        defaultSelectedKeys={formControl.model.value('labels')}
        onChange={(labels) =>
          formControl.model.set(
            'labels',
            labels.map((lbl) => lbl.name)
          )
        }
      />
      <SwitchControl
        {...formControl.register<SwitchControlOptions>('inactive')}
        label={t('common.inactiveFieldLabel')}
        description={t('customers.inactiveFieldDescription')}
        hidden={!props.edit}
      />
    </FormControl>
  )
}

CustomerForm.displayName = 'CustomerForm'
CustomerForm.defaultProps = {
  permission: PermissionScope.MANAGE_CUSTOMERS
}
