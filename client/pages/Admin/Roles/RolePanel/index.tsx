import { PrimaryButton, TextField } from '@fluentui/react'
import { BasePanel } from 'components'
import { IconPicker } from 'components/IconPicker'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { PermissionCheckbox } from './PermissionCheckbox'
import styles from './RolePanel.module.scss'
import { IRolePanelProps } from './types'
import { useRolePanel } from './useRolePanel'

export const RolePanel: FC<IRolePanelProps> = (props) => {
  const { t } = useTranslation()
  const {
    permissions,
    model,
    setModel,
    onSave,
    saveDisabled,
    togglePermission
  } = useRolePanel({ props })

  return (
    <BasePanel
      className={styles.root}
      headerText={props.headerText}
      isOpen={true}
      isLightDismiss={true}
      onDismiss={props.onDismiss}
    >
      <div className={styles.container}>
        <TextField
          className={styles.inputField}
          label={t('admin.roleNameLabel')}
          defaultValue={props.model ? props.model.name : ''}
          disabled={!!props.model}
          required={true}
          onChange={(_event, name) => setModel({ ...model, name })}
        />
        <IconPicker
          label={t('common.iconFieldLabel')}
          required={true}
          placeholder={t('common.iconSearchPlaceholder')}
          defaultSelected={model.icon}
          onSelected={(icon) => setModel({ ...model, icon })}
          className={styles.inputField}
        />
        <div className={styles.subHeader}>{t('admin.permissonsLabel')}</div>
        <div className={styles.permissions}>
          {permissions.map((permission, index) => (
            <PermissionCheckbox
              key={index}
              checked={_.contains(model.permissions, permission.id)}
              permission={permission}
              onToggle={togglePermission}
            />
          ))}
        </div>
        <div className={styles.actions}>
          <PrimaryButton
            className={styles.saveBtn}
            text={t('common.save')}
            onClick={onSave}
            disabled={saveDisabled}
          />
        </div>
      </div>
    </BasePanel>
  )
}

export * from './types'
