import { IBasePanelProps, IHeaderProps } from '../types'

/**
 * Props for the Footer component of the BasePanel.
 */
export interface IFooterProps extends IHeaderProps {
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
