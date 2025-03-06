import { HTMLProps } from 'react'
import { TimeEntry } from 'types'

export interface IProjectTimeEntriesSummaryProps
  extends HTMLProps<HTMLDivElement> {
  /**
   * The time entries.
   */
  timeEntries: TimeEntry[]

  /**
   * Indicates whether the data is loading.
   */
  loading: boolean
}
