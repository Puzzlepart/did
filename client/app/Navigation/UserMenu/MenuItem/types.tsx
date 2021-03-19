import { IIconProps } from 'office-ui-fabric-react'
import { HTMLAttributes } from 'react'

export interface IMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  iconProps?: IIconProps
  text?: string
  href?: string
}
