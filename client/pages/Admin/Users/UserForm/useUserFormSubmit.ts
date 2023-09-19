import { useMutation } from '@apollo/client'
import { FormSubmitHook, IFormControlProps } from 'components/FormControl'
import { useMap } from 'hooks'
import { useTranslation } from 'react-i18next'
import { User } from 'types'
import _ from 'underscore'
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
    alert('Saving')
    await addOrUpdateUser({
      variables: {
        user: _.omit(model.value<User>(), '__typename', 'photo'),
        update: !!props.user
      }
    })
    model.reset()
    props.onDismiss()
  }

  return {
    text: t('common.save'),
    onClick: onSave
  } as IFormControlProps['submitProps']
}
