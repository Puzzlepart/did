import { InputProps, TextareaProps } from '@fluentui/react-components'
import { ChangeEvent } from 'react'
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
    >,
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
   * On enter event handler.
   */
  onEnter?: (value: any) => void
}
