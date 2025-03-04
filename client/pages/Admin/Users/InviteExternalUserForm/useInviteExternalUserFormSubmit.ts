/* eslint-disable unicorn/consistent-function-scoping */
import { FormSubmitHook, IFormControlProps } from 'components/FormControl'
import { useMap } from 'hooks'
import { useTranslation } from 'react-i18next'
import { IInviteExternalUserFormProps } from './types'
import $inviteExternalUser from './inviteExternalUser.gql'
import { useMutation } from '@apollo/client'

export const useInviteExternalUserFormSubmit: FormSubmitHook<
  IInviteExternalUserFormProps,
  ReturnType<typeof useMap>
> = (_, model) => {
  const { t } = useTranslation()
  const [inviteExternalUser] = useMutation($inviteExternalUser)

  const onSave = async () => {
    await inviteExternalUser({
      variables: {
        invitation: model.value()
      }
    })
  }

  return {
    text: t('common.save'),
    onClick: onSave
  } as IFormControlProps['submitProps']
}
