import { ButtonProps } from '@fluentui/react-components'
import { IMissingSubmissionPeriod } from '../types'

export interface ILockWeekButtonProps extends ButtonProps {
  period: IMissingSubmissionPeriod
}
