import {
  BaseControlOptions,
  FormControl,
  IconPickerControl,
  InputControl
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
    <FormControl model={model} submitProps={submitProps} panel={panelProps}>
      <InputControl
        {...register('name')}
        required={true}
        label={t('admin.roleNameLabel')}
        disabled={!!props.edit}
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
        buttonLabel={
          isEditMode ? t('admin.editPermissions') : t('admin.addPermissions')
        }
        description={t('admin.editPermissionsDescription')}
        emptyMessage={t('admin.noPermissionsSelected', {
          buttonLabel: isEditMode
            ? t('admin.editPermissions')
            : t('admin.addPermissions')
        })}
        onChange={(permissions) => model.set('permissions', permissions)}
        selectedPermissions={model.value('permissions')}
      />
    </FormControl>
  )
}

RolePanel.displayName = 'RolePanel'
