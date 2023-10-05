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
   * On save user form data. This function is called when the user clicks the
   * save button on the user form. This function will call the `addOrUpdateUser`
   * mutation and then reset the user form model. Finally, the `onDismiss` prop
   * is called to close the user form.
   * 
   * If no role is selected, the role will default to `User` to avoid users
   * being created without a role.
   */
  const onSave = async () => {
    const user = {
      ..._.omit(model.value<User>(), '__typename', 'photo'),
      role: model.value<User>('role') ?? 'User'
    }
    await addOrUpdateUser({
      variables: {
        user,
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
