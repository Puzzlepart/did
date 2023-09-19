import { ProgressBarProps } from '@fluentui/react-components'

export interface IProgressProps extends ProgressBarProps {
  text: string
  width?: string | number
  padding?: string | number
}
