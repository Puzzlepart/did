import { TFunction } from 'react-i18next'
import { User } from 'types'
import { FormInputControlBase } from '../types'
import { AdditionalMetadataField, IUserPickerProps } from './UserPicker'

export interface IUserPickerControlProps
  extends FormInputControlBase,
    IUserPickerProps {
  /**
   * Cusom function to transform the value of the user picker.
   *
   * @param user - The user to transform.
   */
  transformValue?: (user: User) => any
}

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
