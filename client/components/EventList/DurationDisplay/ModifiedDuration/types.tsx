import {
  ArrowSortUpFilled,
  ArrowSortUpRegular,
  bundleIcon
} from '@fluentui/react-icons'
import { EventObject, TimeEntry } from 'types'

export interface IModifiedDurationProps {
  event: TimeEntry | EventObject
}

export const Icon = bundleIcon(ArrowSortUpFilled, ArrowSortUpRegular)
