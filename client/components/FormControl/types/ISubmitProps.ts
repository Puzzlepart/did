import { ButtonProps } from '@fluentui/react-components'
import { ReactNode } from 'react'
import { useMap } from 'hooks/common/useMap'

export interface ISubmitProps
  extends Pick<ButtonProps, 'onClick' | 'disabled' | 'hidden'> {
  /**
   * Text to show on the submit button.
   */
  text?: string

  /**
   * Custom content to render inside the button.
   */
  content?: ReactNode

  /**
   * On save callback with the model passed as an argument.
   *
   * @param model The model used by the form control.
   */
  onSave?: (model: ReturnType<typeof useMap>) => void
}
