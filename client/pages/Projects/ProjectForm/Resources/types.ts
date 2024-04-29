import { IInputFieldProps } from 'components'
import { AdditionalMetadataField } from 'components/FormControl/UserPickerControl/UserPicker'
import { TFunction } from 'i18next'

/**
 * Represents a function that retrieves an additional metadata field.
 *
 * @param t - The translation function.
 * @param args - Additional arguments for the function.
 *
 * @returns The additional metadata field.
 */
export type GetFieldFunction<P> = (
  t: TFunction,
  ...args: any[]
) => AdditionalMetadataField<P>

export const ProjectRoleField: GetFieldFunction<Partial<IInputFieldProps>> = (
  t
) => ({
  label: t('common.projectRole'),
  type: 'text'
})

export const HourlyRateField: GetFieldFunction<Partial<IInputFieldProps>> = (
  t
) => ({
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