import { ButtonProps } from '@fluentui/react-components'
import { HTMLProps } from 'react'
import { FluentIconName } from 'utils'

type PartialButtonProps = Pick<
  ButtonProps,
  'onClick' | 'title' | 'appearance' | 'shape' | 'disabled'
>

export interface IDynamicButtonProps
  extends PartialButtonProps,
    Pick<HTMLProps<HTMLDivElement>, 'hidden' | 'className'> {
  /**
   * Icon name to use for the button.
   */
  iconName?: FluentIconName

  /**
   * Text to display on the button. This is not natively supported as a prop on
   * the `Button` component from `@fluentui/react-components`.
   */
  text?: string

  /**
   * Shortcut to set the button as primary.
   */
  primary?: boolean

  /**
   * Shortcut to set the button as secondary.
   */
  secondary?: boolean

  /**
   * Shortcut to set the button as subtle.
   */
  subtle?: boolean

  /**
   * Renders the button as a trigge for `Menu` or `Popover`.
   */
  triggerFor?: 'Menu' | 'Popover'

  fadeIn?: boolean
}
