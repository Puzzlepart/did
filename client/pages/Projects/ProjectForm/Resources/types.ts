import {
  GetAdditionalMetadataFieldFunction,
  IInputFieldProps
} from 'components'

export const ProjectRoleField: GetAdditionalMetadataFieldFunction<
  Partial<IInputFieldProps>
> = (t) => ({
  label: t('common.projectRole'),
  type: 'text'
})

export const HourlyRateField: GetAdditionalMetadataFieldFunction<
  Partial<IInputFieldProps>
> = (t) => ({
  label: t('common.hourlyRate'),
  type: 'number',
  renderAs: 'currency'
})

export type ResourcesExtension = {
  /**
   * The project owner. The ID of the user who owns the project.
   */
  projectOwner: string

  /**
   * The resources for the project. Contains an array of objects with an `id`
   * property and additional properties.
   */
  resources: Array<{
    id: string
    [key: string]: any
  }>
}

/**
 * The default values for the resources extension if no values are provided.
 */
export const ResourcesExtensionDefault: ResourcesExtension = {
  projectOwner: null,
  resources: []
}
