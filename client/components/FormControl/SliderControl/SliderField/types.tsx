import { SliderProps } from '@fluentui/react-components'
import { ChangeEvent } from 'react'
import { IFieldProps } from '../../Field'

export interface ISliderFieldProps
  extends Pick<SliderProps, 'value' | 'max' | 'min' | 'step'>,
    IFieldProps {
  /**
   * On change event handler
   */
  onChange?: (event: ChangeEvent<any>, data: any) => void

  /**
   * On blur event handler.
   */
  onBlur?: (event: any) => void

  /**
   * Format value function. Shown in parenthesis next to the label.
   */
  formatValue?: (value: number) => string
}
