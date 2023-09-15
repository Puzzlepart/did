import { HTMLAttributes } from 'react'
import { IBasePanelProps } from '../types'

/**
 * Props for the Footer component of the BasePanel.
 */
export interface IFooterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Actions to display in the footer of the panel.
   */
  actions?: IBasePanelProps['footerActions']

  /**
   * Callback function to be called when the Footer is dismissed.
   */
  onDismiss?: IBasePanelProps['onDismiss']

  /**
   * Whether to show a cancel action in the Footer.
   */
  cancelAction?: boolean

  /**
   * Whether the Footer should be sticky to the bottom of the BasePanel.
   */
  sticky?: boolean

  /**
   * Whether to show a border around the Footer.
   */
  bordered?: boolean

  /**
   * Whether to add padding to the Footer.
   */
  padded?: boolean
}
