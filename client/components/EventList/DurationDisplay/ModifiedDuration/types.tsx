import type { TooltipProps } from '@fluentui/react-components'
import { EventObject, TimeEntry } from 'types'

export interface IModifiedDurationProps extends Partial<TooltipProps> {
  event: TimeEntry | EventObject
  hidden?: boolean
}
