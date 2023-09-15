import { HTMLAttributes } from 'react'
import { IBasePanelProps } from '../types'

export interface IHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Actions to display in the header of the panel.
   */
  actions?: IBasePanelProps['headerActions']
}
