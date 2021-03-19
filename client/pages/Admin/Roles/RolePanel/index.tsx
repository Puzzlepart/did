import { UserMessage } from 'components'
import { IconPicker } from 'components/IconPicker'
import {
  DefaultButton,
  Panel,
  PrimaryButton,
  TextField
} from 'office-ui-fabric-react'
import React, { Fragment, FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { contains, isEmpty } from 'underscore'
import { PermissionCheckbox } from './PermissionCheckbox'
import styles from './RolePanel.module.scss'
import { IRolePanelProps } from './types'
import { useRolePanel } from './useRolePanel'

export const RolePanel: FunctionComponent<IRolePanelProps> = (
  props: IRolePanelProps
) => {
  const { t } = useTranslation()
  const {
    data,
    permissions,
    model,
    setModel,
    onDelete,
    onSave,
    saveDisabled,
    togglePermission
  } = useRolePanel({ props })

  return (
    <Panel
      className={styles.root}
      headerText={props.headerText}
      customWidth='440px'
      isOpen={true}
      isLightDismiss={true}
      onDismiss={props.onDismiss}>
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
              checked={contains(model.permissions, permission.id)}
              permission={permission}
              onToggle={togglePermission}
            />
          ))}
        </div>
        <div className={styles.actions}>
          {props.model && (
            <Fragment>
              {isEmpty(data?.users) ? (
                <DefaultButton
                  className={styles.deleteBtn}
                  text={t('common.delete')}
                  iconProps={{ iconName: 'Delete' }}
                  onClick={onDelete}
                />
              ) : (
                <UserMessage
                  text={t('admin.roleInUseMessage', {
                    count: data?.users?.length
                  })}
                />
              )}
            </Fragment>
          )}
          <PrimaryButton
            className={styles.saveBtn}
            text={t('common.save')}
            onClick={onSave}
            disabled={saveDisabled}
          />
        </div>
      </div>
    </Panel>
  )
}

export * from './types'
