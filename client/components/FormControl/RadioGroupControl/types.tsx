/* eslint-disable @typescript-eslint/ban-types */
import { RadioGroupProps, RadioProps } from '@fluentui/react-components'
import { FormInputControlBase } from '../types'

/**
 * Props for the RadioGroupControl component.
 */
export interface IRadioGroupControlProps
  extends FormInputControlBase<{}>,
    Pick<RadioGroupProps, 'name'> {
  /**
   * An array of options to display in the dropdown. Specify an array
   * of objects with `value` and `text` properties.
   */
  values: RadioProps[]
}
