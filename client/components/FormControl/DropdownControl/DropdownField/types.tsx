/* eslint-disable @typescript-eslint/ban-types */
import { DropdownProps, OptionProps } from '@fluentui/react-components'

/**
 * Props for the DropdownControl component.
 */
export interface IDropdownFieldProps
  extends Pick<DropdownProps, 'defaultValue' | 'placeholder'> {
  /**
   * The label to display above the dropdown.
   */
  label?: string

  /**
   * Whether the dropdown is required.
   */
  required?: boolean

  /**
   * An array of options to display in the dropdown. Specify an array
   * of objects with `value` and `text` properties.
   */
  values: OptionProps[]

  onChange?: DropdownProps['onOptionSelect']
}
