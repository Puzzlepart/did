import {
  IFormControlProps,
  useFormControlModel,
  useFormControls
} from 'components/FormControl'
import { useTranslation } from 'react-i18next'
import { ExternalUserInvitationInput } from 'types'
import { useUsersContext } from '../context'
import { InviteExternalUserForm } from './InviteExternalUserForm'
import { IInviteExternalUserFormProps } from './types'
import { useInviteExternalUserFormSubmit } from './useInviteExternalUserFormSubmit'
import { useEmailDomainValidator } from './useEmailDomainValidator'
import { useInvitationNameValidator } from './useInvitationNameValidator'

/**
 * A custom hook that returns the necessary props and functions for the invite external user form.
 *
 * @param props - The props for the invite external user form.
 */
export function useInviteExternalUserForm(props: IInviteExternalUserFormProps) {
  const { t } = useTranslation()
  const context = useUsersContext()
  const model = useFormControlModel<
    keyof ExternalUserInvitationInput,
    ExternalUserInvitationInput
  >()
  const register = useFormControls<keyof ExternalUserInvitationInput>(
    model,
    InviteExternalUserForm
  )
  const submitProps = useInviteExternalUserFormSubmit(props, model)

  const formControlProps: IFormControlProps = {
    id: InviteExternalUserForm.displayName,
    model,
    register,
    submitProps,
    panel: {
      ...props,
      title: t('admin.inviteExternalUser')
    },
    validateOnBlur: true
  }

  const emailDomainValidator = useEmailDomainValidator()
  const invitationNameValidator = useInvitationNameValidator()

  return {
    formControlProps,
    model,
    register,
    submitProps,
    availableRoles: context.state.roles.filter(
      (role) => role.enabledForExternalUsers
    ),
    emailDomainValidator,
    invitationNameValidator
  }
}
