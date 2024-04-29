import { UserMessage } from 'components'
import { FormGroup, ListControl, useFormContext } from 'components/FormControl'
import React from 'react'
import { ProjectFormTabComponent } from '../types'
import { useTranslation } from 'react-i18next'
import { useRoleDefinitions } from './useRoleDefinitions'

export const RoleDefinitions: ProjectFormTabComponent = () => {
  const { register } = useFormContext()
  const { t } = useTranslation()
  const { fields } = useRoleDefinitions()
  return (
    <FormGroup gap={15}>
      <UserMessage
        style={{ margin: '-15px 0' }}
        text={t('projects.roleDefinitions.infoMessage')}
      />
      <ListControl
        {...register('roleDefinitions', {}, RoleDefinitions.extensionId)}
        fields={fields}
      />
    </FormGroup>
  )
}

RoleDefinitions.extensionId = '3f04bf7b-2a80-4e28-843d-64d1bd622ea7'
RoleDefinitions.extensionDescription = 'Role definitions for the project'
