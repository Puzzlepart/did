import { DateObject } from 'DateUtils'
import {
  BaseControlOptions,
  DropdownControl,
  DropdownControlOptions,
  FormControl,
  InputControl,
  useFormControlModel,
  useFormControls
} from 'components/FormControl'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { fuzzyMap } from 'utils'
import { EditPermissions } from 'pages/Admin/RolesPermissions'
import { useExpiryOptions } from 'pages/Admin/ApiTokens/ApiTokenForm/useExpiryOptions'
import { ApiTokenInput } from 'types'
import { useMutation } from '@apollo/client'
import { useAppContext } from 'AppContext'
import { ApiToken } from 'types'
import $addPersonalAccessToken from './addPersonalAccessToken.gql'

interface IPersonalAccessTokenFormProps {
  open: boolean
  onTokenAdded: (token: ApiToken) => void
  onDismiss: () => void
  tokens: ApiToken[]
}

export const PersonalAccessTokenForm: StyledComponent<
  IPersonalAccessTokenFormProps
> = (props) => {
  const { t } = useTranslation()
  const model = useFormControlModel<keyof ApiTokenInput>()
  const register = useFormControls<keyof ApiTokenInput>(
    model,
    PersonalAccessTokenForm
  )
  const expiryOptions = useExpiryOptions()
  const [addToken] = useMutation($addPersonalAccessToken)
  const { displayToast } = useAppContext()

  const submitProps = {
    text: t('common.save'),
    onClick: async () => {
      try {
        const { data } = await addToken({
          variables: { token: model.$ }
        })
        displayToast(t('userSettings.apiTokens.tokenCreated'), 'success', 20)
        const created = { ...(model.$ as ApiToken), ...data }
        model.reset()
        props.onTokenAdded(created)
      } catch {
        displayToast(t('common.errorText'), 'error')
        props.onDismiss()
      }
    }
  }

  return (
    <FormControl
      id={PersonalAccessTokenForm.displayName}
      model={model}
      submitProps={submitProps}
      panel={{
        title: t('userSettings.apiTokens.addNew'),
        open: props.open,
        onDismiss: props.onDismiss
      }}
    >
      <InputControl
        {...register('name', { required: true })}
        label={t('userSettings.apiTokens.tokenNameLabel')}
      />
      <InputControl
        {...register('description', {
          required: true,
          validators: [{ minLength: 20 }]
        })}
        rows={8}
        label={t('common.descriptionFieldLabel')}
        description={t('userSettings.apiTokens.tokenDescriptionDescription', {
          minLength: 20
        })}
      />
      <DropdownControl
        {...register<DropdownControlOptions>('expires', {
          required: true,
          preTransformValue: ({ optionValue }) =>
            new DateObject().add(optionValue).jsDate
        })}
        label={t('userSettings.apiTokens.tokenExpiryLabel')}
        values={fuzzyMap<any>(expiryOptions, (value, key) => ({
          value: key,
          text: value
        }))}
      />
      <EditPermissions
        {...register<BaseControlOptions>('permissions', {
          validators: [
            {
              state: 'invalid',
              func: (v: string[]) => !v || v.length === 0,
              message: t('admin.apiTokens.permissionsRequired')
            }
          ]
        })}
        label={t('userSettings.apiTokens.permissionsLabel')}
        description={t('userSettings.apiTokens.permissionsDescription')}
        selectedPermissions={model.value('permissions')}
        onChange={(selectedPermissions) =>
          model.set('permissions', selectedPermissions)
        }
      />
    </FormControl>
  )
}

PersonalAccessTokenForm.displayName = 'PersonalAccessTokenForm'
