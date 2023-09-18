import { TextProps } from '@fluentui/react-components'
import { HTMLProps } from 'react'

export interface IColumnHeaderProps extends HTMLProps<HTMLDivElement> {
  text: string
  textSize?: TextProps['size']
  subText?: string
  hostClassName?: string
}
