import { HTMLProps } from 'react'
import { EventObject, TimeEntry } from 'types'

export interface IDurationDisplayProps extends HTMLProps<HTMLDivElement> {
  displayFormat?: string
  event: TimeEntry | EventObject

  /**
   * Whether to show the modified duration tooltip.
   */
  showModifiedDurationTooltip?: boolean
}
