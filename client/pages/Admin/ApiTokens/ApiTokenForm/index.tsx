import { Dropdown, TextField } from '@fluentui/react'
import { FormControl } from 'components/FormControl'
import { DateObject } from 'DateUtils'
import React from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import s from 'underscore.string'
import { PermissionsControl } from './PermissionsControl'
import { IApiTokenFormProps } from './types'
import { useApiTokenForm } from './useApiTokenForm'

export const ApiTokenForm = ({
  isOpen,
  onAdded,
  onDismiss
}: IApiTokenFormProps) => {
  const { t } = useTranslation()
  const { token, setToken, expiryOptions, onAddApiToken, togglePermission } =
    useApiTokenForm({ onAdded })

  return (
    <FormControl
      submitProps={{
        text: t('common.save'),
        onClick: onAddApiToken,
        disabled:
          s.isBlank(token.name) ||
          !token.expires ||
          _.isEmpty(token.permissions)
      }}
      panelProps={{
        headerText: t('admin.apiTokens.addNew'),
        isOpen,
        isLightDismiss: true,
        onDismiss
      }}
    >
      <TextField
        label={t('admin.apiTokens.tokenNameLabel')}
        required={true}
        onChange={(_event, value) => setToken({ ...token, name: value })}
      />
      <Dropdown
        label={t('admin.apiTokens.tokenExpiryLabel')}
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
      <PermissionsControl token={token} onToggle={togglePermission} />
    </FormControl>
  )
}
