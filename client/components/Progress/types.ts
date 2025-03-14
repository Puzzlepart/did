import { ProgressBarProps } from '@fluentui/react-components'
import { FluentIconName } from 'utils'

/**
 * Props for the Progress component.
 */
export interface IProgressProps extends ProgressBarProps {
  /**
   * The label to display above the progress bar.
   */
  label?: string

  /**
   * The text to display inside the progress bar.
   */
  text: string

  /**
   * The width of the progress bar.
   */
  width?: string | number

  /**
   * The padding of the progress bar.
   */
  padding?: string | number

  /**
   * The name of the Fluent UI icon to display inside the progress bar.
   */
  iconName?: FluentIconName
}
