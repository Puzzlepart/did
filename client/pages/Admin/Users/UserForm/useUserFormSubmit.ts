import { useMutation } from '@apollo/client'
import { FormSubmitHook, IFormControlProps } from 'components/FormControl'
import { useMap } from 'hooks'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import s from 'underscore.string'
import $addOrUpdateUser from './addOrUpdateUser.gql'
import { IUserFormProps } from './types'

/**
 * A custom hook that returns submit props needed for the `FormControls` component.
 *
 * @param props - The props for the user form.
 * @param model - The model for the user form.
 *
 * @returns A form submit hook that handles saving the user form data.
 */
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
    // eslint-disable-next-line no-console
    console.log(model.$)
    await addOrUpdateUser({
      variables: {
        user: {
          displayName: 'Hello world',
          role: model.value('role', 'User')
        },
        update: !!props.user
      }
    })
    model.reset()
    props.onDismiss()
  }

  const disabled = useMemo(
    () => s.isBlank(model.value('id')) || s.isBlank(model.value('displayName')),
    [model.isSet('id', 'displayName')]
  )

  return {
    text: t('common.save'),
    onClick: onSave,
    disabled
  } as IFormControlProps['submitProps']
}
