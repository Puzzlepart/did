/* eslint-disable unicorn/prevent-abbreviations */
import { OptionProps } from '@fluentui/react-components'
import { useFormContext } from 'components'
import { useExtension } from 'hooks'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { Project } from 'types'
import { RoleDefinitions } from '../RoleDefinitions'
import { AdditionalMetadataField } from 'components/FormControl/UserPickerControl/UserPicker'

export function usePredefinedRoles() {
  const { t } = useTranslation()
  const { model } = useFormContext()
  const roleDefinitions = useExtension<
    Project,
    Array<{
      id: string
      name: string
      hourlyRate: number
    }>
  >(model.$ as Project, RoleDefinitions.extensionId, 'roleDefinitions', [])

  if (_.isEmpty(roleDefinitions)) return null

  const values: OptionProps[] = roleDefinitions.map((role) => ({
    value: role.name,
    text: role.name
  }))
  const transformFunc = (selectedOptions: string[]) => {
    const roleDef = roleDefinitions.find(
      (role) => role.name === selectedOptions[0]
    )
    if (!Boolean(roleDef)) return null
    return {
      projectRoleId: roleDef.id,
      projectRole: roleDef.name,
      hourlyRate: roleDef.hourlyRate
    }
  }
  return {
    hourlyRate: null,
    projectRoleId: null,
    projectRole: {
      label: t('common.projectRole'),
      type: 'choice',
      required: true,
      props: {
        values,
        transformFunc
      }
    } as AdditionalMetadataField
  }
}
