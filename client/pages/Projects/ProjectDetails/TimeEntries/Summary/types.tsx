import { HTMLProps } from 'react'
import { TimeEntry } from 'types'

export interface ISummaryProps extends HTMLProps<HTMLDivElement> {
  timeEntries: TimeEntry[]
  loading: boolean
}
