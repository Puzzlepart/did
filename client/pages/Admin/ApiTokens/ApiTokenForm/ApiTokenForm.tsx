import { Dropdown, TextField } from '@fluentui/react'
import { DateObject } from 'DateUtils'
import { FormControl } from 'components/FormControl'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import _ from 'underscore'
import s from 'underscore.string'
import { EditPermissions } from '../../../Admin/RolesPermissions'
import { IApiTokenFormProps } from './types'
import { useApiTokenForm } from './useApiTokenForm'

export const ApiTokenForm: StyledComponent<IApiTokenFormProps> = (props) => {
  const { t } = useTranslation()
  const { token, setToken, expiryOptions, onAddApiToken } =
    useApiTokenForm(props)

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
        isOpen: props.isOpen,
        isLightDismiss: true,
        onDismiss: props.onDismiss
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
      <EditPermissions
        label={t('admin.apiTokens.permissionsTitle')}
        description={t('admin.apiTokens.editPermissionsDescription')}
        selectedPermissions={token.permissions}
        onChange={(selectedPermissions) =>
          setToken({ ...token, permissions: selectedPermissions })
        }
      />
    </FormControl>
  )
}
