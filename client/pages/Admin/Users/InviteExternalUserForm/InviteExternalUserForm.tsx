import {
  DropdownControl,
  FormControl,
  InputControl,
  EmailValidator
} from 'components/FormControl'
import React from 'react'
import { StyledComponent } from 'types'
import { IInviteExternalUserFormProps } from './types'
import { useInviteExternalUserForm } from './useInviteExternalUserForm'
import { useTranslation } from 'react-i18next'
import { useEmailDomainValidator } from './useEmailDomainValidator'

export const InviteExternalUserForm: StyledComponent<
  IInviteExternalUserFormProps
> = (props) => {
  const { t } = useTranslation()
  const { formControlProps, register, roles } = useInviteExternalUserForm(props)
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
        values={roles
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
