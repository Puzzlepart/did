import { IIconProps } from '@fluentui/react-react'
import { HTMLAttributes } from 'react'

export interface IMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  iconProps?: IIconProps
  text?: string
  href?: string
}
