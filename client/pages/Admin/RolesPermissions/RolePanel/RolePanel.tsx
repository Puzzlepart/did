import { Field, Input } from '@fluentui/react-components'
import { BasePanel } from 'components'
import { IconPicker } from 'components/IconPicker'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { EditPermissions } from './EditPermissions'
import styles from './RolePanel.module.scss'
import { IRolePanelProps } from './types'
import { useRolePanel } from './useRolePanel'

export const RolePanel: StyledComponent<IRolePanelProps> = (props) => {
  const { t } = useTranslation()
  const { model, setModel, onSave, isSaveDisabled, isEdit } =
    useRolePanel(props)

  return (
    <BasePanel
      headerText={props.headerText}
      isOpen={true}
      footerActions={[
        {
          text: t('common.save'),
          onClick: onSave,
          disabled: isSaveDisabled,
          appearance: 'primary'
        }
      ]}
      onDismiss={props.onDismiss}
    >
      <div className={RolePanel.className}>
        <Field label={t('admin.roleNameLabel')} required={true}>
          <Input
            defaultValue={props.model ? props.model.name : ''}
            disabled={!!props.model}
            required={true}
            onChange={(_event, data) =>
              setModel({ ...model, name: data?.value })
            }
          />
        </Field>
        <IconPicker
          label={t('common.iconFieldLabel')}
          required={true}
          placeholder={t('common.iconSearchPlaceholder')}
          defaultSelected={model.icon}
          onSelected={(icon) => setModel({ ...model, icon })}
          className={styles.inputField}
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
    </BasePanel>
  )
}

RolePanel.displayName = 'RolePanel'
RolePanel.className = styles.rolePanel
