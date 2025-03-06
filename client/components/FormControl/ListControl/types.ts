import { TFunction } from 'react-i18next'
import { FormInputControlBase } from '../types'
import { IListInputProps, ListField } from './ListInput'

export interface IListControlProps
  extends FormInputControlBase,
    IListInputProps {}

/**
 * Represents a function that return an `ListField` of type `P`.
 *
 * @param t - The translation function.
 * @param args - Additional arguments for the function.
 *
 * @returns The additional metadata field.
 */
export type GetFieldFunction<P> = (t: TFunction, ...args: any[]) => ListField<P>
