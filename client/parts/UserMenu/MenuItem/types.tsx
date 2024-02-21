import { ButtonProps } from '@fluentui/react-components'
import { CSSProperties } from 'react'

export interface IMenuItemProps
  extends Pick<ButtonProps, 'onClick' | 'icon' | 'title'> {
  /**
   * Menu item text
   */
  text?: string

  /**
   * Hide the text
   */
  hideText?: boolean

  /**
   * Menu item link href
   */
  href?: string

  /**
   * Menu item text style
   */
  textStyle?: CSSProperties

  /**
   * Menu item style
   */
  style?: CSSProperties

  /**
   * Additional class name
   */
  className?: string
}
