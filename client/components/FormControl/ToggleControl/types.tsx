import { ITextFieldProps, IToggleProps } from '@fluentui/react'
import { FormInputControlBase } from '../types'

// eslint-disable-next-line @typescript-eslint/ban-types
export type ToggleControlOptions = {}

export interface IToggleControlProps
  extends FormInputControlBase<ToggleControlOptions>,
    Omit<IToggleProps, 'name' | 'value' | 'onChange'> {
  /**
   * Description of the control as `IToggleProps` from [@fluentui/react](@fluentui/react)
   * does not have the `description` property.
   */
  description?: ITextFieldProps['description']
}
