import { DateObject } from 'DateUtils'
import {
  BaseControlOptions,
  DropdownControl,
  DropdownControlOptions,
  FormControl,
  InputControl
} from 'components/FormControl'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { fuzzyMap } from 'utils'
import { EditPermissions } from '../../../Admin/RolesPermissions'
import { IApiTokenFormProps } from './types'
import { useApiTokenForm } from './useApiTokenForm'
import useFieldValidators from './validation'

export const ApiTokenForm: StyledComponent<IApiTokenFormProps> = (props) => {
  const { t } = useTranslation()
  const { expiryOptions, submitProps, model, register } = useApiTokenForm(props)
  const { ValidateUniqueNameFunction, ValidatePermissionsFunction } =
    useFieldValidators(props)
  return (
    <FormControl
      id={ApiTokenForm.displayName}
      model={model}
      submitProps={submitProps}
      panel={{
        title: t('admin.apiTokens.addNew'),
        open: props.open,
        onDismiss: props.onDismiss
      }}
    >
      <InputControl
        {...register('name', {
          required: true,
          validators: [ValidateUniqueNameFunction]
        })}
        label={t('admin.apiTokens.tokenNameLabel')}
      />
      <InputControl
        {...register('description', {
          required: true,
          validators: [
            {
              minLength: 20
            }
          ]
        })}
        rows={8}
        label={t('common.descriptionFieldLabel')}
        description={t('admin.apiTokens.tokenDescriptionDescription', {
          minLength: 20
        })}
      />
      <DropdownControl
        {...register<DropdownControlOptions>('expires', {
          required: true,
          preTransformValue: ({ optionValue }) =>
            new DateObject().add(optionValue).jsDate
        })}
        label={t('admin.apiTokens.tokenExpiryLabel')}
        values={fuzzyMap<any>(expiryOptions, (value, key) => ({
          value: key,
          text: value
        }))}
      />
      <EditPermissions
        {...register<BaseControlOptions>('permissions', {
          validators: [ValidatePermissionsFunction]
        })}
        api={true}
        label={t('admin.permissonsLabel')}
        description={t('admin.apiTokens.editPermissionsDescription')}
        selectedPermissions={model.value('permissions')}
        onChange={(selectedPermissions) =>
          model.set('permissions', selectedPermissions)
        }
      />
    </FormControl>
  )
}

ApiTokenForm.displayName = 'ApiTokenForm'
