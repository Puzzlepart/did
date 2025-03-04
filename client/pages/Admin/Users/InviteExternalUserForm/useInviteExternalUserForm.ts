import {
  useFormControlModel,
  useFormControls
} from 'components/FormControl'
import { User, UserInput } from 'types'
import { useUsersContext } from '../context'
import { InviteExternalUserForm } from './InviteExternalUserForm'
import { IInviteExternalUserFormProps } from './types'
import { useInviteExternalUserFormSubmit } from './useInviteExternalUserFormSubmit'

/**
 * A custom hook that returns the necessary props and functions for the invite external user form.
 *
 * @param props - The props for the invite external user form.
 */
export function useInviteExternalUserForm(props: IInviteExternalUserFormProps) {
  const context = useUsersContext()
  const model = useFormControlModel<keyof UserInput, UserInput>({})
  const register = useFormControls<keyof User>(model, InviteExternalUserForm)
  const submitProps = useInviteExternalUserFormSubmit(props, model)

  return {
    model,
    register,
    submitProps,
    ...context.state
  }
}
