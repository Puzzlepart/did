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
import { CustomerKeyInput } from './CustomerKeyInput'
import { ICustomerFormProps } from './types'
import { useCustomerForm } from './useCustomerForm'
import { useValidateUniqueNameFunction } from './validation'

export const CustomerForm: FC<ICustomerFormProps> = (props) => {
  const { t } = useTranslation()
  const { formControlProps } = useCustomerForm(props)
  const validateUniqueNameFunction = useValidateUniqueNameFunction(props)
  return (
    <FormControl {...formControlProps}>
      <CustomerKeyInput />
      <InputControl
        {...formControlProps.register<InputControlOptions>('name', {
          required: true,
          casing: 'capitalized',
          validators: [
            {
              minLength: 2
            },
            validateUniqueNameFunction
          ]
        })}
        label={t('common.nameFieldLabel')}
        description={t('customers.nameFieldDescription', { min: 2 })}
      />
      <InputControl
        {...formControlProps.register<InputControlOptions>('description', {
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
        {...formControlProps.register('icon', {
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
        defaultSelectedKeys={formControlProps.model.value('labels')}
        onChange={(labels) =>
          formControlProps.model.set(
            'labels',
            labels.map((lbl) => lbl.name)
          )
        }
      />
      <SwitchControl
        {...formControlProps.register<SwitchControlOptions>('inactive')}
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
