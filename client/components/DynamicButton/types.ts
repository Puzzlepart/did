import { ButtonProps } from '@fluentui/react-components'
import { HTMLProps } from 'react'
import { FluentIconName } from 'utils'

type PartialButtonProps = Pick<
  ButtonProps,
  'onClick' | 'title' | 'appearance' | 'shape' | 'disabled'
>

export interface IDynamicButtonProps
  extends PartialButtonProps,
    Pick<HTMLProps<HTMLDivElement>, 'hidden'> {
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
  isPrimary?: boolean

  /**
   * Shortcut to set the button as secondary.
   */
  isSecondary?: boolean

  /**
   * Renders the button as a menu trigger.
   */
  menuTrigger?: boolean
}
