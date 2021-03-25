import { IIconProps } from '@fluentui/react'
import { HTMLAttributes } from 'react'

export interface IMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  iconProps?: IIconProps
  text?: string
  hideText?: boolean
  href?: string
  iconClassName?: string
}
