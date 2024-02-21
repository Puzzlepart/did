import { useMutation } from '@apollo/client'
import { useAppContext } from 'AppContext'
import { FormSubmitHook, IFormControlProps } from 'components/FormControl'
import { useMap } from 'hooks'
import { useTranslation } from 'react-i18next'
import { UserInput } from 'types'
import { useUsersContext } from '../context'
import $addOrUpdateUser from './addOrUpdateUser.gql'
import {
  CreateOrUpdateUserVariables,
  IUserFormProps,
  createUserInput
} from './types'

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
  const { displayToast } = useAppContext()
  const context = useUsersContext()
  const [addOrUpdateUser] = useMutation<any, CreateOrUpdateUserVariables>(
    $addOrUpdateUser
  )

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
    const variables: CreateOrUpdateUserVariables = {
      user: createUserInput(model.value<UserInput>()),
      update: !!props.user
    }
    try {
      await addOrUpdateUser({ variables })
      displayToast(
        variables.update
          ? t('admin.users.updateSuccess', variables.user)
          : t('admin.users.createSuccess', variables.user),
        'success'
      )
      context.refetch()
    } catch {
      displayToast(
        variables.update
          ? t('admin.users.updateError', variables.user)
          : t('admin.users.createError', variables.user),
        'error'
      )
    } finally {
      model.reset()
      props.onDismiss()
    }
  }

  return {
    text: t('common.save'),
    onClick: onSave
  } as IFormControlProps['submitProps']
}
