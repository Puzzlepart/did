import { Field, Input } from '@fluentui/react-components'
import { BasePanel } from 'components'
import { IconPicker } from 'components/IconPicker'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { EditPermissions } from './EditPermissions'
import styles from './RolePanel.module.scss'
import { IRolePanelProps } from './types'
import { useRolePanel } from './useRolePanel'

export const RolePanel: FC<IRolePanelProps> = (props) => {
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
      <div className={styles.root}>
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
          onChange={(permissions) => setModel({ ...model, permissions })}
          selectedPermissions={model.permissions}
        />
      </div>
    </BasePanel>
  )
}

export * from './types'
