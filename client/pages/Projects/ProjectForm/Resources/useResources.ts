/* eslint-disable unicorn/prevent-abbreviations */
import { useTranslation } from 'react-i18next'
import { useSubscriptionSettings } from 'AppContext'
import _ from 'lodash'
import { ProjectRoleField, HourlyRateField, PredefinedRoleField } from './types'
import { useExtension } from 'hooks'
import { useFormContext } from 'components'
import { RoleDefinitions } from '../RoleDefinitions'
import { Project } from 'types'
import { OptionProps } from '@fluentui/react-components'

export function useResources() {
  const { model } = useFormContext()
  const { t } = useTranslation()
  const resourceMetadata = useSubscriptionSettings<string[]>(
    'projects.resourceMetadata',
    []
  )
  const roleDefinitions = useExtension<
    Project,
    Array<{
      name: string
      hourlyRate: number
    }>
  >(model.$ as Project, RoleDefinitions.extensionId, 'roleDefinitions', [])
  if (!_.isEmpty(roleDefinitions)) {
    const options: OptionProps[] = roleDefinitions.map((role) => ({
      value: role.name,
      text: role.name
    }))
    const transformFunc = (selectedOptions: string[]) => {
      const roleDef = roleDefinitions.find(
        (role) => role.name === selectedOptions[0]
      )
      return (
        roleDef && {
          projectRole: roleDef.name,
          hourlyRate: roleDef.hourlyRate
        }
      )
    }
    return {
      additionalMetadata: {
        projectRole: PredefinedRoleField(t, options, transformFunc)
      }
    }
  }
  const additionalMetadata = _.pick(
    {
      hourlyRate: HourlyRateField(t),
      projectRole: ProjectRoleField(t)
    },
    resourceMetadata
  )
  return { additionalMetadata }
}
