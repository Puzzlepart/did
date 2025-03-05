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
import { useInviteExternalUserForm } from './useInviteExternalUserForm'

export const InviteExternalUserForm: StyledComponent<
  IInviteExternalUserFormProps
> = (props) => {
  const { t } = useTranslation()
  const {
    formControlProps,
    register,
    availableRoles,
    invitationNameValidator,
    emailDomainValidator
  } = useInviteExternalUserForm(props)
  return (
    <FormControl {...formControlProps}>
      <InputControl
        {...register('name', {
          required: false,
          validators: [invitationNameValidator]
        })}
        label={t('common.nameLabel')}
        description={t('admin.users.invitationNameDescription')}
        placeholder={t('admin.users.invitationNamePlaceholder')}
      />
      <InputControl
        {...register('mail', {
          required: true,
          validators: [EmailValidator(t), emailDomainValidator]
        })}
        label={t('common.emailLabel')}
        description={t('admin.users.invitationEmailDescription')}
      />
      <DropdownControl
        {...register('role', { required: true })}
        label={t('common.roleLabel')}
        description={t('admin.users.invitationRoleDescription')}
        values={availableRoles
          .filter((role) => role.enabledForExternalUsers)
          .map((role) => ({
            value: role.name,
            text: role.name
          }))}
        selectFirstOption
      />
    </FormControl>
  )
}

InviteExternalUserForm.displayName = 'InviteExternalUserForm'
