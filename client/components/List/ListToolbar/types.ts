import { ToolbarProps } from '@fluentui/react-components'
import { MutableRefObject } from 'react'

export interface IListToolbarProps extends ToolbarProps {
  root: MutableRefObject<any>
}
