/* eslint-disable @typescript-eslint/ban-types */
import { DropdownProps, OptionProps } from '@fluentui/react-components'
import { BaseControlOptions, FormInputControlBase } from '../types'

/**
 * Options for the DropdownControl component.
 */
export interface DropdownControlOptions extends BaseControlOptions {
  /**
   * A function to transform the selected value before it is submitted.
   *
   * @param data - The data to transform.
   */
  preTransformValue?: (data: {
    optionValue: string
    optionText: string
  }) => void
}

/**
 * Props for the DropdownControl component.
 */
export interface IDropdownControlProps
  extends FormInputControlBase<DropdownControlOptions>,
    Pick<DropdownProps, 'defaultValue' | 'placeholder'> {
  /**
   * An array of options to display in the dropdown. Specify an array
   * of objects with `value` and `text` properties.
   */
  values: OptionProps[]

  /**
   * Flag to indicate if the first option should be selected by default.
   */
  selectFirstOption?: boolean
}
