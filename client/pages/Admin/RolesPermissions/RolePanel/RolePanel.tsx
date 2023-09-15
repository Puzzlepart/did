import { Input } from '@fluentui/react-components'
import { Field, FormControl, IconPickerControl } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { EditPermissions } from './EditPermissions'
import styles from './RolePanel.module.scss'
import { IRolePanelProps } from './types'
import { useRolePanel } from './useRolePanel'

export const RolePanel: StyledComponent<IRolePanelProps> = (props) => {
  const { t } = useTranslation()
  const { model, setModel, submitProps, isEdit } = useRolePanel(props)

  return (
    <FormControl
      submitProps={submitProps}
      panelProps={{
        headerText: props.headerText,
        isOpen: true,
        onDismiss: props.onDismiss
      }}
    >
      <div className={RolePanel.className}>
        <Field required={true} label={t('admin.roleNameLabel')}>
          <Input
            defaultValue={props.model ? props.model.name : ''}
            disabled={!!props.model}
            required={true}
            onChange={(_event, data) =>
              setModel({ ...model, name: data?.value })
            }
          />
        </Field>
        <IconPickerControl
          label={t('common.iconFieldLabel')}
          required={true}
          placeholder={t('common.iconSearchPlaceholder')}
          defaultSelected={model.icon}
          onSelected={(icon) => setModel({ ...model, icon })}
        />
        <EditPermissions
          label={
            isEdit ? t('admin.editPermissions') : t('admin.addPermissions')
          }
          description={t('admin.editPermissionsDescription')}
          onChange={(permissions) => setModel({ ...model, permissions })}
          selectedPermissions={model.permissions}
        />
      </div>
    </FormControl>
  )
}

RolePanel.displayName = 'RolePanel'
RolePanel.className = styles.rolePanel
