import { HTMLAttributes } from 'react'

/**
 * @category IconText
 */
export interface IIconTextProps extends HTMLAttributes<HTMLDivElement> {
  text: string
  iconName: string
  styles?: {
    root?: {
      color?: string
      fontSize?: string | number
    }
  }
}
