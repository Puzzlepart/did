import { PanelType } from '@fluentui/react'
import {
  BaseControlOptions,
  DropdownControl,
  DropdownControlOptions,
  FormControl,
  InputControl
} from 'components/FormControl'
import { DateObject } from 'DateUtils'
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
      model={model}
      submitProps={submitProps}
      panelProps={{
        headerText: t('admin.apiTokens.addNew'),
        isOpen: props.isOpen,
        type: PanelType.smallFixedFar,
        onDismiss: props.onDismiss
      }}
    >
      <InputControl
        {...register('name', {
          validators: [ValidateUniqueNameFunction]
        })}
        label={t('admin.apiTokens.tokenNameLabel')}
        required={true}
      />
      <InputControl
        {...register('description', {
          validators: [
            {
              minLength: 20
            }
          ]
        })}
        rows={8}
        label={t('common.descriptionFieldLabel')}
        description={t('admin.apiTokens.tokenDescriptionDescription')}
        required={true}
      />
      <DropdownControl
        {...register<DropdownControlOptions>('expires', {
          preTransformValue: ({ optionValue }) =>
            new DateObject().add(optionValue).jsDate
        })}
        label={t('admin.apiTokens.tokenExpiryLabel')}
        required={true}
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
        buttonLabel={t('admin.apiTokens.permissionsTitle')}
        description={t('admin.apiTokens.editPermissionsDescription')}
        emptyMessage={t('admin.apiTokens.noPermissionsSelected', {
          buttonLabel: t('admin.apiTokens.permissionsTitle')
        })}
        selectedPermissions={model.value('permissions')}
        onChange={(selectedPermissions) =>
          model.set('permissions', selectedPermissions)
        }
      />
    </FormControl>
  )
}
