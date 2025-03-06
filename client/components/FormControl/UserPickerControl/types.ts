import { TFunction } from 'react-i18next'
import { FormInputControlBase } from '../types'
import { AdditionalMetadataField, IUserPickerProps } from './UserPicker'

export interface IUserPickerControlProps
  extends FormInputControlBase,
    IUserPickerProps {}

/**
 * Represents a function that retrieves an additional metadata field
 * of type `P`.
 *
 * @param t - The translation function.
 * @param args - Additional arguments for the function.
 *
 * @returns The additional metadata field.
 */
export type GetAdditionalMetadataFieldFunction<P> = (
  t: TFunction,
  ...args: any[]
) => AdditionalMetadataField<P>
