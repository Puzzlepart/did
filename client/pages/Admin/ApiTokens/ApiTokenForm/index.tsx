import { DefaultButton, Dropdown, Panel, TextField } from '@fluentui/react'
import { DateObject } from 'DateUtils'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { contains, isEmpty } from 'underscore'
import { isBlank } from 'underscore.string'
import { PermissionCheckbox } from '../../Roles/RolePanel/PermissionCheckbox'
import styles from './ApiTokenForm.module.scss'
import { IApiTokenFormProps } from './types'
import { useApiTokenForm } from './useApiTokenForm'

export const ApiTokenForm = ({
  isOpen,
  onAdded,
  onDismiss
}: IApiTokenFormProps) => {
  const { t } = useTranslation()
  const {
    token,
    setToken,
    expiryOptions,
    permissions,
    onAddApiToken,
    togglePermission
  } = useApiTokenForm({ onAdded })

  return (
    <Panel
      className={styles.root}
      headerText={t('admin.apiTokens.addNew')}
      isOpen={isOpen}
      isLightDismiss={true}
      onDismiss={onDismiss}>
      <div className={styles.inputContainer}>
        <TextField
          placeholder={t('admin.apiTokens.tokenNamePlaceholder')}
          required={true}
          onChange={(_event, value) => setToken({ ...token, name: value })}
        />
      </div>
      <div className={styles.inputContainer}>
        <Dropdown
          placeholder={t('admin.apiTokens.tokenExpiryPlaceholder')}
          required={true}
          onChange={(_event, { data }) =>
            setToken({
              ...token,
              expires: new DateObject().add(data).jsDate
            })
          }
          options={Object.keys(expiryOptions).map((key) => ({
            key,
            data: key,
            text: expiryOptions[key]
          }))}
        />
      </div>
      <div className={styles.sectionTitle}>
        {t('admin.apiTokens.permissionsTitle')}
      </div>
      <div className={styles.permissions}>
        {permissions.map((permission, index) => (
          <PermissionCheckbox
            key={index}
            checked={contains(token.permissions, permission.id)}
            permission={permission}
            onToggle={togglePermission}
          />
        ))}
      </div>
      <DefaultButton
        text={t('common.save')}
        onClick={onAddApiToken}
        disabled={
          isBlank(token.name) || !token.expires || isEmpty(token.permissions)
        }
      />
    </Panel>
  )
}
