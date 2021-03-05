/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLProps } from 'react'

export interface ISummaryProps extends HTMLProps<HTMLDivElement> {
  timeentries: any[]
  loading: boolean
}
