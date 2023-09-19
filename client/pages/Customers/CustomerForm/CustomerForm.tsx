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
import { ICustomerFormProps } from './types'
import { useCustomerForm } from './useCustomerForm'
import {
  CUSTOMER_KEY_REGEX,
  useValidateUniqueKeyFunction,
  useValidateUniqueNameFunction
} from './validation'

export const CustomerForm: FC<ICustomerFormProps> = (props) => {
  const { t } = useTranslation()
  const { model, submit, register } = useCustomerForm(props)
  const ValidateUniqueKeyFunction = useValidateUniqueKeyFunction()
  const ValidateUniqueNameFunction = useValidateUniqueNameFunction(props)
  return (
    <FormControl
      {...props}
      model={model}
      submitProps={submit}
      validateOnBlur={true}
    >
      <InputControl
        {...register<InputControlOptions>('key', {
          casing: 'upper',
          replace: [new RegExp('[^a-zA-Z0-9]'), ''],
          validators: !props.edit && [
            {
              regex: CUSTOMER_KEY_REGEX,
              messages: {
                regex: t('customers.keyInvalid', { min: 2, max: 12 })
              }
            },
            ValidateUniqueKeyFunction
          ]
        })}
        disabled={!!props.edit}
        label={t('customers.keyFieldLabel')}
        description={t('customers.keyFieldDescription', { min: 2, max: 12 })}
        required={!props.edit}
      />
      <InputControl
        {...register<InputControlOptions>('name', {
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
        required={true}
      />
      <InputControl
        {...register<InputControlOptions>('description', {
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
        {...register('icon', {
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
        required={true}
      />
      <LabelPickerControl
        label={t('common.labelsText')}
        placeholder={t('projects.filterLabels')}
        noSelectionText={t('customers.noLabelsSelectedText')}
        defaultSelectedKeys={model.value('labels')}
        onChange={(labels) =>
          model.set(
            'labels',
            labels.map((lbl) => lbl.name)
          )
        }
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
