import { FormGroup, ListControl, useFormContext } from 'components/FormControl'
import React from 'react'
import { ProjectFormTabComponent } from '../types'
import { useRoleDefinitions } from './useRoleDefinitions'

export const RoleDefinitions: ProjectFormTabComponent = () => {
  const { register } = useFormContext()
  const {} = useRoleDefinitions()
  return (
    <FormGroup gap={15}>
      <ListControl
        {...register('roleDefinitions', {}, RoleDefinitions.extensionId)}
        fields={[
          {
            key: 'name',
            type: 'text',
            label: 'Rollenavn',
            required: true
          },
          {
            key: 'hourlyRate',
            type: 'number',
            label: 'Timepris',
            renderAs: 'currency',
            required: true
          }
        ]}
      />
    </FormGroup>
  )
}

RoleDefinitions.extensionId = '3f04bf7b-2a80-4e28-843d-64d1bd622ea7'
RoleDefinitions.extensionDescription = 'Role definitions for the project'
