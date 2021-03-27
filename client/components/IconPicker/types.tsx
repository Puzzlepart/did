import { ISearchBoxProps, ITextFieldProps } from '@fluentui/react'
import { FormInputControlBase } from 'components/FormControl/types'

export interface IIconPickerProps
  extends Pick<ITextFieldProps, 'label' | 'description'>,
    ISearchBoxProps,
    FormInputControlBase {
  /**
   * Default selected icon
   */
  defaultSelected?: string

  /**
   * On selected callback for the icon picker.
   * If not specified `model` and `name` should
   * be specified instead.
   */
  onSelected?: (icon: string) => void
}
