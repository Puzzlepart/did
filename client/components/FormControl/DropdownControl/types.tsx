/* eslint-disable @typescript-eslint/ban-types */
import { OptionProps } from '@fluentui/react-components'
import { FormInputControlBase } from '../types'

/**
 * Options for the DropdownControl component.
 */
export type DropdownControlOptions = {
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
  extends FormInputControlBase<DropdownControlOptions> {
  /**
   * An array of options to display in the dropdown.
   */
  values: OptionProps[]
}
