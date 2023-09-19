import { IPanelProps } from '@fluentui/react'
import { TextProps } from '@fluentui/react-components'
import { IDynamicButtonProps } from 'components/DynamicButton'

/**
 * Props for the `BasePanel` component.
 */
export interface IBasePanelProps extends IPanelProps {
  /**
   * Header sub text to display in the panel. Use this
   * if you want to show more information about the panel.
   * Use `headerSubTextProps` to style the header sub text.
   */
  headerSubText?: string

  /**
   * Props for the header sub text.
   *
   * @default ```{ size: 400 }```
   */
  headerSubTextProps?: TextProps

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
