import { PanelType } from '@fluentui/react'
import {
  DropdownControl,
  DropdownControlOptions,
  FormControl,
  TextControl
} from 'components/FormControl'
import { DateObject } from 'DateUtils'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { EditPermissions } from '../../../Admin/RolesPermissions'
import { IApiTokenFormProps } from './types'
import { useApiTokenForm } from './useApiTokenForm'

export const ApiTokenForm: StyledComponent<IApiTokenFormProps> = (props) => {
  const { t } = useTranslation()
  const { expiryOptions, submitProps, model, register } = useApiTokenForm(props)

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
      <TextControl
        {...register('name')}
        label={t('admin.apiTokens.tokenNameLabel')}
        required={true}
      />
      <DropdownControl
        {...register<DropdownControlOptions>('expires', {
          preTransformValue: ({ optionValue }) =>
            new DateObject().add(optionValue).jsDate
        })}
        label={t('admin.apiTokens.tokenExpiryLabel')}
        required={true}
        values={Object.keys(expiryOptions).map((value) => ({
          value,
          text: expiryOptions[value]
        }))}
      />
      <EditPermissions
        api={true}
        label={t('admin.apiTokens.permissionsTitle')}
        description={t('admin.apiTokens.editPermissionsDescription')}
        selectedPermissions={model.value('permissions')}
        onChange={(selectedPermissions) =>
          model.set('permissions', selectedPermissions)
        }
      />
    </FormControl>
  )
}
