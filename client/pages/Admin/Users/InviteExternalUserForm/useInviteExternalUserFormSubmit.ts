/* eslint-disable unicorn/consistent-function-scoping */
import { FormSubmitHook, IFormControlProps } from 'components/FormControl'
import { useMap } from 'hooks'
import { useTranslation } from 'react-i18next'
import { IInviteExternalUserFormProps } from './types'
import $inviteExternalUser from './inviteExternalUser.gql'
import { useMutation } from '@apollo/client'
import { useAppContext } from 'AppContext'

export const useInviteExternalUserFormSubmit: FormSubmitHook<
  IInviteExternalUserFormProps,
  ReturnType<typeof useMap>
> = (_, model) => {
  const { t } = useTranslation()
  const { displayToast } = useAppContext()
  const [inviteExternalUser] = useMutation($inviteExternalUser)

  const onSave = async () => {
    try {
      await inviteExternalUser({
        variables: {
          invitation: model.value()
        }
      })
      displayToast(
        t('admin.users.inviteExternalUserSuccess', model.value()),
        'success'
      )
    } catch {
      displayToast(t('admin.users.inviteExternalUserError'), 'error')
    } finally {
      model.reset()
    }
  }

  return {
    text: t('common.save'),
    onClick: onSave
  } as IFormControlProps['submitProps']
}
