/* eslint-disable @typescript-eslint/ban-types */
import { IDropdownProps } from '@fluentui/react'
import { FormInputControlBase } from '../types'

export interface IDropdownControlProps
  extends Omit<FormInputControlBase<{}>, 'options'>,
    Omit<IDropdownProps, 'name' | 'value' | 'onChange'> {
  setValue?: 'data' | 'key'
}
