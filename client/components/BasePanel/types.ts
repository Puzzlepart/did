import { IPanelProps } from '@fluentui/react'
import { IDynamicButtonProps } from 'components/DynamicButton'

/**
 * Props for the BasePanel component.
 */
export interface IBasePanelProps extends IPanelProps {
  /**
   * Actions to display in the header of the panel.
   */
  headerActions?: IDynamicButtonProps[]

  /**
   * Actions to display in the footer of the panel.
   */
  footerActions?: IDynamicButtonProps[]

  /**
   * Whether or not the panel should have a scroll bar. If set to
   * `true`, the scrollable content container will have `overflow`
   * set to `auto`, otherwise it will be set to `visible`.
   */
  scroll?: boolean
}
