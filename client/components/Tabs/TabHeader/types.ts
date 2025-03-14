import { FluentIconName } from 'utils'

export interface ITabHeaderProps {
  text: string
  iconName?: FluentIconName
  iconColor?: string

  /**
   * A description to display under the text.
   */
  description?: string

  /**
   * Whether the tab is disabled.
   */
  disabled?: boolean

  /**
   * A map of sub-tabs to display under the main tab.
   */
  sub?: Record<string, string>

  /**
   * Whether to indent the text.
   */
  indent?: boolean
}
