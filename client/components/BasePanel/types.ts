import { IPanelProps } from '@fluentui/react'
import { ButtonProps } from '@fluentui/react-components'

/**
 * Props for the BasePanel component.
 */
export interface IBasePanelProps extends IPanelProps {
  /**
   * Actions to display in the header of the panel.
   */
  headerActions?: IBasePanelAction[]

  /**
   * Actions to display in the footer of the panel.
   */
  footerActions?: IBasePanelAction[]

  /**
   * Whether or not the panel should have a scroll bar. If set to
   * `true`, the scrollable content container will have `overflow`
   * set to `auto`, otherwise it will be set to `visible`.
   */
  scroll?: boolean
}

export interface IHeaderProps {
  actions?: IBasePanelAction[]
}

export interface IFooterProps {
  actions?: IBasePanelAction[]
  onDismiss?: IBasePanelProps['onDismiss']
  cancelAction?: boolean
}

export interface IBasePanelAction {
  text: string
  title?: ButtonProps['title']
  onClick?: any
  icon?: ButtonProps['icon']
  appearance?: ButtonProps['appearance']
  hidden?: HTMLDivElement['hidden']
  disabled?: ButtonProps['disabled']
}
