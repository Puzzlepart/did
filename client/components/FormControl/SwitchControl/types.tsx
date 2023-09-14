import { ITextFieldProps } from '@fluentui/react'
import { LabelProps, SwitchProps } from '@fluentui/react-components'
import { FormInputControlBase } from '../types'

// eslint-disable-next-line @typescript-eslint/ban-types
export type SwitchControlOptions = {}

export interface ISwitchControlProps
  extends Omit<FormInputControlBase<SwitchControlOptions>, 'children'>,
    Omit<SwitchProps, 'onChange' | 'checked' | 'name' | 'key'> {
  /**
   * Description of the control as `IToggleProps` from [@fluentui/react](@fluentui/react)
   * does not have the `description` property.
   */
  description?: ITextFieldProps['description']

  /**
   * Label font weight - `regular` or `semibold` (default: `semibold`)
   */
  labelWeight?: LabelProps['weight']
  hidden?: boolean
}
