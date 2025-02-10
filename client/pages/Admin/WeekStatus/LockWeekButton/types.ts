import { IButtonProps } from '@fluentui/react'
import { IMissingSubmissionPeriod } from '../types'

export interface ILockWeekButtonProps extends IButtonProps {
  period: IMissingSubmissionPeriod
}
