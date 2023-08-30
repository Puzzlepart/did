import { ITextFieldProps } from '@fluentui/react'
import { CheckboxProps } from '@fluentui/react-components'
import { FormInputControlBase } from '../types'

// eslint-disable-next-line @typescript-eslint/ban-types
export type ChecboxControlOptions = {}

export interface ICheckboxControlProps
  extends FormInputControlBase<ChecboxControlOptions>,
    Omit<CheckboxProps, 'name' | 'value' | 'onChange'> {
  /**
   * Description of the control as `IToggleProps` from [@fluentui/react](@fluentui/react)
   * does not have the `description` property.
   */
  description?: ITextFieldProps['description']
}
