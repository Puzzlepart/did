import { ButtonProps } from '@fluentui/react-components'
import { IMissingSubmissionPeriod } from '../types'

export type ILockWeekButtonProps = ButtonProps & {
  period: IMissingSubmissionPeriod
}
