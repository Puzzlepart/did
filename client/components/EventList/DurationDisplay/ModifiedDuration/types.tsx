import type { TooltipProps } from '@fluentui/react-components'
import {
  ArrowSortUpFilled,
  ArrowSortUpRegular,
  bundleIcon
} from '@fluentui/react-icons'
import { EventObject, TimeEntry } from 'types'

export interface IModifiedDurationProps extends Partial<TooltipProps> {
  event: TimeEntry | EventObject
}

export const Icon = bundleIcon(ArrowSortUpFilled, ArrowSortUpRegular)
