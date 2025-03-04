import {
  DropdownControl,
  EmailValidator,
  FormControl,
  InputControl
} from 'components/FormControl'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { IInviteExternalUserFormProps } from './types'
import { useEmailDomainValidator } from './useEmailDomainValidator'
import { useInviteExternalUserForm } from './useInviteExternalUserForm'

export const InviteExternalUserForm: StyledComponent<
  IInviteExternalUserFormProps
> = (props) => {
  const { t } = useTranslation()
  const { formControlProps, register, availableRoles } =
    useInviteExternalUserForm(props)
  const EmailDomainValidator = useEmailDomainValidator()
  return (
    <FormControl {...formControlProps}>
      <InputControl
        {...register('mail', {
          required: true,
          validators: [EmailValidator(t), EmailDomainValidator]
        })}
        label={t('common.emailLabel')}
      />
      <DropdownControl
        {...register('role', { required: true })}
        label={t('common.roleLabel')}
        values={availableRoles
          .filter((role) => role.enabledForExternalUsers)
          .map((role) => ({
            value: role.name,
            text: role.name
          }))}
      />
    </FormControl>
  )
}

InviteExternalUserForm.displayName = 'InviteExternalUserForm'
