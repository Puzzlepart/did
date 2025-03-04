import {
  BaseControlOptions,
  FormControl,
  IconPickerControl,
  InputControl,
  SwitchControl
} from 'components'
import { PanelComponent } from 'components/Panel'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { EditPermissions } from './EditPermissions'
import { IRolePanelProps } from './types'
import { useRolePanel } from './useRolePanel'

export const RolePanel: PanelComponent<IRolePanelProps> = (props) => {
  const { t } = useTranslation()
  const { model, register, submitProps, panelProps, isEditMode } =
    useRolePanel(props)

  return (
    <FormControl
      id={RolePanel.displayName}
      model={model}
      submitProps={submitProps}
      panel={panelProps}
    >
      <InputControl
        {...register('name')}
        required={true}
        label={t('admin.roleNameLabel')}
        disabled={isEditMode}
      />
      <IconPickerControl
        {...register('icon')}
        label={t('common.iconFieldLabel')}
        required={true}
        placeholder={t('common.iconSearchPlaceholder')}
      />
      <EditPermissions
        {...register<BaseControlOptions>('permissions', {
          validators: [
            (value = []) =>
              value?.length === 0 || value === null
                ? [t('admin.permissionsRequired'), 'error']
                : null
          ]
        })}
        label={t('admin.permissonsLabel')}
        description={t('admin.editPermissionsDescription')}
        onChange={(permissions) => model.set('permissions', permissions)}
        selectedPermissions={model.value('permissions')}
      />
      <SwitchControl
        {...register('enabledForExternalUsers')}
        label={t('admin.enabledForExternalUsers')}
        description={t('admin.enabledForExternalUsersDescription')}
      />
    </FormControl>
  )
}

RolePanel.displayName = 'RolePanel'
