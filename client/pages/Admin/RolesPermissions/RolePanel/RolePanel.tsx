import { FormControl, IconPickerControl, InputControl } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { EditPermissions } from './EditPermissions'
import { IRolePanelProps } from './types'
import { useRolePanel } from './useRolePanel'

export const RolePanel: StyledComponent<IRolePanelProps> = (props) => {
  const { t } = useTranslation()
  const { model, register, submitProps, panelProps, isEditMode } =
    useRolePanel(props)

  return (
    <FormControl
      model={model}
      submitProps={submitProps}
      panelProps={panelProps}
    >
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
        label={
          isEditMode ? t('admin.editPermissions') : t('admin.addPermissions')
        }
        description={t('admin.editPermissionsDescription')}
        onChange={(permissions) => model.set('permissions', permissions)}
        selectedPermissions={model.value('permissions')}
      />
    </FormControl>
  )
}

RolePanel.displayName = 'RolePanel'
