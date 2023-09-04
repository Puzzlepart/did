import { ButtonProps } from '@fluentui/react-components'
import { CSSProperties } from 'react'

export interface IMenuItemProps
  extends Pick<ButtonProps, 'onClick' | 'icon' | 'title'> {
  text?: string
  hideText?: boolean
  href?: string
  textStyle?: CSSProperties
  style?: CSSProperties
}
