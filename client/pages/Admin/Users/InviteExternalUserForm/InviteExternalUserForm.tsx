import {
  FormControl,
  InputControl
} from 'components/FormControl'
import React from 'react'
import { StyledComponent } from 'types'
import { IInviteExternalUserFormProps } from './types'
import { useInviteExternalUserForm } from './useInviteExternalUserForm'

export const InviteExternalUserForm: StyledComponent<IInviteExternalUserFormProps> = (props) => {
  const {
    model,
    register,
    submitProps
  } = useInviteExternalUserForm(props)

  console.log('InviteExternalUserForm', submitProps)

  return (
    <FormControl
      id={InviteExternalUserForm.displayName}
      model={model}
      register={register}
      submitProps={submitProps}
      panel={{
        ...props,
        title: 'Invite External User'
      }}>
      <InputControl
        {...register('mail', {
          required: true
        })}
        label='Email'
        description='The email address of the external user.'
      />
    </FormControl>
  )
}

InviteExternalUserForm.displayName = 'InviteExternalUserForm'
