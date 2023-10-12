import { ButtonProps } from '@fluentui/react-components'
import { useMap } from 'hooks/common/useMap'

export interface ISubmitProps
  extends Pick<ButtonProps, 'onClick' | 'disabled'> {
  /**
   * Text to show on the submit button.
   */
  text: string

  /**
   * On save callback with the model passed as an argument.
   *
   * @param model The model used by the form control.
   */
  onSave?: (model: ReturnType<typeof useMap>) => void
}
