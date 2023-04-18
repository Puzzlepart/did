/* eslint-disable @typescript-eslint/ban-types */
import { IDropdownProps, ITextFieldProps } from '@fluentui/react'
import { FormInputControlBase } from '../types'

export interface IDropdownControlProps
  extends Omit<FormInputControlBase<{}>, 'options'>,
    Omit<IDropdownProps, 'name' | 'value' | 'onChange'> {
  setValue?: 'data' | 'key'
  /**
   * Description of the control as `IDropdownProps` from [@fluentui/react](@fluentui/react)
   * does not have the `description` property.
   */
  description?: ITextFieldProps['description']
}
