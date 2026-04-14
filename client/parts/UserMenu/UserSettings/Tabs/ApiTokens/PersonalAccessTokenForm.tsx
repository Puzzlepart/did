import { DateObject } from 'DateUtils'
import {
  BaseControlOptions,
  DropdownControl,
  DropdownControlOptions,
  FormControl,
  InputControl,
  ValidatorFunction,
  useFormControlModel,
  useFormControls
} from 'components/FormControl'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ApiToken, ApiTokenInput, StyledComponent } from 'types'
import { fuzzyMap } from 'utils'
import { EditPermissions } from 'pages/Admin/RolesPermissions'
import { useExpiryOptions } from 'pages/Admin/ApiTokens/ApiTokenForm/useExpiryOptions'
import { useMutation } from '@apollo/client'
import { useAppContext } from 'AppContext'
import $addPersonalAccessToken from './addPersonalAccessToken.gql'

interface IPersonalAccessTokenFormProps {
  open: boolean
  onTokenAdded: (token: ApiToken) => void
  onDismiss: () => void
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
        const token = {
          ...model.$,
          expires: new DateObject().add(model.value('expires')).jsDate
        }
        const { data } = await addToken({
          variables: { token }
        })
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
      <DropdownControl
        {...register<DropdownControlOptions>('expires', {
          required: true
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
            ((value: string[]) =>
              !value || value.length === 0
                ? [t('admin.apiTokens.permissionsRequired'), 'error']
                : null) as ValidatorFunction<string[]>
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
