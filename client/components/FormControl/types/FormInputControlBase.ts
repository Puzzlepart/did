import { useMap } from 'hooks/common/useMap'
import { IFieldProps } from '../Field'
import { BaseControlOptions } from './BaseControlOptions'

export interface FormInputControlBase<
  TOptions extends BaseControlOptions = BaseControlOptions,
  KeyType = string
> extends IFieldProps<KeyType> {
  /**
   * Automatically bind the text control to
   * a model. A model is generated using the
   * `useMap` hook.
   */
  model?: ReturnType<typeof useMap>

  /**
   * Control options
   *
   * - `casing` - force value casing
   */
  options?: TOptions
}
