import { InputProps, TextareaProps } from '@fluentui/react-components'
import { ChangeEvent, CSSProperties, KeyboardEvent } from 'react'
import { IFieldProps } from '../../Field'

export interface IInputFieldProps
  extends Pick<TextareaProps, 'rows' | 'value' | 'placeholder' | 'maxLength'>,
    Pick<
      InputProps,
      | 'type'
      | 'defaultValue'
      | 'contentBefore'
      | 'contentAfter'
      | 'minLength'
      | 'maxLength'
      | 'min'
      | 'max'
      | 'style'
      | 'title'
    >,
    IFieldProps {
  /**
   * On change event handler
   */
  onChange?: (event: Partial<ChangeEvent<any>>, data: any) => void

  /**
   * On blur event handler.
   */
  onBlur?: (event: any) => void

  /**
   * On enter event handler.
   */
  onEnter?: (value: any, event: KeyboardEvent<HTMLInputElement>) => void

  /**
   * On cancel event handler (`Escape` key is pressed).
   */
  onCancel?: (event: KeyboardEvent<HTMLInputElement>) => void

  /**
   * Styles for the input field etc.
   */
  styles?: {
    input: CSSProperties
  }

  /**
   * Enable increment of the value on `ArrowUp` key press.
   */
  increment?: number

  /**
   * Enable decrement of the value on `ArrowDown` key press.
   */
  decrement?: number
}
