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
type GetFieldFunction = (
  t: TFunction,
  ...args: any[]
) => AdditionalMetadataField

export const ProjectRoleField: GetFieldFunction = (t) => ({
  label: t('common.projectRole'),
  type: 'text'
})

export const HourlyRateField: GetFieldFunction = (t) => ({
  label: t('common.hourlyRate'),
  type: 'number',
  renderAs: 'currency'
})

// eslint-disable-next-line unicorn/prevent-abbreviations
export const PredefinedRoleField: GetFieldFunction = (
  t,
  options: any[],
  transformFunction: any
) => ({
  label: t('common.projectRole'),
  type: 'choice',
  props: { values: options, transformFunc: transformFunction }
})
