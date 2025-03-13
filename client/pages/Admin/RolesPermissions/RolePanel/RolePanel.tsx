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
  const formControl = useRolePanel(props)

  return (
    <FormControl {...formControl}>
      <InputControl
        {...formControl.register('name')}
        required={true}
        label={t('admin.roleNameLabel')}
        disabled={formControl.isEditMode}
      />
      <InputControl
        {...formControl.register('description')}
        label={t('admin.roleDescriptionLabel')}
        rows={4}
      />
      <IconPickerControl
        {...formControl.register('icon')}
        label={t('common.iconFieldLabel')}
        required={true}
        placeholder={t('common.iconSearchPlaceholder')}
      />
      <EditPermissions
        {...formControl.register<BaseControlOptions>('permissions', {
          validators: [
            (value = []) =>
              value?.length === 0 || value === null
                ? [t('admin.permissionsRequired'), 'error']
                : null
          ]
        })}
        label={t('admin.permissonsLabel')}
        description={t('admin.editPermissionsDescription')}
        onChange={(permissions) => formControl.model.set('permissions', permissions)}
        selectedPermissions={formControl.model.value('permissions')}
      />
      <SwitchControl
        {...formControl.register('enabledForExternalUsers')}
        label={t('admin.enabledForExternalUsers')}
        description={t('admin.enabledForExternalUsersDescription')}
      />
    </FormControl>
  )
}

RolePanel.displayName = 'RolePanel'
