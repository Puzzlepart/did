import { useMutation } from '@apollo/client'
import { FormSubmitHook, IFormControlProps } from 'components/FormControl'
import { useMap } from 'hooks'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { User } from 'types'
import _ from 'underscore'
import s from 'underscore.string'
import $addOrUpdateUser from './addOrUpdateUser.gql'
import { IUserFormProps } from './types'

export const useUserFormSubmit: FormSubmitHook<
  IUserFormProps,
  ReturnType<typeof useMap>
> = (props, model) => {
  const { t } = useTranslation()
  const [addOrUpdateUser] = useMutation($addOrUpdateUser)

  /**
   * On save user
   */
  const onSave = async () => {
    await addOrUpdateUser({
      variables: {
        user: _.omit(
          {
            ...(model.$ as User),
            role: model.value('role', 'User')
          },
          '__typename',
          'photo'
        ),
        update: !!props.user
      }
    })
    //setModel({})
    props.onDismiss()
  }

  const disabled = useMemo(
    () => s.isBlank(model.value('id')) || s.isBlank(model.value('displayName')),
    [model.isSet('id', 'displayName')]
  )

  return useMemo<IFormControlProps['submitProps']>(
    () => ({
      text: t('common.save'),
      onClick: onSave,
      disabled
    }),
    [disabled]
  )
}
